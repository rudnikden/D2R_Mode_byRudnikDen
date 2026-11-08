# D2R_Mode_byRudnikDen

All-in-one **offline** mod for Diablo II: Resurrected (3.x, Reign of the Warlock), installed with [D2RMM](https://github.com/olegbl/d2rmm).

Ten independent sections: class loot filter, item quality, hunting a specific item by name, runes and good drops, extra Horadric Cube recipes, Pandemonium keys and guaranteed essences, easier Uber bosses and Uber Tristram with presets, the best rolls of Annihilus and Hellfire Torch. **Everything is off by default**, and the settings are in English, Ukrainian and Russian, with a tooltip on every field.

The full list of features is in the [mod README](mod/D2R_Mode_byRudnikDen/README.md).

## For players

1. Download the zip from [Releases](../../releases) and unpack it anywhere.
2. Double-click **Install.cmd**. It finds D2RMM on your computer and puts the mod into its `mods` folder; your settings are kept on an update.
3. Start D2RMM, tick the mod, choose the settings, press **INSTALL MODS**, then **RUN D2R**.

Offline only. Back up your saves first.

If Windows shows "Windows protected your PC", press *More info*, then *Run anyway*: this happens with any script downloaded from the internet. Without the installer, copy the `D2R_Mode_byRudnikDen` folder into `D2RMM\mods` yourself.

The mod reads the game's own tables when D2RMM installs it, so it follows game patches; nothing else has to be run.

## For developers

The mod is generated: `mod.json` (the settings menu in three languages, with lists of every unique, set item and base) is too large to write by hand, so a Node.js script builds it from the game's own tables.

Requirements: Windows, Diablo II: Resurrected, D2RMM, [Node.js](https://nodejs.org).

Double-click **build.cmd**. It finds the game and D2RMM by itself, extracts the tables, builds the mod, installs it into D2RMM (keeping your settings) and packs the zip for players into `dist/`.

```
build.cmd                  one-step build
tools/build.ps1            what build.cmd runs
generator/
  extract.ps1              copies the needed tables out of the game into generator/gamedata
  casc.cs                  reads the game storage through CascLib.dll, which ships with D2RMM
  gen_rudnik.js            builds mod.json, mod.js and README.md
  rudnik_mod.js            template of the script D2RMM runs on install
  rudnik_README.md         source of the mod README
  tsv.js                   tab-separated table reader
installer/
  Install.cmd              the player's installer, goes to the root of the zip
  install.ps1              copies the mod into D2RMM\mods
  find-paths.ps1           finds D2RMM and the game folder
mod/D2R_Mode_byRudnikDen/  the built mod
```

Game tables are not part of this repository: they belong to Blizzard Entertainment, and `extract.ps1` takes them from your own copy of the game.

## Contact

Ideas, bugs and reviews: rudnik.den@gmail.com

## License

[MIT](LICENSE). Diablo II: Resurrected is a trademark of Blizzard Entertainment; this project is not affiliated with Blizzard.
