const DATA_SOURCE = "/api/dashboard-data";
const FALLBACK_DATA_SOURCE = "../projects/dashboard-multi-agent/data/dashboard-data.json";

let defaultState = {
  metadata: {
    name: "Fallback local",
    version: "1.2",
    source: "app.js"
  },
  projects: [
    {
      id: "dashboard",
      name: "Dashboard multi-agents",
      status: "actif",
      objective: "Créer un cockpit local pour suivre projets, idées, routines et blocages.",
      nextAction: "Tester la V1 et choisir les données à brancher en premier.",
      actionStatus: "todo",
      priority: "Haute",
      owner: "Agent Organisation & PMO",
      documentation: "amsclaw/dashboard/README.md",
      blockers: []
    },
    {
      id: "ecosystem",
      name: "Écosystème OpenClaw",
      status: "actif",
      objective: "Structurer les fichiers, routines et agents autour d'un système durable.",
      nextAction: "Stabiliser les conventions de classement.",
      actionStatus: "todo",
      priority: "Moyenne",
      owner: "amsClaw",
      documentation: "amsclaw/PROJECTS_GUIDE.md",
      blockers: []
    },
    {
      id: "data-sync",
      name: "Synchronisation mémoire",
      status: "bloqué",
      objective: "Relier le dashboard aux fichiers Markdown du workspace.",
      nextAction: "Choisir entre lecture locale, génération statique ou mini API.",
      actionStatus: "todo",
      priority: "Haute",
      owner: "Agent Technique & Automatisation",
      documentation: "amsclaw/projects/dashboard-multi-agent/docs/NEXT_STEPS.md",
      blockers: ["Décision technique à prendre"]
    }
  ],
  ideas: [
    {
      id: "school-admin",
      name: "Gestion scolaire légère",
      market: "Écoles privées, Guinée",
      problem: "Inscriptions, paiements et suivis restent souvent dispersés entre papier et Excel.",
      speed: 4,
      motivation: 4,
      effortGain: 3,
      financial: 4
    },
    {
      id: "pme-docs",
      name: "Assistant documents PME",
      market: "PME Afrique francophone",
      problem: "Les petites structures perdent du temps sur devis, factures et relances.",
      speed: 5,
      motivation: 4,
      effortGain: 4,
      financial: 3
    }
  ],
  agentTasks: [
    {
      id: "task-dashboard-next-step",
      title: "Prioriser la prochaine évolution du dashboard",
      owner: "Agent Organisation & PMO",
      linkedItem: "project:dashboard",
      priority: "Haute",
      status: "todo",
      note: "Choisir entre tâches agents, blocages renforcés ou création de projet depuis modèle."
    }
  ],
  backlogItems: [
    {
      id: "backlog-dashboard-roadmap",
      title: "Tenir une roadmap dashboard visible",
      category: "Pilotage",
      priority: "Haute",
      status: "todo",
      nextAction: "Valider les prochaines évolutions avant de coder.",
      notes: ""
    }
  ],
  decisions: [
    {
      id: "decision-dashboard-guided-roadmap",
      date: todayIsoDate(),
      projectId: "dashboard",
      title: "Avancer avec une trajectoire visible",
      decision: "Toutes les évolutions dashboard doivent être listées, testées et documentées.",
      rationale: "Ams ne veut pas avancer à l'aveugle.",
      impact: "Le dashboard doit intégrer backlog, décisions, tests et guide utilisateur."
    }
  ],
  activityLog: [],
  routines: {
    Quotidien: [
      "Générer le rapport du matin",
      "Vérifier les projets bloqués",
      "Produire la veille IA",
      "Vérifier les tâches prioritaires"
    ],
    Hebdomadaire: [
      "Réviser les priorités",
      "Détecter de nouvelles opportunités business",
      "Vérifier l'avancement des projets"
    ],
    Mensuel: [
      "Identifier les projets abandonnés",
      "Vérifier la qualité de la documentation",
      "Archiver les projets terminés",
      "Proposer des optimisations de l'écosystème OpenClaw"
    ]
  },
  completedRoutines: {}
};

const agents = [
  {
    name: "Produit & Communication",
    role: "Validation, business model, positionnement, monétisation, rédaction."
  },
  {
    name: "Technique & Automatisation",
    role: "Architecture, développement, SQL, VBA, scripts, déploiement."
  },
  {
    name: "Organisation & PMO",
    role: "Priorisation, planning, dashboard, suivi d'avancement."
  },
  {
    name: "Recherche & Veille",
    role: "Veille IA, marché, concurrence et opportunités."
  }
];

let state = structuredClone(defaultState);
let projectFilter = "all";
let projectSearch = "";
let globalSearch = "";
let agentTaskFilter = "all";
let editingProjectId = null;
let editingIdeaId = null;
let editingAgentTaskId = null;
let editingBacklogItemId = null;
let editingDecisionId = null;

async function loadDefaultState() {
  try {
    const response = await fetch(DATA_SOURCE, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return normalizeState(await response.json());
  } catch (error) {
    console.warn("API de données indisponible, tentative de lecture directe du JSON.", error);
    try {
      const response = await fetch(FALLBACK_DATA_SOURCE, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return normalizeState(await response.json());
    } catch (fallbackError) {
      console.warn("Source de données indisponible, fallback local utilisé.", fallbackError);
      return structuredClone(defaultState);
    }
  }
}

function normalizeState(data) {
  return {
    metadata: data.metadata || {},
    projects: Array.isArray(data.projects) ? data.projects.map((project) => ({
      id: project.id || crypto.randomUUID(),
      name: project.name || "Projet sans nom",
      status: normalizeProjectStatus(project.status),
      objective: project.objective || "Objectif à préciser.",
      nextAction: project.nextAction || "Définir la prochaine action.",
      actionStatus: normalizeActionStatus(project.actionStatus),
      priority: project.priority || "Moyenne",
      owner: project.owner || "amsClaw",
      documentation: project.documentation || "",
      finalResult: project.finalResult || "",
      closureDate: project.closureDate || "",
      projectLog: project.projectLog || "",
      lastUpdated: project.lastUpdated || "",
      priorityScore: normalizePriorityScore(project.priorityScore),
      blockers: Array.isArray(project.blockers) ? project.blockers : []
    })) : [],
    ideas: Array.isArray(data.ideas) ? data.ideas.map((idea) => ({
      id: idea.id || crypto.randomUUID(),
      name: idea.name || "Idée sans nom",
      market: idea.market || "Marché à préciser",
      problem: idea.problem || "Problème à préciser",
      speed: Number(idea.speed || 1),
      motivation: Number(idea.motivation || 1),
      effortGain: Number(idea.effortGain || 1),
      financial: Number(idea.financial || 1)
    })) : [],
    agentTasks: Array.isArray(data.agentTasks) ? data.agentTasks.map((task) => ({
      id: task.id || crypto.randomUUID(),
      title: task.title || "Tâche sans titre",
      owner: task.owner || "amsClaw",
      linkedItem: task.linkedItem || "",
      priority: task.priority || "Moyenne",
      status: normalizeActionStatus(task.status),
      dueDate: task.dueDate || "",
      note: task.note || "",
      executionLog: normalizeExecutionLog(task.executionLog)
    })) : [],
    backlogItems: Array.isArray(data.backlogItems) ? data.backlogItems.map((item) => ({
      id: item.id || crypto.randomUUID(),
      title: item.title || "Item sans titre",
      category: item.category || "Général",
      priority: item.priority || "Moyenne",
      status: normalizeBacklogStatus(item.status),
      nextAction: item.nextAction || "",
      notes: item.notes || ""
    })) : [],
    decisions: Array.isArray(data.decisions) ? data.decisions.map((item) => ({
      id: item.id || crypto.randomUUID(),
      date: item.date || todayIsoDate(),
      projectId: item.projectId || "",
      title: item.title || "Décision sans titre",
      decision: item.decision || "",
      rationale: item.rationale || "",
      impact: item.impact || ""
    })) : [],
    activityLog: Array.isArray(data.activityLog) ? data.activityLog.map((item) => ({
      id: item.id || crypto.randomUUID(),
      date: item.date || todayIsoDate(),
      type: item.type || "info",
      summary: item.summary || "",
      projectId: item.projectId || "",
      detail: item.detail || ""
    })) : [],
    routines: data.routines && typeof data.routines === "object" ? data.routines : {},
    completedRoutines: data.completedRoutines && typeof data.completedRoutines === "object" ? data.completedRoutines : {}
  };
}

async function saveState() {
  try {
    const response = await fetch(DATA_SOURCE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    if (result.data) {
      state = normalizeState(result.data);
      defaultState = structuredClone(state);
    }
    return true;
  } catch (error) {
    console.error("Sauvegarde impossible dans dashboard-data.json.", error);
    toast("Sauvegarde fichier impossible. Relance avec le script du projet.");
    return false;
  }
}

function slugifyProjectName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

async function createProjectFromTemplate(projectPayload) {
  const response = await fetch("/api/projects/create-from-template", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...projectPayload,
      owner: "amsClaw"
    })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || result.message || `HTTP ${response.status}`);
  if (result.data) {
    state = normalizeState(result.data);
    defaultState = structuredClone(state);
  }
  return result;
}

function scoreIdea(idea) {
  return Number(idea.speed) + Number(idea.motivation) + Number(idea.effortGain) + Number(idea.financial);
}

function statusLabel(project) {
  if ((project.blockers || []).length > 0 || project.status === "bloqué") return "Bloqué";
  return {
    actif: "Actif",
    pause: "En pause",
    bloqué: "Bloqué",
    clôturé: "Clôturé"
  }[normalizeProjectStatus(project.status)];
}

function projectStatusClass(project) {
  if ((project.blockers || []).length > 0 || project.status === "bloqué") return "blocked";
  return {
    actif: "active",
    pause: "paused",
    bloqué: "blocked",
    clôturé: "closed"
  }[normalizeProjectStatus(project.status)];
}

function priorityClass(priority) {
  const value = (priority || "").toLowerCase();
  if (value === "haute") return "high";
  if (value === "moyenne") return "medium";
  return "low";
}

function normalizeActionStatus(status) {
  return ["todo", "doing", "done"].includes(status) ? status : "todo";
}

function normalizeBacklogStatus(status) {
  return ["todo", "doing", "done", "rejected"].includes(status) ? status : "todo";
}

function normalizeProjectStatus(status) {
  const value = String(status || "").toLowerCase();
  if (["pause", "en pause"].includes(value)) return "pause";
  if (["bloqué", "bloque"].includes(value)) return "bloqué";
  if (["clôturé", "cloture", "terminé", "termine", "done"].includes(value)) return "clôturé";
  return "actif";
}

function normalizePriorityScore(score) {
  const source = score && typeof score === "object" ? score : {};
  return {
    speed: Math.min(5, Math.max(1, Number(source.speed || 3))),
    motivation: Math.min(5, Math.max(1, Number(source.motivation || 3))),
    effortGain: Math.min(5, Math.max(1, Number(source.effortGain || 3))),
    financial: Math.min(5, Math.max(1, Number(source.financial || 3)))
  };
}

function scoreProject(project) {
  const score = normalizePriorityScore(project.priorityScore);
  return score.speed + score.motivation + score.effortGain + score.financial;
}

function priorityScoreLabel(project) {
  const score = scoreProject(project);
  if (score >= 16) return "Très prioritaire";
  if (score >= 12) return "Prioritaire";
  if (score >= 8) return "À cadrer";
  return "Faible priorité";
}

function isClosedProject(project) {
  return normalizeProjectStatus(project.status) === "clôturé";
}

function isBlockedProject(project) {
  return normalizeProjectStatus(project.status) === "bloqué" || (project.blockers || []).length > 0;
}

function isMissingNextAction(project) {
  const value = String(project.nextAction || "").trim().toLowerCase();
  return !value || [
    "définir la prochaine action.",
    "definir la prochaine action.",
    "à préciser",
    "a préciser",
    "n/a",
    "-"
  ].includes(value);
}

function getProjectGuidedActions(project) {
  const nextAction = String(project.nextAction || "").toLowerCase();
  const actions = [];
  if (
    project.id === "creation-crm-pour-une-ecole"
    && nextAction.includes("prd")
    && nextAction.includes("valid")
  ) {
    actions.push({
      id: "validate-prd",
      label: "Valider la PRD",
      description: "Marque la PRD V1 comme validée et prépare le cahier de recette."
    });
  }
  return actions;
}

function renderProjectGuidedActions(project) {
  const actions = getProjectGuidedActions(project);
  if (!actions.length) return "";
  return `
    <div class="guided-actions">
      <p><strong>Action guidée</strong></p>
      ${actions.map((action) => `
        <button class="primary-button" type="button" data-project-action="${action.id}" data-project-id="${project.id}">
          ${action.label}
        </button>
        <p>${action.description}</p>
      `).join("")}
    </div>
  `;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function daysSince(value) {
  if (!value) return Infinity;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return Infinity;
  const today = new Date(todayIsoDate());
  return Math.floor((today - date) / 86400000);
}

function isDormantProject(project) {
  return !isClosedProject(project) && daysSince(project.lastUpdated) >= 14;
}

function formatProjectDate(value) {
  if (!value) return "Non renseignée";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function backlogStatusLabel(status) {
  return {
    todo: "À faire",
    doing: "En cours",
    done: "Fait",
    rejected: "Écarté"
  }[normalizeBacklogStatus(status)];
}

function projectName(projectId) {
  return state.projects.find((project) => project.id === projectId)?.name || "Sans projet";
}

function addActivity(type, summary, detail = "", projectId = "") {
  state.activityLog = [
    {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type,
      summary,
      detail,
      projectId
    },
    ...(Array.isArray(state.activityLog) ? state.activityLog : [])
  ].slice(0, 80);
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

function actionStatusLabel(status) {
  return {
    todo: "À faire",
    doing: "En cours",
    done: "Fait"
  }[normalizeActionStatus(status)];
}

function formatExecutionDate(value) {
  if (!value) return "Date inconnue";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function extractLegacyExecutionLog(task) {
  return String(task.note || "")
    .split("\n")
    .filter((line) => line.startsWith("Exécuté le "))
    .map((line, index) => ({
      id: `legacy-${index}`,
      at: "",
      status: "success",
      action: "legacy_note",
      message: line.replace(/^Exécuté le\s+/, ""),
      verified: false,
      verifiedAt: ""
    }));
}

function getTaskExecutionLog(task) {
  const structuredLog = Array.isArray(task.executionLog) ? task.executionLog : [];
  return structuredLog.length ? structuredLog : extractLegacyExecutionLog(task);
}

function hasUnverifiedExecution(task) {
  return getTaskExecutionLog(task).some((entry) => entry.id && !entry.id.startsWith("legacy-") && !entry.verified);
}

function countUnverifiedExecutions(tasks = state.agentTasks) {
  return tasks.reduce((count, task) => (
    count + getTaskExecutionLog(task).filter((entry) => entry.id && !entry.id.startsWith("legacy-") && !entry.verified).length
  ), 0);
}

function pathToDashboardHref(value) {
  const filePath = String(value || "").trim();
  if (!filePath || filePath.startsWith("/") || filePath.includes("..")) return "";
  return `/${filePath.split("/").map((part) => encodeURIComponent(part)).join("/")}`;
}

function renderTaskExecutionLog(task) {
  const log = getTaskExecutionLog(task);
  if (!log.length) return "";

  return `
    <div class="execution-log" aria-label="Historique d'exécution">
      <strong>Historique</strong>
      ${log.slice().reverse().map((entry) => `
        <div class="execution-log-item">
          <span class="status-pill">${entry.status === "success" ? "OK" : "Info"}</span>
          <p>
            <span>${entry.at ? formatExecutionDate(entry.at) : "Ancienne trace"}</span>
            ${entry.verified ? ` - Vérifiée le ${formatExecutionDate(entry.verifiedAt)}` : ""}
            ${entry.message ? ` - ${entry.message}` : ""}
            ${entry.path ? ` - ${entry.path}` : ""}
          </p>
          ${pathToDashboardHref(entry.path) ? `
            <a class="secondary-button execution-log-link" href="${pathToDashboardHref(entry.path)}" target="_blank" rel="noopener">Ouvrir le fichier</a>
          ` : ""}
          ${entry.id && !entry.id.startsWith("legacy-") ? `
            <button
              class="${entry.verified ? "verified-button" : "secondary-button"} execution-log-link"
              type="button"
              data-agent-task-action="verify-execution"
              data-agent-task-id="${task.id}"
              data-execution-id="${entry.id}"
              ${entry.verified ? "disabled" : ""}
            >${entry.verified ? "Vérifié" : "Marquer comme vérifié"}</button>
          ` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function linkedItemLabel(linkedItem) {
  if (!linkedItem) return "Aucun lien";
  const [type, id] = linkedItem.split(":");
  if (type === "project") {
    return state.projects.find((project) => project.id === id)?.name || "Projet introuvable";
  }
  if (type === "idea") {
    return state.ideas.find((idea) => idea.id === id)?.name || "Idée introuvable";
  }
  return linkedItem;
}

function renderMetrics() {
  const activeProjects = state.projects.filter((project) => normalizeProjectStatus(project.status) === "actif").length;
  const closedProjects = state.projects.filter(isClosedProject).length;
  const blocked = state.projects.filter((project) => project.status === "bloqué" || (project.blockers || []).length).length;
  const highPriority = state.projects.filter((project) => !isClosedProject(project) && project.priority === "Haute").length;
  const bestIdea = Math.max(...state.ideas.map(scoreIdea), 0);
  const routineProgress = getRoutineProgress();
  const openAgentTasks = state.agentTasks.filter((task) => normalizeActionStatus(task.status) !== "done").length;

  document.querySelector("#metrics").innerHTML = [
    metric("Projets", state.projects.length, `${activeProjects} actif${activeProjects > 1 ? "s" : ""}, ${closedProjects} clôturé${closedProjects > 1 ? "s" : ""}`),
    metric("Priorités hautes", highPriority, "à suivre en premier"),
    metric("Blocages", blocked, "à lever rapidement"),
    metric("Tâches agents", openAgentTasks, `${bestIdea}/20 meilleur score idée, ${routineProgress}% routines`)
  ].join("");

  document.querySelector("#blocked-count").textContent = `${blocked} blocage${blocked > 1 ? "s" : ""}`;
}

function renderNavigationBadges() {
  const openAgentTasks = state.agentTasks.filter((task) => normalizeActionStatus(task.status) !== "done").length;
  const openProjects = state.projects.filter((project) => !isClosedProject(project)).length;
  const blockedProjects = state.projects.filter(isBlockedProject).length;
  const openActions = state.projects.filter((project) => !isClosedProject(project) && normalizeActionStatus(project.actionStatus) !== "done").length;
  const todayAlerts = blockedProjects
    + state.projects.filter((project) => !isClosedProject(project) && isMissingNextAction(project)).length
    + state.projects.filter(isDormantProject).length;
  const openBacklog = state.backlogItems.filter((item) => !["done", "rejected"].includes(normalizeBacklogStatus(item.status))).length;
  const todayBadge = document.querySelector("#today-nav-badge");
  const projectBadge = document.querySelector("#project-nav-badge");
  const backlogBadge = document.querySelector("#backlog-nav-badge");
  const trackingBadge = document.querySelector("#tracking-nav-badge");
  const taskBadge = document.querySelector("#agent-task-nav-badge");

  if (todayBadge) {
    todayBadge.textContent = todayAlerts;
    todayBadge.setAttribute("aria-label", `${todayAlerts} point${todayAlerts > 1 ? "s" : ""} d'attention`);
    todayBadge.classList.toggle("active", todayAlerts > 0);
  }

  if (projectBadge) {
    projectBadge.textContent = blockedProjects || openProjects;
    projectBadge.setAttribute("aria-label", blockedProjects
      ? `${blockedProjects} projet${blockedProjects > 1 ? "s" : ""} bloqué${blockedProjects > 1 ? "s" : ""}`
      : `${openProjects} projet${openProjects > 1 ? "s" : ""} à piloter`);
    projectBadge.classList.toggle("active", blockedProjects > 0);
  }

  if (trackingBadge) {
    trackingBadge.textContent = openActions;
    trackingBadge.setAttribute("aria-label", `${openActions} action${openActions > 1 ? "s" : ""} ouverte${openActions > 1 ? "s" : ""}`);
    trackingBadge.classList.toggle("active", openActions > 0);
  }

  if (backlogBadge) {
    backlogBadge.textContent = openBacklog;
    backlogBadge.setAttribute("aria-label", `${openBacklog} item${openBacklog > 1 ? "s" : ""} ouvert${openBacklog > 1 ? "s" : ""}`);
    backlogBadge.classList.toggle("active", openBacklog > 0);
  }

  if (taskBadge) {
    taskBadge.textContent = openAgentTasks;
    taskBadge.setAttribute("aria-label", `${openAgentTasks} tâche${openAgentTasks > 1 ? "s" : ""} ouverte${openAgentTasks > 1 ? "s" : ""}`);
    taskBadge.classList.toggle("active", openAgentTasks > 0);
  }
}

function metric(label, value, detail) {
  return `<article class="metric"><strong>${value}</strong><span>${label}</span><p class="muted">${detail}</p></article>`;
}

function renderActions() {
  const actions = [...state.projects]
    .filter((project) => !isClosedProject(project))
    .sort((a, b) => {
      const weight = { Haute: 0, Moyenne: 1, Basse: 2 };
      return weight[a.priority] - weight[b.priority];
    })
    .slice(0, 5);

  document.querySelector("#priority-actions").innerHTML = actions.map((project) => `
    <article class="action-item">
      <span class="priority-dot ${priorityClass(project.priority)}" aria-hidden="true"></span>
      <div>
        <strong>${project.name}</strong>
        <p>${project.nextAction}</p>
      </div>
      <span class="status-pill">${actionStatusLabel(project.actionStatus)}</span>
    </article>
  `).join("");
}

function renderAgents() {
  document.querySelector("#agent-list").innerHTML = agents.map((agent) => `
    <article class="agent-card">
      <strong>${agent.name}</strong>
      <p>${agent.role}</p>
    </article>
  `).join("");
}

function renderToday() {
  const activeProjects = state.projects.filter((project) => !isClosedProject(project));
  const blockedProjects = activeProjects.filter(isBlockedProject);
  const missingActions = activeProjects.filter(isMissingNextAction);
  const dormantProjects = activeProjects.filter(isDormantProject);
  const dueTasks = state.agentTasks.filter((task) => (
    normalizeActionStatus(task.status) !== "done" && task.dueDate && task.dueDate <= todayIsoDate()
  ));
  const priorityActions = [...activeProjects]
    .filter((project) => !isMissingNextAction(project))
    .sort((a, b) => scoreProject(b) - scoreProject(a))
    .slice(0, 5);
  const alertCount = blockedProjects.length + missingActions.length + dormantProjects.length + dueTasks.length;

  document.querySelector("#today-signal").textContent = `${alertCount} point${alertCount > 1 ? "s" : ""} d'attention`;
  document.querySelector("#today-grid").innerHTML = [
    todayPanel("Actions du jour", priorityActions, "active", (project) => ({
      subject: project.name,
      detail: project.nextAction
    })),
    todayPanel("Blocages", blockedProjects, "blocked", (project) => ({
      subject: project.name,
      detail: (project.blockers || []).join(" · ") || "Projet bloqué"
    })),
    todayPanel("Sans prochaine action", missingActions, "warning", (project) => ({
      subject: project.name
    })),
    todayPanel("Projets dormants", dormantProjects, "warning", (project) => ({
      subject: project.name,
      detail: `MAJ ${formatProjectDate(project.lastUpdated)}`
    })),
    todayPanel("Tâches à échéance", dueTasks, "active", (task) => ({
      subject: task.title,
      detail: `Échéance ${task.dueDate}`
    }))
  ].join("");

  document.querySelector("#activity-list").innerHTML = [...state.activityLog]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 12)
    .map((item) => `
      <article class="activity-item">
        <span class="status-pill">${formatExecutionDate(item.date)}</span>
        <div>
          <strong>${item.summary}</strong>
          ${item.projectId ? `<p>${projectName(item.projectId)}</p>` : ""}
          ${item.detail ? `<p>${item.detail}</p>` : ""}
        </div>
      </article>
    `).join("") || `<p class="muted">Aucune activité journalisée.</p>`;
}

function todayPanel(title, items, variant, formatter) {
  return `
    <section class="tracking-signal ${variant}">
      <div class="tracking-signal-header">
        <h3>${title}</h3>
        <span class="status-pill">${items.length}</span>
      </div>
      <div class="tracking-signal-list">
        ${items.map((item) => todayPanelItem(formatter(item))).join("") || `<p class="muted">Rien à signaler.</p>`}
      </div>
    </section>
  `;
}

function todayPanelItem(content) {
  if (typeof content === "string") {
    return `<article><strong class="today-item-subject">${content}</strong></article>`;
  }

  const subject = content.subject || "Sujet non renseigné";
  const detail = content.detail ? `<p class="today-item-detail">${content.detail}</p>` : "";

  return `
    <article>
      <strong class="today-item-subject">${subject}</strong>
      ${detail}
    </article>
  `;
}

function renderBacklog() {
  const columns = [
    { key: "todo", label: "À faire" },
    { key: "doing", label: "En cours" },
    { key: "done", label: "Fait" },
    { key: "rejected", label: "Écarté" }
  ];
  const openBacklog = state.backlogItems.filter((item) => !["done", "rejected"].includes(normalizeBacklogStatus(item.status))).length;
  document.querySelector("#backlog-progress").textContent = `${openBacklog} item${openBacklog > 1 ? "s" : ""} ouvert${openBacklog > 1 ? "s" : ""}`;
  document.querySelector("#backlog-board").innerHTML = columns.map((column) => {
    const items = state.backlogItems
      .filter((item) => normalizeBacklogStatus(item.status) === column.key)
      .sort((a, b) => ({ Haute: 0, Moyenne: 1, Basse: 2 }[a.priority] - { Haute: 0, Moyenne: 1, Basse: 2 }[b.priority]));
    return `
      <section class="tracking-column">
        <div class="tracking-column-header">
          <h3>${column.label}</h3>
          <span class="status-pill">${items.length}</span>
        </div>
        <div class="tracking-list">
          ${items.map((item) => `
            <article class="tracking-card">
              <div>
                <strong class="dense-item-subject">${item.title}</strong>
                <p class="dense-item-detail">${item.category}</p>
                ${item.nextAction ? `<p class="dense-item-detail">${item.nextAction}</p>` : ""}
              </div>
              <div class="card-meta">
                <span class="status-pill">${item.priority}</span>
                <span class="status-pill">${backlogStatusLabel(item.status)}</span>
              </div>
              <div class="tracking-actions">
                ${columns.map((target) => `
                  <button class="segmented ${target.key === column.key ? "active" : ""}" type="button" data-backlog-status-id="${item.id}" data-backlog-status="${target.key}">${target.label}</button>
                `).join("")}
              </div>
              <div class="card-actions">
                <button class="secondary-button" type="button" data-backlog-action="edit" data-backlog-id="${item.id}">Modifier</button>
                <button class="danger-button" type="button" data-backlog-action="delete" data-backlog-id="${item.id}">Supprimer</button>
              </div>
            </article>
          `).join("") || `<p class="muted">Aucun item.</p>`}
        </div>
      </section>
    `;
  }).join("");
}

function renderDecisionProjectOptions() {
  const select = document.querySelector("#decision-project");
  const currentValue = select.value;
  select.innerHTML = [
    `<option value="">Aucun projet</option>`,
    ...state.projects.map((project) => `<option value="${project.id}">${project.name}</option>`)
  ].join("");
  select.value = [...select.options].some((option) => option.value === currentValue) ? currentValue : "";
}

function renderDecisions() {
  renderDecisionProjectOptions();
  document.querySelector("#decisions-count").textContent = `${state.decisions.length} décision${state.decisions.length > 1 ? "s" : ""}`;
  document.querySelector("#decision-list").innerHTML = [...state.decisions]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .map((item) => `
      <article class="decision-card">
        <div>
          <strong class="dense-item-subject">${item.title}</strong>
          <p class="dense-item-detail">${formatProjectDate(item.date)} - ${projectName(item.projectId)}</p>
        </div>
        <p class="dense-item-detail">${item.decision}</p>
        ${item.rationale ? `<p class="dense-item-detail"><span class="dense-inline-label">Raison</span> ${item.rationale}</p>` : ""}
        ${item.impact ? `<p class="dense-item-detail"><span class="dense-inline-label">Impact</span> ${item.impact}</p>` : ""}
        <div class="card-actions">
          <button class="secondary-button" type="button" data-decision-action="edit" data-decision-id="${item.id}">Modifier</button>
          <button class="danger-button" type="button" data-decision-action="delete" data-decision-id="${item.id}">Supprimer</button>
        </div>
      </article>
    `).join("") || `<p class="muted">Aucune décision journalisée.</p>`;
}

function renderProjectDetail(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) {
    toast("Projet introuvable.");
    return;
  }
  const relatedTasks = state.agentTasks.filter((task) => task.linkedItem === `project:${projectId}`);
  const relatedDecisions = state.decisions.filter((decision) => decision.projectId === projectId);
  const panel = document.querySelector("#project-detail-panel");
  document.querySelector("#project-detail-title").textContent = project.name;
  document.querySelector("#project-detail-content").innerHTML = `
    <div class="detail-grid">
      <section>
        <h4>Objectif</h4>
        <p>${project.objective}</p>
        <h4>Prochaine action</h4>
        <p>${project.nextAction}</p>
        <h4>Score priorité</h4>
        <p>${scoreProject(project)}/20 - ${priorityScoreLabel(project)}</p>
      </section>
      <section>
        <h4>Décisions</h4>
        ${relatedDecisions.map((decision) => `<p><strong>${decision.date}</strong> - ${decision.title}</p>`).join("") || `<p class="muted">Aucune décision liée.</p>`}
        <h4>Tâches</h4>
        ${relatedTasks.map((task) => `<p><strong>${actionStatusLabel(task.status)}</strong> - ${task.title}${task.dueDate ? ` - ${task.dueDate}` : ""}</p>`).join("") || `<p class="muted">Aucune tâche liée.</p>`}
      </section>
      <section>
        <h4>Historique</h4>
        <p>${project.projectLog || "Aucun historique projet."}</p>
        <h4>Documentation</h4>
        <p>${project.documentation || "Non renseignée."}</p>
      </section>
    </div>
    ${renderProjectGuidedActions(project)}
  `;
  panel.classList.remove("hidden");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildWeeklyReview() {
  const activeProjects = state.projects.filter((project) => normalizeProjectStatus(project.status) === "actif");
  const blockedProjects = state.projects.filter(isBlockedProject);
  const pausedProjects = state.projects.filter((project) => normalizeProjectStatus(project.status) === "pause");
  const openTasks = state.agentTasks.filter((task) => normalizeActionStatus(task.status) !== "done");
  const pendingDecisions = state.decisions.slice().sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 5);
  return [
    "# Revue hebdo amsClaw",
    "",
    `Date : ${todayIsoDate()}`,
    "",
    "## Projets actifs",
    ...activeProjects.map((project) => `- ${project.name} : ${project.nextAction}`),
    "",
    "## Blocages",
    ...(blockedProjects.length ? blockedProjects.map((project) => `- ${project.name} : ${(project.blockers || []).join(", ") || "Projet bloqué"}`) : ["- Aucun blocage."]),
    "",
    "## Projets en pause",
    ...(pausedProjects.length ? pausedProjects.map((project) => `- ${project.name}`) : ["- Aucun projet en pause."]),
    "",
    "## Tâches ouvertes",
    ...(openTasks.length ? openTasks.map((task) => `- ${task.title} (${task.owner})`) : ["- Aucune tâche ouverte."]),
    "",
    "## Dernières décisions",
    ...(pendingDecisions.length ? pendingDecisions.map((decision) => `- ${decision.date} - ${decision.title}`) : ["- Aucune décision journalisée."]),
    "",
    "## Prochaine action recommandée",
    state.projects.filter((project) => !isClosedProject(project)).sort((a, b) => scoreProject(b) - scoreProject(a))[0]?.nextAction || "Définir la prochaine action prioritaire."
  ].join("\n");
}

function renderWeeklyReview() {
  const sections = buildWeeklyReview()
    .split("\n## ")
    .map((section, index) => index === 0 ? section.replace("# Revue hebdo amsClaw\n\n", "") : `## ${section}`);
  document.querySelector("#weekly-review-grid").innerHTML = sections.map((section) => {
    const [title, ...lines] = section.split("\n").filter(Boolean);
    return `
      <section class="tracking-signal active">
        <h3>${title.replace(/^##\s*/, "")}</h3>
        <div class="tracking-signal-list">
          ${lines.map((line) => denseLineItem(line)).join("") || `<p class="muted">Rien à signaler.</p>`}
        </div>
      </section>
    `;
  }).join("");
}

function denseLineItem(line) {
  const cleanedLine = line.replace(/^- /, "");
  const separator = cleanedLine.includes(" : ") ? " : " : cleanedLine.includes(" - ") ? " - " : "";
  const [subject, ...detailParts] = separator ? cleanedLine.split(separator) : [cleanedLine];
  const detail = detailParts.join(separator);

  return `
    <article>
      <strong class="dense-item-subject">${subject}</strong>
      ${detail ? `<p class="dense-item-detail">${detail}</p>` : ""}
    </article>
  `;
}

function searchableItems() {
  return [
    ...state.projects.map((project) => ({
      type: "Projet",
      title: project.name,
      body: [project.objective, project.nextAction, project.projectLog, project.documentation].join(" ")
    })),
    ...state.agentTasks.map((task) => ({
      type: "Tâche",
      title: task.title,
      body: [task.owner, linkedItemLabel(task.linkedItem), task.note].join(" ")
    })),
    ...state.decisions.map((decision) => ({
      type: "Décision",
      title: decision.title,
      body: [decision.decision, decision.rationale, decision.impact, projectName(decision.projectId)].join(" ")
    })),
    ...state.backlogItems.map((item) => ({
      type: "Backlog",
      title: item.title,
      body: [item.category, item.priority, backlogStatusLabel(item.status), item.nextAction, item.notes].join(" ")
    })),
    ...state.ideas.map((idea) => ({
      type: "Idée",
      title: idea.name,
      body: [idea.market, idea.problem].join(" ")
    }))
  ];
}

function renderGlobalSearch() {
  const query = globalSearch.trim().toLowerCase();
  const items = searchableItems().filter((item) => {
    if (!query) return true;
    return `${item.type} ${item.title} ${item.body}`.toLowerCase().includes(query);
  });
  document.querySelector("#global-search-results").innerHTML = items.map((item) => `
    <article class="search-result">
      <span class="status-pill">${item.type}</span>
      <div>
        <strong>${item.title}</strong>
        <p>${item.body}</p>
      </div>
    </article>
  `).join("") || `<p class="muted">Aucun résultat.</p>`;
}

function getProjectStatusCounts() {
  return state.projects.reduce((counts, project) => {
    const status = isBlockedProject(project) ? "bloqué" : normalizeProjectStatus(project.status);
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, { actif: 0, pause: 0, bloqué: 0, clôturé: 0 });
}

function projectMatchesSearch(project) {
  const query = projectSearch.trim().toLowerCase();
  if (!query) return true;
  return [
    project.name,
    project.objective,
    project.nextAction,
    project.priority,
    project.owner,
    project.documentation,
    project.finalResult,
    project.projectLog
  ].some((value) => String(value || "").toLowerCase().includes(query));
}

function renderProjectToolbar() {
  const counts = getProjectStatusCounts();
  const missingNextAction = state.projects.filter((project) => !isClosedProject(project) && isMissingNextAction(project)).length;
  const items = [
    ["Actifs", counts.actif, "active"],
    ["En pause", counts.pause, "paused"],
    ["Bloqués", counts.bloqué, "blocked"],
    ["Clôturés", counts.clôturé, "closed"],
    ["Sans action", missingNextAction, missingNextAction > 0 ? "blocked" : "active"]
  ];

  document.querySelector("#project-status-summary").innerHTML = items.map(([label, value, className]) => `
    <button class="project-summary-tile ${className}" type="button" data-project-summary-filter="${label === "En pause" ? "pause" : label === "Sans action" ? "no-next-action" : label.toLowerCase().replace("és", "é").replace("s", "")}">
      <strong>${value}</strong>
      <span>${label}</span>
    </button>
  `).join("");
}

function renderProjects() {
  const projects = state.projects.filter((project) => {
    if (projectFilter === "all") return true;
    if (projectFilter === "bloqué") return isBlockedProject(project);
    if (projectFilter === "no-next-action") return !isClosedProject(project) && isMissingNextAction(project);
    if (projectFilter === "archives") return isClosedProject(project);
    return normalizeProjectStatus(project.status) === projectFilter;
  }).filter(projectMatchesSearch);

  renderProjectToolbar();

  document.querySelector("#project-grid").innerHTML = projects.map((project) => `
    <article class="project-card ${isBlockedProject(project) ? "is-blocked" : ""} ${isMissingNextAction(project) && !isClosedProject(project) ? "needs-next-action" : ""}">
      <div class="project-card-header">
        <div>
          <strong>${project.name}</strong>
          <p>${project.objective}</p>
        </div>
        <span class="project-status-indicator ${projectStatusClass(project)}">${statusLabel(project)}</span>
      </div>
      ${isBlockedProject(project) ? `
        <div class="project-alert">
          <strong>Blocage à traiter</strong>
          <p>${(project.blockers || []).join(" · ") || "Le projet est marqué comme bloqué."}</p>
        </div>
      ` : ""}
      <div class="project-next-action">
        <p><strong>Prochaine action</strong></p>
        <p>${isMissingNextAction(project) ? "À définir pour garder le projet redémarrable." : project.nextAction}</p>
      </div>
      ${renderProjectGuidedActions(project)}
      ${project.finalResult ? `
        <div class="project-final-result">
          <p><strong>Résultat final</strong>${project.closureDate ? ` · ${project.closureDate}` : ""}</p>
          <p>${project.finalResult}</p>
        </div>
      ` : ""}
      ${project.projectLog ? `
        <div class="project-log">
          <p><strong>Historique / décision</strong></p>
          <p>${project.projectLog}</p>
        </div>
      ` : ""}
      <div class="card-meta">
        <span class="status-pill">${actionStatusLabel(project.actionStatus)}</span>
        <span class="status-pill">${project.priority}</span>
        <span class="status-pill">Score ${scoreProject(project)}/20 - ${priorityScoreLabel(project)}</span>
        <span class="status-pill">${project.owner}</span>
        <span class="status-pill">MAJ ${formatProjectDate(project.lastUpdated)}</span>
        ${project.documentation ? `<span class="status-pill">Doc</span>` : ""}
      </div>
      <div class="card-actions">
        <button class="secondary-button" type="button" data-project-action="details" data-project-id="${project.id}">Détails</button>
        ${!isClosedProject(project) ? `<button class="primary-button" type="button" data-project-action="close" data-project-id="${project.id}">Clôturer</button>` : ""}
        <button class="secondary-button" type="button" data-project-action="edit" data-project-id="${project.id}">Modifier</button>
        <button class="danger-button" type="button" data-project-action="delete" data-project-id="${project.id}">Supprimer</button>
      </div>
    </article>
  `).join("") || `<p class="muted">Aucun projet pour ce filtre.</p>`;
}

function renderTracking() {
  const columns = [
    { key: "todo", label: "À faire" },
    { key: "doing", label: "En cours" },
    { key: "done", label: "Fait" }
  ];
  const trackableProjects = state.projects.filter((project) => !isClosedProject(project));
  const done = trackableProjects.filter((project) => normalizeActionStatus(project.actionStatus) === "done").length;
  const blockedProjects = trackableProjects.filter(isBlockedProject);
  const projectsWithoutAction = trackableProjects.filter(isMissingNextAction);
  const nextActions = [...trackableProjects]
    .filter((project) => !isMissingNextAction(project))
    .sort((a, b) => {
      const weight = { Haute: 0, Moyenne: 1, Basse: 2 };
      return weight[a.priority] - weight[b.priority];
    })
    .slice(0, 4);

  document.querySelector("#tracking-signals").innerHTML = [
    trackingSignal("Blocages", blockedProjects, "blocked"),
    trackingSignal("Sans prochaine action", projectsWithoutAction, "warning"),
    trackingSignal("Actions utiles", nextActions, "active")
  ].join("");

  document.querySelector("#tracking-board").innerHTML = columns.map((column) => {
    const projects = trackableProjects.filter((project) => normalizeActionStatus(project.actionStatus) === column.key);
    return `
      <section class="tracking-column">
        <div class="tracking-column-header">
          <h3>${column.label}</h3>
          <span class="status-pill">${projects.length}</span>
        </div>
        <div class="tracking-list">
          ${projects.map((project) => `
            <article class="tracking-card">
              <div>
                <strong>${project.name}</strong>
                <p>${project.nextAction}</p>
              </div>
              <div class="card-meta">
                <span class="status-pill">${project.priority}</span>
                <span class="status-pill">${project.owner}</span>
              </div>
              <div class="tracking-actions" role="group" aria-label="Changer l'avancement de ${project.name}">
                ${columns.map((target) => `
                  <button
                    class="segmented ${target.key === column.key ? "active" : ""}"
                    type="button"
                    data-tracking-project-id="${project.id}"
                    data-tracking-status="${target.key}"
                  >${target.label}</button>
                `).join("")}
              </div>
            </article>
          `).join("") || `<p class="muted">Aucune action.</p>`}
        </div>
      </section>
    `;
  }).join("");

  document.querySelector("#tracking-progress").textContent = `${done} action${done > 1 ? "s" : ""} faite${done > 1 ? "s" : ""}`;
}

function trackingSignal(title, projects, variant) {
  return `
    <section class="tracking-signal ${variant}">
      <div class="tracking-signal-header">
        <h3>${title}</h3>
        <span class="status-pill">${projects.length}</span>
      </div>
      <div class="tracking-signal-list">
        ${projects.map((project) => `
          <article>
            <strong>${project.name}</strong>
            <p>${isMissingNextAction(project) ? "Prochaine action à définir." : project.nextAction}</p>
          </article>
        `).join("") || `<p class="muted">Aucun signal.</p>`}
      </div>
    </section>
  `;
}

function renderAgentTaskLinkedOptions() {
  const select = document.querySelector("#agent-task-linked-item");
  const currentValue = select.value;
  const options = [
    `<option value="">Aucun lien</option>`,
    ...state.projects.map((project) => `<option value="project:${project.id}">Projet - ${project.name}</option>`),
    ...state.ideas.map((idea) => `<option value="idea:${idea.id}">Idée - ${idea.name}</option>`)
  ];
  select.innerHTML = options.join("");
  select.value = [...select.options].some((option) => option.value === currentValue) ? currentValue : "";
}

function renderAgentTasks() {
  const columns = [
    { key: "todo", label: "À faire" },
    { key: "doing", label: "En cours" },
    { key: "done", label: "Fait" }
  ];
  const done = state.agentTasks.filter((task) => normalizeActionStatus(task.status) === "done").length;
  const toVerify = state.agentTasks.filter(hasUnverifiedExecution).length;
  const executionsToVerify = countUnverifiedExecutions();
  const emptyVerificationState = agentTaskFilter === "to-verify" && executionsToVerify === 0
    ? `<div class="empty-state">Aucune exécution à vérifier.</div>`
    : "";

  renderAgentTaskLinkedOptions();
  document.querySelector("#agent-task-board").innerHTML = emptyVerificationState + columns.map((column) => {
    const tasks = state.agentTasks
      .filter((task) => agentTaskFilter === "all" || hasUnverifiedExecution(task))
      .filter((task) => normalizeActionStatus(task.status) === column.key)
      .sort((a, b) => {
        const weight = { Haute: 0, Moyenne: 1, Basse: 2 };
        return weight[a.priority] - weight[b.priority];
      });
    return `
      <section class="tracking-column">
        <div class="tracking-column-header">
          <h3>${column.label}</h3>
          <span class="status-pill">${tasks.length}</span>
        </div>
        <div class="tracking-list">
          ${tasks.map((task) => `
            <article class="tracking-card">
              <div>
                <strong>${task.title}</strong>
                ${task.note ? `<p>${task.note}</p>` : ""}
              </div>
              ${renderTaskExecutionLog(task)}
              <div class="card-meta">
                <span class="status-pill">${task.priority}</span>
                <span class="status-pill">${task.owner}</span>
                <span class="status-pill">${linkedItemLabel(task.linkedItem)}</span>
              </div>
              <div class="tracking-actions" role="group" aria-label="Changer l'avancement de ${task.title}">
                ${columns.map((target) => `
                  <button
                    class="segmented ${target.key === column.key ? "active" : ""}"
                    type="button"
                    data-agent-task-status-id="${task.id}"
                    data-agent-task-status="${target.key}"
                  >${target.label}</button>
                `).join("")}
              </div>
              <div class="card-actions">
                ${column.key !== "done" ? `<button class="primary-button" type="button" data-agent-task-action="execute" data-agent-task-id="${task.id}">Exécuter</button>` : ""}
                <button class="secondary-button" type="button" data-agent-task-action="edit" data-agent-task-id="${task.id}">Modifier</button>
                <button class="danger-button" type="button" data-agent-task-action="delete" data-agent-task-id="${task.id}">Supprimer</button>
              </div>
            </article>
          `).join("") || `<p class="muted">Aucune tâche.</p>`}
        </div>
      </section>
    `;
  }).join("");

  const verificationCount = document.querySelector("#agent-task-verification-count");
  verificationCount.textContent = `${executionsToVerify} exécution${executionsToVerify > 1 ? "s" : ""} à vérifier`;
  verificationCount.classList.toggle("active", executionsToVerify > 0);

  document.querySelector("#agent-task-progress").textContent = agentTaskFilter === "to-verify"
    ? `${toVerify} à vérifier`
    : `${done} tâche${done > 1 ? "s" : ""} faite${done > 1 ? "s" : ""}`;
}

function renderIdeas() {
  const ideas = [...state.ideas].sort((a, b) => scoreIdea(b) - scoreIdea(a));
  document.querySelector("#idea-list").innerHTML = ideas.map((idea) => `
    <article class="idea-row">
      <div>
        <strong>${idea.name}</strong>
        <p>${idea.market}</p>
        <p>${idea.problem}</p>
      </div>
      <div class="score" title="Score priorisation">${scoreIdea(idea)}</div>
      <div class="card-actions">
        <button class="secondary-button" type="button" data-idea-action="edit" data-idea-id="${idea.id}">Modifier</button>
        <button class="danger-button" type="button" data-idea-action="delete" data-idea-id="${idea.id}">Supprimer</button>
      </div>
    </article>
  `).join("") || `<p class="muted">Aucune idée qualifiée.</p>`;
}

function renderRoutines() {
  document.querySelector("#routine-columns").innerHTML = Object.entries(state.routines).map(([period, items]) => `
    <section class="routine-card">
      <h3>${period}</h3>
      ${items.map((item) => {
        const key = `${period}:${item}`;
        return `
          <label class="routine-item">
            <input type="checkbox" data-routine-key="${key}" ${state.completedRoutines[key] ? "checked" : ""}>
            <span>${item}</span>
          </label>
        `;
      }).join("")}
    </section>
  `).join("");

  document.querySelector("#routine-progress").textContent = `${getRoutineProgress()}%`;
}

function getRoutineProgress() {
  const total = Object.values(state.routines).flat().length;
  const done = Object.values(state.completedRoutines).filter(Boolean).length;
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function renderAll() {
  renderNavigationBadges();
  renderMetrics();
  renderActions();
  renderAgents();
  renderToday();
  renderBacklog();
  renderDecisions();
  renderProjects();
  renderIdeas();
  renderTracking();
  renderAgentTasks();
  renderWeeklyReview();
  renderGlobalSearch();
  renderRoutines();
}

function showView(view) {
  document.querySelectorAll(".view").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.viewPanel === view);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });

  const labels = {
    overview: "Vue d'ensemble",
    today: "Aujourd'hui",
    projects: "Projets",
    backlog: "Backlog",
    decisions: "Décisions",
    ideas: "Idées business",
    tracking: "Suivi quotidien",
    "agent-tasks": "Tâches agents",
    "weekly-review": "Revue hebdo",
    "global-search": "Recherche globale",
    routines: "Routines"
  };
  document.querySelector("#view-title").textContent = labels[view];
}

function toast(message) {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.classList.add("show");
  window.setTimeout(() => el.classList.remove("show"), 2200);
}

function resetProjectForm() {
  editingProjectId = null;
  const form = document.querySelector("#project-form");
  form.reset();
  form.elements.createFromTemplate.disabled = false;
  document.querySelector("#project-form-title").textContent = "Nouveau projet";
  document.querySelector("#project-submit").textContent = "Ajouter";
  document.querySelector("#project-edit-cancel").classList.add("hidden");
}

function resetIdeaForm() {
  editingIdeaId = null;
  document.querySelector("#idea-form").reset();
  document.querySelector("#idea-form-title").textContent = "Nouvelle idée";
  document.querySelector("#idea-submit").textContent = "Qualifier";
  document.querySelector("#idea-edit-cancel").classList.add("hidden");
}

function resetAgentTaskForm() {
  editingAgentTaskId = null;
  document.querySelector("#agent-task-form").reset();
  document.querySelector("#agent-task-form-title").textContent = "Nouvelle tâche";
  document.querySelector("#agent-task-submit").textContent = "Ajouter";
  document.querySelector("#agent-task-edit-cancel").classList.add("hidden");
}

function resetBacklogForm() {
  editingBacklogItemId = null;
  document.querySelector("#backlog-form").reset();
  document.querySelector("#backlog-form-title").textContent = "Nouvel item";
  document.querySelector("#backlog-submit").textContent = "Ajouter";
  document.querySelector("#backlog-edit-cancel").classList.add("hidden");
}

function resetDecisionForm() {
  editingDecisionId = null;
  const form = document.querySelector("#decision-form");
  form.reset();
  form.elements.date.value = todayIsoDate();
  document.querySelector("#decision-form-title").textContent = "Nouvelle décision";
  document.querySelector("#decision-submit").textContent = "Ajouter";
  document.querySelector("#decision-edit-cancel").classList.add("hidden");
}

function startProjectEdit(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) {
    toast("Projet introuvable.");
    return;
  }

  editingProjectId = projectId;
  const form = document.querySelector("#project-form");
  form.elements.name.value = project.name;
  form.elements.objective.value = project.objective;
  form.elements.nextAction.value = project.nextAction;
  form.elements.status.value = normalizeProjectStatus(project.status);
  form.elements.priority.value = project.priority;
  form.elements.scoreSpeed.value = project.priorityScore.speed;
  form.elements.scoreMotivation.value = project.priorityScore.motivation;
  form.elements.scoreEffortGain.value = project.priorityScore.effortGain;
  form.elements.scoreFinancial.value = project.priorityScore.financial;
  form.elements.closureDate.value = project.closureDate || "";
  form.elements.finalResult.value = project.finalResult || "";
  form.elements.projectLog.value = project.projectLog || "";
  form.elements.createFromTemplate.checked = false;
  form.elements.createFromTemplate.disabled = true;
  document.querySelector("#project-form-title").textContent = "Modifier le projet";
  document.querySelector("#project-submit").textContent = "Enregistrer";
  document.querySelector("#project-edit-cancel").classList.remove("hidden");
  form.elements.name.focus();
  toast("Projet chargé dans le formulaire.");
}

function startProjectClosure(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) {
    toast("Projet introuvable.");
    return;
  }

  startProjectEdit(projectId);
  const form = document.querySelector("#project-form");
  form.elements.status.value = "clôturé";
  form.elements.closureDate.value = project.closureDate || todayIsoDate();
  if (!form.elements.finalResult.value) {
    form.elements.finalResult.placeholder = "Résultat final, livrable, décision de clôture, leçon utile";
  }
  form.elements.finalResult.focus();
  toast("Clôture guidée : complète le bilan puis enregistre.");
}

async function runProjectGuidedAction(projectId, actionId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) {
    toast("Projet introuvable.");
    return;
  }

  const action = getProjectGuidedActions(project).find((item) => item.id === actionId);
  if (!action) {
    toast("Action guidée indisponible pour ce projet.");
    return;
  }

  if (!window.confirm(`${action.label} pour "${project.name}" ?\n\n${action.description}`)) {
    return;
  }

  toast("Action guidée en cours...");
  try {
    const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}/guided-actions/${encodeURIComponent(actionId)}`, {
      method: "POST"
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);
    if (result.data) {
      state = normalizeState(result.data);
      defaultState = structuredClone(state);
    }
    renderAll();
    renderProjectDetail(projectId);
    toast(result.message || "Action guidée appliquée.");
  } catch (error) {
    toast(`Action impossible : ${error.message}`);
  }
}

function setProjectFilter(nextFilter) {
  projectFilter = nextFilter;
  document.querySelectorAll("[data-project-filter]").forEach((item) => {
    item.classList.toggle("active", item.dataset.projectFilter === nextFilter);
  });
  renderProjects();
}

function startIdeaEdit(ideaId) {
  const idea = state.ideas.find((item) => item.id === ideaId);
  if (!idea) {
    toast("Idée introuvable.");
    return;
  }

  editingIdeaId = ideaId;
  const form = document.querySelector("#idea-form");
  form.elements.name.value = idea.name;
  form.elements.market.value = idea.market;
  form.elements.problem.value = idea.problem;
  form.elements.speed.value = idea.speed;
  form.elements.motivation.value = idea.motivation;
  form.elements.effortGain.value = idea.effortGain;
  form.elements.financial.value = idea.financial;
  document.querySelector("#idea-form-title").textContent = "Modifier l'idée";
  document.querySelector("#idea-submit").textContent = "Enregistrer";
  document.querySelector("#idea-edit-cancel").classList.remove("hidden");
  form.elements.name.focus();
  toast("Idée chargée dans le formulaire.");
}

function startAgentTaskEdit(taskId) {
  const task = state.agentTasks.find((item) => item.id === taskId);
  if (!task) {
    toast("Tâche introuvable.");
    return;
  }

  editingAgentTaskId = taskId;
  const form = document.querySelector("#agent-task-form");
  form.elements.title.value = task.title;
  form.elements.owner.value = task.owner;
  form.elements.linkedItem.value = task.linkedItem;
  form.elements.priority.value = task.priority;
  form.elements.dueDate.value = task.dueDate || "";
  form.elements.note.value = task.note;
  document.querySelector("#agent-task-form-title").textContent = "Modifier la tâche";
  document.querySelector("#agent-task-submit").textContent = "Enregistrer";
  document.querySelector("#agent-task-edit-cancel").classList.remove("hidden");
  form.elements.title.focus();
  toast("Tâche chargée dans le formulaire.");
}

function startBacklogEdit(itemId) {
  const item = state.backlogItems.find((entry) => entry.id === itemId);
  if (!item) {
    toast("Item backlog introuvable.");
    return;
  }

  editingBacklogItemId = itemId;
  const form = document.querySelector("#backlog-form");
  form.elements.title.value = item.title;
  form.elements.category.value = item.category;
  form.elements.priority.value = item.priority;
  form.elements.status.value = normalizeBacklogStatus(item.status);
  form.elements.nextAction.value = item.nextAction || "";
  document.querySelector("#backlog-form-title").textContent = "Modifier l'item";
  document.querySelector("#backlog-submit").textContent = "Enregistrer";
  document.querySelector("#backlog-edit-cancel").classList.remove("hidden");
  form.elements.title.focus();
  toast("Item backlog chargé dans le formulaire.");
}

function startDecisionEdit(decisionId) {
  const decision = state.decisions.find((entry) => entry.id === decisionId);
  if (!decision) {
    toast("Décision introuvable.");
    return;
  }

  editingDecisionId = decisionId;
  const form = document.querySelector("#decision-form");
  form.elements.date.value = decision.date;
  form.elements.projectId.value = decision.projectId;
  form.elements.title.value = decision.title;
  form.elements.decision.value = decision.decision;
  form.elements.rationale.value = decision.rationale || "";
  form.elements.impact.value = decision.impact || "";
  document.querySelector("#decision-form-title").textContent = "Modifier la décision";
  document.querySelector("#decision-submit").textContent = "Enregistrer";
  document.querySelector("#decision-edit-cancel").classList.remove("hidden");
  form.elements.title.focus();
  toast("Décision chargée dans le formulaire.");
}

async function deleteProject(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) {
    toast("Projet introuvable.");
    return;
  }

  if (!window.confirm(`Supprimer le projet "${project.name}" ?`)) return;

  state.projects = state.projects.filter((item) => item.id !== projectId);
  if (editingProjectId === projectId) resetProjectForm();
  renderAll();
  toast("Projet supprimé à l'écran, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  toast(saved ? "Projet supprimé dans dashboard-data.json." : "Suppression visible à l'écran seulement.");
}

async function deleteIdea(ideaId) {
  const idea = state.ideas.find((item) => item.id === ideaId);
  if (!idea) {
    toast("Idée introuvable.");
    return;
  }

  if (!window.confirm(`Supprimer l'idée "${idea.name}" ?`)) return;

  state.ideas = state.ideas.filter((item) => item.id !== ideaId);
  if (editingIdeaId === ideaId) resetIdeaForm();
  renderAll();
  toast("Idée supprimée à l'écran, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  toast(saved ? "Idée supprimée dans dashboard-data.json." : "Suppression visible à l'écran seulement.");
}

async function deleteAgentTask(taskId) {
  const task = state.agentTasks.find((item) => item.id === taskId);
  if (!task) {
    toast("Tâche introuvable.");
    return;
  }

  if (!window.confirm(`Supprimer la tâche "${task.title}" ?`)) return;

  state.agentTasks = state.agentTasks.filter((item) => item.id !== taskId);
  if (editingAgentTaskId === taskId) resetAgentTaskForm();
  renderAll();
  toast("Tâche supprimée à l'écran, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  toast(saved ? "Tâche supprimée dans dashboard-data.json." : "Suppression visible à l'écran seulement.");
}

async function deleteBacklogItem(itemId) {
  const item = state.backlogItems.find((entry) => entry.id === itemId);
  if (!item) {
    toast("Item backlog introuvable.");
    return;
  }

  if (!window.confirm(`Supprimer l'item "${item.title}" ?`)) return;

  state.backlogItems = state.backlogItems.filter((entry) => entry.id !== itemId);
  addActivity("backlog", `Backlog supprimé : ${item.title}`);
  if (editingBacklogItemId === itemId) resetBacklogForm();
  renderAll();
  toast("Item backlog supprimé à l'écran, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  toast(saved ? "Item backlog supprimé dans dashboard-data.json." : "Suppression visible à l'écran seulement.");
}

async function deleteDecision(decisionId) {
  const decision = state.decisions.find((entry) => entry.id === decisionId);
  if (!decision) {
    toast("Décision introuvable.");
    return;
  }

  if (!window.confirm(`Supprimer la décision "${decision.title}" ?`)) return;

  state.decisions = state.decisions.filter((entry) => entry.id !== decisionId);
  addActivity("decision", `Décision supprimée : ${decision.title}`, "", decision.projectId);
  if (editingDecisionId === decisionId) resetDecisionForm();
  renderAll();
  toast("Décision supprimée à l'écran, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  toast(saved ? "Décision supprimée dans dashboard-data.json." : "Suppression visible à l'écran seulement.");
}

async function setProjectActionStatus(projectId, actionStatus) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) {
    toast("Projet introuvable.");
    return;
  }

  const nextStatus = normalizeActionStatus(actionStatus);
  state.projects = state.projects.map((item) => (
    item.id === projectId ? { ...item, actionStatus: nextStatus, lastUpdated: todayIsoDate() } : item
  ));
  renderAll();
  toast(`Action passée en "${actionStatusLabel(nextStatus)}", sauvegarde en cours...`);
  const saved = await saveState();
  renderAll();
  toast(saved ? "Avancement enregistré dans dashboard-data.json." : "Avancement visible à l'écran seulement.");
}

async function setAgentTaskStatus(taskId, status) {
  const task = state.agentTasks.find((item) => item.id === taskId);
  if (!task) {
    toast("Tâche introuvable.");
    return;
  }

  const nextStatus = normalizeActionStatus(status);
  state.agentTasks = state.agentTasks.map((item) => (
    item.id === taskId ? { ...item, status: nextStatus } : item
  ));
  renderAll();
  toast(`Tâche passée en "${actionStatusLabel(nextStatus)}", sauvegarde en cours...`);
  const saved = await saveState();
  renderAll();
  toast(saved ? "Statut de tâche enregistré dans dashboard-data.json." : "Statut visible à l'écran seulement.");
}

async function setBacklogStatus(itemId, status) {
  const item = state.backlogItems.find((entry) => entry.id === itemId);
  if (!item) {
    toast("Item backlog introuvable.");
    return;
  }

  const nextStatus = normalizeBacklogStatus(status);
  state.backlogItems = state.backlogItems.map((entry) => (
    entry.id === itemId ? { ...entry, status: nextStatus } : entry
  ));
  addActivity("backlog", `Backlog passé en "${backlogStatusLabel(nextStatus)}" : ${item.title}`);
  renderAll();
  toast("Statut backlog modifié, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  toast(saved ? "Statut backlog enregistré dans dashboard-data.json." : "Statut visible à l'écran seulement.");
}

async function executeAgentTask(taskId) {
  const task = state.agentTasks.find((item) => item.id === taskId);
  if (!task) {
    toast("Tâche introuvable.");
    return;
  }

  if (!window.confirm(`Exécuter la tâche "${task.title}" ?`)) return;

  state.agentTasks = state.agentTasks.map((item) => (
    item.id === taskId ? { ...item, status: "doing" } : item
  ));
  renderAll();
  toast("Exécution de la tâche en cours...");

  try {
    const response = await fetch(`/api/agent-tasks/${encodeURIComponent(taskId)}/execute`, {
      method: "POST"
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || result.message || `HTTP ${response.status}`);
    if (result.data) {
      state = normalizeState(result.data);
      defaultState = structuredClone(state);
    }
    renderAll();
    toast(result.message || "Tâche exécutée.");
  } catch (error) {
    state.agentTasks = state.agentTasks.map((item) => (
      item.id === taskId ? { ...item, status: normalizeActionStatus(task.status) } : item
    ));
    renderAll();
    toast(`Exécution impossible : ${error.message}`);
  }
}

async function verifyTaskExecution(taskId, executionId) {
  const task = state.agentTasks.find((item) => item.id === taskId);
  if (!task) {
    toast("Tâche introuvable.");
    return;
  }

  toast("Validation de l'exécution en cours...");

  try {
    const response = await fetch(
      `/api/agent-tasks/${encodeURIComponent(taskId)}/executions/${encodeURIComponent(executionId)}/verify`,
      { method: "POST" }
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || result.message || `HTTP ${response.status}`);
    if (result.data) {
      state = normalizeState(result.data);
      defaultState = structuredClone(state);
    }
    renderAll();
    toast(result.message || "Exécution vérifiée.");
  } catch (error) {
    toast(`Validation impossible : ${error.message}`);
  }
}

function buildReport() {
  const blocked = state.projects.filter(isBlockedProject);
  const bestIdeas = [...state.ideas].sort((a, b) => scoreIdea(b) - scoreIdea(a)).slice(0, 3);

  return [
    "Rapport amsClaw - Dashboard V1.8",
    "",
    `Source : ${state.metadata?.source || "locale"}`,
    `Projets suivis : ${state.projects.length}`,
    `Tâches agents ouvertes : ${state.agentTasks.filter((task) => normalizeActionStatus(task.status) !== "done").length}`,
    `Blocages : ${blocked.length}`,
    `Routines complétées : ${getRoutineProgress()}%`,
    "",
    "Priorités :",
    ...state.projects.slice(0, 3).map((project) => `- ${project.name} : ${project.nextAction}`),
    "",
    "Idées les mieux scorées :",
    ...bestIdeas.map((idea) => `- ${idea.name} : ${scoreIdea(idea)}/20`)
  ].join("\n");
}

function buildProjectsMarkdownExport() {
  return [
    "# Export projets amsClaw",
    "",
    `Date : ${todayIsoDate()}`,
    "",
    ...state.projects.map((project) => [
      `## ${project.name}`,
      "",
      `- Statut : ${statusLabel(project)}`,
      `- Priorité : ${project.priority}`,
      `- Responsable : ${project.owner}`,
      `- Dernière mise à jour : ${project.lastUpdated || "Non renseignée"}`,
      `- Objectif : ${project.objective}`,
      `- Prochaine action : ${project.nextAction}`,
      project.closureDate ? `- Date de clôture : ${project.closureDate}` : "",
      project.finalResult ? `- Résultat final : ${project.finalResult}` : "",
      project.projectLog ? `- Historique / décision : ${project.projectLog}` : "",
      project.documentation ? `- Documentation : ${project.documentation}` : ""
    ].filter(Boolean).join("\n"))
  ].join("\n");
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

document.querySelectorAll("[data-project-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    setProjectFilter(button.dataset.projectFilter);
  });
});

document.querySelector("#project-status-summary").addEventListener("click", (event) => {
  const button = event.target.closest("[data-project-summary-filter]");
  if (!button) return;
  setProjectFilter(button.dataset.projectSummaryFilter);
});

document.querySelector("#project-search").addEventListener("input", (event) => {
  projectSearch = event.target.value;
  renderProjects();
});

document.querySelector("#global-search-input").addEventListener("input", (event) => {
  globalSearch = event.target.value;
  renderGlobalSearch();
});

document.querySelectorAll("[data-agent-task-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    agentTaskFilter = button.dataset.agentTaskFilter;
    document.querySelectorAll("[data-agent-task-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderAgentTasks();
  });
});

document.querySelector("#project-grid").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-project-action]");
  if (!button) return;

  const projectId = button.dataset.projectId;
  if (button.dataset.projectAction === "edit") {
    startProjectEdit(projectId);
    return;
  }

  if (button.dataset.projectAction === "close") {
    startProjectClosure(projectId);
    return;
  }

  if (button.dataset.projectAction === "details") {
    renderProjectDetail(projectId);
    return;
  }

  if (button.dataset.projectAction === "validate-prd") {
    await runProjectGuidedAction(projectId, "validate-prd");
    return;
  }

  if (button.dataset.projectAction === "delete") {
    await deleteProject(projectId);
  }
});

document.querySelector("#project-detail-content").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-project-action]");
  if (!button) return;

  if (button.dataset.projectAction === "validate-prd") {
    await runProjectGuidedAction(button.dataset.projectId, "validate-prd");
  }
});

document.querySelector("#project-edit-cancel").addEventListener("click", () => {
  resetProjectForm();
  toast("Modification annulée.");
});

document.querySelector("#idea-list").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-idea-action]");
  if (!button) return;

  const ideaId = button.dataset.ideaId;
  if (button.dataset.ideaAction === "edit") {
    startIdeaEdit(ideaId);
    return;
  }

  if (button.dataset.ideaAction === "delete") {
    await deleteIdea(ideaId);
  }
});

document.querySelector("#idea-edit-cancel").addEventListener("click", () => {
  resetIdeaForm();
  toast("Modification annulée.");
});

document.querySelector("#agent-task-board").addEventListener("click", async (event) => {
  const statusButton = event.target.closest("[data-agent-task-status-id]");
  if (statusButton) {
    await setAgentTaskStatus(statusButton.dataset.agentTaskStatusId, statusButton.dataset.agentTaskStatus);
    return;
  }

  const actionButton = event.target.closest("[data-agent-task-action]");
  if (!actionButton) return;

  const taskId = actionButton.dataset.agentTaskId;
  if (actionButton.dataset.agentTaskAction === "edit") {
    startAgentTaskEdit(taskId);
    return;
  }

  if (actionButton.dataset.agentTaskAction === "execute") {
    await executeAgentTask(taskId);
    return;
  }

  if (actionButton.dataset.agentTaskAction === "verify-execution") {
    await verifyTaskExecution(taskId, actionButton.dataset.executionId);
    return;
  }

  if (actionButton.dataset.agentTaskAction === "delete") {
    await deleteAgentTask(taskId);
  }
});

document.querySelector("#agent-task-edit-cancel").addEventListener("click", () => {
  resetAgentTaskForm();
  toast("Modification annulée.");
});

document.querySelector("#backlog-board").addEventListener("click", async (event) => {
  const statusButton = event.target.closest("[data-backlog-status-id]");
  if (statusButton) {
    await setBacklogStatus(statusButton.dataset.backlogStatusId, statusButton.dataset.backlogStatus);
    return;
  }

  const actionButton = event.target.closest("[data-backlog-action]");
  if (!actionButton) return;

  if (actionButton.dataset.backlogAction === "edit") {
    startBacklogEdit(actionButton.dataset.backlogId);
    return;
  }

  if (actionButton.dataset.backlogAction === "delete") {
    await deleteBacklogItem(actionButton.dataset.backlogId);
  }
});

document.querySelector("#backlog-edit-cancel").addEventListener("click", () => {
  resetBacklogForm();
  toast("Modification annulée.");
});

document.querySelector("#decision-list").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-decision-action]");
  if (!button) return;

  if (button.dataset.decisionAction === "edit") {
    startDecisionEdit(button.dataset.decisionId);
    return;
  }

  if (button.dataset.decisionAction === "delete") {
    await deleteDecision(button.dataset.decisionId);
  }
});

document.querySelector("#decision-edit-cancel").addEventListener("click", () => {
  resetDecisionForm();
  toast("Modification annulée.");
});

document.querySelector("#project-detail-close").addEventListener("click", () => {
  document.querySelector("#project-detail-panel").classList.add("hidden");
});

document.querySelector("#project-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const projectStatus = normalizeProjectStatus(data.status);
  const projectPayload = {
    name: data.name,
    objective: data.objective,
    nextAction: data.nextAction,
    status: projectStatus,
    priority: data.priority,
    priorityScore: {
      speed: Number(data.scoreSpeed || 3),
      motivation: Number(data.scoreMotivation || 3),
      effortGain: Number(data.scoreEffortGain || 3),
      financial: Number(data.scoreFinancial || 3)
    },
    finalResult: data.finalResult || "",
    closureDate: projectStatus === "clôturé" ? (data.closureDate || todayIsoDate()) : "",
    projectLog: data.projectLog || "",
    lastUpdated: todayIsoDate()
  };
  const shouldCreateFromTemplate = Boolean(data.createFromTemplate) && !editingProjectId;

  if (editingProjectId) {
    state.projects = state.projects.map((project) => (
      project.id === editingProjectId ? { ...project, ...projectPayload } : project
    ));
    addActivity("project", `Projet modifié : ${projectPayload.name}`, projectPayload.nextAction, editingProjectId);
  } else if (shouldCreateFromTemplate) {
    const slug = slugifyProjectName(projectPayload.name);
    const targetPath = `amsclaw/projects/${slug}/`;
    const files = [
      `${targetPath}README.md`,
      `${targetPath}docs/PROJECT_BRIEF.md`,
      `${targetPath}docs/NEXT_STEPS.md`,
      `${targetPath}docs/PROJECT_CHECKLIST.md`
    ].join("\n");

    if (!window.confirm(`Créer le projet "${projectPayload.name}" ?\n\nDossier : ${targetPath}\n\nFichiers :\n${files}\n\nAucun fichier existant ne sera écrasé.`)) {
      return;
    }

    toast("Création du dossier projet en cours...");
    try {
      const result = await createProjectFromTemplate(projectPayload);
      resetProjectForm();
      renderAll();
      toast(result.message || "Projet créé depuis le modèle.");
    } catch (error) {
      toast(`Création impossible : ${error.message}`);
    }
    return;
  } else {
    const projectId = crypto.randomUUID();
    state.projects.push({
      id: projectId,
      status: "actif",
      actionStatus: "todo",
      owner: "amsClaw",
      blockers: [],
      ...projectPayload
    });
    addActivity("project", `Projet ajouté : ${projectPayload.name}`, projectPayload.nextAction, projectId);
  }

  const wasEditing = Boolean(editingProjectId);
  resetProjectForm();
  renderAll();
  toast(wasEditing ? "Projet modifié à l'écran, sauvegarde en cours..." : "Projet ajouté à l'écran, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  if (wasEditing) {
    toast(saved ? "Modification enregistrée dans dashboard-data.json." : "Modification visible à l'écran seulement.");
  } else {
    toast(saved ? "Projet ajouté dans dashboard-data.json." : "Projet ajouté à l'écran seulement.");
  }
});

document.querySelector("#idea-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const ideaPayload = {
    name: data.name,
    market: data.market,
    problem: data.problem,
    speed: Number(data.speed),
    motivation: Number(data.motivation),
    effortGain: Number(data.effortGain),
    financial: Number(data.financial)
  };

  if (editingIdeaId) {
    state.ideas = state.ideas.map((idea) => (
      idea.id === editingIdeaId ? { ...idea, ...ideaPayload } : idea
    ));
  } else {
    state.ideas.push({
      id: crypto.randomUUID(),
      ...ideaPayload
    });
  }

  const wasEditing = Boolean(editingIdeaId);
  resetIdeaForm();
  renderAll();
  toast(wasEditing ? "Idée modifiée à l'écran, sauvegarde en cours..." : "Idée ajoutée à l'écran, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  if (wasEditing) {
    toast(saved ? "Modification enregistrée dans dashboard-data.json." : "Modification visible à l'écran seulement.");
  } else {
    toast(saved ? "Idée ajoutée dans dashboard-data.json." : "Idée ajoutée à l'écran seulement.");
  }
});

document.querySelector("#agent-task-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const taskPayload = {
    title: data.title,
    owner: data.owner,
    linkedItem: data.linkedItem,
    priority: data.priority,
    dueDate: data.dueDate || "",
    note: data.note
  };

  if (editingAgentTaskId) {
    state.agentTasks = state.agentTasks.map((task) => (
      task.id === editingAgentTaskId ? { ...task, ...taskPayload } : task
    ));
    addActivity("task", `Tâche modifiée : ${taskPayload.title}`);
  } else {
    state.agentTasks.push({
      id: crypto.randomUUID(),
      status: "todo",
      ...taskPayload
    });
    addActivity("task", `Tâche ajoutée : ${taskPayload.title}`);
  }

  const wasEditing = Boolean(editingAgentTaskId);
  resetAgentTaskForm();
  renderAll();
  toast(wasEditing ? "Tâche modifiée à l'écran, sauvegarde en cours..." : "Tâche ajoutée à l'écran, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  if (wasEditing) {
    toast(saved ? "Modification enregistrée dans dashboard-data.json." : "Modification visible à l'écran seulement.");
  } else {
    toast(saved ? "Tâche ajoutée dans dashboard-data.json." : "Tâche ajoutée à l'écran seulement.");
  }
});

document.querySelector("#backlog-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const itemPayload = {
    title: data.title,
    category: data.category,
    priority: data.priority,
    status: normalizeBacklogStatus(data.status),
    nextAction: data.nextAction || "",
    notes: ""
  };

  if (editingBacklogItemId) {
    state.backlogItems = state.backlogItems.map((item) => (
      item.id === editingBacklogItemId ? { ...item, ...itemPayload } : item
    ));
    addActivity("backlog", `Backlog modifié : ${itemPayload.title}`);
  } else {
    state.backlogItems.push({
      id: crypto.randomUUID(),
      ...itemPayload
    });
    addActivity("backlog", `Backlog ajouté : ${itemPayload.title}`);
  }

  const wasEditing = Boolean(editingBacklogItemId);
  resetBacklogForm();
  renderAll();
  toast(wasEditing ? "Backlog modifié, sauvegarde en cours..." : "Backlog ajouté, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  toast(saved ? "Backlog enregistré dans dashboard-data.json." : "Backlog visible à l'écran seulement.");
});

document.querySelector("#decision-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const decisionPayload = {
    date: data.date || todayIsoDate(),
    projectId: data.projectId || "",
    title: data.title,
    decision: data.decision,
    rationale: data.rationale || "",
    impact: data.impact || ""
  };

  if (editingDecisionId) {
    state.decisions = state.decisions.map((decision) => (
      decision.id === editingDecisionId ? { ...decision, ...decisionPayload } : decision
    ));
    addActivity("decision", `Décision modifiée : ${decisionPayload.title}`, decisionPayload.decision, decisionPayload.projectId);
  } else {
    state.decisions.push({
      id: crypto.randomUUID(),
      ...decisionPayload
    });
    addActivity("decision", `Décision ajoutée : ${decisionPayload.title}`, decisionPayload.decision, decisionPayload.projectId);
  }

  const wasEditing = Boolean(editingDecisionId);
  resetDecisionForm();
  renderAll();
  toast(wasEditing ? "Décision modifiée, sauvegarde en cours..." : "Décision ajoutée, sauvegarde en cours...");
  const saved = await saveState();
  renderAll();
  toast(saved ? "Décision enregistrée dans dashboard-data.json." : "Décision visible à l'écran seulement.");
});

document.querySelector("#routine-columns").addEventListener("change", async (event) => {
  if (!event.target.matches("[data-routine-key]")) return;
  state.completedRoutines[event.target.dataset.routineKey] = event.target.checked;
  await saveState();
  renderAll();
});

document.querySelector("#tracking-board").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-tracking-project-id]");
  if (!button) return;
  await setProjectActionStatus(button.dataset.trackingProjectId, button.dataset.trackingStatus);
});

document.querySelector("#copy-report").addEventListener("click", async () => {
  await navigator.clipboard.writeText(buildReport());
  toast("Rapport copié dans le presse-papiers.");
});

document.querySelector("#copy-weekly-review").addEventListener("click", async () => {
  await navigator.clipboard.writeText(buildWeeklyReview());
  toast("Revue hebdo copiée dans le presse-papiers.");
});

document.querySelector("#export-projects-md").addEventListener("click", () => {
  downloadTextFile(`amsclaw-projets-${todayIsoDate()}.md`, buildProjectsMarkdownExport(), "text/markdown;charset=utf-8");
  toast("Export Markdown généré.");
});

document.querySelector("#export-projects-json").addEventListener("click", () => {
  downloadTextFile(
    `amsclaw-projets-${todayIsoDate()}.json`,
    JSON.stringify({ exportedAt: todayIsoDate(), projects: state.projects }, null, 2),
    "application/json;charset=utf-8"
  );
  toast("Export JSON généré.");
});

document.querySelector("#reset-demo").addEventListener("click", async () => {
  defaultState = await loadDefaultState();
  state = structuredClone(defaultState);
  renderAll();
  toast("Données source rechargées depuis dashboard-data.json.");
});

async function init() {
  defaultState = await loadDefaultState();
  state = structuredClone(defaultState);
  resetDecisionForm();
  renderAll();
}

init();
