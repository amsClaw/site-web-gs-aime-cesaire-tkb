import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";
import express from "express";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const srcDir = path.join(projectRoot, "src");
const dataFile = process.env.DATA_FILE ? path.resolve(process.env.DATA_FILE) : path.join(projectRoot, "data", "app-data.json");
const backupDir = process.env.BACKUP_DIR ? path.resolve(process.env.BACKUP_DIR) : path.join(projectRoot, "data", "backups");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

const app = express();
const port = Number(process.env.PORT || 8791);
const host = process.env.HOST || "127.0.0.1";
const sessions = new Map();

app.use(express.json({ limit: "4mb" }));
app.use(express.static(srcDir));

function nowIso() {
  return new Date().toISOString();
}

function slug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}

function id(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.mkdir(backupDir, { recursive: true });

  let data;
  try {
    data = JSON.parse(await fs.readFile(dataFile, "utf8"));
  } catch {
    data = { metadata: {}, users: [], classes: [], students: [] };
  }

  data.metadata = {
    name: "CRM ecole GS AIME CESAIRE TKB",
    version: "0.1.0",
    lastImportAt: data.metadata?.lastImportAt || "",
    lastBackupAt: data.metadata?.lastBackupAt || "",
    updatedAt: data.metadata?.updatedAt || nowIso()
  };
  data.users = Array.isArray(data.users) ? data.users : [];
  data.classes = Array.isArray(data.classes) ? data.classes : [];
  data.students = Array.isArray(data.students) ? data.students : [];

  seedData(data);
  await writeData(data);
}

function seedData(data) {
  const defaults = [
    { username: "admin_test", name: "Direction test", role: "admin", password: "demo2026" },
    { username: "secretariat_test", name: "Secretariat test", role: "secretariat", password: "demo2026" },
    { username: "instructeur_test", name: "Instructeur test", role: "instructeur", password: "demo2026" }
  ];

  for (const user of defaults) {
    if (!data.users.some((item) => item.username === user.username)) {
      data.users.push({
        id: id("usr"),
        username: user.username,
        name: user.name,
        role: user.role,
        active: true,
        passwordHash: hashPassword(user.password),
        createdAt: nowIso(),
        updatedAt: nowIso()
      });
    }
  }

}

async function readData() {
  await ensureDataFileOnce;
  return JSON.parse(await fs.readFile(dataFile, "utf8"));
}

async function writeData(data) {
  data.metadata = data.metadata || {};
  data.metadata.updatedAt = nowIso();
  const tempFile = `${dataFile}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tempFile, `${JSON.stringify(data, null, 2)}\n`);
  await fs.rename(tempFile, dataFile);
}

function publicUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function publicState(data, currentUser) {
  const isInstructor = currentUser?.role === "instructeur";
  const visibleStudents = isInstructor ? visibleStudentsForUser(data, currentUser.id) : data.students;
  const visibleClassIds = new Set(visibleStudents.map((student) => student.classId));
  const visibleClasses = isInstructor
    ? data.classes.filter((classItem) => classItem.instructorIds.includes(currentUser.id) || visibleClassIds.has(classItem.id))
    : data.classes;
  const visibleUsers = isInstructor ? data.users.filter((user) => user.id === currentUser.id) : data.users;
  return {
    ...data,
    users: visibleUsers.map(publicUser),
    classes: visibleClasses,
    students: visibleStudents
  };
}

function forbidden(message = "Action non autorisee pour ce profil.") {
  const error = new Error(message);
  error.status = 403;
  return error;
}

async function requireAuth(request, response, next) {
  try {
    const token = String(request.get("x-crm-session") || "").trim();
    const session = sessions.get(token);
    const data = await readData();
    const user = session ? data.users.find((item) => item.id === session.userId && item.active) : null;
    if (!user) {
      return response.status(401).json({ error: "Session expiree. Merci de te reconnecter." });
    }
    request.currentUser = user;
    request.data = data;
    next();
  } catch (error) {
    next(error);
  }
}

function requireRole(...roles) {
  return (request, _response, next) => {
    if (!roles.includes(request.currentUser?.role)) return next(forbidden());
    next();
  };
}

function requireFields(body, fields) {
  const missing = fields.filter((field) => !String(body[field] || "").trim());
  if (missing.length) {
    const error = new Error(`Champs obligatoires manquants : ${missing.join(", ")}`);
    error.status = 400;
    throw error;
  }
}

function normalizeHeader(value) {
  return slug(value).replace(/-/g, "");
}

function getMapped(row, aliases) {
  const lookup = {};
  for (const [key, value] of Object.entries(row)) {
    lookup[normalizeHeader(key)] = value;
  }
  for (const alias of aliases) {
    const value = lookup[normalizeHeader(alias)];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value).trim();
    }
  }
  return "";
}

function splitStudentName(value) {
  const text = String(value || "").trim().replace(/\s+/g, " ");
  if (!text) return { lastName: "", firstName: "" };
  const parts = text.split(" ");
  if (parts.length === 1) return { lastName: parts[0], firstName: "" };
  return { lastName: parts[0], firstName: parts.slice(1).join(" ") };
}

function parseDate(value) {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const parsed = new Date(excelEpoch.getTime() + value * 86400000);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
  }
  const text = String(value).trim();
  const match = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (match) {
    const year = match[3].length === 2 ? `20${match[3]}` : match[3];
    return `${year}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
  }
  return text;
}

function computeCompleteness(student) {
  const recommended = ["birthDate", "sex", "birthPlace", "parent1", "parentPhone", "schoolStatus"];
  const missing = recommended.filter((field) => !String(student[field] || "").trim());
  return {
    completenessStatus: missing.length ? "a_completer" : "complet",
    missingFields: missing
  };
}

function normalizePhotoDataUrl(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (!/^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(text)) {
    const error = new Error("Format de photo invalide.");
    error.status = 400;
    throw error;
  }
  if (Buffer.byteLength(text, "utf8") > 350 * 1024) {
    const error = new Error("Photo trop lourde apres compression.");
    error.status = 400;
    throw error;
  }
  return text;
}

function normalizeStudentPayload(body, data, existingId = "") {
  requireFields(body, ["lastName", "classId"]);
  const classItem = data.classes.find((item) => item.id === body.classId && item.active);
  if (!classItem) {
    const error = new Error("La classe selectionnee est introuvable ou archivee.");
    error.status = 400;
    throw error;
  }

  const matricule = String(body.matricule || "").trim();
  if (matricule) {
    const duplicate = data.students.find((student) => (
      student.id !== existingId
      && !student.archived
      && String(student.matricule || "").toLowerCase() === matricule.toLowerCase()
    ));
    if (duplicate) {
      const error = new Error("Ce matricule existe deja.");
      error.status = 409;
      throw error;
    }
  }

  const base = {
    matricule,
    lastName: String(body.lastName || "").trim(),
    firstName: String(body.firstName || "").trim(),
    sex: String(body.sex || "").trim(),
    birthDate: parseDate(body.birthDate),
    birthPlace: String(body.birthPlace || "").trim(),
    classId: body.classId,
    parent1: String(body.parent1 || "").trim(),
    parent2: String(body.parent2 || "").trim(),
    parentPhone: String(body.parentPhone || "").trim(),
    address: String(body.address || "").trim(),
    schoolStatus: ["a_jour", "non_a_jour", "a_verifier"].includes(body.schoolStatus) ? body.schoolStatus : "a_verifier",
    schoolStatusCheckedAt: String(body.schoolStatusCheckedAt || "").trim(),
    administrativeNote: String(body.administrativeNote || "").trim(),
    photoDataUrl: normalizePhotoDataUrl(body.photoDataUrl),
    archived: Boolean(body.archived),
    comments: Array.isArray(body.comments) ? body.comments : []
  };
  return { ...base, ...computeCompleteness(base) };
}

function visibleStudentsForUser(data, userId) {
  const user = data.users.find((item) => item.id === userId);
  if (!user || user.role !== "instructeur") return data.students;
  const allowedClassIds = data.classes
    .filter((classItem) => classItem.instructorIds.includes(user.id))
    .map((classItem) => classItem.id);
  return data.students.filter((student) => allowedClassIds.includes(student.classId));
}

function canAccessStudent(data, user, student) {
  if (!student) return false;
  if (["admin", "secretariat"].includes(user.role)) return true;
  return visibleStudentsForUser(data, user.id).some((item) => item.id === student.id);
}

async function createBackupFile(prefix = "crm-ecole-backup") {
  const data = await readData();
  const filename = `${prefix}-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  const target = path.join(backupDir, filename);
  await fs.mkdir(backupDir, { recursive: true });
  await fs.writeFile(target, `${JSON.stringify(data, null, 2)}\n`);
  return { path: path.relative(projectRoot, target), createdAt: nowIso() };
}

async function createDailyStartupBackupIfNeeded() {
  await fs.mkdir(backupDir, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const existing = await fs.readdir(backupDir);
  if (existing.some((file) => file.startsWith(`crm-ecole-auto-${today}`))) return null;
  return createBackupFile(`crm-ecole-auto-${today}`);
}

function studentsForExport(data, query = {}) {
  let students = data.students.filter((student) => !student.archived);
  if (query.classId) students = students.filter((student) => student.classId === query.classId);
  if (query.schoolStatus) students = students.filter((student) => student.schoolStatus === query.schoolStatus);
  if (query.completenessStatus) students = students.filter((student) => student.completenessStatus === query.completenessStatus);
  return students;
}

function studentExportRows(data, students) {
  const classById = new Map(data.classes.map((item) => [item.id, item.name]));
  return students.map((student) => ({
    Matricule: student.matricule,
    Nom: student.lastName,
    Prenom: student.firstName,
    Sexe: student.sex,
    "Date de naissance": student.birthDate,
    "Lieu de naissance": student.birthPlace,
    Classe: classById.get(student.classId) || "",
    "Parent 1": student.parent1,
    "Parent 2": student.parent2,
    "Telephone parent": student.parentPhone,
    Adresse: student.address,
    "Statut scolarite": student.schoolStatus,
    "Derniere verification scolarite": student.schoolStatusCheckedAt || "",
    "Completude": student.completenessStatus
  }));
}

function cellText(cell) {
  const value = cell?.value;
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value;
  if (typeof value === "object") {
    if (value.text) return value.text;
    if (value.result !== undefined) return value.result;
    if (Array.isArray(value.richText)) return value.richText.map((part) => part.text || "").join("");
    if (value.hyperlink && value.text) return value.text;
  }
  return value;
}

function worksheetRowsToObjects(worksheet) {
  let headerRowNumber = 1;
  for (let rowNumber = 1; rowNumber <= Math.min(10, worksheet.rowCount); rowNumber += 1) {
    const values = [];
    worksheet.getRow(rowNumber).eachCell({ includeEmpty: true }, (cell) => {
      values.push(normalizeHeader(cellText(cell)));
    });
    const score = ["matricule", "eleve", "nom", "prenom", "sexe", "datedenaissance"].filter((header) => values.includes(header)).length;
    if (score >= 2) {
      headerRowNumber = rowNumber;
      break;
    }
  }

  const headerRow = worksheet.getRow(headerRowNumber);
  const headers = [];
  headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    headers[colNumber] = String(cellText(cell) || "").trim();
  });

  const rows = [];
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber <= headerRowNumber) return;
    const item = {};
    let hasValue = false;
    for (let colNumber = 1; colNumber < headers.length; colNumber += 1) {
      const header = headers[colNumber];
      if (!header) continue;
      const value = cellText(row.getCell(colNumber));
      if (String(value || "").trim()) hasValue = true;
      item[header] = value;
    }
    if (hasValue) rows.push({ __rowNumber: rowNumber, ...item });
  });
  return rows;
}

async function workbookBuffer(sheetName, rows) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "amsClaw";
  workbook.created = new Date();
  const worksheet = workbook.addWorksheet(sheetName);
  const headers = Object.keys(rows[0] || { Vide: "" });
  worksheet.columns = headers.map((header) => ({
    header,
    key: header,
    width: Math.max(14, Math.min(32, header.length + 6))
  }));
  rows.forEach((row) => worksheet.addRow(row));
  worksheet.getRow(1).font = { bold: true };
  worksheet.views = [{ state: "frozen", ySplit: 1 }];
  return workbook.xlsx.writeBuffer();
}

app.post("/api/login", async (request, response) => {
  const data = await readData();
  const username = String(request.body.username || "").trim();
  const password = String(request.body.password || "");
  const user = data.users.find((item) => item.username === username && item.active);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return response.status(401).json({ error: "Identifiant ou mot de passe incorrect." });
  }
  const sessionToken = crypto.randomBytes(32).toString("hex");
  sessions.set(sessionToken, { userId: user.id, createdAt: Date.now() });
  response.json({ user: publicUser(user), sessionToken });
});

app.get("/api/state", requireAuth, async (request, response) => {
  response.json(publicState(request.data, request.currentUser));
});

app.post("/api/users", requireAuth, requireRole("admin"), async (request, response) => {
  const data = request.data;
  requireFields(request.body, ["username", "name", "role"]);
  const username = String(request.body.username).trim();
  if (data.users.some((user) => user.username === username)) {
    return response.status(409).json({ error: "Cet identifiant existe deja." });
  }
  const user = {
    id: id("usr"),
    username,
    name: String(request.body.name).trim(),
    role: ["admin", "secretariat", "instructeur"].includes(request.body.role) ? request.body.role : "instructeur",
    active: request.body.active !== false,
    passwordHash: hashPassword(request.body.password || "demo2026"),
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  data.users.push(user);
  await writeData(data);
  response.status(201).json(publicUser(user));
});

app.put("/api/users/:id", requireAuth, requireRole("admin"), async (request, response) => {
  const data = request.data;
  const index = data.users.findIndex((user) => user.id === request.params.id);
  if (index === -1) return response.status(404).json({ error: "Utilisateur introuvable." });
  const current = data.users[index];
  data.users[index] = {
    ...current,
    name: String(request.body.name || current.name).trim(),
    role: ["admin", "secretariat", "instructeur"].includes(request.body.role) ? request.body.role : current.role,
    active: request.body.active !== undefined ? Boolean(request.body.active) : current.active,
    passwordHash: request.body.password ? hashPassword(request.body.password) : current.passwordHash,
    updatedAt: nowIso()
  };
  await writeData(data);
  response.json(publicUser(data.users[index]));
});

app.post("/api/classes", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  requireFields(request.body, ["name"]);
  const classItem = {
    id: id("cls"),
    name: String(request.body.name).trim(),
    level: String(request.body.level || "").trim(),
    active: request.body.active !== false,
    instructorIds: Array.isArray(request.body.instructorIds) ? request.body.instructorIds : [],
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  data.classes.push(classItem);
  await writeData(data);
  response.status(201).json(classItem);
});

app.put("/api/classes/:id", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  const index = data.classes.findIndex((item) => item.id === request.params.id);
  if (index === -1) return response.status(404).json({ error: "Classe introuvable." });
  data.classes[index] = {
    ...data.classes[index],
    name: String(request.body.name || data.classes[index].name).trim(),
    level: String(request.body.level || "").trim(),
    active: request.body.active !== undefined ? Boolean(request.body.active) : data.classes[index].active,
    instructorIds: Array.isArray(request.body.instructorIds) ? request.body.instructorIds : data.classes[index].instructorIds,
    updatedAt: nowIso()
  };
  await writeData(data);
  response.json(data.classes[index]);
});

app.post("/api/students", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  const student = {
    id: id("stu"),
    ...normalizeStudentPayload(request.body, data),
    comments: [],
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  data.students.push(student);
  await writeData(data);
  response.status(201).json(student);
});

app.put("/api/students/:id", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  const index = data.students.findIndex((student) => student.id === request.params.id);
  if (index === -1) return response.status(404).json({ error: "Eleve introuvable." });
  data.students[index] = {
    ...data.students[index],
    ...normalizeStudentPayload({ ...data.students[index], ...request.body }, data, request.params.id),
    updatedAt: nowIso()
  };
  await writeData(data);
  response.json(data.students[index]);
});

app.post("/api/students/:id/verify-status", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  const student = data.students.find((item) => item.id === request.params.id);
  if (!student) return response.status(404).json({ error: "Eleve introuvable." });
  student.schoolStatusCheckedAt = nowIso();
  student.updatedAt = nowIso();
  await writeData(data);
  response.json(student);
});

app.post("/api/students/:id/archive", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  const student = data.students.find((item) => item.id === request.params.id);
  if (!student) return response.status(404).json({ error: "Eleve introuvable." });
  student.archived = request.body.archived !== false;
  student.archiveMotif = String(request.body.archiveMotif || student.archiveMotif || "").trim();
  student.updatedAt = nowIso();
  await writeData(data);
  response.json(student);
});

app.post("/api/students/:id/comments", requireAuth, async (request, response) => {
  const data = request.data;
  const student = data.students.find((item) => item.id === request.params.id);
  const author = request.currentUser;
  if (!student) return response.status(404).json({ error: "Eleve introuvable." });
  if (!canAccessStudent(data, request.currentUser, student)) return response.status(403).json({ error: "Fiche eleve non autorisee pour ce profil." });
  requireFields(request.body, ["text"]);
  const comment = {
    id: id("com"),
    authorId: author.id,
    authorName: author.name,
    text: String(request.body.text).trim(),
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  student.comments = Array.isArray(student.comments) ? student.comments : [];
  student.comments.push(comment);
  student.updatedAt = nowIso();
  await writeData(data);
  response.status(201).json(comment);
});

app.post("/api/import/analyze", requireAuth, requireRole("admin", "secretariat"), upload.single("file"), async (request, response) => {
  if (!request.file) return response.status(400).json({ error: "Fichier Excel manquant." });
  const data = request.data;
  const targetClassId = String(request.body.targetClassId || "");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(request.file.buffer);
  const worksheet = workbook.worksheets[0];
  if (!worksheet) return response.status(400).json({ error: "Aucun onglet Excel lisible." });
  const rows = worksheetRowsToObjects(worksheet);
  const existingMatricules = new Set(data.students.map((student) => String(student.matricule || "").toLowerCase()).filter(Boolean));
  const fileMatricules = new Set();
  const classesByName = new Map(data.classes.map((item) => [slug(item.name), item]));
  const detectedHeaders = rows.length > 0
    ? [...new Set(Object.keys(rows[0]).filter((k) => k !== "__rowNumber").map((h) => normalizeHeader(h)).filter(Boolean))]
    : [];

  const analyzed = rows.map((row, index) => {
    const fullName = getMapped(row, ["Eleve", "Élève", "Nom complet"]);
    const splitName = splitStudentName(fullName);
    const className = getMapped(row, ["Classe"]);
    const classItem = className ? classesByName.get(slug(className)) : data.classes.find((item) => item.id === targetClassId);
    const matricule = getMapped(row, ["Matricule", "Identifiant"]);
    const student = {
      matricule,
      lastName: getMapped(row, ["Nom"]) || splitName.lastName,
      firstName: getMapped(row, ["Prenom", "Prénom"]) || splitName.firstName,
      sex: getMapped(row, ["Sexe"]),
      birthDate: parseDate(getMapped(row, ["Date de naissance", "Naissance"])),
      birthPlace: getMapped(row, ["Lieu de naissance"]),
      classId: classItem?.id || "",
      parent1: getMapped(row, ["Pere", "Père", "Parent 1", "Tuteur"]),
      parent2: getMapped(row, ["Mere", "Mère", "Parent 2"]),
      parentPhone: getMapped(row, ["Telephone", "Téléphone", "Telephone parent"]),
      address: getMapped(row, ["Adresse"]),
      schoolStatus: "a_verifier",
      administrativeNote: ""
    };
    const errors = [];
    const warnings = [];
    if (!student.lastName) errors.push("Nom ou colonne Eleve manquant");
    if (!student.classId) errors.push("Classe cible manquante ou inconnue");
    if (matricule) {
      const key = matricule.toLowerCase();
      if (existingMatricules.has(key)) errors.push("Matricule deja present en base");
      if (fileMatricules.has(key)) errors.push("Matricule en doublon dans le fichier");
      fileMatricules.add(key);
    } else {
      warnings.push("Matricule absent");
    }
    const withCompleteness = { ...student, ...computeCompleteness(student) };
    if (withCompleteness.completenessStatus === "a_completer") {
      warnings.push(`Donnees a completer : ${withCompleteness.missingFields.join(", ")}`);
    }
    return {
      rowNumber: row.__rowNumber || index + 2,
      status: errors.length ? "bloquee" : "importable",
      errors,
      warnings,
      student: withCompleteness
    };
  });

  response.json({
    summary: {
      total: analyzed.length,
      importable: analyzed.filter((row) => row.status === "importable").length,
      blocked: analyzed.filter((row) => row.status === "bloquee").length,
      incomplete: analyzed.filter((row) => row.student.completenessStatus === "a_completer").length
    },
    detectedHeaders,
    rows: analyzed
  });
});

app.get("/api/backup/last", requireAuth, async (request, response) => {
  const data = await readData();
  response.json({ lastBackupAt: data.metadata?.lastBackupAt || null });
});

app.get("/api/import/last", requireAuth, async (request, response) => {
  const data = await readData();
  response.json({ lastImportAt: data.metadata?.lastImportAt || null });
});

app.post("/api/import/commit", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  const rows = Array.isArray(request.body.rows) ? request.body.rows : [];
  const created = [];
  for (const row of rows) {
    if (row.status !== "importable") continue;
    const student = {
      id: id("stu"),
      ...normalizeStudentPayload(row.student, data),
      comments: [],
      archived: false,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    data.students.push(student);
    data.metadata.lastImportAt = nowIso();
    created.push(student);
  }
  await writeData(data);
  response.status(201).json({ created: created.length, students: created });
});

app.get("/api/export/students.xlsx", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  const rows = studentExportRows(data, studentsForExport(data, request.query));
  const buffer = await workbookBuffer("Eleves", rows);
  response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  response.setHeader("Content-Disposition", `attachment; filename="eleves-${new Date().toISOString().slice(0, 10)}.xlsx"`);
  response.send(buffer);
});

app.get("/api/export/classes.xlsx", requireAuth, requireRole("admin", "secretariat"), async (request, response) => {
  const data = request.data;
  const rows = data.classes.map((classItem) => ({
    Classe: classItem.name,
    Cycle: classItem.level,
    Statut: classItem.active ? "active" : "archivee",
    Effectif: data.students.filter((student) => student.classId === classItem.id && !student.archived).length
  }));
  const buffer = await workbookBuffer("Effectifs", rows);
  response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  response.setHeader("Content-Disposition", `attachment; filename="effectifs-${new Date().toISOString().slice(0, 10)}.xlsx"`);
  response.send(buffer);
});

app.post("/api/backup", requireAuth, requireRole("admin"), async (_request, response) => {
  response.json(await createBackupFile());
});

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, name: "CRM ecole GS AIME CESAIRE TKB" });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.status || 500).json({ error: error.message || "Erreur serveur." });
});

const ensureDataFileOnce = ensureDataFile();
await ensureDataFileOnce;
const startupBackup = await createDailyStartupBackupIfNeeded();
if (startupBackup) {
  console.log(`Sauvegarde automatique creee : ${startupBackup.path}`);
}

app.listen(port, host, () => {
  const displayHost = host === "0.0.0.0" ? "adresse-ip-du-serveur" : host;
  console.log(`CRM ecole V1 disponible : http://${displayHost}:${port}`);
});
