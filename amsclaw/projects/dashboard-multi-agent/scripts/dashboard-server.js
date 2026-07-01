#!/usr/bin/env node

const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const port = Number(process.env.PORT || 8787);
const workspaceRoot = path.resolve(__dirname, "..", "..", "..", "..");
const dataFile = path.resolve(__dirname, "..", "data", "dashboard-data.json");
const backupsDir = path.resolve(__dirname, "..", "data", "backups");
const projectsRoot = path.resolve(workspaceRoot, "amsclaw", "projects");
const defaultAgentOutputDir = path.resolve(workspaceRoot, "amsclaw", "agent-output");
const downloadsDir = path.resolve(process.env.HOME || workspaceRoot, "Downloads");
const projectIndexFile = path.resolve(workspaceRoot, "amsclaw", "PROJECTS_INDEX.md");
const activeProjectsFile = path.resolve(workspaceRoot, "memory", "active-projects.md");
const decisionsFile = path.resolve(workspaceRoot, "memory", "decisions.md");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Cache-Control": "no-store",
    ...headers
  });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload, null, 2), {
    "Content-Type": "application/json; charset=utf-8"
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Payload trop volumineux"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function makeExecutionId() {
  return `exec-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeExecutionLog(log) {
  return Array.isArray(log) ? log.map((entry) => ({
    id: entry.id || makeExecutionId(),
    ...entry,
    verified: Boolean(entry.verified),
    verifiedAt: entry.verifiedAt || ""
  })) : [];
}

function normalizePayload(payload) {
  return {
    metadata: {
      ...(payload.metadata || {}),
      updatedAt: new Date().toISOString().slice(0, 10),
      source: "amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json",
      generatedBy: "dashboard-server.js"
    },
    projects: Array.isArray(payload.projects) ? payload.projects : [],
    ideas: Array.isArray(payload.ideas) ? payload.ideas : [],
    agentTasks: Array.isArray(payload.agentTasks) ? payload.agentTasks.map((task) => ({
      ...task,
      dueDate: task.dueDate || "",
      executionLog: normalizeExecutionLog(task.executionLog)
    })) : [],
    backlogItems: Array.isArray(payload.backlogItems) ? payload.backlogItems : [],
    decisions: Array.isArray(payload.decisions) ? payload.decisions : [],
    activityLog: Array.isArray(payload.activityLog) ? payload.activityLog.slice(0, 80) : [],
    routines: payload.routines && typeof payload.routines === "object" ? payload.routines : {},
    completedRoutines: payload.completedRoutines && typeof payload.completedRoutines === "object" ? payload.completedRoutines : {}
  };
}

function slugify(value) {
  return String(value || "note-agent")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "note-agent";
}

function slugifyProject(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function cleanText(value, fallback = "") {
  return String(value || fallback).trim();
}

function isSafeProjectSlug(slug) {
  return Boolean(slug)
    && slug === path.basename(slug)
    && !slug.includes("..")
    && /^[a-z0-9][a-z0-9-]{1,63}$/.test(slug);
}

function markdownValue(value, fallback = "A preciser.") {
  return cleanText(value, fallback).replace(/\r\n/g, "\n");
}

function appendUniqueLine(value, line) {
  const text = String(value || "").trim();
  if (text.includes(line)) return text;
  return text ? `${text}\n${line}` : line;
}

async function readTextFile(filePath) {
  return fs.promises.readFile(filePath, "utf8");
}

async function writeTextFile(filePath, content) {
  await fs.promises.writeFile(filePath, `${content.trimEnd()}\n`, "utf8");
}

function replaceText(content, search, replacement, warnings, label) {
  if (!content.includes(search)) {
    warnings.push(`${label} non mis à jour : texte cible introuvable.`);
    return content;
  }
  return content.replace(search, replacement);
}

async function updateCrmPrdValidationMarkdown(warnings) {
  const date = new Date().toISOString().slice(0, 10);
  const projectDir = path.resolve(projectsRoot, "creation-crm-pour-une-ecole");
  const readmeFile = path.join(projectDir, "README.md");
  const nextStepsFile = path.join(projectDir, "docs", "NEXT_STEPS.md");
  const nextAction = "Produire le cahier de recette V1 à partir de la PRD validée.";
  const decisionLine = `- ${date} : Ams valide la PRD V1 ; prochaine étape : produire le cahier de recette V1.`;

  let readme = await readTextFile(readmeFile);
  readme = replaceText(
    readme,
    "Faire valider par Ams la PRD V1 : `docs/PRD_V1.md`.",
    nextAction,
    warnings,
    "README CRM"
  );
  if (!readme.includes(decisionLine)) {
    readme = readme.replace(
      "- 2026-06-13 : PRD V1 redigee dans `docs/PRD_V1.md` et soumise a validation Ams.",
      `- 2026-06-13 : PRD V1 redigee dans \`docs/PRD_V1.md\` et soumise a validation Ams.\n${decisionLine}`
    );
  }
  await writeTextFile(readmeFile, readme);

  let nextSteps = await readTextFile(nextStepsFile);
  nextSteps = replaceText(
    nextSteps,
    "Faire valider par Ams la PRD V1 : `docs/PRD_V1.md`.",
    nextAction,
    warnings,
    "NEXT_STEPS CRM"
  );
  nextSteps = replaceText(
    nextSteps,
    "- Relire `docs/PRD_V1.md`.\n- Valider la PRD, ou lister les ajustements souhaites.\n- Produire un cahier de recette base sur la PRD validee.",
    "- Produire un cahier de recette base sur la PRD validee.\n- Définir les scénarios de recette prioritaires : élèves, classes, import Excel, export Excel, commentaires, statut de scolarité.",
    warnings,
    "Actions suivantes CRM"
  );
  nextSteps = replaceText(
    nextSteps,
    "- Validation finale de la PRD V1.",
    "- Cahier de recette V1 à produire après validation.",
    warnings,
    "Points à confirmer CRM"
  );
  await writeTextFile(nextStepsFile, nextSteps);

  let activeProjects = await readTextFile(activeProjectsFile);
  activeProjects = replaceText(
    activeProjects,
    "Prochaine action : Faire valider par Ams la PRD V1 : `docs/PRD_V1.md`.",
    `Prochaine action : ${nextAction}`,
    warnings,
    "Mémoire active CRM"
  );
  activeProjects = replaceText(
    activeProjects,
    "Le 2026-06-13, la PRD V1 est redigee dans `docs/PRD_V1.md` et soumise a validation Ams.",
    `Le 2026-06-13, la PRD V1 est redigee dans \`docs/PRD_V1.md\` et soumise a validation Ams. Le ${date}, Ams valide la PRD V1 ; prochaine étape : produire le cahier de recette V1.`,
    warnings,
    "Historique mémoire active CRM"
  );
  await writeTextFile(activeProjectsFile, activeProjects);

  let projectIndex = await readTextFile(projectIndexFile);
  projectIndex = replaceText(
    projectIndex,
    "1. Faire valider la PRD V1 de `Creation CRM pour une ecole`.",
    "1. Produire le cahier de recette V1 de `Creation CRM pour une ecole`.",
    warnings,
    "Priorité index"
  );
  projectIndex = replaceText(
    projectIndex,
    "faire valider par Ams la PRD V1 : `docs/PRD_V1.md`.",
    "produire le cahier de recette V1 à partir de la PRD validée.",
    warnings,
    "Prochaine action index"
  );
  projectIndex = replaceText(
    projectIndex,
    "La PRD V1 est redigee dans `docs/PRD_V1.md` et soumise a validation.",
    `La PRD V1 est redigee dans \`docs/PRD_V1.md\`, soumise a validation, puis validée par Ams le ${date}.`,
    warnings,
    "Dernière avancée index"
  );
  await writeTextFile(projectIndexFile, projectIndex);

  const decisionEntry = `\n## ${date} - CRM école - PRD V1 validée depuis le dashboard\n\n- Contexte : Ams veut faire avancer les projets depuis le dashboard sans passer par le terminal.\n- Décision : considérer la PRD V1 du projet CRM école comme validée depuis l'action guidée du dashboard.\n- Impact : la prochaine étape devient la production du cahier de recette V1.\n- Point de vigilance : conserver le dashboard comme cockpit de validation guidée, sans le transformer en éditeur complet de documentation.\n`;
  let decisions = await readTextFile(decisionsFile);
  if (!decisions.includes("CRM école - PRD V1 validée depuis le dashboard")) {
    decisions = `${decisions.trimEnd()}\n${decisionEntry}`;
    await writeTextFile(decisionsFile, decisions);
  }
}

function renderProjectReadme(project, extra = {}) {
  return `# ${project.name}

## Objectif

${markdownValue(project.objective)}

## Statut

${project.status}

## Prochaine action

${markdownValue(project.nextAction)}

## Perimetre V1

- A definir.

## Organisation

\`\`\`text
docs/
src/
data/
scripts/
tests/
reports/
archive/
\`\`\`

## Lancement ou utilisation

A definir.

## Decisions importantes

- ${new Date().toISOString().slice(0, 10)} : projet cree depuis le modele du dashboard amsClaw.

## Risques et points de vigilance

- Risque : perimetre trop large.
- Impact : ralentissement de l'execution.
- Mitigation : garder une V1 courte avec une prochaine action concrete.

## Notes

${markdownValue(extra.note, "Projet initialise automatiquement depuis le dashboard.")}
`;
}

function renderProjectBrief(project, extra = {}) {
  return `# Brief projet - ${project.name}

## Contexte

${markdownValue(extra.context, "A preciser.")}

## Probleme

${markdownValue(extra.problem, "A preciser.")}

## Cible

${markdownValue(extra.market, "A preciser.")}

## Proposition de valeur

A preciser.

## Hypothese principale

A preciser.

## Criteres de succes

- Une prochaine action claire est executee.
- Le besoin est valide avec un retour concret.

## Limites V1

- Ne pas elargir le perimetre avant validation du premier flux.
`;
}

function renderProjectNextSteps(project) {
  return `# Prochaines etapes - ${project.name}

## Prochaine action immediate

${markdownValue(project.nextAction)}

## Actions suivantes

- Cadrer le perimetre V1.
- Identifier le premier utilisateur ou cas de test.
- Produire un livrable simple.

## Points a confirmer avec Ams

- Priorite reelle du projet.
- Cible exacte.
- Critere de succes de la V1.

## Risques a surveiller

- Perimetre trop large.
- Donnees ou acces terrain insuffisants.
- Complexite technique inutile.
`;
}

function renderProjectChecklist(project) {
  return `# Checklist creation projet - ${project.name}

Objectif :
verifier que le projet est propre, redemarrable et visible dans le dashboard.

## Cadrage

- Objectif formule en une phrase.
- Statut initial defini.
- Prochaine action concrete identifiee.
- Responsable identifie.
- Priorite estimee.
- Perimetre V1 limite.

## Fichiers minimum

- \`README.md\` cree.
- \`docs/PROJECT_BRIEF.md\` cree.
- \`docs/NEXT_STEPS.md\` cree.
- \`docs/PROJECT_CHECKLIST.md\` cree.
- Dossiers standards presents : \`docs/\`, \`src/\`, \`data/\`, \`scripts/\`, \`tests/\`, \`reports/\`, \`archive/\`.

## Dashboard

- Projet present dans \`dashboard-data.json\`.
- Statut correct : \`${project.status}\`.
- Prochaine action visible : ${markdownValue(project.nextAction)}
- Score projet renseigne si le projet est prioritaire.
- Taches liees creees si une action agent est utile.

## Memoire durable

- Projet reference dans \`memory/active-projects.md\` si le projet doit rester suivi durablement.
- Decision structurante ajoutee dans \`memory/decisions.md\`.
- Blocage documente si le projet ne peut pas avancer.
- Rapport cree dans \`reports/\` pour une livraison ou validation importante.

## Controle final

\`\`\`sh
node amsclaw/projects/dashboard-multi-agent/scripts/audit-data-sync.js
\`\`\`

Resultat attendu :

- zero divergence projet ;
- zero prochaine action divergente ;
- zero statut divergent ;
- zero decision dashboard non journalisee.
`;
}

function extractQuotedText(value) {
  const text = String(value || "");
  const match = text.match(/"([^"]+)"/);
  if (match) return match[1];
  const frenchMatch = text.match(/«([^»]+)»/);
  return frenchMatch ? frenchMatch[1] : "";
}

function removeExecutionHistory(value) {
  return String(value || "")
    .split("\n")
    .filter((line) => !line.startsWith("Exécuté le "))
    .join("\n")
    .trim();
}

function cleanInstructionValue(value) {
  return String(value || "")
    .trim()
    .replace(/^["'«]+|["'»]+$/g, "")
    .trim();
}

function extractMarkdownContent(task) {
  const instruction = removeExecutionHistory(`${task.title || ""}\n${task.note || ""}`);
  const contentMatch = instruction.match(/(?:note|noté|noter|écris|ecris|écrit|ecrit)\s+(?:dedans|dans le fichier)\s*:\s*([\s\S]+)$/i);
  if (contentMatch) return cleanInstructionValue(contentMatch[1]);
  return cleanInstructionValue(extractQuotedText(instruction) || task.note || task.title);
}

function extractMarkdownBaseName(task) {
  const instruction = removeExecutionHistory(`${task.title || ""}\n${task.note || ""}`);
  const nameMatch = instruction.match(/(?:nommé|nomme|appelé|appele)\s+([^,.;\n]+?)(?:\s+et\s+|\s+avec\s+|\s+pour\s+|$)/i);
  if (nameMatch) return slugify(nameMatch[1]);
  return slugify(task.title);
}

function taskWantsDownloads(task) {
  const text = `${task.title || ""} ${task.note || ""}`.toLowerCase();
  return text.includes("téléchargement") || text.includes("telechargement") || text.includes("downloads");
}

function taskWantsMarkdownFile(task) {
  const text = `${task.title || ""} ${task.note || ""}`.toLowerCase();
  return text.includes(".md") || text.includes("markdown");
}

async function writeUniqueMarkdownFile(directory, baseName, content) {
  await fs.promises.mkdir(directory, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(directory, `${baseName}-${stamp}.md`);
  await fs.promises.writeFile(filePath, `${content.trim()}\n`, { encoding: "utf8", flag: "wx" });
  return filePath;
}

async function executeAgentTask(task, data) {
  if (!taskWantsMarkdownFile(task)) {
    return {
      ok: false,
      message: "Action non prise en charge pour l'instant. Je sais seulement créer une note Markdown."
    };
  }

  const content = extractMarkdownContent(task);
  const outputDir = taskWantsDownloads(task) ? downloadsDir : defaultAgentOutputDir;
  const filePath = await writeUniqueMarkdownFile(outputDir, extractMarkdownBaseName(task), content);
  const relativePath = filePath.startsWith(workspaceRoot)
    ? path.relative(workspaceRoot, filePath)
    : filePath;
  const executedAt = new Date().toISOString();
  const executionLine = `Exécuté le ${executedAt.slice(0, 16).replace("T", " ")} : fichier créé - ${relativePath}`;
  const executionEntry = {
    id: makeExecutionId(),
    at: executedAt,
    status: "success",
    action: "create_markdown_file",
    message: "Fichier Markdown créé",
    path: relativePath,
    verified: false,
    verifiedAt: ""
  };

  data.agentTasks = data.agentTasks.map((item) => {
    if (item.id !== task.id) return item;
    return {
      ...item,
      status: "done",
      note: [item.note, executionLine].filter(Boolean).join("\n"),
      executionLog: [...(Array.isArray(item.executionLog) ? item.executionLog : []), executionEntry]
    };
  });

  return {
    ok: true,
    message: `Fichier Markdown créé : ${relativePath}`,
    path: relativePath
  };
}

async function handleTaskExecutionVerification(req, res, taskId, executionId) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Méthode non autorisée" });
    return;
  }

  try {
    const data = normalizePayload(JSON.parse(await fs.promises.readFile(dataFile, "utf8")));
    const task = data.agentTasks.find((item) => item.id === taskId);
    if (!task) {
      sendJson(res, 404, { error: "Tâche introuvable" });
      return;
    }

    const execution = task.executionLog.find((entry) => entry.id === executionId);
    if (!execution) {
      sendJson(res, 404, { error: "Exécution introuvable" });
      return;
    }

    const verifiedAt = new Date().toISOString();
    data.agentTasks = data.agentTasks.map((item) => {
      if (item.id !== taskId) return item;
      return {
        ...item,
        executionLog: item.executionLog.map((entry) => (
          entry.id === executionId
            ? { ...entry, verified: true, verifiedAt }
            : entry
        ))
      };
    });
    data.metadata.updatedAt = verifiedAt.slice(0, 10);
    data.metadata.generatedBy = "dashboard-server.js";
    await writeDashboardData(data);
    sendJson(res, 200, {
      ok: true,
      message: "Exécution marquée comme vérifiée.",
      data
    });
  } catch (error) {
    sendJson(res, 400, { error: `Verification impossible: ${error.message}` });
  }
}

async function writeDashboardData(payload) {
  await fs.promises.mkdir(backupsDir, { recursive: true });
  try {
    const currentContent = await fs.promises.readFile(dataFile, "utf8");
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    await fs.promises.writeFile(path.join(backupsDir, `dashboard-data-${stamp}.json`), currentContent, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const nextContent = `${JSON.stringify(payload, null, 2)}\n`;
  const tempFile = `${dataFile}.tmp`;
  await fs.promises.writeFile(tempFile, nextContent, "utf8");
  await fs.promises.rename(tempFile, dataFile);
}

async function handleApi(req, res) {
  if (req.method === "GET") {
    try {
      const data = await fs.promises.readFile(dataFile, "utf8");
      send(res, 200, data, { "Content-Type": "application/json; charset=utf-8" });
    } catch (error) {
      sendJson(res, 500, { error: `Lecture impossible: ${error.message}` });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const payload = normalizePayload(JSON.parse(await readBody(req)));
      await writeDashboardData(payload);
      sendJson(res, 200, {
        ok: true,
        path: path.relative(workspaceRoot, dataFile),
        data: payload
      });
    } catch (error) {
      sendJson(res, 400, { error: `Ecriture impossible: ${error.message}` });
    }
    return;
  }

  sendJson(res, 405, { error: "Méthode non autorisée" });
}

async function createProjectFromTemplate(payload) {
  const name = cleanText(payload.name);
  const objective = cleanText(payload.objective);
  const nextAction = cleanText(payload.nextAction);
  const priority = cleanText(payload.priority, "Moyenne");
  const owner = cleanText(payload.owner, "amsClaw");
  const status = cleanText(payload.status, "actif").toLowerCase();
  const finalResult = cleanText(payload.finalResult);
  const closureDate = cleanText(payload.closureDate);
  const projectLog = cleanText(payload.projectLog);
  const lastUpdated = cleanText(payload.lastUpdated, new Date().toISOString().slice(0, 10));
  const priorityScore = payload.priorityScore && typeof payload.priorityScore === "object"
    ? payload.priorityScore
    : { speed: 3, motivation: 3, effortGain: 3, financial: 3 };
  const slug = slugifyProject(payload.slug || name);
  const dryRun = Boolean(payload.dryRun);

  if (!name || !objective || !nextAction || !priority || !owner) {
    const error = new Error("Champs obligatoires manquants");
    error.statusCode = 400;
    throw error;
  }

  if (!isSafeProjectSlug(slug)) {
    const error = new Error("Slug projet invalide");
    error.statusCode = 400;
    throw error;
  }

  const projectDir = path.resolve(projectsRoot, slug);
  if (!projectDir.startsWith(`${projectsRoot}${path.sep}`)) {
    const error = new Error("Chemin projet refuse");
    error.statusCode = 403;
    throw error;
  }

  try {
    await fs.promises.access(projectDir);
    const error = new Error("Un dossier projet existe deja pour ce slug");
    error.statusCode = 409;
    throw error;
  } catch (error) {
    if (error.statusCode) throw error;
    if (error.code !== "ENOENT") throw error;
  }

  const documentation = [
    `amsclaw/projects/${slug}/README.md`,
    `amsclaw/projects/${slug}/docs/PROJECT_BRIEF.md`,
    `amsclaw/projects/${slug}/docs/NEXT_STEPS.md`,
    `amsclaw/projects/${slug}/docs/PROJECT_CHECKLIST.md`
  ].join(", ");

  const project = {
    id: slug,
    name,
    status,
    objective,
    nextAction,
    actionStatus: "todo",
    priority,
    owner,
    documentation,
    finalResult,
    closureDate,
    projectLog,
    lastUpdated,
    priorityScore,
    blockers: []
  };

  const data = normalizePayload(JSON.parse(await fs.promises.readFile(dataFile, "utf8")));
  if (data.projects.some((item) => item.id === slug)) {
    const error = new Error("Un projet existe deja dans dashboard-data.json pour ce slug");
    error.statusCode = 409;
    throw error;
  }

  const directories = ["docs", "src", "data", "scripts", "tests", "reports", "archive"];
  const createdDirectories = [
    path.relative(workspaceRoot, projectDir),
    ...directories.map((directory) => path.relative(workspaceRoot, path.join(projectDir, directory)))
  ];
  const filePayloads = [
    ["README.md", renderProjectReadme(project, payload)],
    [path.join("docs", "PROJECT_BRIEF.md"), renderProjectBrief(project, payload)],
    [path.join("docs", "NEXT_STEPS.md"), renderProjectNextSteps(project)],
    [path.join("docs", "PROJECT_CHECKLIST.md"), renderProjectChecklist(project)]
  ];
  const createdFiles = filePayloads.map(([relativeFile]) => (
    path.relative(workspaceRoot, path.join(projectDir, relativeFile))
  ));

  if (dryRun) {
    return {
      dryRun: true,
      project,
      createdFiles,
      createdDirectories,
      data
    };
  }

  const tempProjectDir = path.resolve(projectsRoot, `.${slug}.tmp-${Date.now()}`);

  try {
    await fs.promises.mkdir(tempProjectDir, { recursive: false });

    for (const directory of directories) {
      const directoryPath = path.join(tempProjectDir, directory);
      await fs.promises.mkdir(directoryPath, { recursive: false });
    }

    for (const [relativeFile, content] of filePayloads) {
      const filePath = path.join(tempProjectDir, relativeFile);
      await fs.promises.writeFile(filePath, `${content.trim()}\n`, { encoding: "utf8", flag: "wx" });
    }

    await fs.promises.rename(tempProjectDir, projectDir);
  } catch (error) {
    await fs.promises.rm(tempProjectDir, { recursive: true, force: true }).catch(() => {});
    throw error;
  }

  data.projects.push(project);
  data.metadata.updatedAt = new Date().toISOString().slice(0, 10);
  data.metadata.generatedBy = "dashboard-server.js";
  await writeDashboardData(data);

  return {
    project,
    createdFiles,
    createdDirectories,
    data
  };
}

async function handleProjectTemplateCreation(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Méthode non autorisée" });
    return;
  }

  try {
    const payload = JSON.parse(await readBody(req));
    const result = await createProjectFromTemplate(payload);
    sendJson(res, result.dryRun ? 200 : 201, {
      ok: true,
      message: result.dryRun ? "Simulation de création validée." : "Projet créé depuis le modèle.",
      ...result
    });
  } catch (error) {
    sendJson(res, error.statusCode || 400, { error: `Creation impossible: ${error.message}` });
  }
}

async function handleProjectGuidedAction(req, res, projectId, actionId) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Méthode non autorisée" });
    return;
  }

  try {
    if (projectId !== "creation-crm-pour-une-ecole" || actionId !== "validate-prd") {
      sendJson(res, 404, { error: "Action guidée introuvable" });
      return;
    }

    const data = normalizePayload(JSON.parse(await fs.promises.readFile(dataFile, "utf8")));
    const project = data.projects.find((item) => item.id === projectId);
    if (!project) {
      sendJson(res, 404, { error: "Projet introuvable" });
      return;
    }

    const date = new Date().toISOString().slice(0, 10);
    const nextAction = "Produire le cahier de recette V1 à partir de la PRD validée.";
    const projectLogLine = `${date} : PRD V1 validée par Ams depuis le dashboard ; prochaine étape : cahier de recette V1.`;
    project.nextAction = nextAction;
    project.actionStatus = "todo";
    project.lastUpdated = date;
    project.projectLog = appendUniqueLine(project.projectLog, projectLogLine);

    if (!data.decisions.some((item) => item.id === "decision-crm-prd-v1-validee")) {
      data.decisions.push({
        id: "decision-crm-prd-v1-validee",
        date,
        projectId,
        title: "PRD V1 validée",
        decision: "La PRD V1 du CRM école est validée par Ams.",
        rationale: "La PRD reprend l'expression de besoin validée et le dernier ajustement import/export Excel.",
        impact: "Le projet passe à la production du cahier de recette V1."
      });
    }

    data.activityLog = [
      {
        id: `activity-${Date.now()}`,
        date: new Date().toISOString(),
        type: "guided-action",
        summary: "PRD V1 validée depuis le dashboard",
        detail: nextAction,
        projectId
      },
      ...(Array.isArray(data.activityLog) ? data.activityLog : [])
    ].slice(0, 80);
    data.metadata.updatedAt = date;
    data.metadata.generatedBy = "dashboard-server.js";

    const warnings = [];
    await updateCrmPrdValidationMarkdown(warnings);
    await writeDashboardData(data);
    sendJson(res, 200, {
      ok: true,
      message: warnings.length
        ? "PRD validée, avec points Markdown à vérifier."
        : "PRD validée et suivi projet mis à jour.",
      warnings,
      data
    });
  } catch (error) {
    sendJson(res, 400, { error: `Action guidée impossible: ${error.message}` });
  }
}

async function handleTaskExecution(req, res, taskId) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Méthode non autorisée" });
    return;
  }

  try {
    const data = normalizePayload(JSON.parse(await fs.promises.readFile(dataFile, "utf8")));
    const task = data.agentTasks.find((item) => item.id === taskId);
    if (!task) {
      sendJson(res, 404, { error: "Tâche introuvable" });
      return;
    }

    const result = await executeAgentTask(task, data);
    if (!result.ok) {
      sendJson(res, 422, result);
      return;
    }

    data.metadata.updatedAt = new Date().toISOString().slice(0, 10);
    data.metadata.generatedBy = "dashboard-server.js";
    await writeDashboardData(data);
    sendJson(res, 200, {
      ...result,
      data
    });
  } catch (error) {
    sendJson(res, 400, { error: `Execution impossible: ${error.message}` });
  }
}

function staticFilePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath === "/" ? "/amsclaw/dashboard/" : urlPath);
  const requestedPath = path.resolve(workspaceRoot, `.${decodedPath}`);
  if (!requestedPath.startsWith(workspaceRoot)) return null;
  return requestedPath;
}

async function handleStatic(req, res, urlPath) {
  const requestedPath = staticFilePath(urlPath);
  if (!requestedPath) {
    send(res, 403, "Acces refuse", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  try {
    const stat = await fs.promises.stat(requestedPath);
    const filePath = stat.isDirectory() ? path.join(requestedPath, "index.html") : requestedPath;
    const ext = path.extname(filePath);
    const data = await fs.promises.readFile(filePath);
    send(res, 200, data, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
  } catch {
    send(res, 404, "Fichier introuvable", { "Content-Type": "text/plain; charset=utf-8" });
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (url.pathname === "/api/dashboard-data") {
    await handleApi(req, res);
    return;
  }

  if (url.pathname === "/api/projects/create-from-template") {
    await handleProjectTemplateCreation(req, res);
    return;
  }

  const guidedActionMatch = url.pathname.match(/^\/api\/projects\/([^/]+)\/guided-actions\/([^/]+)$/);
  if (guidedActionMatch) {
    await handleProjectGuidedAction(
      req,
      res,
      decodeURIComponent(guidedActionMatch[1]),
      decodeURIComponent(guidedActionMatch[2])
    );
    return;
  }

  const taskExecutionMatch = url.pathname.match(/^\/api\/agent-tasks\/([^/]+)\/execute$/);
  if (taskExecutionMatch) {
    await handleTaskExecution(req, res, decodeURIComponent(taskExecutionMatch[1]));
    return;
  }

  const taskExecutionVerificationMatch = url.pathname.match(/^\/api\/agent-tasks\/([^/]+)\/executions\/([^/]+)\/verify$/);
  if (taskExecutionVerificationMatch) {
    await handleTaskExecutionVerification(
      req,
      res,
      decodeURIComponent(taskExecutionVerificationMatch[1]),
      decodeURIComponent(taskExecutionVerificationMatch[2])
    );
    return;
  }

  await handleStatic(req, res, url.pathname);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Dashboard amsClaw: http://localhost:${port}/amsclaw/dashboard/`);
  console.log("Pour arreter le serveur : Ctrl+C");
});
