import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = path.join(projectRoot, "data", "app-data.json");
const backupDir = path.join(projectRoot, "data", "backups");

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

const pipedAnswers = input.isTTY ? [] : fsSync.readFileSync(0, "utf8").split(/\r?\n/);
const rl = input.isTTY ? createInterface({ input, output }) : null;

async function ask(question) {
  if (!input.isTTY) {
    output.write(question);
    return pipedAnswers.shift() || "";
  }
  return rl.question(question);
}

try {
  if (!(await exists(backupDir))) {
    console.log(`Aucun dossier de sauvegarde trouve : ${path.relative(projectRoot, backupDir)}`);
    process.exitCode = 1;
  } else {
    const entries = await fs.readdir(backupDir, { withFileTypes: true });
    const backups = [];
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
      const fullPath = path.join(backupDir, entry.name);
      const stats = await fs.stat(fullPath);
      backups.push({ name: entry.name, fullPath, stats });
    }
    backups.sort((a, b) => b.name.localeCompare(a.name));

    if (!backups.length) {
      console.log(`Aucune sauvegarde JSON trouvee dans ${path.relative(projectRoot, backupDir)}`);
      process.exitCode = 1;
    } else {
      console.log("Sauvegardes disponibles :");
      console.log("");
      backups.forEach((backup, index) => {
        const kb = Math.max(1, Math.round(backup.stats.size / 1024));
        console.log(` ${index + 1}) ${backup.name}  |  ${backup.stats.mtime.toLocaleString()}  |  ${kb} Ko`);
      });
      console.log("");

      const choice = (await ask("Numero de la sauvegarde a restaurer, ou q pour annuler : ")).trim();
      if (choice.toLowerCase() === "q") {
        console.log("Restauration annulee.");
      } else {
        const index = Number(choice);
        if (!Number.isInteger(index) || index < 1 || index > backups.length) {
          console.log("Choix invalide.");
          process.exitCode = 1;
        } else {
          const selected = backups[index - 1];
          console.log("");
          console.log(`Sauvegarde selectionnee : ${selected.name}`);
          console.log("Une copie de l'etat actuel sera creee avant restauration.");
          const confirm = (await ask("Confirmer la restauration ? [o/N] ")).trim().toLowerCase();
          if (!["o", "oui"].includes(confirm)) {
            console.log("Restauration annulee.");
          } else {
            await fs.mkdir(backupDir, { recursive: true });
            if (await exists(dataFile)) {
              const preRestore = path.join(backupDir, `pre-restore-current-${timestamp()}.json`);
              await fs.copyFile(dataFile, preRestore);
              console.log("");
              console.log(`Copie de securite creee : ${path.relative(projectRoot, preRestore)}`);
            }
            await fs.copyFile(selected.fullPath, dataFile);
            console.log("");
            console.log("Restauration terminee.");
            console.log(`Donnees restaurees depuis : ${selected.name}`);
          }
        }
      }
    }
  }
} finally {
  rl?.close();
}
