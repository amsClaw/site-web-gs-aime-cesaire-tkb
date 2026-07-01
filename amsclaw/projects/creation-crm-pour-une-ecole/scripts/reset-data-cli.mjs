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
  console.log("Ce script va vider les donnees courantes du CRM :");
  console.log("- eleves ;");
  console.log("- classes ;");
  console.log("- utilisateurs ;");
  console.log("- commentaires ;");
  console.log("- photos.");
  console.log("");
  console.log("Les sauvegardes deja presentes dans data/backups/ seront conservees.");
  console.log("Une nouvelle sauvegarde de securite sera creee avant reinitialisation.");
  console.log("");

  const startAnswer = (await ask("Continuer ? [o/N] ")).trim().toLowerCase();
  if (!["o", "oui"].includes(startAnswer)) {
    console.log("Reinitialisation annulee.");
  } else {
    console.log("");
    console.log("Derniere confirmation obligatoire.");
    console.log("Pour vider les donnees, tape exactement : VIDER TOUT");
    const confirmText = await ask("> ");

    if (confirmText !== "VIDER TOUT") {
      console.log("Texte de confirmation incorrect. Reinitialisation annulee.");
    } else {
      await fs.mkdir(backupDir, { recursive: true });

      if (await exists(dataFile)) {
        const preReset = path.join(backupDir, `pre-reset-current-${timestamp()}.json`);
        await fs.copyFile(dataFile, preReset);
        console.log("");
        console.log(`Sauvegarde de securite creee : ${path.relative(projectRoot, preReset)}`);
      } else {
        console.log("");
        console.log(`Aucun fichier ${path.relative(projectRoot, dataFile)} existant. Creation d'un fichier neuf.`);
      }

      const data = {
        metadata: {
          name: "CRM ecole GS AIME CESAIRE TKB",
          version: "0.1.0",
          updatedAt: new Date().toISOString()
        },
        users: [],
        classes: [],
        students: []
      };

      await fs.writeFile(dataFile, `${JSON.stringify(data, null, 2)}\n`);

      console.log("");
      console.log("Reinitialisation terminee.");
      console.log("Au prochain lancement, le CRM recreera seulement les comptes de connexion de demarrage.");
      console.log("Aucune classe ni aucun eleve ne sera recree automatiquement.");
      console.log("");
      console.log("Compte de test admin : admin_test");
      console.log("Mot de passe : demo2026");
    }
  }
} finally {
  rl?.close();
}
