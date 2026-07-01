@echo off
setlocal

cd /d "%~dp0"

if "%PORT%"=="" set "PORT=8791"
set "HOST=0.0.0.0"
set "LOCAL_URL=http://127.0.0.1:%PORT%"

for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "(Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null -and $_.IPv4Address -ne $null } | Select-Object -First 1 -ExpandProperty IPv4Address).IPAddress"`) do set "LOCAL_IP=%%I"
if "%LOCAL_IP%"=="" set "LOCAL_IP=<adresse-ip-du-serveur>"

echo ==========================================
echo  Lancement CRM ecole - Reseau local
echo ==========================================
echo.
echo URL sur ce PC : %LOCAL_URL%
echo URL pour les autres appareils du meme reseau : http://%LOCAL_IP%:%PORT%
echo.
echo Attention : utiliser ce mode seulement sur le reseau local de l'ecole.
echo Ne pas exposer ce port sur Internet.
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js n'est pas installe ou n'est pas disponible dans le PATH.
  echo Installe Node.js, puis relance ce script.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm n'est pas disponible.
  echo Reinstalle Node.js avec npm, puis relance ce script.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installation des dependances...
  call npm install
  if errorlevel 1 (
    echo.
    echo Installation des dependances impossible.
    pause
    exit /b 1
  )
)

start "" "%LOCAL_URL%"

call npm start

echo.
pause
