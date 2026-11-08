// D2R_Mode_byRudnikDen — all-in-one offline loot mod for D2RMM.
// Every feature is off by default; with default settings nothing is changed.
// All changes are applied to both table sets of D2R 3.x: global\excel\ and global\excel\base\.

const DIRS = ['global\\excel\\', 'global\\excel\\base\\'];
const VALID_CODES = new Set(__VALID_CODES__);

const num = (v, def) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
function tryReadTsv(filename) {
  try {
    return D2RMM.readTsv(filename);
  } catch (e) {
    return null;
  }
}
// Edits single rows of a big table as plain text: parsing a whole table is what makes an install slow
function patchRows(file, ids, edit) {
  let text;
  try {
    text = D2RMM.readTxt(file);
  } catch (e) {
    return;
  }
  if (!text) return;
  const headers = text.slice(0, text.indexOf('\n')).replace(/\r$/, '').split('\t');
  ids.forEach((id) => {
    const start = text.indexOf('\n' + id + '\t') + 1;
    if (!start) return;
    const found = text.indexOf('\n', start);
    const end = found < 0 ? text.length : found;
    const line = text.slice(start, end);
    const cr = line.endsWith('\r');
    const cells = (cr ? line.slice(0, -1) : line).split('\t');
    const row = {};
    headers.forEach((h, i) => (row[h] = cells[i] === undefined ? '' : cells[i]));
    edit(row, id);
    text = text.slice(0, start) + headers.map((h) => row[h]).join('\t') + (cr ? '\r' : '') + text.slice(end);
  });
  D2RMM.writeTxt(file, text);
}
function blankRow(tsv) {
  const row = {};
  tsv.headers.forEach((h) => (row[h] = ''));
  row['*eol'] = '0';
  return row;
}
const tcName = (row) => String(row['Treasure Class'] || '');
const isGoodTc = (name) => / Good$/.test(name);

// ---------- settings ----------
const Q = config.q_on === true;
const QPRESETS = {
  bases: [1, 1, 1, 1, 1],
  balanced: [10, 15, 10, 25, 25],
  uniques: [100, 10, 10, 10, 10],
};
const qValues =
  QPRESETS[config.q_preset] ||
  ['q_unique', 'q_set', 'q_rare', 'q_magic', 'q_superior'].map((id) => clamp(num(config[id], 0), 0, 100));

const R = config.r_on === true;
const runeTier = R ? clamp(Math.round(num(config.r_tier, 1)), 1, 100) : 1;
const runeAmount = R ? clamp(num(config.r_amount, 1), 1, 50) : 1;
const goodMult = R ? clamp(num(config.r_good, 1), 1, 20) : 1;
const countess = R && config.r_countess === true;
const keyMult = clamp(Math.round(num(config.p_keys, 1)), 1, 100);
const ESSENCE = config.e_on === true;

const HUNT_MAP = __HUNT_MAP__; // key -> [base code, monster level needed, kind u|s|b]
const HUNT = config.h_on === true;
const hunts = [];
if (HUNT) {
  for (let i = 1; i <= 6; i++) {
    const key = String(config['h_item_' + i] || 'none');
    if (key !== 'none' && HUNT_MAP[key]) hunts.push({ key, code: HUNT_MAP[key][0], lvl: HUNT_MAP[key][1], kind: HUNT_MAP[key][2] });
  }
}
const huntChance = clamp(num(config.h_chance, 5), 1, 50);
// Developer code: only its hash is kept here. The code unlocks Constricting Ring, which the game has disabled.
const hashCode = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
};
const devCode = String(config.d_code || '').trim().toLowerCase();
const DEV = devCode !== '' && hashCode('rd:' + devCode) === 'a9301735';
if (devCode) {
  if (DEV) console.log('Developer code accepted');
  else console.warn('Developer code is wrong, nothing was unlocked');
}
if (DEV) hunts.push({ key: 'u:Constricting Ring', code: 'rin', lvl: 67, kind: 'u' }); // 67 = Hell only
// Unique and set items go where monsters can be high enough; runeword bases drop on every difficulty
const HUNT_DIFFS = [
  { suffix: '', maxLevel: 45 },
  { suffix: ' (N)', maxLevel: 66 },
  { suffix: ' (H)', maxLevel: 999 },
];

// Uber Tristram: every value is a percent of the original, the fields are ordered by how much they help
const UBER = config.ub_on === true;
const UBER_IDS = { m: 'ubermephisto', d: 'uberdiablo', b: 'uberbaal' };
const UBER_PRESETS = __UBER_PRESETS__;
const uberPreset = UBER_PRESETS[config.ub_preset] || null;
const uberValue = (boss, key, lo, hi) =>
  uberPreset ? uberPreset[key] : clamp(Math.round(num(config['ub_' + boss + '_' + key], hi)), lo, hi);
const uberAura = UBER ? uberValue('m', 'aura', 0, 125) : 125;
// Lilith, Uber Duriel, Uber Izual and Diablo Clone: the same levels, set apart from Uber Tristram
const MINOR = config.um_on === true;
const MINOR_IDS = { a: 'uberandariel', u: 'uberduriel', i: 'uberizual', c: 'diabloclone' };
const minorPreset = UBER_PRESETS[config.um_preset] || null;
const minorValue = (boss, key, lo, hi) =>
  minorPreset ? minorPreset[key] : clamp(Math.round(num(config['um_' + boss + '_' + key], hi)), lo, hi);

// Best charms: only a newly dropped charm is affected
const charmRoll = (mode, key, lo, hi) =>
  mode === 'top' ? hi : mode === 'custom' ? clamp(Math.round(num(config[key], hi)), lo, hi) : null;
const TORCH_CLASS = ['ama', 'sor', 'nec', 'pal', 'bar', 'dru', 'ass', 'war'].includes(config.ub_t_class) ? config.ub_t_class : null;
const TORCH_STATS = charmRoll(config.ub_t_roll, 'ub_t_stats', 10, 20);
const TORCH_RES = charmRoll(config.ub_t_roll, 'ub_t_res', 10, 20);
const ANNI_STATS = charmRoll(config.ub_a_roll, 'ub_a_stats', 10, 20);
const ANNI_RES = charmRoll(config.ub_a_roll, 'ub_a_res', 10, 20);
const ANNI_XP = charmRoll(config.ub_a_roll, 'ub_a_xp', 5, 10);

const forgeSockets = clamp(Math.round(num(config.x_forge_n, 4)), 1, 6);
const playClass = String(config.k_class || 'all');

console.log(
  'D2R_Mode_byRudnikDen: quality=' + (Q ? qValues.join('/') : 'off') +
  ' runes=' + (R ? `tier x${runeTier}, amount x${runeAmount}, good x${goodMult}, countess ${countess}` : 'off') +
  ' hunt=' + (HUNT ? hunts.map((h) => h.key).join(',') || 'none' : 'off') +
  ' cube=' + ['x_gem', 'x_rune', 'x_usock', 'x_rejuv', 'x_forge'].filter((k) => config[k] === true).join(',') +
  ' class=' + playClass +
  ' keys=x' + keyMult +
  ' essences=' + (ESSENCE ? 'always' : 'off') +
  ' uber=' + (UBER ? String(config.ub_preset) : 'off') +
  ' minor=' + (MINOR ? String(config.um_preset) : 'off') +
  ' torch=' + (TORCH_CLASS || 'random') + '/' + (TORCH_STATS === null ? 'random' : TORCH_STATS + '/' + TORCH_RES) +
  ' anni=' + (ANNI_STATS === null ? 'random' : ANNI_STATS + '/' + ANNI_RES + '/' + ANNI_XP)
);

// ---------- treasure classes: runes, good drops, Countess, item hunt ----------
const touchTc = R || hunts.length > 0 || keyMult > 1 || ESSENCE;
DIRS.forEach((dir) => {
  if (!touchTc) return;
  const file = dir + 'treasureclassex.txt';
  const tc = tryReadTsv(file);
  if (!tc) return;

  tc.rows.forEach((row) => {
    const name = tcName(row);

    // Higher runes: shift weight from lower rune groups to higher ones
    if (runeTier > 1 && /^Runes [1-9][0-9]?$/.test(name)) {
      const group = +name.replace(/^Runes /, '');
      if (group > 1) {
        const col = group < 17 ? 'Prob3' : 'Prob2';
        row[col] = String(Math.floor(Math.max(+row[col] / runeTier, 2 * Math.sqrt(runeTier))));
      }
    }

    for (let i = 1; i <= 10; i++) {
      const item = String(row['Item' + i] || '');
      const prob = +row['Prob' + i];
      if (!item || !(prob > 0)) continue;
      // Pandemonium keys (Countess, Summoner, Nihlathak in Hell); the key's own "Pandemonium Key" tables stay as they are
      if (keyMult > 1 && /^pk[123]$/.test(item) && !/^Pandemonium Key/.test(name)) {
        row['Prob' + i] = String(prob * keyMult);
      }
      // More runes inside good drops
      if (runeAmount !== 1 && isGoodTc(name) && /^Runes \d+$/.test(item)) {
        row['Prob' + i] = String(Math.max(1, Math.round(prob * runeAmount)));
      }
      // More good drops everywhere else
      if (goodMult !== 1 && !isGoodTc(name) && isGoodTc(item)) {
        row['Prob' + i] = String(Math.max(1, Math.round(prob * goodMult)));
      }
    }

    if (countess) {
      // Countess rolls her runes first ...
      if (/^Countess( \((N|H)\))?( Desecrated [A-Z])?$/.test(name)) {
        const entries = [];
        for (let i = 1; i <= 10; i++) if (row['Item' + i]) entries.push([row['Item' + i], row['Prob' + i]]);
        const idx = entries.findIndex(([item]) => String(item).startsWith('Countess Rune'));
        if (idx > 0) {
          entries.unshift(entries.splice(idx, 1)[0]);
          for (let i = 1; i <= 10; i++) {
            row['Item' + i] = entries[i - 1] ? entries[i - 1][0] : '';
            row['Prob' + i] = entries[i - 1] ? entries[i - 1][1] : '';
          }
        }
      }
      // ... and drops at most 3 other items, so her runes fit in the 6-item limit
      if (/^Countess Item( \((N|H)\))?( Desecrated [A-Z])?$/.test(name) && +row.Picks > 3) row.Picks = '3';
    }
  });

  // Item hunt: per difficulty, a table with the hunted bases that rolls the wanted quality.
  // It is added next to every "good" drop entry, so each monster drop roll can give it.
  if (hunts.length > 0) {
    const goodDiff = (name) => {
      const m2 = /^Act [1-5]( \((N|H)\))? Good$/.exec(name);
      return m2 ? m2[1] || '' : null;
    };
    const masters = {};
    const newRows = [];
    HUNT_DIFFS.forEach((d) => {
      const list = hunts.filter((h) => h.kind === 'b' || h.lvl <= d.maxLevel);
      if (!list.length) return;
      const kinds = ['u', 's', 'b'].filter((k) => list.some((h) => h.kind === k));
      const parts = kinds.map((k) => {
        const row = blankRow(tc);
        row['Treasure Class'] = 'RudnikDen Hunt' + d.suffix + ' ' + k;
        row.Picks = '1';
        if (k === 'u') row.Unique = '1024';
        if (k === 's') row.Set = '1024';
        const allKind = [...new Set(list.filter((h) => h.kind === k).map((h) => h.code))];
        if (allKind.length > 10) console.warn('Item hunt: only the first 10 different bases of one kind are used');
        allKind.slice(0, 10).forEach((c, i) => {
          row['Item' + (i + 1)] = c;
          row['Prob' + (i + 1)] = String(list.filter((h) => h.kind === k && h.code === c).length);
        });
        newRows.push(row);
        return { name: row['Treasure Class'], count: list.filter((h) => h.kind === k).length };
      });
      let master = parts[0].name;
      if (parts.length > 1) {
        const row = blankRow(tc);
        row['Treasure Class'] = 'RudnikDen Hunt' + d.suffix;
        row.Picks = '1';
        parts.forEach((p, i) => {
          row['Item' + (i + 1)] = p.name;
          row['Prob' + (i + 1)] = String(p.count);
        });
        newRows.push(row);
        master = row['Treasure Class'];
      }
      masters[d.suffix] = master;
    });
    const firstGood = tc.rows.findIndex((r) => goodDiff(tcName(r)) !== null);
    if (newRows.length && firstGood >= 0) {
      tc.rows.splice(firstGood, 0, ...newRows);
      let added = 0;
      tc.rows.forEach((row) => {
        if (goodDiff(tcName(row)) !== null || !(+row.Picks > 0)) return; // skip good tables and fixed-list tables
        let diff = null;
        let total = +row.NoDrop || 0;
        let free = 0;
        for (let i = 1; i <= 10; i++) {
          const item = row['Item' + i];
          if (!item) {
            if (!free) free = i;
            continue;
          }
          total += +row['Prob' + i] || 0;
          if (diff === null) diff = goodDiff(String(item));
        }
        if (diff === null || !masters[diff] || !free || !(total > 0)) return;
        row['Item' + free] = masters[diff];
        row['Prob' + free] = String(Math.max(1, Math.round((total * huntChance) / (100 - huntChance))));
        added++;
      });
      if (dir === DIRS[0]) console.log('Item hunt: added to ' + added + ' drop tables');
    }
  }

  // Essences: a table with an essence is split the way the game itself adds Sunder Charms:
  // the essence comes first with a fixed count, then the untouched drop. Essences only exist in Hell tables.
  if (ESSENCE) {
    const items = (row) => {
      const list = [];
      for (let i = 1; i <= 10; i++) if (row['Item' + i]) list.push(String(row['Item' + i]));
      return list;
    };
    const targets = new Map();
    tc.rows.forEach((row) => {
      const code = items(row).find((item) => /^(tes|ceh|bet|fed)$/.test(item));
      if (!code) return;
      // Duriel's table is rolled several times by its parent, so the parent is the one to split
      const parent = tc.rows.find((p) => +p.Picks > 0 && items(p).includes(tcName(row)));
      targets.set(parent || row, code);
    });
    targets.forEach((code, row) => {
      const drops = Object.assign({}, row);
      drops['Treasure Class'] = tcName(row) + ' RD';
      tc.rows.splice(tc.rows.indexOf(row), 0, drops);
      for (let i = 1; i <= 10; i++) {
        row['Item' + i] = '';
        row['Prob' + i] = '';
      }
      row.Picks = '-2';
      row.NoDrop = '0';
      row.Item1 = code;
      row.Prob1 = '1';
      row.Item2 = drops['Treasure Class'];
      row.Prob2 = '1';
    });
    if (dir === DIRS[0]) console.log('Essences: added to ' + targets.size + ' drop tables');
  }

  D2RMM.writeTsv(file, tc);
});

// ---------- item hunt: the chosen unique / set item wins among items of the same base ----------
DIRS.forEach((dir) => {
  const want = { u: new Set(), s: new Set() };
  hunts.forEach((h) => {
    if (h.kind === 'u' || h.kind === 's') want[h.kind].add(h.key.slice(2)); // "Name" or "Name|prop1|prop4" for same-name variants
  });
  [['u', 'uniqueitems.txt'], ['s', 'setitems.txt']].forEach(([kind, f]) => {
    if (!want[kind].size) return;
    const tsv = tryReadTsv(dir + f);
    if (!tsv) return;
    tsv.rows.forEach((row) => {
      const name = String(row.index);
      if (DEV && kind === 'u' && name === 'Constricting Ring') {
        // Level 95 stays required to wear it; only the drop level goes down, and other unique rings keep dropping
        row.spawnable = '1';
        row.lvl = '66';
        row.rarity = '100';
        return;
      }
      if (want[kind].has(name) || want[kind].has(name + '|' + row.prop1 + '|' + row.prop4)) row.rarity = '10000';
    });
    D2RMM.writeTsv(dir + f, tsv);
  });
});

// ---------- item quality ----------
DIRS.forEach((dir) => {
  if (!Q) return;
  const file = dir + 'itemratio.txt';
  const ratio = tryReadTsv(file);
  if (!ratio) return;
  const toRatio = (v) => (v <= 0 ? 1000000000 : Math.max(1, Math.round(100 / v)));
  const toMin = (v) => (v <= 0 ? 1000000000 : 1);
  const [u, s, r, m, h] = qValues;
  ratio.rows.forEach((row) => {
    row.Unique = String(toRatio(u));
    row.Set = String(toRatio(s));
    row.Rare = String(toRatio(r));
    row.Magic = String(toRatio(m));
    row.HiQuality = String(toRatio(h));
    if (config.q_nomin !== false) {
      row.UniqueMin = String(toMin(u));
      row.SetMin = String(toMin(s));
      row.RareMin = String(toMin(r));
      row.MagicMin = String(toMin(m));
    }
    if (config.q_nolvl !== false) {
      ['UniqueDivisor', 'SetDivisor', 'RareDivisor', 'MagicDivisor', 'HiQualityDivisor', 'NormalDivisor'].forEach(
        (k) => (row[k] = '1000000000')
      );
    }
  });
  D2RMM.writeTsv(file, ratio);
});

// ---------- Horadric Cube recipes ----------
const anyCube = config.x_gem === true || config.x_rune === true || config.x_usock === true || config.x_rejuv === true || config.x_forge === true;
DIRS.forEach((dir) => {
  if (!anyCube) return;
  const file = dir + 'cubemain.txt';
  const cube = tryReadTsv(file);
  if (!cube) return;
  const add = (fields) => {
    const row = blankRow(cube);
    row.enabled = '1';
    row.version = '100';
    Object.assign(row, fields);
    cube.rows.push(row);
  };

  if (config.x_rune === true) {
    const runeNames = ['El', 'Eld', 'Tir', 'Nef', 'Eth', 'Ith', 'Tal', 'Ral', 'Ort', 'Thul', 'Amn', 'Sol', 'Shael', 'Dol', 'Hel', 'Io', 'Lum', 'Ko', 'Fal', 'Lem', 'Pul', 'Um', 'Mal', 'Ist', 'Gul', 'Vex', 'Ohm', 'Lo', 'Sur', 'Ber', 'Jah', 'Cham', 'Zod'];
    const code = (n) => 'r' + String(n).padStart(2, '0');
    for (let n = 2; n <= 33; n++) {
      add({
        description: `1 ${runeNames[n - 1]} Rune -> 2 ${runeNames[n - 2]} Runes`,
        numinputs: '1',
        'input 1': code(n),
        output: code(n - 1),
        'output b': code(n - 1),
      });
    }
  }

  if (config.x_gem === true) {
    const chains = {
      Amethyst: ['gcv', 'gfv', 'gsv', 'gzv', 'gpv'],
      Topaz: ['gcy', 'gfy', 'gsy', 'gly', 'gpy'],
      Sapphire: ['gcb', 'gfb', 'gsb', 'glb', 'gpb'],
      Emerald: ['gcg', 'gfg', 'gsg', 'glg', 'gpg'],
      Ruby: ['gcr', 'gfr', 'gsr', 'glr', 'gpr'],
      Diamond: ['gcw', 'gfw', 'gsw', 'glw', 'gpw'],
      Skull: ['skc', 'skf', 'sku', 'skl', 'skz'],
    };
    const q = ['Chipped', 'Flawed', 'Standard', 'Flawless', 'Perfect'];
    Object.keys(chains).forEach((gem) => {
      const c = chains[gem];
      for (let i = 1; i < c.length; i++) {
        add({
          description: `1 ${q[i]} ${gem} -> 2 ${q[i - 1]} ${gem}`,
          numinputs: '1',
          'input 1': c[i],
          output: c[i - 1],
          'output b': c[i - 1],
        });
      }
    });
  }

  if (config.x_rejuv === true) {
    add({
      description: '1 Healing Potion (Any) + 1 Mana Potion (Any) -> Full Rejuvenation Potion',
      numinputs: '2',
      'input 1': 'hpot',
      'input 2': 'mpot',
      output: 'rvl',
    });
    add({
      description: '3 Healing Potions (Any) + 3 Mana Potions (Any) -> 3 Full Rejuvenation Potions',
      numinputs: '6',
      'input 1': '"hpot,qty=3"',
      'input 2': '"mpot,qty=3"',
      output: 'rvl',
      'output b': 'rvl',
      'output c': 'rvl',
    });
  }

  if (config.x_usock === true) {
    const skull = ['skc', 'skf', 'sku', 'skl', 'none'].includes(config.x_usock_gem) ? config.x_usock_gem : 'sku';
    add({
      description: 'Hel Rune + ' + (skull === 'none' ? '' : skull + ' + ') + 'Unique Item -> Add 1 Socket',
      numinputs: skull === 'none' ? '2' : '3',
      'input 1': '"any,uni,nos"',
      'input 2': 'r15',
      'input 3': skull === 'none' ? '' : skull,
      output: '"useitem,sock=1"',
    });
  }

  if (config.x_forge === true) {
    const runes = { numinputs: '4', 'input 2': 'r08', 'input 3': 'r11', 'input 4': 'r10' };
    const types = [
      ['weap', 'Weapon'],
      ['tors', 'Body Armor'],
      ['shld', 'Shield'],
      ['helm', 'Helm'],
    ];
    // 1. White or superior item without sockets: the same item gets the sockets (keeps ethereal and superior)
    types.forEach(([type, label]) => {
      ['nor', 'hiq'].forEach((quality) => {
        add({
          ...runes,
          description: `Ral + Amn + Thul + ${quality === 'hiq' ? 'Superior' : 'Normal'} ${label} without sockets -> same item with ${forgeSockets} Sockets`,
          'input 1': `"${type},${quality},nos"`,
          output: `"useitem,sock=${forgeSockets}"`,
        });
      });
    });
    // 2. Ethereal item with sockets or magic: a new ethereal item of the same base (superior stays superior)
    types.forEach(([type, label]) => {
      ['nor', 'hiq', 'mag'].forEach((quality) => {
        const out = quality === 'hiq' ? 'hiq' : 'nor';
        add({
          ...runes,
          description: `Ral + Amn + Thul + Ethereal ${label} -> Ethereal ${out === 'hiq' ? 'Superior' : 'Normal'} ${label} with ${forgeSockets} Sockets`,
          'input 1': `"${type},${quality},eth"`,
          output: `"usetype,${out},eth,sock=${forgeSockets}"`,
          lvl: '99',
        });
      });
    });
    // 3. Anything else (socketed white/superior, or magic): a new item of the same base (superior stays superior)
    types.forEach(([type, label]) => {
      ['mag', 'nor', 'hiq'].forEach((quality) => {
        const out = quality === 'hiq' ? 'hiq' : 'nor';
        add({
          ...runes,
          description: `Ral + Amn + Thul + ${label} -> ${out === 'hiq' ? 'Superior' : 'Normal'} ${label} with ${forgeSockets} Sockets`,
          'input 1': `"${type},${quality}"`,
          output: `"usetype,${out},sock=${forgeSockets}"`,
          lvl: '99',
        });
      });
    });
  }

  D2RMM.writeTsv(file, cube);
});

// ---------- Uber bosses ----------
const EASED = {};
if (UBER) Object.keys(UBER_IDS).forEach((boss) => (EASED[UBER_IDS[boss]] = (key, lo, hi) => uberValue(boss, key, lo, hi)));
if (MINOR) Object.keys(MINOR_IDS).forEach((boss) => (EASED[MINOR_IDS[boss]] = (key, lo, hi) => minorValue(boss, key, lo, hi)));
DIRS.forEach((dir) => {
  if (!UBER && !MINOR) return;
  const scale = (row, col, percent) => {
    if (row[col] === undefined || row[col] === '') return;
    row[col] = String(Math.max(1, Math.round((+row[col] * percent) / 100)));
  };
  patchRows(dir + 'monstats.txt', Object.keys(EASED), (row, id) => {
    const value = EASED[id];
    const hp = value('hp', 1, 100);
    const melee = value('melee', 1, 100);
    const spell = value('spell', 1, 100);
    const res = value('res', 0, 110);
    const ac = value('ac', 1, 100);
    const ar = value('ar', 1, 100);
    const speed = value('speed', 1, 100);
    ['MinHP(H)', 'MaxHP(H)'].forEach((col) => scale(row, col, hp));
    ['A1', 'A2', 'S1'].forEach((mode) => {
      scale(row, mode + 'MinD(H)', melee);
      scale(row, mode + 'MaxD(H)', melee);
      scale(row, mode + 'TH(H)', ar);
    });
    [1, 2, 3].forEach((i) => {
      scale(row, 'El' + i + 'MinD(H)', melee);
      scale(row, 'El' + i + 'MaxD(H)', melee);
    });
    // Spell damage and the number of Mephisto's charged bolts follow the skill level
    for (let i = 1; i <= 8; i++) if (row['Skill' + i]) scale(row, 'Sk' + i + 'lvl', spell);
    // DamageRegen is a whole number from 0 to 4
    row.DamageRegen = String(Math.round((+row.DamageRegen * value('regen', 0, 100)) / 100));
    ['ResDm(H)', 'ResMa(H)', 'ResFi(H)', 'ResLi(H)', 'ResCo(H)', 'ResPo(H)'].forEach((col) => {
      if (row[col] !== undefined && +row[col] > res) row[col] = String(res);
    });
    scale(row, 'AC(H)', ac);
    scale(row, 'Velocity', speed);
    scale(row, 'Run', speed);
  });

  // Mephisto's Conviction is not in his table row. Only he casts it from above level 99,
  // so the caster level keeps Infinity and paladins unchanged. Formula style follows vanilla skills.txt.
  if (uberAura >= 125) return;
  const defense = Math.round((uberAura * 90) / 125);
  patchRows(dir + 'skills.txt', ['Conviction'], (conviction) => {
    conviction.aurastatcalc1 = `(ulvl < 100) ? (0-dm56) : (0-${defense})`;
    ['aurastatcalc2', 'aurastatcalc3', 'aurastatcalc4'].forEach((col) => {
      conviction[col] = `"(ulvl < 100) ? (0-min(ln34,150)) : (0-${uberAura})"`;
    });
  });
});

// ---------- best charms ----------
DIRS.forEach((dir) => {
  const ids = [];
  if (TORCH_CLASS || TORCH_STATS !== null) ids.push('Hellfire Torch');
  if (ANNI_STATS !== null) ids.push('Annihilus');
  if (!ids.length) return;
  const fixed = (row, i, value) => {
    row['min' + i] = String(value);
    row['max' + i] = String(value);
  };
  // The base tables have an empty Warlock property: a torch with it would give nothing
  const classAllowed = !(TORCH_CLASS === 'war' && dir.endsWith('base\\'));
  patchRows(dir + 'uniqueitems.txt', ids, (row, id) => {
    if (id === 'Annihilus') {
      fixed(row, 2, ANNI_STATS);
      fixed(row, 3, ANNI_RES);
      fixed(row, 4, ANNI_XP);
      return;
    }
    if (TORCH_CLASS && classAllowed) {
      row.prop1 = TORCH_CLASS;
      fixed(row, 1, 3);
    }
    if (TORCH_STATS !== null) {
      fixed(row, 2, TORCH_STATS);
      fixed(row, 3, TORCH_RES);
    }
  });
});

// ---------- game data version ----------
// The game compares this file in the mod with its own build number. Copied from the installed game, so it follows every patch.
(() => {
  const file = 'global\\dataversionbuild.txt';
  try {
    const version = D2RMM.readTxt(file);
    if (version) D2RMM.writeTxt(file, version);
  } catch (e) {
    console.warn('D2R_Mode_byRudnikDen: no game data version file');
  }
})();

// ---------- class loot filter ----------
const CLASS_OF_TYPE = { amaz: 'ama', assn: 'ass', barb: 'bar', drui: 'dru', necr: 'nec', pala: 'pal', sorc: 'sor', warl: 'war' };
DIRS.forEach((dir) => {
  if (playClass === 'all') return;
  const types = tryReadTsv(dir + 'itemtypes.txt');
  if (!types) return;
  const byCode = {};
  types.rows.forEach((r) => {
    if (r.Code) byCode[r.Code] = r;
  });
  const ownerCache = {};
  const ownerOf = (code) => {
    if (code in ownerCache) return ownerCache[code];
    const seen = new Set();
    const stack = [code];
    let owner = null;
    while (stack.length && !owner) {
      const c = stack.pop();
      if (!c || seen.has(c)) continue;
      seen.add(c);
      if (CLASS_OF_TYPE[c]) owner = CLASS_OF_TYPE[c];
      const r = byCode[c];
      if (!r) continue;
      if (r.Class) owner = r.Class;
      stack.push(r.Equiv1, r.Equiv2);
    }
    return (ownerCache[code] = owner);
  };
  ['armor.txt', 'weapons.txt'].forEach((f) => {
    const tsv = tryReadTsv(dir + f);
    if (!tsv) return;
    let hidden = 0;
    tsv.rows.forEach((row) => {
      if (!row.code || row.spawnable !== '1') return;
      const owner = ownerOf(row.type) || ownerOf(row.type2);
      if (owner && owner !== playClass) {
        row.spawnable = '0';
        hidden++;
      }
    });
    console.log('Class loot filter: ' + hidden + ' other-class bases hidden in ' + dir + f);
    D2RMM.writeTsv(dir + f, tsv);
  });
});
