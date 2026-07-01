#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { hasBlockingDivergence, runAudit } = require("./audit-data-sync");

const workspaceRoot = path.resolve(__dirname, "../../..", "..");
const memoryFile = path.join(workspaceRoot, "memory", "active-projects.md");
const dataFile = path.join(__dirname, "..", "data", "dashboard-data.json");
const backupsDir = path.join(__dirname, "..", "data", "backups");

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "projet";
}

function cleanInlineMarkdown(value) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .trim();
}

function readCurrentData() {
  if (!fs.existsSync(dataFile)) {
    return {
      metadata: {},
      projects: [],
      ideas: [],
      agentTasks: [],
      routines: {},
      completedRoutines: {}
    };
  }

  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function createBackup() {
  if (!fs.existsSync(dataFile)) return "";

  fs.mkdirSync(backupsDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(backupsDir, `dashboard-data-${timestamp}-pre-sync.json`);
  fs.copyFileSync(dataFile, backupPath);
  return backupPath;
}

function parseActiveProjects(markdown) {
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

    const blockers = field("Points de blocage");
    const status = field("Statut") || "Actif";

    projects.push({
      id: slugify(field("ID") || name),
      name,
      status: blockers && !/^aucun/i.test(blockers) ? "bloqué" : status.toLowerCase(),
      objective: field("Objectif") || "Objectif à préciser.",
      nextAction: field("Prochaine action") || "Définir la prochaine action.",
      priority: field("Priorité") || "Moyenne",
      owner: field("Responsable") || "amsClaw",
      documentation: field("Documentation"),
      blockers: blockers && !/^aucun/i.test(blockers) ? [blockers] : []
    });
  }

  return projects;
}

function mergeProjects(existingProjects, generatedProjects) {
  const generatedById = new Map(generatedProjects.map((project) => [project.id, project]));
  const generatedByName = new Map(generatedProjects.map((project) => [cleanInlineMarkdown(project.name).toLowerCase(), project]));
  const merged = existingProjects.map((project) => {
    const generatedProject = generatedById.get(project.id)
      || generatedByName.get(cleanInlineMarkdown(project.name || "").toLowerCase());
    if (!generatedProject) return project;
    return {
      ...generatedProject,
      actionStatus: project.actionStatus || "todo",
      finalResult: project.finalResult || "",
      closureDate: project.closureDate || "",
      projectLog: project.projectLog || "",
      lastUpdated: project.lastUpdated || "",
      priorityScore: project.priorityScore || { speed: 3, motivation: 3, effortGain: 3, financial: 3 },
      blockers: generatedProject.blockers.length ? generatedProject.blockers : (project.blockers || [])
    };
  });
  const existingIds = new Set(merged.map((project) => project.id));

  for (const project of generatedProjects) {
    if (!existingIds.has(project.id)) {
      merged.push({
        ...project,
        actionStatus: "todo",
        finalResult: "",
        closureDate: "",
        projectLog: "",
        lastUpdated: new Date().toISOString().slice(0, 10),
        priorityScore: { speed: 3, motivation: 3, effortGain: 3, financial: 3 }
      });
    }
  }

  return merged;
}

function main() {
  const applyReviewedDivergences = process.argv.includes("--apply-reviewed-divergences");
  const audit = runAudit();
  const hasStructuralDivergence = audit.summary.onlyInJson > 0
    || audit.summary.onlyInMemory > 0
    || audit.summary.missingDecisionJournal > 0;

  if (hasStructuralDivergence || (hasBlockingDivergence(audit.summary) && !applyReviewedDivergences)) {
    console.error("Synchronisation annulee : l'audit JSON / Markdown signale des divergences.");
    console.error(`Rapport a traiter : ${path.relative(workspaceRoot, audit.reportPath)}`);
    console.error("Relance la synchronisation apres arbitrage des ecarts.");
    if (!hasStructuralDivergence) {
      console.error("Option apres arbitrage : --apply-reviewed-divergences");
    }
    process.exitCode = 1;
    return;
  }

  const currentData = readCurrentData();
  const markdown = fs.readFileSync(memoryFile, "utf8");
  const generatedProjects = parseActiveProjects(markdown);

  const nextData = {
    ...currentData,
    metadata: {
      ...(currentData.metadata || {}),
      version: "1.6",
      updatedAt: new Date().toISOString().slice(0, 10),
      source: "memory/active-projects.md + amsclaw/projects/dashboard-multi-agent/data/dashboard-data.json",
      generatedBy: "scripts/sync-dashboard-data.js"
    },
    projects: mergeProjects(currentData.projects || [], generatedProjects)
  };

  const backupPath = createBackup();
  fs.writeFileSync(dataFile, `${JSON.stringify(nextData, null, 2)}\n`, "utf8");

  console.log(`Dashboard data synchronise: ${generatedProjects.length} projet(s) lu(s) depuis memory/active-projects.md.`);
  console.log(`Fichier mis a jour: ${path.relative(workspaceRoot, dataFile)}`);
  console.log(`Audit prealable OK: ${path.relative(workspaceRoot, audit.reportPath)}`);
  if (applyReviewedDivergences) {
    console.log("Divergences de champs appliquees apres arbitrage explicite.");
  }
  if (backupPath) {
    console.log(`Sauvegarde pre-ecriture: ${path.relative(workspaceRoot, backupPath)}`);
  }
}

main();
