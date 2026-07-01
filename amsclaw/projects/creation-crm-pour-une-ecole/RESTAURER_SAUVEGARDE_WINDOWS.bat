@echo off
setlocal

cd /d "%~dp0"

echo ==========================================
echo  Restauration CRM ecole - Windows
echo ==========================================
echo.

call "%~dp0ARRETER_CRM_WINDOWS.bat" --no-pause
if errorlevel 2 (
  echo.
  echo Restauration annulee. Relance ce script apres avoir arrete le serveur.
  pause
  exit /b 1
)
if errorlevel 1 (
  echo.
  echo Impossible de confirmer l'arret du serveur.
  pause
  exit /b 1
)

node "%~dp0scripts\restore-backup-cli.mjs"
if errorlevel 1 (
  echo.
  pause
  exit /b 1
)

echo.
choice /C ON /N /M "Relancer le CRM maintenant ? [O/N] "
if errorlevel 2 (
  echo.
  echo Tu peux relancer le CRM avec LANCER_CRM_WINDOWS.bat.
  pause
  exit /b 0
)

call "%~dp0LANCER_CRM_WINDOWS.bat"
