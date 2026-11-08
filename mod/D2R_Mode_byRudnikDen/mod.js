// D2R_Mode_byRudnikDen  all-in-one offline loot mod for D2RMM.
// Every feature is off by default; with default settings nothing is changed.
// All changes are applied to both table sets of D2R 3.x: global\excel\ and global\excel\base\.

const DIRS = ['global\\excel\\', 'global\\excel\\base\\'];
const VALID_CODES = new Set(["0sc","2ax","2hs","6bs","6cb","6cs","6hb","6hx","6l7","6lb","6ls","6lw","6lx","6mx","6rx","6s7","6sb","6ss","6sw","6ws","72a","72h","7ar","7ax","7b7","7b8","7ba","7bk","7bl","7br","7bs","7bt","7bw","7cl","7cm","7cr","7cs","7dg","7di","7fb","7fc","7fl","7ga","7gd","7gi","7gl","7gm","7gs","7gw","7h7","7ha","7ja","7kr","7la","7ls","7lw","7m7","7ma","7mp","7mt","7o7","7p7","7pa","7pi","7qr","7qs","7s7","7s8","7sb","7sc","7sm","7sp","7sr","7ss","7st","7ta","7tk","7tr","7ts","7tw","7vo","7wa","7wb","7wc","7wd","7wh","7wn","7ws","7xf","7yw","8bs","8cb","8cs","8hb","8hx","8l8","8lb","8ls","8lw","8lx","8mx","8rx","8s8","8sb","8ss","8sw","8ws","92a","92h","9ar","9ax","9b7","9b8","9b9","9ba","9bk","9bl","9br","9bs","9bt","9bw","9cl","9cm","9cr","9cs","9dg","9di","9fb","9fc","9fl","9ga","9gd","9gi","9gl","9gm","9gs","9gw","9h9","9ha","9ja","9kr","9la","9ls","9lw","9m9","9ma","9mp","9mt","9p9","9pa","9pi","9qr","9qs","9s8","9s9","9sb","9sc","9sm","9sp","9sr","9ss","9st","9ta","9tk","9tr","9ts","9tw","9vo","9wa","9wb","9wc","9wd","9wh","9wn","9ws","9xf","9yw","aar","am1","am2","am3","am4","am5","am6","am7","am8","am9","ama","amb","amc","amd","ame","amf","amu","aqv","ass","axe","axf","ba1","ba2","ba3","ba4","ba5","ba6","ba7","ba8","ba9","baa","bab","bac","bad","bae","baf","bal","bar","bax","bbb","bet","bey","bhm","bkd","bkf","bks","bld","box","bpl","bps","brn","brs","brz","bsd","bsh","bst","bsw","btl","btx","buc","bwn","cap","cbw","ceh","ces","chn","ci0","ci1","ci2","ci3","cjw","clb","clm","clw","cm1","cm2","cm3","cqv","crn","crs","cs2","cst","d33","dgr","dhn","dir","dr1","dr2","dr3","dr4","dr5","dr6","dr7","dr8","dr9","dra","drb","drc","drd","dre","drf","ear","elx","eyz","fed","fhl","fla","flb","flc","fld","flg","fng","ful","g33","g34","gax","gcb","gcg","gcr","gcv","gcw","gcy","gfb","gfg","gfr","gfv","gfw","gfy","ghm","gis","gix","glb","gld","glg","glr","glv","glw","gly","gma","gpb","gpg","gpl","gpm","gpr","gps","gpv","gpw","gpy","gsb","gsc","gsd","gsg","gsr","gsv","gsw","gsy","gth","gts","gwn","gzv","hal","hax","hbl","hbt","hbw","hdm","hfh","hgl","hla","hlm","hp1","hp2","hp3","hp4","hp5","hpf","hpo","hrb","hrn","hrt","hst","hxb","ibk","ice","isc","j34","jav","jaw","jew","key","kit","kri","ktr","lax","lbb","lbl","lbt","lbw","lea","leg","lgl","lrg","lsd","lst","ltp","luv","lwb","lxb","mac","mau","mbl","mbr","mbt","mgl","mp1","mp2","mp3","mp4","mp5","mpf","mpi","mpo","msf","msk","mss","mst","mxb","ne1","ne2","ne3","ne4","ne5","ne6","ne7","ne8","ne9","nea","neb","ned","nee","nef","neg","ob1","ob2","ob3","ob4","ob5","ob6","ob7","ob8","ob9","oba","obb","obc","obd","obe","obf","opl","opm","ops","pa1","pa2","pa3","pa4","pa5","pa6","pa7","pa8","pa9","paa","pab","pac","pad","pae","paf","pax","pik","pil","pk1","pk2","pk3","plt","qbr","qey","qf1","qf2","qhr","qll","qui","r01","r02","r03","r04","r05","r06","r07","r08","r09","r10","r11","r12","r13","r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25","r26","r27","r28","r29","r30","r31","r32","r33","rin","rng","rpl","rps","rvl","rvs","rxb","sbb","sbr","sbw","scl","scm","scp","scy","scz","skc","skf","skl","skp","skr","sku","skz","sml","sol","spc","spe","spk","spl","spr","spt","ssd","ssp","sst","std","stu","swb","tal","tax","tbk","tbl","tbt","tch","tes","tgl","tkf","toa","tow","tr1","tr2","tri","tsc","tsp","ua1","ua2","ua3","ua4","ua5","uap","uar","ucl","uea","uh9","uhb","uhc","uhg","uhl","uhm","uhn","uit","ukp","ula","ulb","ulc","uld","ulg","ulm","ult","um1","um2","um3","um4","um5","um6","umb","umc","umg","uml","ung","uow","upk","upl","urg","urn","urs","ush","usk","utb","utc","utg","uth","utp","uts","utu","uuc","uui","uul","uvb","uvc","uvg","vbl","vbt","vgl","vip","vou","vps","wa1","wa2","wa3","wa4","wa5","wa6","wa7","wa8","wa9","waa","wab","wac","wad","wae","waf","wax","whm","wms","wnd","wrb","wsc","wsd","wsp","wst","xa1","xa2","xa3","xa4","xa5","xap","xar","xcl","xea","xh9","xhb","xhg","xhl","xhm","xhn","xit","xkp","xla","xlb","xld","xlg","xlm","xlt","xmb","xmg","xml","xng","xow","xpk","xpl","xrg","xrn","xrs","xsh","xsk","xtb","xtg","xth","xtp","xts","xtu","xuc","xui","xul","xvb","xvg","xyz","yps","ywn","zhb","zlb","zmb","ztb","zvb"]);

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

const HUNT_MAP = {"u:The Gnasher":["hax",7,"u"],"u:Deathspade":["axe",12,"u"],"u:Bladebone":["2ax",20,"u"],"u:Mindrend":["mpi",28,"u"],"u:Rakescar":["wax",36,"u"],"u:Fechmars Axe":["lax",11,"u"],"u:Goreshovel":["bax",19,"u"],"u:The Chieftan":["btx",26,"u"],"u:Brainhew":["gax",34,"u"],"u:The Humongous":["gix",39,"u"],"u:Iros Torch":["wnd",7,"u"],"u:Maelstromwrath":["ywn",19,"u"],"u:Gravenspine":["bwn",27,"u"],"u:Umes Lament":["gwn",38,"u"],"u:Felloak":["clb",4,"u"],"u:Knell Striker":["scp",7,"u"],"u:Rusthandle":["gsc",23,"u"],"u:Stormeye":["wsp",31,"u"],"u:Stoutnail":["spc",7,"u"],"u:Crushflange":["mac",12,"u"],"u:Bloodrise":["mst",20,"u"],"u:The Generals Tan Do Li Ga":["fla",28,"u"],"u:Ironstone":["whm",36,"u"],"u:Bonesob":["mau",32,"u"],"u:Steeldriver":["gma",39,"u"],"u:Rixots Keen":["ssd",3,"u"],"u:Blood Crescent":["scm",10,"u"],"u:Krintizs Skewer":["sbr",14,"u"],"u:Gleamscythe":["flc",18,"u"],"u:Griswolds Edge":["bsd",23,"u"],"u:Hellplague":["lsd",30,"u"],"u:Culwens Point":["wsd",39,"u"],"u:Shadowfang":["2hs",16,"u"],"u:Soulflay":["clm",26,"u"],"u:Kinemils Awl":["gis",31,"u"],"u:Blacktongue":["bsw",35,"u"],"u:Ripsaw":["flb",35,"u"],"u:The Patriarch":["gsd",39,"u"],"u:Gull":["dgr",6,"u"],"u:The Diggler":["dir",15,"u"],"u:The Jade Tan Do":["kri",26,"u"],"u:Irices Shard":["bld",34,"u"],"u:The Dragon Chang":["spr",11,"u"],"u:Razortine":["tri",16,"u"],"u:Bloodthief":["brn",23,"u"],"u:Lance of Yaggai":["spt",30,"u"],"u:The Tannr Gorerod":["pik",36,"u"],"u:Dimoaks Hew":["bar",11,"u"],"u:Steelgoad":["vou",19,"u"],"u:Soul Harvest":["scy",26,"u"],"u:The Battlebranch":["pax",34,"u"],"u:Woestave":["hal",38,"u"],"u:The Grim Reaper":["wsc",39,"u"],"u:Bane Ash":["sst",7,"u"],"u:Serpent Lord":["lst",12,"u"],"u:Lazarus Spire":["cst",24,"u"],"u:The Salamander":["bst",28,"u"],"u:The Iron Jang Bong":["wst",38,"u"],"u:Pluckeye":["sbw",10,"u"],"u:Witherstring":["hbw",18,"u"],"u:Rimeraven":["lbw",20,"u"],"u:Piercerib":["cbw",27,"u"],"u:Pullspite":["sbb",34,"u"],"u:Wizendraw":["lbb",35,"u"],"u:Hellclap":["swb",36,"u"],"u:Blastbark":["lwb",38,"u"],"u:Leadcrow":["lxb",12,"u"],"u:Ichorsting":["mxb",24,"u"],"u:Hellcast":["hxb",36,"u"],"u:Doomspittle":["rxb",38,"u"],"u:War Bonnet":["cap",4,"u"],"u:Tarnhelm":["skp",20,"u"],"u:Coif of Glory":["hlm",19,"u"],"u:Duskdeep":["fhl",23,"u"],"u:Wormskull":["bhm",28,"u"],"u:Howltusk":["ghm",34,"u"],"u:Undead Crown":["crn",39,"u"],"u:The Face of Horror":["msk",27,"u"],"u:Greyform":["qui",10,"u"],"u:Blinkbats Form":["lea",16,"u"],"u:The Centurion":["hla",19,"u"],"u:Twitchthroe":["stu",22,"u"],"u:Darkglow":["rng",19,"u"],"u:Hawkmail":["scl",20,"u"],"u:Sparking Mail":["chn",23,"u"],"u:Venomsward":["brs",27,"u"],"u:Iceblink":["spl",30,"u"],"u:Boneflesh":["plt",35,"u"],"u:Rockfleece":["fld",38,"u"],"u:Rattlecage":["gth",39,"u"],"u:Goldskin":["ful",38,"u"],"u:Victors Silk":["aar",38,"u"],"u:Heavenly Garb":["ltp",39,"u"],"u:Pelta Lunata":["buc",3,"u"],"u:Umbral Disk":["sml",12,"u"],"u:Stormguild":["lrg",18,"u"],"u:Wall of the Eyeless":["bsh",27,"u"],"u:Swordback Hold":["spk",20,"u"],"u:Steelclash":["kit",23,"u"],"u:Bverrit Keep":["tow",26,"u"],"u:The Ward":["gts",35,"u"],"u:The Hand of Broc":["lgl",7,"u"],"u:Bloodfist":["vgl",12,"u"],"u:Chance Guards":["mgl",20,"u"],"u:Magefist":["tgl",31,"u"],"u:Frostburn":["hgl",39,"u"],"u:Hotspur":["lbt",7,"u"],"u:Gorefoot":["vbt",12,"u"],"u:Treads of Cthon":["mbt",20,"u"],"u:Goblin Toe":["tbt",30,"u"],"u:Tearhaunch":["hbt",39,"u"],"u:Lenyms Cord":["lbl",10,"u"],"u:Snakecord":["vbl",16,"u"],"u:Nightsmoke":["mbl",27,"u"],"u:Goldwrap":["tbl",36,"u"],"u:Bladebuckle":["hbl",39,"u"],"u:Nokozan Relic":["amu",14,"u"],"u:The Eye of Etlich":["amu",20,"u"],"u:The Mahim-Oak Curio":["amu",34,"u"],"u:Nagelring":["rin",10,"u"],"u:Manald Heal":["rin",20,"u"],"u:The Stone of Jordan":["rin",39,"u"],"u:Amulet of the Viper":["vip",1,"u"],"u:Staff of Kings":["msf",1,"u"],"u:Horadric Staff":["hst",1,"u"],"u:Hell Forge Hammer":["hfh",1,"u"],"u:KhalimFlail":["qf1",1,"u"],"u:SuperKhalimFlail":["qf2",1,"u"],"u:Coldkill":["9ha",44,"u"],"u:Butcher's Pupil":["9ax",47,"u"],"u:Islestrike":["92a",51,"u"],"u:Pompe's Wrath":["9mp",53,"u"],"u:Guardian Naga":["9wa",56,"u"],"u:Warlord's Trust":["9la",43,"u"],"u:Spellsteel":["9ba",47,"u"],"u:Stormrider":["9bt",49,"u"],"u:Boneslayer Blade":["9ga",50,"u"],"u:The Minataur":["9gi",53,"u"],"u:Suicide Branch":["9wn",41,"u"],"u:Carin Shard":["9yw",43,"u"],"u:Arm of King Leoric":["9bw",44,"u"],"u:Blackhand Key":["9gw",49,"u"],"u:Dark Clan Crusher":["9cl",42,"u"],"u:Zakarum's Hand":["9sc",45,"u"],"u:The Fetid Sprinkler":["9qs",46,"u"],"u:Hand of Blessed Light":["9ws",50,"u"],"u:Fleshrender":["9sp",46,"u"],"u:Sureshrill Frost":["9ma",47,"u"],"u:Moonfall":["9mt",50,"u"],"u:Baezil's Vortex":["9fl",53,"u"],"u:Earthshaker":["9wh",51,"u"],"u:Bloodtree Stump":["9m9",56,"u"],"u:The Gavel of Pain":["9gm",53,"u"],"u:Bloodletter":["9ss",38,"u"],"u:Coldsteel Eye":["9sm",39,"u"],"u:Hexfire":["9sb",41,"u"],"u:Blade of Ali Baba":["9fc",43,"u"],"u:Ginther's Rift":["9cr",45,"u"],"u:Headstriker":["9bs",47,"u"],"u:Plague Bearer":["9ls",49,"u"],"u:The Atlantian":["9wd",50,"u"],"u:Crainte Vomir":["92h",50,"u"],"u:Bing Sz Wang":["9cm",51,"u"],"u:The Vile Husk":["9gs",52,"u"],"u:Cloudcrack":["9b9",53,"u"],"u:Todesfaelle Flamme":["9fb",54,"u"],"u:Swordguard":["9gd",55,"u"],"u:Spineripper":["9dg",40,"u"],"u:Heart Carver":["9di",44,"u"],"u:Blackbog's Sharp":["9kr",46,"u"],"u:Stormspike":["9bl",49,"u"],"u:The Impaler":["9sr",39,"u"],"u:Kelpie Snare":["9tr",41,"u"],"u:Soulfeast Tine":["9br",43,"u"],"u:Hone Sundan":["9st",45,"u"],"u:Spire of Honor":["9p9",47,"u"],"u:The Meat Scraper":["9b7",49,"u"],"u:Blackleach Blade":["9vo",50,"u"],"u:Athena's Wrath":["9s8",50,"u"],"u:Pierre Tombale Couant":["9pa",51,"u"],"u:Husoldal Evo":["9h9",52,"u"],"u:Grim's Burning Dead":["9wc",52,"u"],"u:Razorswitch":["8ss",36,"u"],"u:Ribcracker":["8ls",39,"u"],"u:Chromatic Ire":["8cs",43,"u"],"u:Warpspear":["8bs",47,"u"],"u:Skullcollector":["8ws",49,"u"],"u:Skystrike":["8sb",36,"u"],"u:Riphook":["8hb",39,"u"],"u:Kuko Shakaku":["8lb",41,"u"],"u:Endlesshail":["8cb",44,"u"],"u:Whichwild String":["8s8",47,"u"],"u:Cliffkiller":["8l8",49,"u"],"u:Magewrath":["8sw",51,"u"],"u:Godstrike Arch":["8lw",54,"u"],"u:Langer Briser":["8lx",40,"u"],"u:Pus Spiter":["8mx",44,"u"],"u:Buriza-Do Kyanon":["8hx",59,"u"],"u:Demon Machine":["8rx",57,"u"],"u:Peasent Crown":["xap",36,"u"],"u:Rockstopper":["xkp",39,"u"],"u:Stealskull":["xlm",43,"u"],"u:Darksight Helm":["xhl",46,"u"],"u:Valkiry Wing":["xhm",52,"u"],"u:Crown of Thieves":["xrn",57,"u"],"u:Blackhorn's Face":["xsk",49,"u"],"u:Vampiregaze":["xh9",49,"u"],"u:The Spirit Shroud":["xui",36,"u"],"u:Skin of the Vipermagi":["xea",37,"u"],"u:Skin of the Flayerd One":["xla",39,"u"],"u:Ironpelt":["xtu",41,"u"],"u:Spiritforge":["xng",43,"u"],"u:Crow Caw":["xcl",45,"u"],"u:Shaftstop":["xhn",46,"u"],"u:Duriel's Shell":["xrs",49,"u"],"u:Skullder's Ire":["xpl",50,"u"],"u:Guardian Angel":["xlt",53,"u"],"u:Toothrow":["xld",56,"u"],"u:Atma's Wail":["xth",59,"u"],"u:Black Hades":["xul",61,"u"],"u:Corpsemourn":["xar",63,"u"],"u:Que-Hegan's Wisdon":["xtp",59,"u"],"u:Visceratuant":["xuc",36,"u"],"u:Mosers Blessed Circle":["xml",39,"u"],"u:Stormchaser":["xrg",43,"u"],"u:Tiamat's Rebuke":["xit",46,"u"],"u:Kerke's Sanctuary":["xow",52,"u"],"u:Radimant's Sphere":["xts",58,"u"],"u:Lidless Wall":["xsh",49,"u"],"u:Lance Guard":["xpk",43,"u"],"u:Venom Grip":["xlg",37,"u"],"u:Gravepalm":["xvg",39,"u"],"u:Ghoulhide":["xmg",44,"u"],"u:Lavagout":["xtg",50,"u"],"u:Hellmouth":["xhg",55,"u"],"u:Infernostride":["xlb",37,"u"],"u:Waterwalk":["xvb",40,"u"],"u:Silkweave":["xmb",44,"u"],"u:Wartraveler":["xtb",50,"u"],"u:Gorerider":["xhb",55,"u"],"u:String of Ears":["zlb",37,"u"],"u:Razortail":["zvb",39,"u"],"u:Gloomstrap":["zmb",45,"u"],"u:Snowclash":["ztb",49,"u"],"u:Thudergod's Vigor":["zhb",55,"u"],"u:Harlequin Crest":["uap",69,"u"],"u:Veil of Steel":["uhm",77,"u"],"u:The Gladiator's Bane":["utu",85,"u"],"u:Arkaine's Valor":["upl",85,"u"],"u:Blackoak Shield":["uml",67,"u"],"u:Stormshield":["uit",77,"u"],"u:Hellslayer":["7bt",71,"u"],"u:Messerschmidt's Reaver":["7ga",75,"u"],"u:Baranar's Star":["7mt",70,"u"],"u:Schaefer's Hammer":["7wh",83,"u"],"u:The Cranium Basher":["7gm",85,"u"],"u:Lightsabre":["7cr",66,"u"],"u:Doombringer":["7b7",75,"u"],"u:The Grandfather":["7gd",85,"u"],"u:Wizardspike":["7dg",69,"u"],"u:Stormspire":["7wc",78,"u"],"u:Eaglehorn":["6l7",77,"u"],"u:Windforce":["6lw",80,"u"],"u:Bul Katho's Wedding Band":["rin",66,"u"],"u:The Cat's Eye":["amu",58,"u"],"u:The Rising Sun":["amu",73,"u"],"u:Crescent Moon":["amu",58,"u"],"u:Mara's Kaleidoscope":["amu",80,"u"],"u:Atma's Scarab":["amu",60,"u"],"u:Dwarf Star":["rin",53,"u"],"u:Raven Frost":["rin",53,"u"],"u:Highlord's Wrath":["amu",73,"u"],"u:Saracen's Chance":["amu",55,"u"],"u:Arreat's Face":["baa",50,"u"],"u:Homunculus":["nea",50,"u"],"u:Titan's Revenge":["ama",50,"u"],"u:Lycander's Aim":["am7",50,"u"],"u:Lycander's Flank":["am9",50,"u"],"u:The Oculus":["oba",50,"u"],"u:Herald of Zakarum":["pa9",50,"u"],"u:Cutthroat1":["9tw",50,"u"],"u:Jalal's Mane":["dra",50,"u"],"u:The Scalper":["9ta",65,"u"],"u:Bloodmoon":["7sb",69,"u"],"u:Djinnslayer":["7sm",73,"u"],"u:Deathbit":["9tk",52,"u"],"u:Warshrike":["7bk",83,"u"],"u:Gutsiphon":["6rx",79,"u"],"u:Razoredge":["7ha",75,"u"],"u:Demonlimb":["7sp",71,"u"],"u:Steelshade":["ulm",70,"u"],"u:Tomb Reaver":["7pa",86,"u"],"u:Deaths's Web":["7gw",74,"u"],"u:Nature's Peace":["rin",77,"u"],"u:Azurewrath":["7cr",87,"u"],"u:Seraph's Hymn":["amu",73,"u"],"u:Fleshripper":["7kr",76,"u"],"u:Horizon's Tornado":["7fl",72,"u"],"u:Stone Crusher":["7wh",76,"u"],"u:Jadetalon":["7wb",74,"u"],"u:Shadowdancer":["uhb",79,"u"],"u:Cerebus":["drb",71,"u"],"u:Tyrael's Might":["uar",87,"u"],"u:Souldrain":["umg",82,"u"],"u:Runemaster":["72a",80,"u"],"u:Deathcleaver":["7wa",78,"u"],"u:Executioner's Justice":["7gi",83,"u"],"u:Stoneraven":["amd",72,"u"],"u:Leviathan":["uld",73,"u"],"u:Wisp":["rin",84,"u"],"u:Gargoyle's Bite":["7ts",78,"u"],"u:Lacerator":["7b8",76,"u"],"u:Mang Song's Lesson":["6ws",86,"u"],"u:Viperfork":["7br",79,"u"],"u:Ethereal Edge":["7ba",82,"u"],"u:Demonhorn's Edge":["bad",69,"u"],"u:The Reaper's Toll":["7s8",83,"u"],"u:Spiritkeeper":["drd",75,"u"],"u:Hellrack":["6hx",84,"u"],"u:Alma Negra":["pac",85,"u"],"u:Darkforge Spawn":["nef",72,"u"],"u:Widowmaker":["6sw",73,"u"],"u:Bloodraven's Charge":["amb",79,"u"],"u:Ghostflame":["7bl",70,"u"],"u:Shadowkiller":["7cs",85,"u"],"u:Gimmershred":["7ta",78,"u"],"u:Griffon's Eye":["ci3",84,"u"],"u:Windhammer":["7m7",76,"u"],"u:Thunderstroke":["amf",77,"u"],"u:Demon's Arch":["7s7",76,"u"],"u:Boneflame":["nee",80,"u"],"u:Steelpillar":["7p7",77,"u"],"u:Nightwing's Veil":["uhm",75,"u"],"u:Crown of Ages":["urn",86,"u"],"u:Andariel's Visage":["usk",85,"u"],"u:Darkfear":["ulm",1,"u"],"u:Dragonscale":["pae",84,"u"],"u:Steel Carapice":["uul",74,"u"],"u:Medusa's Gaze":["uow",84,"u"],"u:Ravenlore":["dre",82,"u"],"u:Boneshade":["7bw",84,"u"],"u:Flamebellow":["7gs",79,"u"],"u:Fathom":["obf",81,"u"],"u:Wolfhowl":["bac",85,"u"],"u:Spirit Ward":["uts",76,"u"],"u:Kira's Guardian":["ci2",85,"u"],"u:Ormus' Robes":["uui",83,"u"],"u:Gheed's Fortune":["cm3",70,"u"],"u:Stormlash":["7fl",86,"u"],"u:Halaberd's Reign":["bae",85,"u"],"u:Spike Thorn":["upk",78,"u"],"u:Dracul's Grasp":["uvg",84,"u"],"u:Frostwind":["7ls",78,"u"],"u:Templar's Might":["uar",82,"u"],"u:Eschuta's temper":["obc",80,"u"],"u:Firelizard's Talons":["7lw",75,"u"],"u:Sandstorm Trek":["uvb",72,"u"],"u:Marrowwalk":["umb",74,"u"],"u:Heaven's Light":["7sc",69,"u"],"u:Arachnid Mesh":["ulc",87,"u"],"u:Nosferatu's Coil":["uvc",68,"u"],"u:Metalgrid":["amu",85,"u"],"u:Verdugo's Hearty Cord":["umc",71,"u"],"u:Carrion Wind":["rin",68,"u"],"u:Giantskull":["uh9",73,"u"],"u:Ironward":["7ws",68,"u"],"u:Annihilus":["cm1",110,"u"],"u:Arioc's Needle":["7sr",85,"u"],"u:Cranebeak":["7mp",71,"u"],"u:Nord's Tenderizer":["7cl",76,"u"],"u:Earthshifter":["7gm",77,"u"],"u:Wraithflight":["7gl",84,"u"],"u:Bonehew":["7o7",72,"u"],"u:Ondal's Wisdom":["6cs",74,"u"],"u:The Reedeemer":["7sc",80,"u"],"u:Headhunter's Glory":["ush",83,"u"],"u:Steelrend":["uhg",78,"u"],"u:Rainbow Facet|dmg-ltng|death-skill":["jew",85,"u"],"u:Rainbow Facet|dmg-cold|death-skill":["jew",85,"u"],"u:Rainbow Facet|dmg-fire|death-skill":["jew",85,"u"],"u:Rainbow Facet|dmg-pois|death-skill":["jew",85,"u"],"u:Rainbow Facet|dmg-ltng|levelup-skill":["jew",85,"u"],"u:Rainbow Facet|dmg-cold|levelup-skill":["jew",85,"u"],"u:Rainbow Facet|dmg-fire|levelup-skill":["jew",85,"u"],"u:Rainbow Facet|dmg-pois|levelup-skill":["jew",85,"u"],"u:Hellfire Torch":["cm2",110,"u"],"u:Cold Rupture":["cm3",69,"u"],"u:Flame Rift":["cm3",69,"u"],"u:Crack of the Heavens":["cm3",69,"u"],"u:Rotting Fissure":["cm3",69,"u"],"u:Bone Break":["cm3",69,"u"],"u:Black Cleft":["cm3",69,"u"],"s:Civerb's Ward":["lrg",13,"s"],"s:Civerb's Icon":["amu",13,"s"],"s:Civerb's Cudgel":["gsc",13,"s"],"s:Hsarus' Iron Heel":["mbt",4,"s"],"s:Hsarus' Iron Fist":["buc",4,"s"],"s:Hsarus' Iron Stay":["mbl",4,"s"],"s:Cleglaw's Tooth":["lsd",6,"s"],"s:Cleglaw's Claw":["sml",6,"s"],"s:Cleglaw's Pincers":["mgl",6,"s"],"s:Iratha's Collar":["amu",21,"s"],"s:Iratha's Cuff":["tgl",21,"s"],"s:Iratha's Coil":["crn",21,"s"],"s:Iratha's Cord":["tbl",21,"s"],"s:Isenhart's Lightbrand":["bsd",11,"s"],"s:Isenhart's Parry":["gts",11,"s"],"s:Isenhart's Case":["brs",11,"s"],"s:Isenhart's Horns":["fhl",11,"s"],"s:Vidala's Barb":["lbb",19,"s"],"s:Vidala's Fetlock":["tbt",19,"s"],"s:Vidala's Ambush":["lea",19,"s"],"s:Vidala's Snare":["amu",19,"s"],"s:Milabrega's Orb":["kit",23,"s"],"s:Milabrega's Rod":["wsp",23,"s"],"s:Milabrega's Diadem":["crn",23,"s"],"s:Milabrega's Robe":["aar",23,"s"],"s:Cathan's Rule":["bst",15,"s"],"s:Cathan's Mesh":["chn",15,"s"],"s:Cathan's Visage":["msk",15,"s"],"s:Cathan's Sigil":["amu",15,"s"],"s:Cathan's Seal":["rin",15,"s"],"s:Tancred's Crowbill":["mpi",27,"s"],"s:Tancred's Spine":["ful",27,"s"],"s:Tancred's Hobnails":["lbt",27,"s"],"s:Tancred's Weird":["amu",27,"s"],"s:Tancred's Skull":["bhm",27,"s"],"s:Sigon's Gage":["hgl",9,"s"],"s:Sigon's Visor":["ghm",9,"s"],"s:Sigon's Shelter":["gth",9,"s"],"s:Sigon's Sabot":["hbt",9,"s"],"s:Sigon's Wrap":["hbl",9,"s"],"s:Sigon's Guard":["tow",9,"s"],"s:Infernal Cranium":["cap",7,"s"],"s:Infernal Torch":["gwn",7,"s"],"s:Infernal Sign":["tbl",7,"s"],"s:Berserker's Headgear":["hlm",5,"s"],"s:Berserker's Hauberk":["spl",5,"s"],"s:Berserker's Hatchet":["2ax",5,"s"],"s:Death's Hand":["lgl",8,"s"],"s:Death's Guard":["lbl",8,"s"],"s:Death's Touch":["wsd",8,"s"],"s:Angelic Sickle":["sbr",17,"s"],"s:Angelic Mantle":["rng",17,"s"],"s:Angelic Halo":["rin",17,"s"],"s:Angelic Wings":["amu",17,"s"],"s:Arctic Horn":["swb",3,"s"],"s:Arctic Furs":["qui",3,"s"],"s:Arctic Binding":["vbl",3,"s"],"s:Arctic Mitts":["tgl",3,"s"],"s:Arcanna's Sign":["amu",20,"s"],"s:Arcanna's Deathwand":["wst",20,"s"],"s:Arcanna's Head":["skp",20,"s"],"s:Arcanna's Flesh":["ltp",20,"s"],"s:Natalya's Totem":["xh9",22,"s"],"s:Natalya's Mark":["7qr",22,"s"],"s:Natalya's Shadow":["ucl",22,"s"],"s:Natalya's Soul":["xmb",22,"s"],"s:Aldur's Stony Gaze":["dr8",29,"s"],"s:Aldur's Deception":["uul",29,"s"],"s:Aldur's Gauntlet":["9mt",29,"s"],"s:Aldur's Advance":["xtb",29,"s"],"s:Immortal King's Will":["ba5",37,"s"],"s:Immortal King's Soul Cage":["uar",37,"s"],"s:Immortal King's Detail":["zhb",37,"s"],"s:Immortal King's Forge":["xhg",37,"s"],"s:Immortal King's Pillar":["xhb",37,"s"],"s:Immortal King's Stone Crusher":["7m7",37,"s"],"s:Tal Rasha's Fire-Spun Cloth":["zmb",26,"s"],"s:Tal Rasha's Adjudication":["amu",26,"s"],"s:Tal Rasha's Lidless Eye":["oba",26,"s"],"s:Tal Rasha's Howling Wind":["uth",26,"s"],"s:Tal Rasha's Horadric Crest":["xsk",26,"s"],"s:Griswold's Valor":["urn",44,"s"],"s:Griswold's Heart":["xar",44,"s"],"s:Griswolds's Redemption":["7ws",44,"s"],"s:Griswold's Honor":["paf",44,"s"],"s:Trang-Oul's Guise":["uh9",32,"s"],"s:Trang-Oul's Scales":["xul",32,"s"],"s:Trang-Oul's Wing":["ne9",32,"s"],"s:Trang-Oul's Claws":["xmg",32,"s"],"s:Trang-Oul's Girth":["utc",32,"s"],"s:M'avina's True Sight":["ci3",21,"s"],"s:M'avina's Embrace":["uld",21,"s"],"s:M'avina's Icy Clutch":["xtg",21,"s"],"s:M'avina's Tenet":["zvb",21,"s"],"s:M'avina's Caster":["amc",21,"s"],"s:Telling of Beads":["amu",39,"s"],"s:Laying of Hands":["ulg",39,"s"],"s:Rite of Passage":["xlb",39,"s"],"s:Spiritual Custodian":["uui",39,"s"],"s:Credendum":["umc",39,"s"],"s:Dangoon's Teaching":["7ma",55,"s"],"s:Heaven's Taebaek":["uts",55,"s"],"s:Haemosu's Adament":["xrs",55,"s"],"s:Ondal's Almighty":["uhm",55,"s"],"s:Guillaume's Face":["xhm",41,"s"],"s:Wilhelm's Pride":["ztb",41,"s"],"s:Magnus' Skin":["xvg",41,"s"],"s:Wihtstan's Guard":["xml",41,"s"],"s:Hwanin's Splendor":["xrn",28,"s"],"s:Hwanin's Refuge":["xcl",28,"s"],"s:Hwanin's Seal":["mbl",28,"s"],"s:Hwanin's Justice":["9vo",28,"s"],"s:Sazabi's Cobalt Redeemer":["7ls",34,"s"],"s:Sazabi's Ghost Liberator":["upl",34,"s"],"s:Sazabi's Mental Sheath":["xhl",34,"s"],"s:Bul-Kathos' Sacred Charge":["7gd",50,"s"],"s:Bul-Kathos' Tribal Guardian":["7wd",50,"s"],"s:Cow King's Horns":["xap",20,"s"],"s:Cow King's Hide":["stu",20,"s"],"s:Cow King's Hoofs":["vbt",20,"s"],"s:Naj's Puzzler":["6cs",43,"s"],"s:Naj's Light Plate":["ult",43,"s"],"s:Naj's Circlet":["ci0",43,"s"],"s:McAuley's Paragon":["cap",20,"s"],"s:McAuley's Riprap":["vbt",20,"s"],"s:McAuley's Taboo":["vgl",20,"s"],"s:McAuley's Superstition":["bwn",20,"s"],"s:Warlord's Conquest":["hgl",100,"s"],"s:Warlord's Lust":["ghm",100,"s"],"s:Warlord's Mantle":["ful",100,"s"],"s:Warlord's Crushers":["hbt",100,"s"],"s:Warlord's Authority":["hbl",100,"s"],"b:cap":["cap",1,"b"],"b:skp":["skp",5,"b"],"b:hlm":["hlm",11,"b"],"b:fhl":["fhl",15,"b"],"b:ghm":["ghm",23,"b"],"b:crn":["crn",29,"b"],"b:msk":["msk",19,"b"],"b:qui":["qui",1,"b"],"b:lea":["lea",3,"b"],"b:hla":["hla",5,"b"],"b:stu":["stu",8,"b"],"b:rng":["rng",11,"b"],"b:scl":["scl",13,"b"],"b:chn":["chn",15,"b"],"b:brs":["brs",18,"b"],"b:spl":["spl",20,"b"],"b:plt":["plt",24,"b"],"b:fld":["fld",28,"b"],"b:gth":["gth",32,"b"],"b:ful":["ful",37,"b"],"b:aar":["aar",40,"b"],"b:ltp":["ltp",35,"b"],"b:sml":["sml",5,"b"],"b:lrg":["lrg",11,"b"],"b:kit":["kit",15,"b"],"b:tow":["tow",22,"b"],"b:gts":["gts",30,"b"],"b:bhm":["bhm",22,"b"],"b:bsh":["bsh",19,"b"],"b:spk":["spk",11,"b"],"b:xap":["xap",34,"b"],"b:xkp":["xkp",37,"b"],"b:xlm":["xlm",42,"b"],"b:xhl":["xhl",45,"b"],"b:xhm":["xhm",51,"b"],"b:xrn":["xrn",55,"b"],"b:xsk":["xsk",48,"b"],"b:xui":["xui",34,"b"],"b:xea":["xea",36,"b"],"b:xla":["xla",37,"b"],"b:xtu":["xtu",40,"b"],"b:xng":["xng",42,"b"],"b:xcl":["xcl",43,"b"],"b:xhn":["xhn",45,"b"],"b:xrs":["xrs",47,"b"],"b:xpl":["xpl",49,"b"],"b:xlt":["xlt",52,"b"],"b:xld":["xld",55,"b"],"b:xth":["xth",58,"b"],"b:xul":["xul",61,"b"],"b:xar":["xar",64,"b"],"b:xtp":["xtp",60,"b"],"b:xml":["xml",37,"b"],"b:xrg":["xrg",42,"b"],"b:xit":["xit",45,"b"],"b:xow":["xow",50,"b"],"b:xts":["xts",56,"b"],"b:xh9":["xh9",50,"b"],"b:xsh":["xsh",48,"b"],"b:xpk":["xpk",42,"b"],"b:dr1":["dr1",4,"b"],"b:dr2":["dr2",8,"b"],"b:dr3":["dr3",16,"b"],"b:dr4":["dr4",20,"b"],"b:dr5":["dr5",24,"b"],"b:ba1":["ba1",4,"b"],"b:ba2":["ba2",8,"b"],"b:ba3":["ba3",16,"b"],"b:ba4":["ba4",20,"b"],"b:ba5":["ba5",24,"b"],"b:pa1":["pa1",4,"b"],"b:pa2":["pa2",8,"b"],"b:pa3":["pa3",16,"b"],"b:pa4":["pa4",20,"b"],"b:pa5":["pa5",24,"b"],"b:ne1":["ne1",4,"b"],"b:ne2":["ne2",8,"b"],"b:ne3":["ne3",16,"b"],"b:ne4":["ne4",20,"b"],"b:ne5":["ne5",24,"b"],"b:ci0":["ci0",24,"b"],"b:ci1":["ci1",52,"b"],"b:ci2":["ci2",70,"b"],"b:ci3":["ci3",85,"b"],"b:uap":["uap",58,"b"],"b:ukp":["ukp",63,"b"],"b:ulm":["ulm",68,"b"],"b:uhl":["uhl",54,"b"],"b:uhm":["uhm",79,"b"],"b:urn":["urn",85,"b"],"b:usk":["usk",74,"b"],"b:uui":["uui",65,"b"],"b:uea":["uea",67,"b"],"b:ula":["ula",68,"b"],"b:utu":["utu",70,"b"],"b:ung":["ung",72,"b"],"b:ucl":["ucl",73,"b"],"b:uhn":["uhn",62,"b"],"b:urs":["urs",75,"b"],"b:upl":["upl",76,"b"],"b:ult":["ult",78,"b"],"b:uld":["uld",81,"b"],"b:uth":["uth",82,"b"],"b:uul":["uul",83,"b"],"b:uar":["uar",85,"b"],"b:utp":["utp",84,"b"],"b:uuc":["uuc",58,"b"],"b:uml":["uml",61,"b"],"b:urg":["urg",64,"b"],"b:uit":["uit",72,"b"],"b:uow":["uow",79,"b"],"b:uts":["uts",84,"b"],"b:uh9":["uh9",84,"b"],"b:ush":["ush",76,"b"],"b:upk":["upk",68,"b"],"b:dr6":["dr6",35,"b"],"b:dr7":["dr7",40,"b"],"b:dr8":["dr8",46,"b"],"b:dr9":["dr9",50,"b"],"b:dra":["dra",55,"b"],"b:ba6":["ba6",33,"b"],"b:ba7":["ba7",38,"b"],"b:ba8":["ba8",44,"b"],"b:ba9":["ba9",49,"b"],"b:baa":["baa",54,"b"],"b:pa6":["pa6",35,"b"],"b:pa7":["pa7",40,"b"],"b:pa8":["pa8",46,"b"],"b:pa9":["pa9",51,"b"],"b:paa":["paa",55,"b"],"b:ne6":["ne6",33,"b"],"b:ne7":["ne7",39,"b"],"b:ne8":["ne8",45,"b"],"b:ne9":["ne9",49,"b"],"b:nea":["nea",54,"b"],"b:drb":["drb",62,"b"],"b:drc":["drc",69,"b"],"b:drd":["drd",76,"b"],"b:dre":["dre",83,"b"],"b:drf":["drf",85,"b"],"b:bab":["bab",60,"b"],"b:bac":["bac",66,"b"],"b:bad":["bad",73,"b"],"b:bae":["bae",80,"b"],"b:baf":["baf",85,"b"],"b:pab":["pab",63,"b"],"b:pac":["pac",70,"b"],"b:pad":["pad",74,"b"],"b:pae":["pae",82,"b"],"b:paf":["paf",85,"b"],"b:neb":["neb",59,"b"],"b:neg":["neg",67,"b"],"b:ned":["ned",66,"b"],"b:nee":["nee",81,"b"],"b:nef":["nef",85,"b"],"b:hax":["hax",3,"b"],"b:axe":["axe",7,"b"],"b:2ax":["2ax",13,"b"],"b:mpi":["mpi",19,"b"],"b:wax":["wax",25,"b"],"b:lax":["lax",6,"b"],"b:bax":["bax",12,"b"],"b:btx":["btx",17,"b"],"b:gax":["gax",23,"b"],"b:gix":["gix",27,"b"],"b:bwn":["bwn",18,"b"],"b:gwn":["gwn",26,"b"],"b:clb":["clb",1,"b"],"b:scp":["scp",3,"b"],"b:gsc":["gsc",15,"b"],"b:wsp":["wsp",21,"b"],"b:spc":["spc",4,"b"],"b:mac":["mac",8,"b"],"b:mst":["mst",13,"b"],"b:fla":["fla",19,"b"],"b:whm":["whm",25,"b"],"b:mau":["mau",21,"b"],"b:gma":["gma",32,"b"],"b:ssd":["ssd",1,"b"],"b:scm":["scm",5,"b"],"b:sbr":["sbr",8,"b"],"b:flc":["flc",11,"b"],"b:crs":["crs",11,"b"],"b:bsd":["bsd",15,"b"],"b:lsd":["lsd",20,"b"],"b:wsd":["wsd",27,"b"],"b:2hs":["2hs",10,"b"],"b:clm":["clm",17,"b"],"b:gis":["gis",21,"b"],"b:bsw":["bsw",24,"b"],"b:flb":["flb",27,"b"],"b:gsd":["gsd",33,"b"],"b:kri":["kri",17,"b"],"b:bld":["bld",23,"b"],"b:spr":["spr",5,"b"],"b:tri":["tri",9,"b"],"b:brn":["brn",16,"b"],"b:spt":["spt",20,"b"],"b:pik":["pik",24,"b"],"b:bar":["bar",5,"b"],"b:vou":["vou",11,"b"],"b:scy":["scy",15,"b"],"b:pax":["pax",21,"b"],"b:hal":["hal",29,"b"],"b:wsc":["wsc",34,"b"],"b:sst":["sst",1,"b"],"b:lst":["lst",8,"b"],"b:cst":["cst",12,"b"],"b:bst":["bst",17,"b"],"b:wst":["wst",24,"b"],"b:sbw":["sbw",1,"b"],"b:hbw":["hbw",5,"b"],"b:lbw":["lbw",8,"b"],"b:cbw":["cbw",12,"b"],"b:sbb":["sbb",18,"b"],"b:lbb":["lbb",23,"b"],"b:swb":["swb",27,"b"],"b:lwb":["lwb",31,"b"],"b:lxb":["lxb",6,"b"],"b:mxb":["mxb",15,"b"],"b:hxb":["hxb",24,"b"],"b:rxb":["rxb",33,"b"],"b:leg":["leg",1,"b"],"b:hfh":["hfh",1,"b"],"b:9ha":["9ha",31,"b"],"b:9ax":["9ax",34,"b"],"b:92a":["92a",39,"b"],"b:9mp":["9mp",43,"b"],"b:9wa":["9wa",48,"b"],"b:9la":["9la",34,"b"],"b:9ba":["9ba",38,"b"],"b:9bt":["9bt",42,"b"],"b:9ga":["9ga",46,"b"],"b:9gi":["9gi",51,"b"],"b:9yw":["9yw",38,"b"],"b:9bw":["9bw",43,"b"],"b:9gw":["9gw",49,"b"],"b:9cl":["9cl",30,"b"],"b:9sc":["9sc",31,"b"],"b:9qs":["9qs",40,"b"],"b:9ws":["9ws",45,"b"],"b:9sp":["9sp",32,"b"],"b:9ma":["9ma",35,"b"],"b:9mt":["9mt",39,"b"],"b:9fl":["9fl",43,"b"],"b:9wh":["9wh",48,"b"],"b:9m9":["9m9",45,"b"],"b:9gm":["9gm",53,"b"],"b:9ss":["9ss",30,"b"],"b:9sm":["9sm",43,"b"],"b:9sb":["9sb",35,"b"],"b:9fc":["9fc",37,"b"],"b:9cr":["9cr",37,"b"],"b:9bs":["9bs",40,"b"],"b:9ls":["9ls",44,"b"],"b:9wd":["9wd",49,"b"],"b:92h":["92h",37,"b"],"b:9cm":["9cm",42,"b"],"b:9gs":["9gs",45,"b"],"b:9b9":["9b9",48,"b"],"b:9fb":["9fb",49,"b"],"b:9gd":["9gd",54,"b"],"b:9kr":["9kr",42,"b"],"b:9bl":["9bl",46,"b"],"b:9sr":["9sr",33,"b"],"b:9tr":["9tr",36,"b"],"b:9br":["9br",41,"b"],"b:9st":["9st",44,"b"],"b:9p9":["9p9",47,"b"],"b:9b7":["9b7",33,"b"],"b:9vo":["9vo",37,"b"],"b:9s8":["9s8",40,"b"],"b:9pa":["9pa",35,"b"],"b:9h9":["9h9",51,"b"],"b:9wc":["9wc",55,"b"],"b:8ss":["8ss",30,"b"],"b:8ls":["8ls",35,"b"],"b:8cs":["8cs",38,"b"],"b:8bs":["8bs",42,"b"],"b:8ws":["8ws",47,"b"],"b:8sb":["8sb",30,"b"],"b:8hb":["8hb",33,"b"],"b:8lb":["8lb",35,"b"],"b:8cb":["8cb",39,"b"],"b:8s8":["8s8",43,"b"],"b:8l8":["8l8",46,"b"],"b:8sw":["8sw",49,"b"],"b:8lw":["8lw",52,"b"],"b:8lx":["8lx",34,"b"],"b:8mx":["8mx",40,"b"],"b:8hx":["8hx",47,"b"],"b:8rx":["8rx",54,"b"],"b:qf1":["qf1",1,"b"],"b:qf2":["qf2",1,"b"],"b:ktr":["ktr",1,"b"],"b:wrb":["wrb",9,"b"],"b:axf":["axf",12,"b"],"b:ces":["ces",15,"b"],"b:clw":["clw",18,"b"],"b:btl":["btl",21,"b"],"b:skr":["skr",24,"b"],"b:9ar":["9ar",28,"b"],"b:9wb":["9wb",32,"b"],"b:9xf":["9xf",36,"b"],"b:9cs":["9cs",41,"b"],"b:9lw":["9lw",45,"b"],"b:9tw":["9tw",50,"b"],"b:9qr":["9qr",54,"b"],"b:7ar":["7ar",59,"b"],"b:7wb":["7wb",62,"b"],"b:7xf":["7xf",68,"b"],"b:7cs":["7cs",73,"b"],"b:7lw":["7lw",78,"b"],"b:7tw":["7tw",81,"b"],"b:7qr":["7qr",85,"b"],"b:7ha":["7ha",54,"b"],"b:7ax":["7ax",61,"b"],"b:72a":["72a",70,"b"],"b:7mp":["7mp",79,"b"],"b:7wa":["7wa",85,"b"],"b:7la":["7la",57,"b"],"b:7ba":["7ba",65,"b"],"b:7bt":["7bt",73,"b"],"b:7ga":["7ga",82,"b"],"b:7gi":["7gi",85,"b"],"b:7wn":["7wn",55,"b"],"b:7yw":["7yw",65,"b"],"b:7bw":["7bw",75,"b"],"b:7gw":["7gw",86,"b"],"b:7cl":["7cl",52,"b"],"b:7sc":["7sc",62,"b"],"b:7qs":["7qs",76,"b"],"b:7ws":["7ws",85,"b"],"b:7sp":["7sp",57,"b"],"b:7ma":["7ma",63,"b"],"b:7mt":["7mt",70,"b"],"b:7fl":["7fl",76,"b"],"b:7wh":["7wh",82,"b"],"b:7m7":["7m7",69,"b"],"b:7gm":["7gm",85,"b"],"b:7ss":["7ss",56,"b"],"b:7sm":["7sm",61,"b"],"b:7sb":["7sb",63,"b"],"b:7fc":["7fc",69,"b"],"b:7cr":["7cr",73,"b"],"b:7bs":["7bs",78,"b"],"b:7ls":["7ls",82,"b"],"b:7wd":["7wd",85,"b"],"b:72h":["72h",59,"b"],"b:7cm":["7cm",66,"b"],"b:7gs":["7gs",71,"b"],"b:7b7":["7b7",77,"b"],"b:7fb":["7fb",80,"b"],"b:7gd":["7gd",85,"b"],"b:7kr":["7kr",83,"b"],"b:7bl":["7bl",85,"b"],"b:7sr":["7sr",58,"b"],"b:7tr":["7tr",66,"b"],"b:7br":["7br",74,"b"],"b:7st":["7st",83,"b"],"b:7p7":["7p7",85,"b"],"b:7o7":["7o7",60,"b"],"b:7vo":["7vo",64,"b"],"b:7s8":["7s8",71,"b"],"b:7pa":["7pa",79,"b"],"b:7h7":["7h7",84,"b"],"b:7wc":["7wc",85,"b"],"b:6ss":["6ss",58,"b"],"b:6ls":["6ls",66,"b"],"b:6cs":["6cs",74,"b"],"b:6bs":["6bs",83,"b"],"b:6ws":["6ws",85,"b"],"b:6sb":["6sb",55,"b"],"b:6hb":["6hb",60,"b"],"b:6lb":["6lb",63,"b"],"b:6cb":["6cb",68,"b"],"b:6s7":["6s7",72,"b"],"b:6l7":["6l7",77,"b"],"b:6sw":["6sw",80,"b"],"b:6lw":["6lw",85,"b"],"b:6lx":["6lx",57,"b"],"b:6mx":["6mx",67,"b"],"b:6hx":["6hx",75,"b"],"b:6rx":["6rx",84,"b"],"b:ob1":["ob1",1,"b"],"b:ob2":["ob2",8,"b"],"b:ob3":["ob3",12,"b"],"b:ob4":["ob4",17,"b"],"b:ob5":["ob5",24,"b"],"b:am1":["am1",18,"b"],"b:am2":["am2",27,"b"],"b:am3":["am3",18,"b"],"b:am4":["am4",27,"b"],"b:ob6":["ob6",32,"b"],"b:ob7":["ob7",37,"b"],"b:ob8":["ob8",41,"b"],"b:ob9":["ob9",46,"b"],"b:oba":["oba",50,"b"],"b:am6":["am6",39,"b"],"b:am7":["am7",47,"b"],"b:am8":["am8",43,"b"],"b:am9":["am9",51,"b"],"b:obb":["obb",59,"b"],"b:obc":["obc",67,"b"],"b:obd":["obd",75,"b"],"b:obe":["obe",84,"b"],"b:obf":["obf",85,"b"],"b:amb":["amb",53,"b"],"b:amc":["amc",78,"b"],"b:amd":["amd",61,"b"],"b:ame":["ame",81,"b"]}; // key -> [base code, monster level needed, kind u|s|b]
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
const UBER_PRESETS = {"slight":{"regen":25,"aura":85,"spell":60,"res":95,"hp":75,"melee":80,"ar":100,"ac":100,"speed":100},"medium":{"regen":0,"aura":40,"spell":35,"res":60,"hp":40,"melee":50,"ar":70,"ac":60,"speed":85},"super":{"regen":0,"aura":0,"spell":10,"res":0,"hp":10,"melee":15,"ar":30,"ac":20,"speed":70}};
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
