# Extracts the game tables the generator needs into gamedata\. Normally started by build.cmd.
# Without parameters it finds the game and D2RMM (which ships CascLib.dll) by itself.
param(
  [string]$GamePath,
  [string]$CascLibDir
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot '..\installer\find-paths.ps1')
if (-not $GamePath) { $GamePath = Find-GameFolder }
if (-not $GamePath) { throw 'Game folder not found' }
if (-not $CascLibDir) {
  $d2rmm = Select-D2RMMFolder @{ many = 'Several D2RMM folders found:'; pick = 'Number (Enter = the newest)'; none = 'D2RMM not found.'; dialog = 'Choose the D2RMM folder' }
  if (-not $d2rmm) { throw 'D2RMM folder not found' }
  $lib = Get-ChildItem -LiteralPath $d2rmm -Filter CascLib.dll -File -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $lib) { throw "CascLib.dll not found inside $d2rmm" }
  $CascLibDir = $lib.DirectoryName
}
if (-not (Test-Path (Join-Path $CascLibDir 'CascLib.dll'))) { throw "CascLib.dll not found in $CascLibDir" }
if (-not (Test-Path $GamePath)) { throw "Game folder not found: $GamePath" }
"Game:    $GamePath"
"CascLib: $CascLibDir"

Add-Type -TypeDefinition (Get-Content (Join-Path $PSScriptRoot 'casc.cs') -Raw)
if (-not [CascZ]::Open($CascLibDir, $GamePath)) { throw "Cannot open the game storage in $GamePath" }

$out = Join-Path $PSScriptRoot 'gamedata'
New-Item -ItemType Directory -Force $out | Out-Null
# game path -> file name in gamedata
$files = [ordered]@{
  'global\excel\base\armor.txt'       = 'global_excel_base_armor.txt'
  'global\excel\base\weapons.txt'     = 'global_excel_base_weapons.txt'
  'global\excel\misc.txt'             = 'global_excel_misc.txt'
  'global\excel\base\uniqueitems.txt' = 'global_excel_base_uniqueitems.txt'
  'global\excel\base\setitems.txt'    = 'global_excel_base_setitems.txt'
  'local\lng\strings\item-names.json' = 'local_lng_strings_item-names.json'
}
foreach ($k in $files.Keys) {
  $bytes = [CascZ]::Read($k)
  if ($null -eq $bytes) { throw "Not found in the game storage: $k" }
  [IO.File]::WriteAllBytes((Join-Path $out $files[$k]), $bytes)
  '{0,9:N0} bytes  {1}' -f $bytes.Length, $files[$k]
}
'Done: ' + $out
