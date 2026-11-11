@echo off
REM InΦnity: one-step setup and run for Windows.
REM Installs what the app needs (once), then starts it at http://localhost:3000
cd /d "%~dp0"

echo.
echo   InPhinity UI prototype
echo   ----------------------

where node >nul 2>nul
if errorlevel 1 (
  echo   Node.js is not installed.
  echo   Install Node.js 20.9 or newer from https://nodejs.org ^(the LTS version^), then run this file again.
  pause
  exit /b 1
)

for /f "tokens=1 delims=." %%v in ('node -p "process.versions.node"') do set NODEMAJOR=%%v
if %NODEMAJOR% LSS 20 (
  echo   Your Node.js is too old. Install Node.js 20.9 or newer from https://nodejs.org, then run this file again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo   Installing required packages ^(first run only, needs internet^)...
  call npm install
  if errorlevel 1 (
    echo   Package install failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
) else (
  echo   Packages already installed.
)

echo   Starting the app. Your browser will open at http://localhost:3000
echo   Close this window or press Ctrl+C to stop.
echo.

start "" cmd /c "timeout /t 6 /nobreak >nul && start http://localhost:3000"
call npm run dev
