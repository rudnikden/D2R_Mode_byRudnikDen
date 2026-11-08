# Installs the mod into D2RMM: finds D2RMM on this computer and copies the mod folder into its mods folder.
# Started by Install.cmd. Settings the player already made (config.json) are kept.
param([string]$D2RMM)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'find-paths.ps1')

$MOD = 'D2R_Mode_byRudnikDen'
$T = @{
  en = @{
    title = "Installing $MOD"; search = 'Looking for D2RMM on this computer...'
    many = 'Several D2RMM folders found:'; pick = 'Number of the one to use (Enter = the newest)'
    none = 'D2RMM was not found. Choose its folder (the one with D2RMM.exe) in the window that opens.'
    dialog = 'Choose the D2RMM folder (the one with D2RMM.exe)'
    cancel = 'Nothing was installed: no D2RMM folder was chosen.'; nomod = 'The mod folder is missing next to Install.cmd. Unpack the whole zip and run Install.cmd again.'
    done = 'Done. The mod is in:'; kept = 'Your settings were kept.'
    next = @('Next:', '1. Start D2RMM (if it is open, close and start it again).', "2. Tick $MOD in the list and choose the settings.", '3. Press INSTALL MODS, then RUN D2R.')
  }
  uk = @{
    title = "Встановлення $MOD"; search = 'Шукаю D2RMM на компʼютері...'
    many = 'Знайдено кілька папок D2RMM:'; pick = 'Номер потрібної (Enter = найновіша)'
    none = 'D2RMM не знайдено. Оберіть його папку (ту, де лежить D2RMM.exe) у вікні, що відкриється.'
    dialog = 'Оберіть папку D2RMM (ту, де лежить D2RMM.exe)'
    cancel = 'Нічого не встановлено: папку D2RMM не обрано.'; nomod = 'Поруч з Install.cmd немає папки мода. Розпакуйте весь zip і знову запустіть Install.cmd.'
    done = 'Готово. Мод лежить у:'; kept = 'Ваші налаштування збережено.'
    next = @('Далі:', '1. Запустіть D2RMM (якщо він відкритий, закрийте й запустіть знову).', "2. Поставте галочку біля $MOD і оберіть налаштування.", '3. Натисніть INSTALL MODS, потім RUN D2R.')
  }
  ru = @{
    title = "Установка $MOD"; search = 'Ищу D2RMM на компьютере...'
    many = 'Найдено несколько папок D2RMM:'; pick = 'Номер нужной (Enter = самая новая)'
    none = 'D2RMM не найден. Выберите его папку (ту, где лежит D2RMM.exe) в открывшемся окне.'
    dialog = 'Выберите папку D2RMM (ту, где лежит D2RMM.exe)'
    cancel = 'Ничего не установлено: папка D2RMM не выбрана.'; nomod = 'Рядом с Install.cmd нет папки мода. Распакуйте весь zip и снова запустите Install.cmd.'
    done = 'Готово. Мод лежит в:'; kept = 'Ваши настройки сохранены.'
    next = @('Дальше:', '1. Запустите D2RMM (если он открыт, закройте и запустите снова).', "2. Поставьте галочку у $MOD и выберите настройки.", '3. Нажмите INSTALL MODS, затем RUN D2R.')
  }
}
# Windows display language first, then the regional format (an English Windows often has a Russian or Ukrainian format)
$lang = @([Globalization.CultureInfo]::CurrentUICulture, [Globalization.CultureInfo]::CurrentCulture) |
  ForEach-Object { $_.TwoLetterISOLanguageName } | Where-Object { $T.ContainsKey($_) } | Select-Object -First 1
$t = if ($lang) { $T[$lang] } else { $T.en }

Write-Host $t.title
$src = Join-Path (Split-Path $PSScriptRoot) $MOD
if (-not (Test-Path -LiteralPath (Join-Path $src 'mod.json'))) { Write-Host $t.nomod; exit 1 }

if (-not $D2RMM) {
  Write-Host $t.search
  $D2RMM = Select-D2RMMFolder $t
}
if (-not $D2RMM) { Write-Host $t.cancel; exit 1 }

$dst = Join-Path $D2RMM "mods\$MOD"
$hadSettings = Test-Path -LiteralPath (Join-Path $dst 'config.json')
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Get-ChildItem -LiteralPath $src -File | Where-Object Name -ne 'config.json' | Copy-Item -Destination $dst -Force

Write-Host ''
Write-Host "$($t.done) $dst  (D2RMM $(Get-D2RMMVersion $D2RMM))"
if ($hadSettings) { Write-Host $t.kept }
Write-Host ''
$t.next | ForEach-Object { Write-Host $_ }
