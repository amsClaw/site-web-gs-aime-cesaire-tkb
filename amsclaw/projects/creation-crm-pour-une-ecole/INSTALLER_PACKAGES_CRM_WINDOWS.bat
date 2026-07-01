@echo off
setlocal

cd /d "%~dp0"

echo ==========================================
echo  Verification packages CRM ecole - Windows
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js n'est pas installe ou n'est pas disponible dans le PATH.
  echo.

  where winget >nul 2>nul
  if errorlevel 1 (
    echo winget n'est pas disponible sur ce PC.
    echo Installe Node.js depuis https://nodejs.org puis relance ce script.
    echo.
    pause
    exit /b 1
  )

  choice /C ON /N /M "Installer Node.js avec winget maintenant ? [O/N] "
  if errorlevel 2 (
    echo.
    echo Installation annulee.
    echo Installe Node.js, puis relance ce script.
    pause
    exit /b 1
  )

  echo.
  echo Installation de Node.js...
  winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
  if errorlevel 1 (
    echo.
    echo Installation Node.js impossible.
    echo Ferme cette fenetre, ouvre une nouvelle invite de commande, puis relance ce script si l'installation a reussi.
    pause
    exit /b 1
  )

  echo.
  echo Si Node.js vient d'etre installe, Windows peut demander d'ouvrir une nouvelle fenetre.
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm n'est pas disponible.
  echo Reinstalle Node.js avec npm, puis relance ce script.
  echo.
  pause
  exit /b 1
)

echo Node.js detecte :
node --version
echo npm detecte :
npm --version
echo.

if not exist "package.json" (
  echo Fichier package.json introuvable.
  echo Verifie que ce script est bien a la racine du dossier CRM.
  echo.
  pause
  exit /b 1
)

echo Installation / verification des dependances CRM...
call npm install
if errorlevel 1 (
  echo.
  echo Installation des dependances CRM impossible.
  pause
  exit /b 1
)

echo.
echo Verification des packages principaux...
node --input-type=module -e "await import('express'); await import('multer'); await import('exceljs');"
if errorlevel 1 (
  echo.
  echo Verification impossible : un package CRM manque encore.
  pause
  exit /b 1
)

echo.
echo Packages CRM prets.
echo Tu peux lancer le CRM avec LANCER_CRM_WINDOWS.bat.
pause
