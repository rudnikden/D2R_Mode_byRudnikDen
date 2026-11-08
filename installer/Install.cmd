@echo off
rem Installs D2R_Mode_byRudnikDen into D2RMM. Double-click it after unpacking the zip.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0installer\install.ps1"
if not "%errorlevel%"=="0" (
  echo.
  echo If the installer could not run on this computer, install the mod by hand:
  echo copy the D2R_Mode_byRudnikDen folder from this zip into the "mods" folder
  echo next to D2RMM.exe, then start D2RMM and tick the mod.
)
echo.
pause
