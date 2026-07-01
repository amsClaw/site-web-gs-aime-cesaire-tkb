#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "../../..", "..");
const projectRoot = path.resolve(__dirname, "..");
const dataFile = path.join(projectRoot, "data", "dashboard-data.json");
const activeProjectsFile = path.join(workspaceRoot, "memory", "active-projects.md");
const decisionsFile = path.join(workspaceRoot, "memory", "decisions.md");
const reportsDir = path.join(projectRoot, "reports");

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "projet";
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanInlineMarkdown(value) {
  return String(value || "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .trim();
}

function getParisDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const valueByType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${valueByType.year}-${valueByType.month}-${valueByType.day}`;
}

function parseProjectMemory(markdown) {
  const sections = markdown.split(/\n(?=### )/g);
  const projects = [];

  for (const section of sections) {
    const titleMatch = section.match(/^###\s+(.+)$/m);
    if (!titleMatch) continue;

    const name = titleMatch[1].trim();
    if (name.toLowerCase() === "nom du projet") continue;

    const field = (label) => {
      const match = section.match(new RegExp(`^${label}\\s*:\\s*(.*)$`, "mi"));
      return match ? cleanInlineMarkdown(match[1]) : "";
    };

    projects.push({
      id: slugify(field("ID") || name),
      name,
      status: field("Statut"),
      objective: field("Objectif"),
      nextAction: field("Prochaine action"),
      priority: field("Priorité"),
      owner: field("Responsable"),
      documentation: field("Documentation"),
      blockers: field("Points de blocage")
    });
  }

  return projects;
}

function bulletList(items, emptyText) {
  if (!items.length) return `- ${emptyText}`;
  return items.map((item) => `- ${item}`).join("\n");
}

function formatProject(project) {
  return `\`${project.id}\` - ${project.name}`;
}

function runAudit() {
  const dashboardData = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  const activeProjectsMarkdown = fs.readFileSync(activeProjectsFile, "utf8");
  const decisionsMarkdown = fs.existsSync(decisionsFile) ? fs.readFileSync(decisionsFile, "utf8") : "";

  const jsonProjects = Array.isArray(dashboardData.projects) ? dashboardData.projects : [];
  const memoryProjects = parseProjectMemory(activeProjectsMarkdown);

  const jsonById = new Map(jsonProjects.map((project) => [project.id || slugify(project.name), project]));
  const memoryById = new Map(memoryProjects.map((project) => [project.id, project]));

  const onlyInJson = jsonProjects.filter((project) => !memoryById.has(project.id || slugify(project.name)));
  const onlyInMemory = memoryProjects.filter((project) => !jsonById.has(project.id));
  const sharedIds = [...jsonById.keys()].filter((id) => memoryById.has(id));

  const divergentNextActions = [];
  const divergentStatuses = [];

  for (const id of sharedIds) {
    const jsonProject = jsonById.get(id);
    const memoryProject = memoryById.get(id);

    if (normalize(jsonProject.nextAction) !== normalize(memoryProject.nextAction)) {
      divergentNextActions.push({
        id,
        name: jsonProject.name || memoryProject.name,
        json: jsonProject.nextAction || "",
        markdown: memoryProject.nextAction || ""
      });
    }

    if (normalize(jsonProject.status) !== normalize(memoryProject.status)) {
      divergentStatuses.push({
        id,
        name: jsonProject.name || memoryProject.name,
        json: jsonProject.status || "",
        markdown: memoryProject.status || ""
      });
    }
  }

  const dashboardDecisions = Array.isArray(dashboardData.decisions) ? dashboardData.decisions : [];
  const missingDecisionJournal = dashboardDecisions.filter((decision) => {
    const title = normalize(decision.title);
    const text = normalize(decision.decision);
    const durable = normalize(decisionsMarkdown);
    return title && !durable.includes(title) && text && !durable.includes(text.slice(0, 80));
  });

  const reportDate = getParisDateString();
  const reportPath = path.join(reportsDir, `audit-data-sync-${reportDate}.md`);
  fs.mkdirSync(reportsDir, { recursive: true });

  const report = `# Audit synchronisation JSON / Markdown

Date : ${reportDate}

Objectif :
identifier les divergences entre la source operationnelle \`dashboard-data.json\` et la memoire durable Markdown sans modifier les donnees.

## Sources lues

- \`${path.relative(workspaceRoot, dataFile)}\`
- \`${path.relative(workspaceRoot, activeProjectsFile)}\`
- \`${path.relative(workspaceRoot, decisionsFile)}\`

## Synthese

- Projets dans le JSON : ${jsonProjects.length}
- Projets dans la memoire Markdown : ${memoryProjects.length}
- Projets seulement dans le JSON : ${onlyInJson.length}
- Projets seulement dans la memoire Markdown : ${onlyInMemory.length}
- Prochaines actions divergentes : ${divergentNextActions.length}
- Statuts divergents : ${divergentStatuses.length}
- Decisions dashboard non retrouvees dans \`memory/decisions.md\` : ${missingDecisionJournal.length}

## Projets seulement dans le JSON

${bulletList(onlyInJson.map(formatProject), "Aucun")}

## Projets seulement dans la memoire Markdown

${bulletList(onlyInMemory.map(formatProject), "Aucun")}

## Prochaines actions divergentes

${divergentNextActions.length ? divergentNextActions.map((item) => `### ${item.name}

- ID : \`${item.id}\`
- JSON : ${item.json || "Non renseigne"}
- Markdown : ${item.markdown || "Non renseigne"}`).join("\n\n") : "- Aucune"}

## Statuts divergents

${divergentStatuses.length ? divergentStatuses.map((item) => `### ${item.name}

- ID : \`${item.id}\`
- JSON : ${item.json || "Non renseigne"}
- Markdown : ${item.markdown || "Non renseigne"}`).join("\n\n") : "- Aucun"}

## Decisions dashboard non journalisees durablement

${missingDecisionJournal.length ? missingDecisionJournal.map((decision) => `- ${decision.date || "Sans date"} - ${decision.title || decision.decision}`).join("\n") : "- Aucune"}

## Recommandation

Ne pas lancer de synchronisation automatique tant que les ecarts ci-dessus n'ont pas ete arbitres.
`;

  fs.writeFileSync(reportPath, report, "utf8");

  return {
    reportPath,
    summary: {
      onlyInJson: onlyInJson.length,
      onlyInMemory: onlyInMemory.length,
      divergentNextActions: divergentNextActions.length,
      divergentStatuses: divergentStatuses.length,
      missingDecisionJournal: missingDecisionJournal.length
    }
  };
}

function hasBlockingDivergence(summary) {
  return summary.onlyInJson > 0
    || summary.onlyInMemory > 0
    || summary.divergentNextActions > 0
    || summary.divergentStatuses > 0
    || summary.missingDecisionJournal > 0;
}

function main() {
  const result = runAudit();
  const { summary } = result;

  console.log(`Rapport cree : ${path.relative(workspaceRoot, result.reportPath)}`);
  console.log(`Projets seulement JSON : ${summary.onlyInJson}`);
  console.log(`Projets seulement Markdown : ${summary.onlyInMemory}`);
  console.log(`Prochaines actions divergentes : ${summary.divergentNextActions}`);
  console.log(`Statuts divergents : ${summary.divergentStatuses}`);
  console.log(`Decisions dashboard non journalisees : ${summary.missingDecisionJournal}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  getParisDateString,
  hasBlockingDivergence,
  runAudit
};
