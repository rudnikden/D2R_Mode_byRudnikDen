# Finds the D2RMM folder and the game folder on this computer, whatever their versions and locations.
# Dot-source it: . .\find-paths.ps1

Add-Type -AssemblyName System.Windows.Forms

function Find-D2RMMFolders {
  $found = New-Object System.Collections.Generic.List[string]
  $add = {
    param($dir)
    if ($dir -and (Test-Path -LiteralPath (Join-Path $dir 'D2RMM.exe')) -and -not $found.Contains($dir)) { $found.Add($dir) }
  }
  # 1. A running D2RMM
  Get-Process -Name D2RMM -ErrorAction SilentlyContinue | ForEach-Object { try { & $add (Split-Path $_.Path) } catch {} }
  # 2. Shortcuts on the desktop, in the Start menu and on the taskbar
  $shell = New-Object -ComObject WScript.Shell
  $lnkDirs = @(
    [Environment]::GetFolderPath('Desktop'), [Environment]::GetFolderPath('CommonDesktopDirectory'),
    [Environment]::GetFolderPath('StartMenu'), [Environment]::GetFolderPath('CommonStartMenu'),
    (Join-Path $env:APPDATA 'Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar')
  )
  foreach ($d in $lnkDirs) {
    if (-not (Test-Path -LiteralPath $d)) { continue }
    Get-ChildItem -LiteralPath $d -Filter *.lnk -File -Recurse -Depth 3 -ErrorAction SilentlyContinue | ForEach-Object {
      $target = $shell.CreateShortcut($_.FullName).TargetPath
      if ($target -match 'D2RMM\.exe$') { & $add (Split-Path $target) }
    }
  }
  # 3. Usual places on every local disk: the disk's folders (system ones skipped) and the user's own folders
  $skip = @('Windows', 'Users', 'ProgramData', '$Recycle.Bin', 'System Volume Information', 'Recovery', 'PerfLogs', '$WinREAgent')
  $roots = New-Object System.Collections.Generic.List[string]
  Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Root -match '^[A-Z]:\\$' -and (Test-Path -LiteralPath $_.Root) } | ForEach-Object {
    $roots.Add($_.Root)
    Get-ChildItem -LiteralPath $_.Root -Directory -ErrorAction SilentlyContinue | Where-Object { $skip -notcontains $_.Name } | ForEach-Object { $roots.Add($_.FullName) }
  }
  foreach ($f in 'Desktop', 'Downloads', 'Documents', 'Games') { $roots.Add((Join-Path $env:USERPROFILE $f)) }
  foreach ($r in $roots) {
    if (-not (Test-Path -LiteralPath $r)) { continue }
    $depth = if ($r -match '^[A-Z]:\\$') { 0 } else { 2 }
    Get-ChildItem -LiteralPath $r -Filter D2RMM.exe -File -Recurse -Depth $depth -ErrorAction SilentlyContinue | ForEach-Object { & $add $_.DirectoryName }
  }
  return ,$found
}

function Get-D2RMMVersion($dir) {
  try { return (Get-Item -LiteralPath (Join-Path $dir 'D2RMM.exe')).VersionInfo.ProductVersion } catch { return '?' }
}

function Select-Folder($description, $mustContain) {
  $dialog = New-Object System.Windows.Forms.FolderBrowserDialog
  $dialog.Description = $description
  while ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
    if (Test-Path -LiteralPath (Join-Path $dialog.SelectedPath $mustContain)) { return $dialog.SelectedPath }
  }
  return $null
}

# Returns the D2RMM folder: the only one found, the one the user picks from a list, or one chosen in a folder dialog.
function Select-D2RMMFolder($texts) {
  $list = Find-D2RMMFolders
  if ($list.Count -eq 1) { return $list[0] }
  if ($list.Count -gt 1) {
    $sorted = @($list | Sort-Object { try { [version](Get-D2RMMVersion $_) } catch { [version]'0.0' } } -Descending)
    Write-Host $texts.many
    for ($i = 0; $i -lt $sorted.Count; $i++) { Write-Host ('  {0}. D2RMM {1}   {2}' -f ($i + 1), (Get-D2RMMVersion $sorted[$i]), $sorted[$i]) }
    $answer = Read-Host $texts.pick
    if ([string]::IsNullOrWhiteSpace($answer)) { return $sorted[0] }
    $n = 0
    if ([int]::TryParse($answer, [ref]$n) -and $n -ge 1 -and $n -le $sorted.Count) { return $sorted[$n - 1] }
    return $null
  }
  Write-Host $texts.none
  return Select-Folder $texts.dialog 'D2RMM.exe'
}

# Returns the game folder: from the Windows uninstall registry, the default place, or a folder dialog.
function Find-GameFolder {
  $keys = @(
    'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\Diablo II Resurrected',
    'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Diablo II Resurrected'
  )
  foreach ($k in $keys) {
    $loc = (Get-ItemProperty -LiteralPath $k -ErrorAction SilentlyContinue).InstallLocation
    if ($loc -and (Test-Path -LiteralPath (Join-Path $loc 'D2R.exe'))) { return $loc }
  }
  $default = Join-Path ${env:ProgramFiles(x86)} 'Diablo II Resurrected'
  if (Test-Path -LiteralPath (Join-Path $default 'D2R.exe')) { return $default }
  return Select-Folder 'Choose the Diablo II: Resurrected folder (the one with D2R.exe)' 'D2R.exe'
}
