const state = {
  data: null,
  currentUser: JSON.parse(localStorage.getItem("crmCurrentUser") || "null"),
  sessionToken: localStorage.getItem("crmSessionToken") || "",
  view: "dashboard",
  selectedStudentId: "",
  filters: {
    search: "",
    classId: "",
    schoolStatus: "",
    completenessStatus: "",
    archived: "active"
  },
  importAnalysis: null,
  photoEditor: null
};

const roleLabels = {
  admin: "Administrateur / Direction",
  secretariat: "Secretariat",
  instructeur: "Instructeur"
};

const statusLabels = {
  a_jour: "a jour",
  non_a_jour: "non a jour",
  a_verifier: "a verifier"
};

const completenessLabels = {
  complet: "complet",
  a_completer: "donnees a completer",
  bloquant: "bloquant"
};

function qs(selector) {
  return document.querySelector(selector);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toast(message, tone = "ok") {
  const target = qs("#toast");
  target.textContent = message;
  target.style.color = tone === "error" ? "var(--red)" : "var(--green)";
  if (message) setTimeout(() => { target.textContent = ""; }, 3600);
}

async function api(path, options = {}) {
  const headers = options.body instanceof FormData
    ? { ...(state.sessionToken ? { "X-CRM-Session": state.sessionToken } : {}), ...(options.headers || {}) }
    : {
      "Content-Type": "application/json",
      ...(state.sessionToken ? { "X-CRM-Session": state.sessionToken } : {}),
      ...(options.headers || {})
    };
  const response = await fetch(path, {
    ...options,
    headers
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    if (response.status === 401 && path !== "/api/login") {
      localStorage.removeItem("crmCurrentUser");
      localStorage.removeItem("crmSessionToken");
      state.currentUser = null;
      state.sessionToken = "";
    }
    throw new Error(payload.error || "Erreur applicative.");
  }
  return response.json();
}

async function downloadFile(path) {
  const response = await fetch(path, {
    headers: state.sessionToken ? { "X-CRM-Session": state.sessionToken } : {}
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || "Export impossible.");
  }
  const blob = await response.blob();
  const disposition = response.headers.get("content-disposition") || "";
  const match = disposition.match(/filename="?([^"]+)"?/i);
  const filename = match?.[1] || "export.xlsx";
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function loadState() {
  state.data = await api("/api/state");
}

function canManageData() {
  return ["admin", "secretariat"].includes(state.currentUser?.role);
}

function isAdmin() {
  return state.currentUser?.role === "admin";
}

function canExport() {
  return canManageData();
}

function classById(id) {
  return state.data.classes.find((item) => item.id === id);
}

function userById(id) {
  return state.data.users.find((item) => item.id === id);
}

function visibleStudents() {
  let students = [...state.data.students];
  if (state.currentUser?.role === "instructeur") {
    const allowed = new Set(state.data.classes
      .filter((item) => item.instructorIds.includes(state.currentUser.id))
      .map((item) => item.id));
    students = students.filter((student) => allowed.has(student.classId));
  }
  if (state.filters.archived === "active") students = students.filter((student) => !student.archived);
  if (state.filters.archived === "archived") students = students.filter((student) => student.archived);
  if (state.filters.classId) students = students.filter((student) => student.classId === state.filters.classId);
  if (state.filters.schoolStatus) students = students.filter((student) => student.schoolStatus === state.filters.schoolStatus);
  if (state.filters.completenessStatus) students = students.filter((student) => student.completenessStatus === state.filters.completenessStatus);
  const search = state.filters.search.trim().toLowerCase();
  if (search) {
    students = students.filter((student) => [
      student.matricule,
      student.lastName,
      student.firstName,
      classById(student.classId)?.name
    ].join(" ").toLowerCase().includes(search));
  }
  return students.sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`));
}

function badge(label, type = "gray") {
  return `<span class="badge ${type}">${escapeHtml(label)}</span>`;
}

function statusBadge(status) {
  const type = status === "a_jour" ? "green" : status === "non_a_jour" ? "red" : "amber";
  return badge(statusLabels[status] || status, type);
}

function completenessBadge(status) {
  return badge(completenessLabels[status] || status, status === "complet" ? "green" : "amber");
}

function studentInitials(student = {}) {
  const first = String(student.firstName || "").trim().charAt(0);
  const last = String(student.lastName || "").trim().charAt(0);
  return `${last}${first}`.toUpperCase() || "?";
}

function studentFullName(student = {}) {
  return `${student.lastName || ""} ${student.firstName || ""}`.trim() || "Eleve";
}

function normalizeHeader(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function formatDateFr(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR");
}

function studentAvatar(student = {}, size = "medium") {
  const photo = String(student.photoDataUrl || "");
  if (photo) {
    return `<img class="student-avatar ${size}" src="${escapeHtml(photo)}" alt="Photo de ${escapeHtml(studentFullName(student))}">`;
  }
  return `<span class="student-avatar ${size} fallback">${escapeHtml(studentInitials(student))}</span>`;
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.add("hidden"));
  qs(`#${view}-panel`).classList.remove("hidden");
  const titles = {
    dashboard: ["Pilotage", "Tableau de bord"],
    students: ["Registre", "Eleves"],
    classes: ["Parametrage", "Classes"],
    users: ["Parametrage", "Utilisateurs"],
    import: ["Donnees", "Import / Export"],
    backup: ["Securite", "Sauvegarde"]
  };
  qs("#view-kicker").textContent = titles[view][0];
  qs("#view-title").textContent = titles[view][1];
  render();
}

function showAuthenticatedShell() {
  qs("#login-view").classList.add("hidden");
  qs("#main-view").classList.remove("hidden");
  qs("#current-user-label").textContent = state.currentUser.name;
  qs("#current-role-label").textContent = roleLabels[state.currentUser.role] || state.currentUser.role;
}

function render() {
  if (!state.currentUser || !state.data) return;
  renderDashboard();
  renderStudents();
  renderClasses();
  renderUsers();
  renderImportExport();
  renderBackup();
}

function renderDashboard() {
  const activeStudents = state.data.students.filter((student) => !student.archived);
  const activeClasses = state.data.classes.filter((item) => item.active);
  const incomplete = activeStudents.filter((student) => student.completenessStatus === "a_completer");
  const byStatus = Object.keys(statusLabels).map((status) => ({
    status,
    count: activeStudents.filter((student) => student.schoolStatus === status).length
  }));
  const latest = [...activeStudents]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 5);

  // Cycles distribution
  const cycles = {};
  for (const student of activeStudents) {
    const classItem = classById(student.classId);
    const cycle = classItem?.level || "Non renseigne";
    cycles[cycle] = (cycles[cycle] || 0) + 1;
  }
  const cycleEntries = Object.entries(cycles).sort((a, b) => a[0].localeCompare(b[0]));

  // Classes without instructor
  const classesWithoutInstructor = activeClasses.filter(
    (classItem) => !classItem.instructorIds || classItem.instructorIds.length === 0
  );

  // Incomplete by class
  const incompleteByClass = {};
  for (const student of incomplete) {
    const classItem = classById(student.classId);
    const className = classItem?.name || "Sans classe";
    incompleteByClass[className] = (incompleteByClass[className] || 0) + 1;
  }
  const incompleteEntries = Object.entries(incompleteByClass).sort((a, b) => b[1] - a[1]);

  // Render static content first, then fetch metadata in background
  const lastImportText = "A charger...";
  const lastBackupText = "A charger...";
  const renderStaticDashboard = () => {
    qs("#dashboard-panel").innerHTML = `
    <div class="grid three">
      <div class="metric"><span>Eleves actifs</span><strong>${activeStudents.length}</strong></div>
      <div class="metric"><span>Classes actives</span><strong>${activeClasses.length}</strong></div>
      <div class="metric"><span>Donnees a completer</span><strong>${incomplete.length}</strong></div>
    </div>
    <div class="grid two" style="margin-top:14px">
      <div class="panel stack">
        <h3>Effectifs par classe</h3>
        ${activeClasses.map((classItem) => `
          <p><strong>${escapeHtml(classItem.name)}</strong> - ${activeStudents.filter((student) => student.classId === classItem.id).length} eleve(s)</p>
        `).join("") || `<p class="muted">Aucune classe active.</p>`}
        <hr>
        <h3>Repartition par cycle</h3>
        ${cycleEntries.map(([cycle, count]) => `<p><strong>${escapeHtml(cycle)}</strong> - ${count} eleve(s)</p>`).join("") || `<p class="muted">Aucune donnee.</p>`}
      </div>
      <div class="panel stack">
        <h3>Statuts de scolarite</h3>
        ${byStatus.map((item) => `<p>${statusBadge(item.status)} ${item.count} eleve(s)</p>`).join("")}
      </div>
    </div>
    <div class="grid two" style="margin-top:14px">
      <div class="panel stack">
        <h3>Classes sans instructeur principal</h3>
        ${classesWithoutInstructor.length
          ? classesWithoutInstructor.map((classItem) => `<p><strong>${escapeHtml(classItem.name)}</strong></p>`).join("")
          : `<p class="muted">Toutes les classes ont un instructeur.</p>`}
      </div>
      <div class="panel stack">
        <h3>Fiches a completer par classe</h3>
        ${incompleteEntries.length
          ? incompleteEntries.map(([className, count]) => `<p><strong>${escapeHtml(className)}</strong> - ${count} eleve(s)</p>`).join("")
          : `<p class="muted">Aucune fiche a completer.</p>`}
      </div>
    </div>
    <div class="panel stack" style="margin-top:14px">
      <h3>Derniers eleves ajoutes</h3>
      ${latest.map((student) => `<p><strong>${escapeHtml(student.lastName)} ${escapeHtml(student.firstName)}</strong> - ${escapeHtml(classById(student.classId)?.name || "")}</p>`).join("") || `<p class="muted">Aucun eleve pour le moment.</p>`}
    </div>
    <div class="grid two" style="margin-top:14px">
      <div class="panel compact-stack">
        <h3>Dernier import</h3>
        <p class="muted">${escapeHtml(lastImportText)}</p>
      </div>
      <div class="panel compact-stack">
        <h3>Derniere sauvegarde</h3>
        <p class="muted" id="dashboard-last-backup">${escapeHtml(lastBackupText)}</p>
      </div>
    </div>
  `;
  };

  renderStaticDashboard();

  // Fetch metadata asynchronously without blocking the rest of the UI
  fetch("/api/import/last", { headers: state.sessionToken ? { "X-CRM-Session": state.sessionToken } : {} })
    .then((r) => r.ok ? r.json() : null)
    .then((data) => {
      if (data?.lastImportAt) {
        const el = document.querySelector("#dashboard-panel .panel.compact-stack:first-child .muted");
        if (el) el.textContent = new Date(data.lastImportAt).toLocaleString("fr-FR");
      }
    })
    .catch(() => {});
  fetch("/api/backup/last", { headers: state.sessionToken ? { "X-CRM-Session": state.sessionToken } : {} })
    .then((r) => r.ok ? r.json() : null)
    .then((data) => {
      if (data?.lastBackupAt) {
        const el = document.getElementById("dashboard-last-backup");
        if (el) el.textContent = new Date(data.lastBackupAt).toLocaleString("fr-FR");
      }
    })
    .catch(() => {});
}

function classOptions(selected = "", onlyActive = true) {
  return state.data.classes
    .filter((item) => !onlyActive || item.active || item.id === selected)
    .map((item) => `<option value="${item.id}" ${item.id === selected ? "selected" : ""}>${escapeHtml(item.name)}</option>`)
    .join("");
}

function cycleOptions(selected = "") {
  const cycles = ["Maternelle", "Primaire", "College", "Lycee"];
  return `<option value="">Choisir un cycle</option>${cycles
    .map((cycle) => `<option value="${cycle}" ${cycle === selected ? "selected" : ""}>${cycle}</option>`)
    .join("")}`;
}

function instructorOptions(selected = []) {
  const selectedSet = new Set(selected);
  const options = state.data.users
    .filter((user) => user.role === "instructeur" && (user.active || selectedSet.has(user.id)))
    .map((user) => `
      <option value="${user.id}" ${selectedSet.has(user.id) ? "selected" : ""}>${escapeHtml(user.name)}${user.active ? "" : " (desactive)"}</option>
    `).join("");
  return `<option value="">Aucun instructeur principal</option>${options}`;
}

function studentForm(student = {}) {
  const disabled = canManageData() ? "" : "disabled";
  return `
    <form id="student-form" class="stack" action="javascript:void(0)" novalidate>
      <input type="hidden" name="id" value="${escapeHtml(student.id || "")}">
      <input type="hidden" name="photoDataUrl" value="${escapeHtml(student.photoDataUrl || "")}">
      <div class="student-photo-block">
        ${studentAvatar(student, "large")}
        <div class="student-photo-actions">
          <strong>Photo eleve</strong>
          ${canManageData() ? `
            <div class="button-row">
              <label class="secondary-button file-button ${student.photoDataUrl ? "hidden" : ""}">Choisir une photo<input id="student-photo-file" type="file" accept="image/*"></label>
              <button class="secondary-button ${student.photoDataUrl ? "" : "hidden"}" type="button" id="remove-student-photo">Supprimer</button>
            </div>
          ` : ""}
        </div>
      </div>
      <div id="photo-editor" class="photo-editor hidden"></div>
      <div class="form-grid">
        <label>Matricule<input name="matricule" value="${escapeHtml(student.matricule || "")}" ${disabled}></label>
        <label>Classe<select name="classId" required ${disabled}><option value="">Choisir</option>${classOptions(student.classId)}</select></label>
        <label>Nom<input name="lastName" value="${escapeHtml(student.lastName || "")}" required ${disabled}></label>
        <label>Prenom<input name="firstName" value="${escapeHtml(student.firstName || "")}" ${disabled}></label>
        <label>Sexe<select name="sex" ${disabled}><option value="">Non renseigne</option><option ${student.sex === "F" ? "selected" : ""}>F</option><option ${student.sex === "M" ? "selected" : ""}>M</option></select></label>
        <label>Date de naissance<input name="birthDate" type="date" value="${escapeHtml(student.birthDate || "")}" ${disabled}></label>
        <label>Lieu de naissance<input name="birthPlace" value="${escapeHtml(student.birthPlace || "")}" ${disabled}></label>
        <label>Statut scolarite<select name="schoolStatus" ${disabled}>
          ${Object.entries(statusLabels).map(([key, label]) => `<option value="${key}" ${student.schoolStatus === key ? "selected" : ""}>${label}</option>`).join("")}
        </select></label>
        <label>Parent 1<input name="parent1" value="${escapeHtml(student.parent1 || "")}" ${disabled}></label>
        <label>Parent 2<input name="parent2" value="${escapeHtml(student.parent2 || "")}" ${disabled}></label>
        <label>Telephone parent<input name="parentPhone" value="${escapeHtml(student.parentPhone || "")}" ${disabled}></label>
        <label>Adresse<input name="address" value="${escapeHtml(student.address || "")}" ${disabled}></label>
      </div>
      <label>Commentaire administratif<textarea name="administrativeNote" ${disabled}>${escapeHtml(student.administrativeNote || "")}</textarea></label>
      ${canManageData() ? `<div class="button-row"><button class="primary-button" type="submit">${student.id ? "Enregistrer" : "Creer l'eleve"}</button>${student.id ? `<button class="danger-button" type="button" data-archive-student="${student.id}">${student.archived ? "Restaurer" : "Archiver"}</button>` : ""}</div>` : ""}
    </form>
  `;
}

function renderStudents() {
  const students = visibleStudents();
  const isNewStudent = state.selectedStudentId === "__new__";
  const selected = isNewStudent ? null : state.data.students.find((student) => student.id === state.selectedStudentId) || students[0] || null;
  if (selected && !state.selectedStudentId) state.selectedStudentId = selected.id;
  const detailTitle = selected ? `Fiche eleve - ${escapeHtml(`${selected.lastName || ""} ${selected.firstName || ""}`.trim())}` : "Nouvel eleve";

  qs("#students-panel").innerHTML = `
    <div class="filters">
      <input id="student-search" placeholder="Rechercher nom, prenom, matricule, classe" value="${escapeHtml(state.filters.search)}">
      <select id="filter-class"><option value="">Toutes classes</option>${classOptions(state.filters.classId, false)}</select>
      <select id="filter-school-status"><option value="">Tous statuts</option>${Object.entries(statusLabels).map(([key, label]) => `<option value="${key}" ${state.filters.schoolStatus === key ? "selected" : ""}>${label}</option>`).join("")}</select>
      <select id="filter-completeness"><option value="">Toute completude</option>${Object.entries(completenessLabels).map(([key, label]) => `<option value="${key}" ${state.filters.completenessStatus === key ? "selected" : ""}>${label}</option>`).join("")}</select>
      <select id="filter-archived"><option value="active" ${state.filters.archived === "active" ? "selected" : ""}>Actifs</option><option value="archived" ${state.filters.archived === "archived" ? "selected" : ""}>Archives</option><option value="all" ${state.filters.archived === "all" ? "selected" : ""}>Tous</option></select>
    </div>
    <div class="button-row" style="margin-bottom:12px">
      ${canManageData() ? `<button class="primary-button" type="button" id="new-student-button">Nouvel eleve</button>` : ""}
    </div>
    <div class="grid two students-layout">
      <div class="table-wrap students-list-panel" id="students-list-panel">
        <table>
          <thead><tr><th>Eleve</th><th>Classe</th><th>Scolarite</th><th>Completude</th><th></th></tr></thead>
          <tbody>
            ${students.map((student) => `
              <tr class="${student.id === selected?.id ? "student-row selected" : "student-row"}" data-student-row="${student.id}" ${student.id === selected?.id ? `aria-current="true"` : ""}>
                <td><div class="student-list-cell">${studentAvatar(student, "small")}<div><strong>${escapeHtml(student.lastName)} ${escapeHtml(student.firstName)}</strong><br><span class="muted">${escapeHtml(student.matricule || "sans matricule")}</span></div></div></td>
                <td>${escapeHtml(classById(student.classId)?.name || "")}</td>
                <td>${statusBadge(student.schoolStatus)}</td>
                <td>${completenessBadge(student.completenessStatus)}</td>
                <td><button class="secondary-button" type="button" data-select-student="${student.id}">Ouvrir</button></td>
              </tr>
            `).join("") || `<tr><td colspan="5" class="muted">Aucun eleve trouve.</td></tr>`}
          </tbody>
        </table>
      </div>
      <div class="panel student-detail stack">
        <h3>${detailTitle}</h3>
        ${studentForm(selected || {})}
        ${selected ? renderStudentDetails(selected) : ""}
      </div>
    </div>
  `;
}

function focusStudentDetailOnSmallScreen() {
  if (!window.matchMedia("(max-width: 980px)").matches) return;
  requestAnimationFrame(() => {
    qs(".student-detail")?.scrollIntoView({ block: "start" });
  });
}

function renderStudentDetails(student) {
  const canEdit = canManageData();
  const currentUserId = state.currentUser?.id;
  const statusCheckedDate = student.schoolStatusCheckedAt
    ? new Date(student.schoolStatusCheckedAt).toLocaleString("fr-FR")
    : null;
  const activeComments = (student.comments || []).filter((c) => !c.archived);
  const archivedComments = (student.comments || []).filter((c) => c.archived);
  return `
    <div class="stack">
      <div class="button-row">
        <button class="secondary-button" type="button" data-print-student="${student.id}">Imprimer la fiche</button>
        ${canEdit ? `<button class="primary-button" type="button" data-verify-status="${student.id}">Marquer scolarite verifiee</button>` : ""}
      </div>
      <div class="panel compact-stack"><span class="muted">Derniere verification scolarite</span><strong>${statusCheckedDate ? escapeHtml(statusCheckedDate) : "Non verifiee"}</strong></div>
      ${student.archiveMotif ? `<div class="panel compact-stack"><span class="muted">Motif d'archivage</span><strong>${escapeHtml(student.archiveMotif)}</strong></div>` : ""}
      ${renderStudentPrintSheet(student)}
      <h4>Commentaires internes</h4>
      ${activeComments.map((comment) => `
        <div class="comment-item" data-comment-id="${comment.id}">
          <strong>${escapeHtml(comment.authorName)}</strong>
          <span class="muted">${new Date(comment.createdAt).toLocaleString("fr-FR")}</span>
          <p class="comment-text">${escapeHtml(comment.text)}</p>
          <div class="button-row" style="margin-top:6px">
            ${(comment.authorId === currentUserId || isAdmin()) ? `<button class="secondary-button" type="button" data-edit-comment="${comment.id}" style="min-height:30px;font-size:12px">Modifier</button>` : ""}
            ${(comment.authorId === currentUserId || isAdmin()) ? `<button class="secondary-button" type="button" data-archive-comment="${comment.id}" style="min-height:30px;font-size:12px">${comment.archived ? "Restaurer" : "Archiver"}</button>` : ""}
          </div>
        </div>
      `).join("") || `<p class="muted">Aucun commentaire.</p>`}
      ${archivedComments.length ? `
        <details>
          <summary class="muted" style="cursor:pointer;font-size:13px">Afficher les commentaires archives (${archivedComments.length})</summary>
          ${archivedComments.map((comment) => `
            <div class="comment-item is-muted" data-comment-id="${comment.id}">
              <strong>${escapeHtml(comment.authorName)}</strong>
              <span class="muted">${new Date(comment.createdAt).toLocaleString("fr-FR")}</span>
              <p class="comment-text">${escapeHtml(comment.text)}</p>
              <div class="button-row" style="margin-top:6px">
                ${(comment.authorId === currentUserId || isAdmin()) ? `<button class="secondary-button" type="button" data-edit-comment="${comment.id}" style="min-height:30px;font-size:12px">Modifier</button>` : ""}
                ${(comment.authorId === currentUserId || isAdmin()) ? `<button class="secondary-button" type="button" data-archive-comment="${comment.id}" style="min-height:30px;font-size:12px">Restaurer</button>` : ""}
              </div>
            </div>
          `).join("")}
        </details>
      ` : ""}
      <form id="comment-form" class="stack">
        <textarea name="text" placeholder="Ajouter un commentaire de suivi interne" required></textarea>
        <button class="secondary-button" type="submit">Ajouter le commentaire</button>
      </form>
    </div>
  `;
}

function printRow(label, value) {
  return `
    <div class="print-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value || "-")}</strong>
    </div>
  `;
}

function renderStudentPrintSheet(student) {
  const classItem = classById(student.classId);
  const comments = [...(student.comments || [])]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 5);
  return `
    <article class="print-student-sheet" aria-label="Fiche eleve imprimable">
      <header class="print-header">
        <div>
          <p class="eyebrow">GS AIME CESAIRE TKB</p>
          <h1>Fiche eleve</h1>
          <p>${escapeHtml(studentFullName(student))}</p>
        </div>
        ${studentAvatar(student, "large")}
      </header>
      <section class="print-section">
        <h2>Identite</h2>
        <div class="print-grid">
          ${printRow("Matricule", student.matricule)}
          ${printRow("Classe", classItem?.name)}
          ${printRow("Cycle", classItem?.level)}
          ${printRow("Sexe", student.sex)}
          ${printRow("Date de naissance", formatDateFr(student.birthDate))}
          ${printRow("Lieu de naissance", student.birthPlace)}
        </div>
      </section>
      <section class="print-section">
        <h2>Responsables</h2>
        <div class="print-grid">
          ${printRow("Parent 1", student.parent1)}
          ${printRow("Parent 2", student.parent2)}
          ${printRow("Telephone", student.parentPhone)}
          ${printRow("Adresse", student.address)}
        </div>
      </section>
      <section class="print-section">
        <h2>Suivi administratif</h2>
        <div class="print-grid">
          ${printRow("Statut scolarite", statusLabels[student.schoolStatus] || student.schoolStatus)}
          ${printRow("Derniere verification", student.schoolStatusCheckedAt ? formatDateFr(student.schoolStatusCheckedAt) : "Non verifiee")}
          ${printRow("Completude", completenessLabels[student.completenessStatus] || student.completenessStatus)}
          ${printRow("Champs manquants", (student.missingFields || []).join(", ") || "Aucun")}
          ${printRow("Statut fiche", student.archived ? "Archivee" : "Active")}
          ${student.archiveMotif ? printRow("Motif archivage", student.archiveMotif) : ""}
        </div>
        ${student.administrativeNote ? `<p class="print-note">${escapeHtml(student.administrativeNote)}</p>` : ""}
      </section>
      <section class="print-section">
        <h2>Derniers commentaires internes</h2>
        ${comments.map((comment) => `
          <div class="print-comment">
            <strong>${escapeHtml(comment.authorName)}</strong>
            <span>${escapeHtml(formatDateFr(comment.createdAt))}</span>
            <p>${escapeHtml(comment.text)}</p>
          </div>
        `).join("") || `<p>Aucun commentaire.</p>`}
      </section>
      <footer class="print-footer">
        Document genere depuis le CRM ecole le ${new Date().toLocaleDateString("fr-FR")}.
      </footer>
    </article>
  `;
}

function cleanupPrintOutput() {
  document.body.classList.remove("is-printing-student");
  qs("#print-output")?.remove();
}

function prepareStudentPrint() {
  const source = qs(".student-detail .print-student-sheet");
  if (!source) {
    toast("Aucune fiche eleve a imprimer.", "error");
    return false;
  }
  cleanupPrintOutput();
  const output = document.createElement("section");
  output.id = "print-output";
  output.setAttribute("aria-label", "Sortie impression fiche eleve");
  output.appendChild(source.cloneNode(true));
  document.body.appendChild(output);
  document.body.classList.add("is-printing-student");
  return true;
}

function printStudentSheet() {
  if (!prepareStudentPrint()) return;
  window.print();
  setTimeout(cleanupPrintOutput, 500);
}

function renderClasses() {
  qs("#classes-panel").innerHTML = `
    <div class="management-layout">
      <div class="panel stack">
        <h3>Nouvelle classe</h3>
        <form id="class-form" class="stack">
          <label>Nom<input name="name" required></label>
          <label>Cycle<select name="level">${cycleOptions()}</select></label>
          <label>Instructeur principal<select name="instructorIds">${instructorOptions()}</select></label>
          <button class="primary-button" type="submit">Creer la classe</button>
        </form>
      </div>
      <div class="management-list">
        ${state.data.classes.map((classItem) => {
          const activeStudentCount = state.data.students.filter((student) => student.classId === classItem.id && !student.archived).length;
          return `
            <article class="management-card ${classItem.active ? "" : "is-muted"}" data-class-row="${classItem.id}">
              <header class="management-card-header">
                <div>
                  <p class="card-kicker">Classe</p>
                  <h3>${escapeHtml(classItem.name)}</h3>
                </div>
                <div class="status-group">
                  ${badge(classItem.active ? "active" : "archivee", classItem.active ? "green" : "gray")}
                  <span class="count-pill">${activeStudentCount} eleve(s)</span>
                </div>
              </header>
              <div class="management-fields">
                <label>Nom<input name="name" value="${escapeHtml(classItem.name)}" required></label>
                <label>Cycle<select name="level">${cycleOptions(classItem.level || "")}</select></label>
                <label>Statut<select name="active">
                  <option value="true" ${classItem.active ? "selected" : ""}>Active</option>
                  <option value="false" ${!classItem.active ? "selected" : ""}>Archivee</option>
                </select></label>
              </div>
              <div class="management-instructors">
                <label>Instructeur principal<select name="instructorIds">${instructorOptions(classItem.instructorIds)}</select></label>
              </div>
              <div class="card-actions">
                <button class="primary-button" type="button" data-save-class="${classItem.id}">Enregistrer</button>
              </div>
            </article>
          `;
        }).join("") || `<p class="muted">Aucune classe creee.</p>`}
      </div>
    </div>
  `;
}

function renderUsers() {
  qs("#users-panel").innerHTML = `
    <div class="management-layout">
      <div class="panel stack">
        <h3>Nouvel utilisateur</h3>
        ${isAdmin() ? `
          <form id="user-form" class="stack">
            <label>Identifiant<input name="username" required></label>
            <label>Nom affiche<input name="name" required></label>
            <label>Role<select name="role"><option value="admin">Administrateur / Direction</option><option value="secretariat">Secretariat</option><option value="instructeur">Instructeur</option></select></label>
            <label>Mot de passe<input name="password" type="password" placeholder="demo2026 par defaut"></label>
            <button class="primary-button" type="submit">Creer l'utilisateur</button>
          </form>
        ` : `<p class="muted">Creation reservee a l'administrateur.</p>`}
      </div>
      <div class="management-list">
        ${state.data.users.map((user) => `
          <article class="management-card ${user.active ? "" : "is-muted"}" data-user-row="${user.id}">
            <header class="management-card-header">
              <div>
                <p class="card-kicker">${escapeHtml(user.username)}</p>
                <h3>${escapeHtml(user.name)}</h3>
              </div>
              <div class="status-group">
                ${badge(user.active ? "actif" : "desactive", user.active ? "green" : "gray")}
                <span class="count-pill">${escapeHtml(roleLabels[user.role] || user.role)}</span>
              </div>
            </header>
            <div class="management-fields">
              <label>Nom affiche<input name="name" value="${escapeHtml(user.name)}" required></label>
              <label>Role<select name="role">
                <option value="admin" ${user.role === "admin" ? "selected" : ""}>Administrateur / Direction</option>
                <option value="secretariat" ${user.role === "secretariat" ? "selected" : ""}>Secretariat</option>
                <option value="instructeur" ${user.role === "instructeur" ? "selected" : ""}>Instructeur</option>
              </select></label>
              <label>Statut<select name="active">
                <option value="true" ${user.active ? "selected" : ""}>Actif</option>
                <option value="false" ${!user.active ? "selected" : ""}>Desactive</option>
              </select></label>
              <label>Nouveau mot de passe<input name="password" type="password" placeholder="laisser vide"></label>
            </div>
            <div class="card-actions">
              <button class="secondary-button" type="button" data-save-user="${user.id}">Enregistrer</button>
            </div>
          </article>
        `).join("") || `<p class="muted">Aucun utilisateur cree.</p>`}
      </div>
    </div>
  `;
}

function renderImportExport() {
  qs("#import-panel").innerHTML = `
    <div class="grid two">
      <div class="panel stack">
        <h3>Analyser un import Excel</h3>
        ${canManageData() ? `
          <form id="import-form" class="stack">
            <label>Classe cible si le fichier n'a pas de colonne classe<select name="targetClassId"><option value="">Choisir si necessaire</option>${classOptions()}</select></label>
            <label>Fichier Excel<input name="file" type="file" accept=".xlsx,.xls" required></label>
            <button class="primary-button" type="submit">Analyser avant import</button>
          </form>
        ` : `<p class="muted">Import reserve a la direction et au secretariat.</p>`}
        <div id="import-result">${renderImportAnalysis()}</div>
      </div>
      <div class="panel stack">
        <h3>Exports Excel</h3>
        ${canExport() ? `
          <button class="secondary-button" type="button" data-export-url="/api/export/students.xlsx">Exporter tous les eleves actifs</button>
          <button class="secondary-button" type="button" data-export-url="/api/export/students.xlsx?completenessStatus=a_completer">Exporter donnees a completer</button>
          <button class="secondary-button" type="button" data-export-url="/api/export/students.xlsx?schoolStatus=non_a_jour">Exporter non a jour</button>
          <button class="secondary-button" type="button" data-export-url="/api/export/classes.xlsx">Exporter effectifs par classe</button>
        ` : `<p class="muted">Export interdit par defaut pour les instructeurs.</p>`}
      </div>
    </div>
  `;
}

function renderImportAnalysis() {
  if (!state.importAnalysis) return `<p class="muted">Aucune analyse lancee.</p>`;
  const { summary, detectedHeaders, rows } = state.importAnalysis;
  const columnLabel = (h) => ({
    matricule: "Matricule",
    nom: "Nom",
    prenom: "Prenom",
    sexe: "Sexe",
    datedenaissance: "Date de naissance",
    lieudenaissance: "Lieu de naissance",
    classe: "Classe",
    pere: "Pere / Parent 1",
    mere: "Mere / Parent 2",
    telephone: "Telephone",
    adresse: "Adresse"
  })[h] || h;
  const expectedCols = ["matricule","nom","prenom","sexe","datedenaissance","classe","pere","mere","telephone","adresse"];
  const foundCols = (detectedHeaders || []).map((h) => normalizeHeader(h));
  const missingCols = expectedCols.filter((h) => h !== "matricule" && !foundCols.includes(h));
  return `
    <div class="stack">
      <div class="panel compact-stack">
        <h3>Resume</h3>
        <p><strong>${summary.total}</strong> ligne(s), <strong>${summary.importable}</strong> importable(s), <strong>${summary.blocked}</strong> bloquee(s), <strong>${summary.incomplete}</strong> a completer.</p>
        <h3 style="margin-top:8px">Colonnes detectees</h3>
        <p>${(detectedHeaders || []).length ? (detectedHeaders || []).map((h) => badge(columnLabel(normalizeHeader(h)), "green")).join(" ") : badge("Aucune", "gray")}</p>
        ${missingCols.length ? `<p class="muted" style="font-size:12px">Colonnes optionnelles non detectees : ${missingCols.map(columnLabel).join(", ")}</p>` : ""}
        <p class="muted" style="font-size:12px">Colonnes attendues : Matricule, Nom, Prenom, Sexe, Date de naissance, Lieu de naissance, Classe, Parent 1, Parent 2, Telephone, Adresse.</p>
      </div>
      <p><strong>${summary.total}</strong> ligne(s), <strong>${summary.importable}</strong> importable(s), <strong>${summary.blocked}</strong> bloquee(s), <strong>${summary.incomplete}</strong> a completer.</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Ligne</th><th>Statut</th><th>Eleve</th><th>Messages</th></tr></thead>
          <tbody>
            ${rows.map((row) => `
              <tr class="import-row ${row.status}">
                <td>${row.rowNumber}</td>
                <td>${row.status === "importable" ? badge("importable", "green") : badge("bloquee", "red")}</td>
                <td>${escapeHtml(row.student.lastName)} ${escapeHtml(row.student.firstName)}<br><span class="muted">${escapeHtml(row.student.matricule || "sans matricule")}</span></td>
                <td>${[...row.errors, ...row.warnings].map(escapeHtml).join("<br>") || "-"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <button class="primary-button" type="button" id="commit-import-button" ${summary.importable ? "" : "disabled"}>Confirmer l'import partiel</button>
    </div>
  `;
}

function renderBackup() {
  qs("#backup-panel").innerHTML = `
    <div class="panel stack">
      <h3>Sauvegarde manuelle</h3>
      <p>La sauvegarde cree une copie JSON datee dans <code>data/backups/</code>. La restauration consiste a remplacer <code>data/app-data.json</code> par une sauvegarde controlee, puis a relancer l'application.</p>
      ${isAdmin() ? `<button class="primary-button" id="backup-button" type="button">Creer une sauvegarde</button>` : `<p class="muted">Sauvegarde reservee a l'administrateur.</p>`}
      <p id="backup-result" class="muted"></p>
    </div>
  `;
}

function formPayload(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function resetPhotoEditor() {
  state.photoEditor = null;
  const target = qs("#photo-editor");
  if (target) {
    target.classList.add("hidden");
    target.innerHTML = "";
  }
}

function updateStudentPhotoPreview(dataUrl) {
  const form = qs("#student-form");
  if (!form) return;
  form.querySelector("input[name='photoDataUrl']").value = dataUrl;
  const avatar = form.querySelector(".student-photo-block .student-avatar");
  if (avatar) {
    const temp = document.createElement("div");
    temp.innerHTML = dataUrl
      ? `<img class="student-avatar large" src="${dataUrl}" alt="Photo de l'eleve">`
      : studentAvatar({}, "large");
    avatar.replaceWith(temp.firstElementChild);
  }
  const removeButton = qs("#remove-student-photo");
  if (removeButton) removeButton.classList.toggle("hidden", !dataUrl);
  const chooseButton = qs(".student-photo-actions .file-button");
  if (chooseButton) chooseButton.classList.toggle("hidden", Boolean(dataUrl));
  const fileInput = qs("#student-photo-file");
  if (!dataUrl && fileInput) fileInput.value = "";
}

function drawCroppedStudentPhoto() {
  if (!state.photoEditor?.image) return;
  const form = qs("#student-form");
  const preview = qs("#photo-preview-canvas");
  const hidden = form?.querySelector("input[name='photoDataUrl']");
  if (!form || !preview || !hidden) return;

  const image = state.photoEditor.image;
  const size = 256;
  const context = preview.getContext("2d");
  preview.width = size;
  preview.height = size;
  context.clearRect(0, 0, size, size);
  context.fillStyle = "#eef2f7";
  context.fillRect(0, 0, size, size);

  const zoom = Number(qs("#photo-zoom")?.value || 1);
  const offsetX = Number(qs("#photo-x")?.value || 0);
  const offsetY = Number(qs("#photo-y")?.value || 0);
  const scale = Math.max(size / image.width, size / image.height) * zoom;
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const x = (size - drawWidth) / 2 + offsetX;
  const y = (size - drawHeight) / 2 + offsetY;
  context.drawImage(image, x, y, drawWidth, drawHeight);

  const compressed = preview.toDataURL("image/jpeg", 0.78);
  hidden.value = compressed;
  updateStudentPhotoPreview(compressed);
}

function showPhotoEditor(dataUrl) {
  const target = qs("#photo-editor");
  if (!target) return;
  target.classList.remove("hidden");
  target.innerHTML = `
    <div class="photo-editor-preview">
      <canvas id="photo-preview-canvas" width="256" height="256" aria-label="Apercu de la photo recadree"></canvas>
    </div>
    <div class="photo-editor-controls">
      <label>Zoom<input id="photo-zoom" type="range" min="1" max="3" step="0.05" value="1"></label>
      <label>Centrage horizontal<input id="photo-x" type="range" min="-100" max="100" step="1" value="0"></label>
      <label>Centrage vertical<input id="photo-y" type="range" min="-100" max="100" step="1" value="0"></label>
    </div>
  `;

  const image = new Image();
  image.onload = () => {
    state.photoEditor = { image };
    drawCroppedStudentPhoto();
  };
  image.src = dataUrl;
}

async function refresh(message = "") {
  await loadState();
  resetPhotoEditor();
  render();
  if (message) toast(message);
}

async function saveStudentForm(form) {
  try {
    const payload = formPayload(form);
    const method = payload.id ? "PUT" : "POST";
    const url = payload.id ? `/api/students/${payload.id}` : "/api/students";
    const saved = await api(url, { method, body: JSON.stringify(payload) });
    state.selectedStudentId = saved.id;
    state.filters = {
      search: "",
      classId: "",
      schoolStatus: "",
      completenessStatus: "",
      archived: "active"
    };
    await loadState();
    setView("students");
    toast("Fiche eleve enregistree.");
  } catch (error) {
    toast(error.message, "error");
  }
}

qs("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const { user, sessionToken } = await api("/api/login", { method: "POST", body: JSON.stringify(formPayload(event.currentTarget)) });
    state.currentUser = user;
    state.sessionToken = sessionToken;
    localStorage.setItem("crmCurrentUser", JSON.stringify(user));
    localStorage.setItem("crmSessionToken", sessionToken);
    await loadState();
    showAuthenticatedShell();
    setView("dashboard");
  } catch (error) {
    toast(error.message, "error");
  }
});

qs("#logout-button").addEventListener("click", () => {
  localStorage.removeItem("crmCurrentUser");
  localStorage.removeItem("crmSessionToken");
  location.reload();
});

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.body.addEventListener("input", (event) => {
  if (event.target.id === "student-search") state.filters.search = event.target.value;
  if (["photo-zoom", "photo-x", "photo-y"].includes(event.target.id)) drawCroppedStudentPhoto();
});

document.body.addEventListener("change", (event) => {
  const map = {
    "filter-class": "classId",
    "filter-school-status": "schoolStatus",
    "filter-completeness": "completenessStatus",
    "filter-archived": "archived"
  };
  if (map[event.target.id]) {
    state.filters[map[event.target.id]] = event.target.value;
    state.selectedStudentId = "";
    renderStudents();
  }

  if (event.target.id === "student-photo-file") {
    const [file] = event.target.files || [];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("Le fichier choisi n'est pas une image.", "error");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast("Photo trop lourde : limite 8 Mo avant compression.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => showPhotoEditor(String(reader.result || ""));
    reader.onerror = () => toast("Lecture de la photo impossible.", "error");
    reader.readAsDataURL(file);
  }
});

document.body.addEventListener("click", async (event) => {
  try {
    const selectStudent = event.target.closest("[data-select-student]");
    if (selectStudent) {
      state.selectedStudentId = selectStudent.dataset.selectStudent;
      renderStudents();
      focusStudentDetailOnSmallScreen();
      return;
    }

    if (event.target.id === "new-student-button") {
      state.selectedStudentId = "__new__";
      resetPhotoEditor();
      renderStudents();
      focusStudentDetailOnSmallScreen();
      return;
    }

    if (event.target.id === "remove-student-photo") {
      resetPhotoEditor();
      updateStudentPhotoPreview("");
      return;
    }

    const archiveButton = event.target.closest("[data-archive-student]");
    if (archiveButton) {
      const student = state.data.students.find((item) => item.id === archiveButton.dataset.archiveStudent);
      const isArchiving = !student.archived;
      let archiveMotif = "";
      if (isArchiving) {
        if (!confirm("Archiver cet eleve ? Il sera deplace dans les archives et masque de la liste active.")) return;
        archiveMotif = prompt("Motif d'archivage (optionnel) :") || "";
      }
      await api(`/api/students/${student.id}/archive`, { method: "POST", body: JSON.stringify({ archived: !student.archived, archiveMotif }) });
      await refresh(student.archived ? "Eleve restaure." : "Eleve archive.");
      return;
    }

    const verifyButton = event.target.closest("[data-verify-status]");
    if (verifyButton) {
      await api(`/api/students/${verifyButton.dataset.verifyStatus}/verify-status`, { method: "POST" });
      await refresh("Statut de scolarite marque comme verifie.");
      return;
    }

    const editCommentButton = event.target.closest("[data-edit-comment]");
    if (editCommentButton) {
      const commentId = editCommentButton.dataset.editComment;
      const container = event.target.closest(".comment-item");
      const textEl = container?.querySelector(".comment-text");
      if (!container || !textEl) return;
      const currentText = textEl.textContent;
      textEl.innerHTML = `<div class="inline-comment-edit"><textarea class="edit-comment-textarea" style="width:100%;min-height:60px">${escapeHtml(currentText)}</textarea><div class="button-row" style="margin-top:4px"><button class="secondary-button save-edit-comment" type="button" data-comment-id="${commentId}" style="min-height:30px;font-size:12px">Enregistrer</button><button class="secondary-button cancel-edit-comment" type="button" style="min-height:30px;font-size:12px">Annuler</button></div></div>`;
      editCommentButton.disabled = true;
      return;
    }

    const saveEditButton = event.target.closest(".save-edit-comment");
    if (saveEditButton) {
      const commentId = saveEditButton.dataset.commentId;
      const container = saveEditButton.closest(".comment-item");
      const textarea = container?.querySelector(".edit-comment-textarea");
      if (!container || !textarea) return;
      const newText = textarea.value.trim();
      if (!newText) { toast("Le commentaire ne peut pas etre vide.", "error"); return; }
      await api(`/api/comments/${commentId}`, { method: "PUT", body: JSON.stringify({ text: newText }) });
      await refresh("Commentaire modifie.");
      return;
    }

    const cancelEditButton = event.target.closest(".cancel-edit-comment");
    if (cancelEditButton) {
      await refresh();
      return;
    }

    const archiveCommentButton = event.target.closest("[data-archive-comment]");
    if (archiveCommentButton) {
      const commentId = archiveCommentButton.dataset.archiveComment;
      await api(`/api/comments/${commentId}/archive`, { method: "POST" });
      await refresh("Commentaire archive / restaure.");
      return;
    }
  } catch (error) {
    toast(error.message || "Erreur inattendue.", "error");
  }

  const printButton = event.target.closest("[data-print-student]");
  if (printButton) {
    printStudentSheet();
    return;
  }

  const saveClassButton = event.target.closest("[data-save-class]");
  if (saveClassButton) {
    const row = saveClassButton.closest("[data-class-row]");
    const form = new FormData();
    row.querySelectorAll("input, select").forEach((field) => form.append(field.name, field.value));
    await api(`/api/classes/${saveClassButton.dataset.saveClass}`, {
      method: "PUT",
      body: JSON.stringify({
        name: form.get("name"),
        level: form.get("level"),
        active: form.get("active") === "true",
        instructorIds: form.get("instructorIds") ? [form.get("instructorIds")] : []
      })
    });
    await refresh("Classe mise a jour.");
    return;
  }

  const saveUserButton = event.target.closest("[data-save-user]");
  if (saveUserButton) {
    const row = saveUserButton.closest("[data-user-row]");
    const form = new FormData();
    row.querySelectorAll("input, select").forEach((field) => form.append(field.name, field.value));
    await api(`/api/users/${saveUserButton.dataset.saveUser}`, {
      method: "PUT",
      body: JSON.stringify({
        name: form.get("name"),
        role: form.get("role"),
        active: form.get("active") === "true",
        password: form.get("password")
      })
    });
    await refresh("Utilisateur mis a jour.");
    return;
  }

  if (event.target.id === "commit-import-button") {
    const result = await api("/api/import/commit", { method: "POST", body: JSON.stringify({ rows: state.importAnalysis.rows }) });
    state.importAnalysis = null;
    await refresh(`${result.created} eleve(s) importe(s).`);
    setView("students");
    return;
  }

  if (event.target.id === "backup-button") {
    const result = await api("/api/backup", { method: "POST", body: "{}" });
    qs("#backup-result").textContent = `Sauvegarde creee : ${result.path}`;
    toast("Sauvegarde creee.");
    return;
  }

  const exportButton = event.target.closest("[data-export-url]");
  if (exportButton) {
    try {
      await downloadFile(exportButton.dataset.exportUrl);
      toast("Export genere.");
    } catch (error) {
      toast(error.message, "error");
    }
  }
});

document.addEventListener("submit", async (event) => {
  const formId = event.target.getAttribute("id");

  if (formId === "student-form") {
    event.preventDefault();
    await saveStudentForm(event.target);
    return;
  }

  if (formId === "comment-form") {
    event.preventDefault();
    await api(`/api/students/${state.selectedStudentId}/comments`, {
      method: "POST",
      body: JSON.stringify({ text: formPayload(event.target).text })
    });
    await refresh("Commentaire ajoute.");
    return;
  }

  if (formId === "class-form") {
    event.preventDefault();
    const form = new FormData(event.target);
    await api("/api/classes", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        level: form.get("level"),
        instructorIds: form.get("instructorIds") ? [form.get("instructorIds")] : []
      })
    });
    await refresh("Classe creee.");
    return;
  }

  if (formId === "user-form") {
    event.preventDefault();
    await api("/api/users", { method: "POST", body: JSON.stringify(formPayload(event.target)) });
    await refresh("Utilisateur cree.");
    return;
  }

  if (formId === "import-form") {
    event.preventDefault();
    const form = new FormData(event.target);
    state.importAnalysis = await api("/api/import/analyze", { method: "POST", body: form });
    renderImportExport();
    toast("Analyse terminee.");
  }
}, true);

document.body.addEventListener("keyup", (event) => {
  if (event.target.id === "student-search") {
    state.filters.search = event.target.value;
    state.selectedStudentId = "";
    renderStudents();
  }
});

if (state.currentUser) {
  try {
    await loadState();
    showAuthenticatedShell();
    setView("dashboard");
  } catch (error) {
    localStorage.removeItem("crmCurrentUser");
    localStorage.removeItem("crmSessionToken");
    toast(error.message, "error");
  }
}
