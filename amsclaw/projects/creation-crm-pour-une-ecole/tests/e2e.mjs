import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import ExcelJS from "exceljs";
import { chromium } from "playwright";

const port = 8793;
const tempDir = await mkdtemp(path.join(os.tmpdir(), "crm-ecole-e2e-"));
const dataFile = path.join(tempDir, "app-data.json");
const backupDir = path.join(tempDir, "backups");
const importFile = path.join(tempDir, "import-eleves.xlsx");
const photoFile = path.join(tempDir, "photo-eleve.png");

const server = spawn(process.execPath, ["scripts/server.js"], {
  cwd: new URL("..", import.meta.url),
  env: { ...process.env, PORT: String(port), DATA_FILE: dataFile, BACKUP_DIR: backupDir },
  stdio: ["ignore", "pipe", "pipe"]
});

server.stderr.on("data", (chunk) => process.stderr.write(chunk));

async function waitForServer() {
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/api/health`);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }
  throw new Error("Serveur indisponible pour le test e2e.");
}

async function stateFromPage(page) {
  return page.evaluate(() => fetch("/api/state", {
    headers: { "X-CRM-Session": localStorage.getItem("crmSessionToken") || "" }
  }).then((response) => (response.ok ? response.json() : {})));
}

async function waitForState(page, predicate, message) {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    const state = await stateFromPage(page);
    try {
      if (predicate(state)) return state;
    } catch {
      // State can be unavailable briefly while the login session is being stored.
    }
    await page.waitForTimeout(150);
  }
  throw new Error(message);
}

async function createImportWorkbook() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Eleves");
  worksheet.addRow(["Matricule", "Nom", "Prenom", "Sexe", "Date de naissance", "Lieu de naissance", "Classe", "Parent 1", "Telephone"]);
  worksheet.addRow(["E2E-IMP-001", "ImportNom", "ImportPrenom", "M", "15/09/2016", "Conakry", "E2E Classe modifiee", "Parent Import", "654321"]);
  await workbook.xlsx.writeFile(importFile);
}

async function createPhotoFixture() {
  const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  await writeFile(photoFile, Buffer.from(base64, "base64"));
}

let browser;

try {
  await createImportWorkbook();
  await createPhotoFixture();
  await waitForServer();

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const browserErrors = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) browserErrors.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.waitForFunction(() => Boolean(localStorage.getItem("crmSessionToken")));
  await waitForState(page, (state) => state.users.length >= 3 && Array.isArray(state.classes), "Connexion ou chargement initial KO.");

  await page.getByRole("button", { name: "Classes" }).click();
  await page.locator("#class-form input[name='name']").fill("E2E Classe");
  await page.locator("#class-form select[name='level']").selectOption("Primaire");
  await page.locator("#class-form button[type='submit']").click();
  const stateAfterClass = await waitForState(page, (state) => state.classes.some((item) => item.name === "E2E Classe"), "Creation classe KO.");
  const e2eClass = stateAfterClass.classes.find((item) => item.name === "E2E Classe");
  const classRow = page.locator(`[data-class-row="${e2eClass.id}"]`);
  await classRow.locator("input[name='name']").fill("E2E Classe modifiee");
  await classRow.locator("select[name='active']").selectOption("false");
  await classRow.locator(`[data-save-class="${e2eClass.id}"]`).click();
  await waitForState(
    page,
    (state) => state.classes.some((item) => item.id === e2eClass.id && item.name === "E2E Classe modifiee" && item.active === false),
    "Modification ou archivage classe KO."
  );
  await classRow.locator("select[name='active']").selectOption("true");
  await classRow.locator(`[data-save-class="${e2eClass.id}"]`).click();
  await waitForState(
    page,
    (state) => state.classes.some((item) => item.id === e2eClass.id && item.name === "E2E Classe modifiee" && item.active === true),
    "Restauration classe KO."
  );

  await page.getByRole("button", { name: "Utilisateurs" }).click();
  await page.locator("#user-form input[name='username']").fill("e2e_user");
  await page.locator("#user-form input[name='name']").fill("Utilisateur E2E");
  await page.locator("#user-form select[name='role']").selectOption("instructeur");
  await page.locator("#user-form input[name='password']").fill("demo2026");
  await page.locator("#user-form button[type='submit']").click();
  const stateAfterUser = await waitForState(page, (state) => state.users.some((user) => user.username === "e2e_user"), "Creation utilisateur KO.");
  const e2eUser = stateAfterUser.users.find((user) => user.username === "e2e_user");

  await page.getByRole("button", { name: "Classes" }).click();
  const editedClassRow = page.locator(`[data-class-row="${e2eClass.id}"]`);
  await editedClassRow.locator("select[name='instructorIds']").selectOption(e2eUser.id);
  await editedClassRow.locator(`[data-save-class="${e2eClass.id}"]`).click();
  await waitForState(
    page,
    (state) => state.classes.some((item) => item.id === e2eClass.id && item.instructorIds.includes(e2eUser.id)),
    "Rattachement instructeur classe KO."
  );

  await page.getByRole("button", { name: "Utilisateurs" }).click();
  const userRow = page.locator(`[data-user-row="${e2eUser.id}"]`);
  await userRow.locator("input[name='name']").fill("Utilisateur E2E modifie");
  await userRow.locator("select[name='active']").selectOption("false");
  await userRow.locator(`[data-save-user="${e2eUser.id}"]`).click();
  await waitForState(
    page,
    (state) => state.users.some((user) => user.id === e2eUser.id && user.name === "Utilisateur E2E modifie" && user.active === false),
    "Modification ou desactivation utilisateur KO."
  );

  await page.getByRole("button", { name: "Classes" }).click();
  const classRowAfterUserDisable = page.locator(`[data-class-row="${e2eClass.id}"]`);
  const selectedInstructorId = await classRowAfterUserDisable.locator("select[name='instructorIds']").inputValue();
  if (selectedInstructorId !== e2eUser.id) throw new Error("Instructeur desactive non conserve dans la classe.");
  await classRowAfterUserDisable.locator(`[data-save-class="${e2eClass.id}"]`).click();
  await waitForState(
    page,
    (state) => state.classes.some((item) => item.id === e2eClass.id && item.instructorIds.includes(e2eUser.id)),
    "Conservation instructeur desactive sur classe KO."
  );

  await page.getByRole("button", { name: "Eleves" }).click();
  await page.getByRole("button", { name: "Nouvel eleve" }).click();
  await page.locator("#student-form input[name='matricule']").fill("E2E-MAN-001");
  await page.locator("#student-form select[name='classId']").selectOption({ label: "E2E Classe modifiee" });
  await page.locator("#student-form input[name='lastName']").fill("ManuelNom");
  await page.locator("#student-form input[name='firstName']").fill("ManuelPrenom");
  await page.locator("#student-form select[name='sex']").selectOption("F");
  await page.locator("#student-form input[name='birthDate']").fill("2016-06-14");
  await page.locator("#student-form input[name='birthPlace']").fill("Conakry");
  await page.locator("#student-form input[name='parent1']").fill("Parent Manuel");
  await page.locator("#student-form input[name='parentPhone']").fill("123456");
  await page.locator("#student-photo-file").setInputFiles(photoFile);
  await page.waitForFunction(() => document.querySelector("#student-form input[name='photoDataUrl']")?.value.startsWith("data:image/jpeg;base64,"));
  if (await page.locator(".student-photo-actions .file-button").isVisible()) {
    throw new Error("Le bouton Choisir une photo reste visible apres chargement.");
  }
  await page.locator("#remove-student-photo").click();
  if (!(await page.locator(".student-photo-actions .file-button").isVisible())) {
    throw new Error("Le bouton Choisir une photo ne reapparait pas apres suppression.");
  }
  await page.locator("#student-photo-file").setInputFiles(photoFile);
  await page.waitForFunction(() => document.querySelector("#student-form input[name='photoDataUrl']")?.value.startsWith("data:image/jpeg;base64,"));
  await page.locator("#student-form button[type='submit']").click();
  const stateAfterStudent = await waitForState(
    page,
    (state) => state.students.some((student) => student.matricule === "E2E-MAN-001"),
    "Creation eleve manuelle KO."
  );
  const manualStudent = stateAfterStudent.students.find((student) => student.matricule === "E2E-MAN-001");
  if (manualStudent.completenessStatus !== "complet") {
    throw new Error("L'eleve manuel n'est pas marque complet.");
  }
  if (!manualStudent.photoDataUrl?.startsWith("data:image/jpeg;base64,")) {
    throw new Error("La photo compressee de l'eleve manuel n'est pas persistee.");
  }
  const selectedStudentRow = page.locator(`[data-student-row="${manualStudent.id}"]`);
  if (!(await selectedStudentRow.evaluate((row) => row.classList.contains("selected") && row.getAttribute("aria-current") === "true"))) {
    throw new Error("La ligne de l'eleve affiche n'est pas marquee comme selectionnee.");
  }
  const parent1Occurrences = await page.locator("#student-form label").getByText("Parent 1", { exact: true }).count();
  if (parent1Occurrences !== 1) {
    throw new Error(`La fiche eleve affiche Parent 1 ${parent1Occurrences} fois au lieu d'une seule.`);
  }
  const printableSheetText = await page.locator(".print-student-sheet").textContent();
  for (const expected of ["Fiche eleve", "ManuelNom ManuelPrenom", "Parent Manuel", "Statut scolarite"]) {
    if (!printableSheetText.includes(expected)) {
      throw new Error(`La fiche imprimable ne contient pas : ${expected}`);
    }
  }
  await page.evaluate(() => {
    window.__printCalled = false;
    window.print = () => { window.__printCalled = true; };
  });
  await page.getByRole("button", { name: "Imprimer la fiche" }).click();
  const printCalled = await page.evaluate(() => window.__printCalled);
  if (!printCalled) {
    throw new Error("Le bouton Imprimer la fiche ne declenche pas window.print().");
  }
  const isolatedPrintOutput = await page.locator("#print-output .print-student-sheet").textContent();
  if (!isolatedPrintOutput.includes("ManuelNom ManuelPrenom")) {
    throw new Error("La sortie d'impression isolee ne contient pas la fiche eleve.");
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(`[data-select-student="${manualStudent.id}"]`).click();
  await page.waitForFunction(() => document.querySelector(".student-detail")?.textContent.includes("ManuelNom"));
  const mobileStudentLayout = await page.evaluate(() => {
    const detail = document.querySelector(".student-detail")?.getBoundingClientRect();
    const list = document.querySelector(".students-list-panel")?.getBoundingClientRect();
    return { detailTop: detail?.top ?? 0, listTop: list?.top ?? 0 };
  });
  if (!(mobileStudentLayout.detailTop < mobileStudentLayout.listTop)) {
    throw new Error("Sur mobile, la fiche eleve n'est pas affichee avant la liste.");
  }
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.locator("#comment-form textarea[name='text']").fill("Commentaire E2E");
  await page.locator("#comment-form button[type='submit']").click();
  await waitForState(
    page,
    (state) => state.students.some((student) => student.matricule === "E2E-MAN-001" && student.comments.some((comment) => comment.text === "Commentaire E2E")),
    "Creation commentaire KO."
  );

  // Test dashboard enrichment
  await page.getByRole("button", { name: "Tableau de bord" }).first().click();
  await page.waitForTimeout(500);
  const dashboardText = await page.locator("#dashboard-panel").textContent();
  for (const expected of ["Repartition par cycle", "Classes sans instructeur principal", "Fiches a completer par classe", "Dernier import", "Derniere sauvegarde"]) {
    if (!dashboardText.includes(expected)) {
      throw new Error(`Le tableau de bord enrichi ne contient pas : ${expected}`);
    }
  }

  await page.getByRole("button", { name: "Import / Export" }).click();
  await page.locator("#import-form input[type='file']").setInputFiles(importFile);
  await page.locator("#import-form button[type='submit']").click();
  await page.getByRole("button", { name: "Confirmer l'import partiel" }).click();
  await waitForState(page, (state) => state.students.some((student) => student.matricule === "E2E-IMP-001"), "Creation par import Excel KO.");

  await page.getByRole("button", { name: "Sauvegarde" }).click();
  await page.getByRole("button", { name: "Creer une sauvegarde" }).click();
  await page.waitForFunction(() => document.querySelector("#backup-result")?.textContent.includes("crm-ecole-backup-"));

  const finalState = await stateFromPage(page);
  if (finalState.students.length !== 2) {
    throw new Error(`Nombre d'eleves final inattendu : ${finalState.students.length}.`);
  }
  if (browserErrors.length) {
    throw new Error(`Erreurs navigateur detectees : ${browserErrors.join(" | ")}`);
  }

  console.log("E2E creation workflows OK");
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
  await rm(tempDir, { recursive: true, force: true });
}
