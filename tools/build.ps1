# One-step build for the author: extracts the game tables, builds the mod, installs it into D2RMM
# and packs the zip for players into dist\. Started by build.cmd.
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot
. (Join-Path $root 'installer\find-paths.ps1')
$MOD = 'D2R_Mode_byRudnikDen'

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js is not installed: get it from https://nodejs.org and run build.cmd again' }

Write-Host '1/4 Looking for the game and D2RMM...'
$game = Find-GameFolder
if (-not $game) { throw 'Game folder not found' }
$d2rmm = Select-D2RMMFolder @{ many = 'Several D2RMM folders found:'; pick = 'Number of the one to install into (Enter = the newest)'; none = 'D2RMM not found, choose its folder.'; dialog = 'Choose the D2RMM folder (the one with D2RMM.exe)' }
if (-not $d2rmm) { throw 'D2RMM folder not found' }
$lib = Get-ChildItem -LiteralPath $d2rmm -Filter CascLib.dll -File -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $lib) { throw "CascLib.dll not found inside $d2rmm" }
Write-Host "    game:  $game"
Write-Host "    D2RMM: $d2rmm ($(Get-D2RMMVersion $d2rmm))"

Write-Host '2/4 Extracting the game tables...'
& (Join-Path $root 'generator\extract.ps1') -GamePath $game -CascLibDir $lib.DirectoryName | Out-Null

Write-Host '3/4 Building the mod and installing it into D2RMM...'
& node (Join-Path $root 'generator\gen_rudnik.js') (Join-Path $d2rmm "mods\$MOD")
if ($LASTEXITCODE -ne 0) { throw 'The generator failed' }

Write-Host '4/4 Packing the zip for players...'
$version = (Get-Content -LiteralPath (Join-Path $root "mod\$MOD\mod.json") -TotalCount 20 | Select-String '"version":\s*"([^"]+)"').Matches[0].Groups[1].Value
$dist = Join-Path $root 'dist'
$stage = Join-Path $dist 'stage'
if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
New-Item -ItemType Directory -Force -Path (Join-Path $stage 'installer'), (Join-Path $stage $MOD) | Out-Null
Copy-Item (Join-Path $root "mod\$MOD\*") (Join-Path $stage $MOD)
Copy-Item (Join-Path $root 'installer\install.ps1'), (Join-Path $root 'installer\find-paths.ps1') (Join-Path $stage 'installer')
Copy-Item (Join-Path $root 'installer\Install.cmd') $stage
$zip = Join-Path $dist "$MOD-$version.zip"
if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zip
Remove-Item -LiteralPath $stage -Recurse -Force
Write-Host ''
Write-Host "Done. The mod is installed into D2RMM, the zip for players is $zip"
