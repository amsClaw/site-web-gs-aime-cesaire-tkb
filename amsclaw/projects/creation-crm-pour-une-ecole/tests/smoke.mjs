import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const port = 8792;
const tempDir = await mkdtemp(path.join(os.tmpdir(), "crm-ecole-smoke-"));
const dataFile = path.join(tempDir, "app-data.json");
const server = spawn(process.execPath, ["scripts/server.js"], {
  cwd: new URL("..", import.meta.url),
  env: { ...process.env, PORT: String(port), DATA_FILE: dataFile, BACKUP_DIR: path.join(tempDir, "backups") },
  stdio: ["ignore", "pipe", "pipe"]
});

async function waitForServer() {
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/api/health`);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw new Error("Serveur indisponible pour le smoke test.");
}

async function expectOk(path, options) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`, options);
  if (!response.ok) {
    throw new Error(`${path} retourne HTTP ${response.status}`);
  }
  return response;
}

async function expectStatus(path, status, options) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`, options);
  if (response.status !== status) {
    throw new Error(`${path} retourne HTTP ${response.status} au lieu de ${status}`);
  }
  return response;
}

try {
  await waitForServer();
  let authHeaders = {};
  const login = await expectOk("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin_test", password: "demo2026" })
  });
  const loginPayload = await login.json();
  if (loginPayload.user.role !== "admin") {
    throw new Error("Le compte admin_test ne renvoie pas le role admin.");
  }
  authHeaders = { "X-CRM-Session": loginPayload.sessionToken };

  const state = await expectOk("/api/state", { headers: authHeaders }).then((response) => response.json());
  if (!Array.isArray(state.users) || !Array.isArray(state.classes) || !Array.isArray(state.students)) {
    throw new Error("Etat applicatif incomplet.");
  }
  const targetClass = await expectOk("/api/classes", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ name: "Classe Smoke", level: "College", active: true })
  }).then((response) => response.json());

  const updatedClass = await expectOk(`/api/classes/${targetClass.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ name: `${targetClass.name} Smoke`, level: targetClass.level, active: false, instructorIds: targetClass.instructorIds })
  }).then((response) => response.json());
  if (updatedClass.active !== false || !updatedClass.name.endsWith("Smoke")) {
    throw new Error("Modification ou archivage classe invalide.");
  }

  const restoredClass = await expectOk(`/api/classes/${targetClass.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ name: targetClass.name, level: targetClass.level, active: true, instructorIds: targetClass.instructorIds })
  }).then((response) => response.json());
  if (restoredClass.active !== true) {
    throw new Error("Restauration classe invalide.");
  }

  const instructor = state.users.find((user) => user.role === "instructeur");
  const updatedUser = await expectOk(`/api/users/${instructor.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ name: `${instructor.name} Smoke`, role: instructor.role, active: false })
  }).then((response) => response.json());
  if (updatedUser.active !== false || !updatedUser.name.endsWith("Smoke")) {
    throw new Error("Modification ou desactivation utilisateur invalide.");
  }
  await expectOk(`/api/users/${instructor.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ name: instructor.name, role: instructor.role, active: true })
  });

  const createdStudent = await expectOk("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({
      matricule: "SMOKE001",
      classId: targetClass.id,
      lastName: "Smoke",
      firstName: "Test",
      sex: "F",
      birthDate: "2016-03-04",
      birthPlace: "Conakry",
      schoolStatus: "a_jour",
      parent1: "Parent Smoke",
      parentPhone: "000000",
      photoDataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    })
  }).then((response) => response.json());
  if (!createdStudent.id || createdStudent.completenessStatus !== "complet") {
    throw new Error("Creation eleve invalide.");
  }
  if (!createdStudent.photoDataUrl?.startsWith("data:image/png;base64,")) {
    throw new Error("Photo eleve non persistee.");
  }

  const verifiedStudent = await expectOk(`/api/students/${createdStudent.id}/verify-status`, {
    method: "POST",
    headers: authHeaders
  }).then((response) => response.json());
  if (!verifiedStudent.schoolStatusCheckedAt || Number.isNaN(Date.parse(verifiedStudent.schoolStatusCheckedAt))) {
    throw new Error("Date de verification scolarite non persistee.");
  }

  const stateAfterCreate = await expectOk("/api/state", { headers: authHeaders }).then((response) => response.json());
  if (!stateAfterCreate.students.some((student) => student.id === createdStudent.id)) {
    throw new Error("L'eleve cree n'est pas persiste dans l'etat applicatif.");
  }

  const exportResponse = await expectOk("/api/export/classes.xlsx", { headers: authHeaders });
  const exportBuffer = await exportResponse.arrayBuffer();
  if (exportBuffer.byteLength < 1000) {
    throw new Error("Export classes trop petit pour etre un fichier Excel valide.");
  }

  const instructorLogin = await expectOk("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "instructeur_test", password: "demo2026" })
  }).then((response) => response.json());
  const instructorHeaders = { "X-CRM-Session": instructorLogin.sessionToken };
  await expectStatus("/api/export/classes.xlsx", 403, { headers: instructorHeaders });
  await expectStatus(`/api/students/${createdStudent.id}`, 403, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...instructorHeaders },
    body: JSON.stringify({ ...createdStudent, lastName: "Interdit" })
  });

  console.log("Smoke tests OK");
} finally {
  server.kill("SIGTERM");
  await rm(tempDir, { recursive: true, force: true });
}
