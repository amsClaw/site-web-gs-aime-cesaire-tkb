@echo off
setlocal

cd /d "%~dp0"

if "%PORT%"=="" set "PORT=8791"
set "URL=http://127.0.0.1:%PORT%"

echo ==========================================
echo  Lancement CRM ecole - Windows
echo ==========================================
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

echo URL locale : %URL%
echo.
start "" "%URL%"

call npm start

echo.
pause
