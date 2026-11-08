@echo off
rem For the author: rebuilds the mod from the game tables, installs it into D2RMM and packs the zip for players.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\build.ps1"
echo.
pause
