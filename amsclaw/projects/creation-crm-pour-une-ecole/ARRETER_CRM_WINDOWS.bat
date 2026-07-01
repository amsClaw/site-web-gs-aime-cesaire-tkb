@echo off
setlocal EnableExtensions EnableDelayedExpansion

cd /d "%~dp0"

if "%PORT%"=="" set "PORT=8791"
set "NO_PAUSE="
if /I "%~1"=="--no-pause" set "NO_PAUSE=1"

echo ==========================================
echo  Arret CRM ecole - Windows
echo ==========================================
echo.

set "PIDS="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  echo !PIDS! | findstr /C:"%%P" >nul
  if errorlevel 1 set "PIDS=!PIDS! %%P"
)

if "!PIDS!"=="" (
  echo Le CRM ne semble pas lance sur le port %PORT%.
  echo Aucune action necessaire.
  if not defined NO_PAUSE pause
  exit /b 0
)

echo Serveur CRM detecte sur le port %PORT%.
echo Processus :!PIDS!
echo.
choice /C ON /N /M "Arreter le CRM maintenant ? [O/N] "
if errorlevel 2 (
  echo Arret annule.
  if not defined NO_PAUSE pause
  exit /b 2
)

echo.
echo Arret du serveur...
for %%P in (!PIDS!) do (
  taskkill /PID %%P /T >nul 2>nul
)

timeout /T 2 /NOBREAK >nul

set "STILL_RUNNING="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  set "STILL_RUNNING=!STILL_RUNNING! %%P"
)

if not "!STILL_RUNNING!"=="" (
  echo.
  echo Le serveur repond encore apres la demande d'arret.
  echo Processus restant :!STILL_RUNNING!
  echo Relance ce script une deuxieme fois si besoin.
  if not defined NO_PAUSE pause
  exit /b 1
)

echo.
echo CRM arrete.
if not defined NO_PAUSE pause
exit /b 0
