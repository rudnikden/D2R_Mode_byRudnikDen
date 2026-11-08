// Generator for the D2R_Mode_byRudnikDen D2RMM mod (mod.json, mod.js, README.md).
// Usage: node gen_rudnik.js [extra output folder ...]
// Reads the game tables from gamedata/ (run extract.ps1 first) and always writes ../mod/D2R_Mode_byRudnikDen;
// each extra folder, such as "<D2RMM folder>\mods\D2R_Mode_byRudnikDen", gets a copy. config.json is never touched.
// build.cmd in the repository root runs all of it and finds the folders by itself.
const fs = require('fs');
const path = require('path');
const { read: readTsv } = require('./tsv.js');
const DATA = path.join(__dirname, 'gamedata');
const OUT_DIRS = [path.join(__dirname, '..', 'mod', 'D2R_Mode_byRudnikDen'), ...process.argv.slice(2)];
const read = (f) => readTsv(path.join(DATA, f));
const L = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8').replace(/^\uFEFF/, ''));
const STR = {};
L('local_lng_strings_item-names.json').forEach((e) => (STR[e.Key] = e));
const clean = (s) => String(s || '').replace(/^\[[a-z]+\]/, '').trim();
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const loc = (key, lang, fallback) => {
  const e = STR[key];
  if (!e) return fallback;
  const v = lang === 'ru' ? e.ruRU : e.enUS; // the game has no Ukrainian locale: use English names there
  return cap(clean(v)) || fallback;
};

// Main table set is the superset (includes Reign of the Warlock items)
const armor = read('global_excel_base_armor.txt');
const weapons = read('global_excel_base_weapons.txt');
const misc = read('global_excel_misc.txt');
const uniques = read('global_excel_base_uniqueitems.txt');
const sets = read('global_excel_base_setitems.txt');

const tierOf = {};
for (const r of [...armor, ...weapons]) {
  if (r.normcode && !tierOf[r.normcode]) tierOf[r.normcode] = 'n';
  if (r.ubercode) tierOf[r.ubercode] = 'x';
  if (r.ultracode) tierOf[r.ultracode] = 'e';
}

const LANGS = ['en', 'uk', 'ru'];
const T = {
  langName: { en: 'English', uk: 'Українська', ru: 'Русский' },
  tier: {
    en: { n: 'normal', x: 'exceptional', e: 'elite' },
    uk: { n: 'звичайна', x: 'виняткова', e: 'елітна' },
    ru: { n: 'обычная', x: 'исключительная', e: 'элитная' },
  },
  langLabel: { en: 'Language', uk: 'Мова', ru: 'Язык' },
  about: {
    name: { en: 'How to use', uk: 'Як користуватися', ru: 'Как пользоваться' },
    lines: {
      en: [
        'Offline play only.',
        'Every feature is off by default: with default settings the game is unchanged.',
        'Open a section below and switch on its first checkbox to use it.',
        'After every change: INSTALL MODS, then RUN D2R.',
        'To undo a change, press the round-arrow button on the right of a field.',
        'Back up your saves before playing with mods.',
      ],
      uk: [
        'Лише для офлайн-гри.',
        'Усі функції за замовчуванням вимкнені: з налаштуваннями за замовчуванням гра без змін.',
        'Відкрийте розділ нижче й увімкніть його першу галочку, щоб ним користуватися.',
        'Після кожної зміни: INSTALL MODS, потім RUN D2R.',
        'Щоб скасувати зміну, натисніть кнопку з круглою стрілкою праворуч від поля.',
        'Зробіть резервну копію збережень перед грою з модами.',
      ],
      ru: [
        'Только для офлайн-игры.',
        'Все функции по умолчанию выключены: с настройками по умолчанию игра без изменений.',
        'Откройте раздел ниже и включите его первую галочку, чтобы им пользоваться.',
        'После каждого изменения: INSTALL MODS, затем RUN D2R.',
        'Чтобы отменить изменение, нажмите кнопку с круглой стрелкой справа от поля.',
        'Сделайте резервную копию сохранений перед игрой с модами.',
      ],
    },
  },
  compat: {
    name: { en: 'Playing without the mod (save compatibility)', uk: 'Гра без мода (сумісність збережень)', ru: 'Игра без мода (совместимость сохранений)' },
    lines: {
      en: [
        'Safe: everything this mod changes. Items found or made with it are ordinary game items.',
        'Safe: runewords, uniques with an added socket, socket forge items (sockets never exceed what the base allows).',
        'Safe: drop chances, runes, Countess, target items and the class filter only affect new drops.',
        'Risk: compatibility with other mods is not guaranteed. For example, if you use the Expanded Inventory mod, items outside the original 10×4 area may be lost.',
        'To move a character to the game without mods:',
        '1. Put every item inside the original 10×4 inventory area.',
        '2. Close the game.',
        '3. Back up both save folders.',
        '4. Copy the character files from Saved Games/Diablo II Resurrected/mods/D2RMM to Saved Games/Diablo II Resurrected.',
        '5. Start the game without mods.',
      ],
      uk: [
        'Безпечно: усе, що змінює цей мод. Знайдені чи створені з ним предмети — звичайні предмети гри.',
        'Безпечно: рунні слова, унікальні з доданим гніздом, предмети з кузні гнізд (гнізд не більше, ніж дозволяє основа).',
        'Безпечно: шанси дропу, руни, Графиня, цільові предмети і фільтр за класом впливають лише на новий дроп.',
        'Ризик: сумісність з іншими модами не гарантується. Наприклад, якщо ви використовуєте мод Expanded Inventory, предмети поза початковою зоною 10×4 можуть зникнути.',
        'Щоб перенести персонажа в гру без модів:',
        '1. Покладіть усі предмети в початкову зону інвентарю 10×4.',
        '2. Закрийте гру.',
        '3. Зробіть резервні копії обох папок збережень.',
        '4. Скопіюйте файли персонажа з Saved Games/Diablo II Resurrected/mods/D2RMM у Saved Games/Diablo II Resurrected.',
        '5. Запустіть гру без модів.',
      ],
      ru: [
        'Безопасно: всё, что меняет этот мод. Найденные или созданные с ним вещи — обычные вещи игры.',
        'Безопасно: рунные слова, уникальные вещи с добавленным гнездом, вещи из кузницы гнёзд (гнёзд не больше, чем позволяет база).',
        'Безопасно: шансы дропа, руны, Графиня, целевые вещи и фильтр по классу влияют только на новый дроп.',
        'Риск: совместимость с другими модами не гарантируется. Например, если вы используете мод Expanded Inventory, вещи за пределами исходной области 10×4 могут пропасть.',
        'Чтобы перенести персонажа в игру без модов:',
        '1. Положите все вещи в исходную область инвентаря 10×4.',
        '2. Закройте игру.',
        '3. Сделайте резервные копии обеих папок сохранений.',
        '4. Скопируйте файлы персонажа из Saved Games/Diablo II Resurrected/mods/D2RMM в Saved Games/Diablo II Resurrected.',
        '5. Запустите игру без модов.',
      ],
    },
  },
  q: {
    name: { en: '2. Item quality (all drops)', uk: '2. Якість предметів (увесь дроп)', ru: '2. Качество предметов (весь дроп)' },
    desc: {
      en: 'Chance that any dropped item becomes unique, set, rare, magic or superior. Affects the whole drop. To get one specific item, use section 3. Lower everything to get plain white/grey bases for runewords.',
      uk: 'Шанс, що будь-який предмет випаде унікальним, сетовим, рідкісним, магічним чи покращеним. Діє на весь дроп. Щоб отримати конкретний предмет, скористайтеся розділом 3. Знизьте все, щоб падали звичайні білі/сірі основи під рунні слова.',
      ru: 'Шанс, что любая выпавшая вещь станет уникальной, сетовой, редкой, магической или превосходной. Действует на весь дроп. Чтобы получить конкретную вещь, используйте раздел 3. Опустите всё, чтобы падали обычные белые/серые базы под рунные слова.',
    },
    on: { en: 'Enable item quality settings', uk: 'Увімкнути налаштування якості', ru: 'Включить настройки качества' },
    preset: { en: 'Preset', uk: 'Пресет', ru: 'Пресет' },
    presetDesc: {
      en: 'Pick a ready-made set of values or "Custom" to edit the numbers below.',
      uk: 'Оберіть готовий набір значень або «Власний», щоб змінювати числа нижче.',
      ru: 'Выберите готовый набор значений или «Свой», чтобы менять числа ниже.',
    },
    presets: {
      bases: { en: 'Runeword bases: almost everything drops white/grey', uk: 'Основи під рунні слова: майже все біле/сіре', ru: 'Базы под рунные слова: почти всё белое/серое' },
      balanced: { en: 'Balanced: more drops of every quality', uk: 'Збалансовано: збільшено дроп усіх речей', ru: 'Сбалансировано: увеличен дроп всех вещей' },
      uniques: { en: 'Unique hunting: every eligible item is unique', uk: 'Полювання на унікальні: кожен можливий предмет унікальний', ru: 'Охота за уникальными: каждая возможная вещь уникальная' },
      custom: { en: 'Custom', uk: 'Власний', ru: 'Свой' },
    },
    fields: {
      q_unique: { en: 'Unique chance, %', uk: 'Шанс унікального, %', ru: 'Шанс уникальной, %' },
      q_set: { en: 'Set chance, %', uk: 'Шанс сетового, %', ru: 'Шанс сетовой, %' },
      q_rare: { en: 'Rare chance, %', uk: 'Шанс рідкісного, %', ru: 'Шанс редкой, %' },
      q_magic: { en: 'Magic chance, %', uk: 'Шанс магічного, %', ru: 'Шанс магической, %' },
      q_superior: { en: 'Superior chance, %', uk: 'Шанс покращеного, %', ru: 'Шанс превосходной, %' },
    },
    limits: {
      en: (d) => 'Default ' + d + ': as in the normal game. Maximum 100: every item that can have this quality gets it. Minimum 0: this quality no longer drops by chance.',
      uk: (d) => 'За замовчуванням ' + String(d).replace('.', ',') + ': як у звичайній грі. Максимум 100: кожен предмет, який може мати цю якість, її отримає. Мінімум 0: ця якість більше не випадає випадково.',
      ru: (d) => 'По умолчанию ' + String(d).replace('.', ',') + ': как в обычной игре. Максимум 100: каждая вещь, которая может иметь это качество, его получит. Минимум 0: это качество больше не выпадает случайно.',
    },
    fieldDesc: {
      en: 'Chance (before Magic Find) that an item which can have this quality gets it. The game checks unique, then set, rare, magic, superior; whatever is left drops white. Without the mod it is roughly: unique 0.25, set 0.6, rare 1, magic 3, superior 8.',
      uk: 'Шанс (до Magic Find), що предмет, який може мати цю якість, її отримає. Гра перевіряє по черзі: унікальний, сетовий, рідкісний, магічний, покращений; решта падає білою. Без мода приблизно: унікальний 0,25, сет 0,6, рідкісний 1, магічний 3, покращений 8.',
      ru: 'Шанс (до Magic Find), что вещь, которая может иметь это качество, его получит. Игра проверяет по очереди: уникальная, сетовая, редкая, магическая, превосходная; остальное падает белым. Без мода примерно: уникальная 0,25, сет 0,6, редкая 1, магическая 3, превосходная 8.',
    },
    nomin: { en: 'Ignore minimum rarity', uk: 'Ігнорувати мінімальну рідкість', ru: 'Игнорировать минимальную редкость' },
    nominDesc: {
      en: 'Recommended. Without it the game still keeps a hard floor on how rare uniques and sets are.',
      uk: 'Рекомендовано. Без цього гра все одно тримає жорсткий мінімум рідкості унікальних і сетових.',
      ru: 'Рекомендуется. Без этого игра всё равно держит жёсткий минимум редкости уникальных и сетовых.',
    },
    nolvl: { en: 'Same chances at every monster level', uk: 'Однакові шанси на будь-якому рівні монстрів', ru: 'Одинаковые шансы на любом уровне монстров' },
    nolvlDesc: {
      en: 'Recommended. Without it the chances above change with monster level as without the mod.',
      uk: 'Рекомендовано. Без цього шанси змінюються з рівнем монстрів, як без мода.',
      ru: 'Рекомендуется. Без этого шансы меняются с уровнем монстров, как без мода.',
    },
  },
  r: {
    name: { en: '4. Good drops: runes, jewelry, gems', uk: '4. Добрий дроп: руни й коштовності', ru: '4. Хороший дроп: руны и драгоценности' },
    desc: {
      en: 'A "good" drop is a rune, ring, amulet, charm or gem. Set the settings from top to bottom: first how often good drops happen, then how many of them are runes, then how high the runes are.',
      uk: '«Добрий» дроп — це руна, перстень, амулет, оберіг або камінь. Налаштовуйте згори донизу: спершу як часто буває добрий дроп, потім скільки в ньому рун, потім наскільки високі ці руни.',
      ru: '«Хороший» дроп — это руна, кольцо, амулет, оберег или камень. Настраивайте сверху вниз: сначала как часто бывает хороший дроп, потом сколько в нём рун, потом насколько высокие эти руны.',
    },
    on: { en: 'Enable these settings', uk: 'Увімкнути ці налаштування', ru: 'Включить эти настройки' },
    tier: { en: 'Shift toward higher runes, ×', uk: 'Зсув до вищих рун, ×', ru: 'Сдвиг к высоким рунам, ×' },
    tierDesc: {
      en: 'Default 1: as in the normal game, high runes are extremely rare. 10: high runes about 10 times as likely, fewer low runes. Maximum 100: high runes are about as common as low ones. Does not change how many runes drop.',
      uk: 'За замовчуванням 1: як у звичайній грі, високі руни надзвичайно рідкісні. 10: високі руни приблизно в 10 разів частіше, низьких менше. Максимум 100: високі руни майже так само часті, як низькі. Кількість рун не змінює.',
      ru: 'По умолчанию 1: как в обычной игре, высокие руны крайне редки. 10: высокие руны примерно в 10 раз чаще, низких меньше. Максимум 100: высокие руны почти так же часты, как низкие. Количество рун не меняет.',
    },
    amount: { en: 'Rune share in good drops, ×', uk: 'Частка рун у доброму дропі, ×', ru: 'Доля рун в хорошем дропе, ×' },
    amountDesc: {
      en: 'How much more often a "good" drop is a rune instead of a gem or jewelry. Default 1: as in the normal game, runes are about 11% of good drops in Hell. 5: about 38%. Maximum 50: about 86%, gems and jewelry become rare.',
      uk: 'Наскільки частіше «добрий» дроп буде руною, а не каменем чи прикрасою. За замовчуванням 1: як у звичайній грі, у Пеклі руни ≈11% доброго дропу. 5: ≈38%. Максимум 50: ≈86%, камені й прикраси стають рідкістю.',
      ru: 'Насколько чаще «хороший» дроп будет руной, а не камнем или украшением. По умолчанию 1: как в обычной игре, в Аду руны ≈11% хорошего дропа. 5: ≈38%. Максимум 50: ≈86%, камни и украшения становятся редкостью.',
    },
    good: { en: 'Good drop frequency, ×', uk: 'Частота доброго дропу, ×', ru: 'Частота хорошего дропа, ×' },
    goodDesc: {
      en: 'Default 1: as in the normal game, an ordinary Hell monster gives a good drop in about 1–2% of its drop rolls. Maximum 20: about 20–25% of the rolls. Raises runes, rings, amulets, charms and gems. The main setting of this section: the two below only divide what this one gives, so at 1 you will hardly notice them.',
      uk: 'За замовчуванням 1: як у звичайній грі, звичайний монстр у Пеклі дає добрий дроп приблизно в 1–2% спроб дропу. Максимум 20: приблизно 20–25% спроб. Збільшує руни, персні, амулети, обереги та камені. Головне налаштування розділу: два нижчі лише ділять те, що дає воно, тому при 1 їх майже не помітно.',
      ru: 'По умолчанию 1: как в обычной игре, обычный монстр в Аду даёт хороший дроп примерно в 1–2% попыток дропа. Максимум 20: примерно 20–25% попыток. Повышает руны, кольца, амулеты, обереги и камни. Главная настройка раздела: две нижние только делят то, что даёт она, поэтому при 1 их почти не заметно.',
    },
    countess: { en: 'Countess always has room for her 3 runes', uk: 'Графиня завжди має місце для 3 рун', ru: 'У Графини всегда есть место под 3 руны' },
    countessDesc: {
      en: 'A monster drops at most 6 items. The Countess rolls her runes first and drops at most 3 other items, so her 3 rune rolls are never crowded out (useful with /players 7).',
      uk: 'Монстр дає не більше 6 предметів. Графиня спершу кидає руни і дає не більше 3 інших предметів, тож її 3 спроби на руни не витісняються (корисно з /players 7).',
      ru: 'Монстр роняет не больше 6 вещей. Графиня сначала бросает руны и роняет не больше 3 других вещей, поэтому её 3 попытки на руны не вытесняются (полезно с /players 7).',
    },
  },
  t: {
    name: { en: '3. Target items', uk: '3. Цільові предмети', ru: '3. Целевые вещи' },
    desc: {
      en: 'Tick the item bases you are hunting and they will drop often. The name shows the unique items on that base; the tooltip shows the item code, the level the base starts dropping at, and the monster level needed for each unique and set item. To get the unique: set Item quality to "Unique hunting" and farm monsters of at least that level.',
      uk: 'Позначте основи, на які полюєте, і вони падатимуть часто. У назві — унікальні предмети на цій основі; у підказці — код, з якого рівня падає основа і який рівень монстрів потрібен для кожного унікального та сетового предмета. Щоб випав унікальний: оберіть у якості предметів «Полювання на унікальні» і фармте монстрів не нижче цього рівня.',
      ru: 'Отметьте базы, за которыми охотитесь, и они будут падать часто. В названии — уникальные вещи на этой базе; в подсказке — код, с какого уровня падает база и какой уровень монстров нужен для каждой уникальной и сетовой вещи. Чтобы выпала уникальная: выберите в качестве предметов «Охота за уникальными» и фармите монстров не ниже этого уровня.',
    },
    on: { en: 'Enable target items', uk: 'Увімкнути цільові предмети', ru: 'Включить целевые вещи' },
    share: { en: 'Share of good drops, %', uk: 'Частка доброго дропу, %', ru: 'Доля хорошего дропа, %' },
    shareDesc: {
      en: 'Which part of all "good" drops goes to the ticked items, split evenly between them. 30% is noticeable, 60% is a lot. Combine with "Good drop frequency" in section 2.',
      uk: 'Яка частина всього «доброго» дропу дістанеться позначеним предметам (порівну між ними). 30% — помітно, 60% — дуже багато. Поєднуйте з «Частота доброго дропу» у розділі 2.',
      ru: 'Какая часть всего «хорошего» дропа достанется отмеченным вещам (поровну между ними). 30% — заметно, 60% — очень много. Сочетайте с «Частота хорошего дропа» в разделе 2.',
    },
    diff: { en: 'Difficulty', uk: 'Складність', ru: 'Сложность' },
    diffDesc: {
      en: 'The chosen bases will drop on this difficulty. A unique item on a base drops only where monsters are at least the level shown in its name. Example: "Arachnid Mesh 87+" never drops on Normal or Nightmare, and in Hell only from monsters 87+ (Terror Zones, Diablo, Baal). Lower difficulties are handy for farming white runeword bases fast; add sockets with the socket forge.',
      uk: 'Вибрані основи падатимуть на цій складності. Унікальний предмет на основі випаде лише там, де рівень монстрів не нижчий за вказаний у його назві. Приклад: «Arachnid Mesh 87+» не випаде на Нормі й Кошмарі, а в Пеклі — лише з монстрів 87+ (зони жаху, Діабло, Баал). На нижчих складностях зручно швидко набивати білі основи під рунні слова, а гнізда робити кузнею.',
      ru: 'Отмеченные базы будут падать на этой сложности. Уникальная вещь на базе выпадет только там, где уровень монстров не ниже указанного в её названии. Пример: «Сетчатый пояс арахнида 87+» не выпадет на Норме и Кошмаре, а в Аду — только с монстров 87+ (зоны ужаса, Диабло, Баал). На низких сложностях удобно быстро набивать белые базы под рунные слова, а гнёзда делать кузницей.',
    },
    dNormal: { en: 'Bases also drop on Normal', uk: 'Основи падають і на Нормі', ru: 'Базы падают и на Норме' },
    dNightmare: { en: 'Bases also drop on Nightmare', uk: 'Основи падають і на Кошмарі', ru: 'Базы падают и на Кошмаре' },
    dHell: { en: 'Bases also drop in Hell', uk: 'Основи падають і в Пеклі', ru: 'Базы падают и в Аду' },
    codes: { en: 'Extra item codes (advanced)', uk: 'Додаткові коди (для досвідчених)', ru: 'Дополнительные коды (для опытных)' },
    codesDesc: {
      en: 'Comma-separated item codes for anything not listed above. Unknown codes are skipped.',
      uk: 'Коди предметів через кому, якщо чогось немає у списках вище. Невідомі коди пропускаються.',
      ru: 'Коды вещей через запятую, если чего-то нет в списках выше. Неизвестные коды пропускаются.',
    },
    code: { en: 'code', uk: 'код', ru: 'код' },
    dropsFrom: { en: 'the base drops from monster level', uk: 'основа падає з рівня монстрів', ru: 'база падает с монстров уровня' },
    onBase: { en: 'On this base', uk: 'На цій основі', ru: 'На этой базе' },
    none: { en: 'No unique or set items on this base.', uk: 'Унікальних і сетових предметів на цій основі немає.', ru: 'Уникальных и сетовых вещей на этой базе нет.' },
    uniq: { en: 'unique, monsters', uk: 'унікальний, монстри', ru: 'уник., монстры' },
    set: { en: 'set, monsters', uk: 'сет, монстри', ru: 'сет, монстры' },
  },
  x: {
    name: { en: '5. Horadric Cube recipes', uk: '5. Рецепти Кубу Хорадрика', ru: '5. Рецепты Хорадрического куба' },
    desc: {
      en: 'Extra cube recipes. Each one can be switched on separately.',
      uk: 'Додаткові рецепти кубу. Кожен вмикається окремо.',
      ru: 'Дополнительные рецепты куба. Каждый включается отдельно.',
    },
    gem: { en: 'Downgrade gems: 1 gem -> 2 gems one quality lower', uk: 'Зниження каменів: 1 камінь -> 2 камені на рівень нижче', ru: 'Понижение камней: 1 камень -> 2 камня на ступень ниже' },
    gemDesc: {
      en: 'Works for every gem type and skulls: perfect -> 2 flawless -> 2 normal -> 2 flawed -> 2 chipped.',
      uk: 'Для всіх каменів і черепів: ідеальний -> 2 бездоганні -> 2 звичайні -> 2 мутні -> 2 надколоті.',
      ru: 'Для всех камней и черепов: идеальный -> 2 безупречных -> 2 обычных -> 2 мутных -> 2 надколотых.',
    },
    rune: { en: 'Downgrade runes: 1 rune -> 2 runes one level lower', uk: 'Зниження рун: 1 руна -> 2 руни на рівень нижче', ru: 'Понижение рун: 1 руна -> 2 руны на ступень ниже' },
    runeDesc: {
      en: 'Works for every rune from Eld to Zod: Zod -> 2 Cham, Ber -> 2 Sur, Eld -> 2 El. Put one rune into the cube and press Transmute.',
      uk: 'Для всіх рун від Eld до Zod: Zod -> 2 Cham, Ber -> 2 Sur, Eld -> 2 El. Покладіть одну руну в куб і натисніть «Перетворити».',
      ru: 'Для всех рун от Элд до Зод: Зод -> 2 Чам, Бер -> 2 Сур, Элд -> 2 Эл. Положите одну руну в куб и нажмите «Преобразовать».',
    },
    usock: { en: 'Socket a unique: Hel rune + skull + unique item -> 1 socket', uk: 'Гніздо в унікальний: руна Hel + череп + унікальний предмет -> 1 гніздо', ru: 'Гнездо в уникальную вещь: руна Хел + череп + уникальная вещь -> 1 гнездо' },
    usockGem: { en: 'Socket a unique: skull', uk: 'Гніздо в унікальний: череп', ru: 'Гнездо в уникальную вещь: череп' },
    usockNone: { en: 'No skull (Hel rune only)', uk: 'Без черепа (лише руна Hel)', ru: 'Без черепа (только руна Хел)' },
    usockDesc: {
      en: 'Only for unique items without sockets. Always exactly 1 socket: the recipe repeats the reward of Larzuk from the original game, who also cannot make more than one socket in a unique item. Rings, amulets, boots, gloves and belts cannot have sockets in this game.',
      uk: 'Лише для унікальних предметів без гнізд. Завжди рівно 1 гніздо: рецепт повторює нагороду Ларзука з оригінальної гри, який теж не може зробити в унікальному предметі більше одного гнізда. Персні, амулети, чоботи, рукавиці та пояси не можуть мати гнізд у цій грі.',
      ru: 'Только для уникальных вещей без гнёзд. Всегда ровно 1 гнездо: рецепт повторяет награду Ларзука из оригинальной игры, который тоже не может сделать в уникальной вещи больше одного гнезда. Кольца, амулеты, сапоги, перчатки и пояса в этой игре не могут иметь гнёзд.',
    },
    rejuv: { en: 'Easy Full Rejuvenation: 1 healing potion + 1 mana potion -> 1 Full Rejuvenation', uk: 'Просте повне омолодження: 1 зілля здоров’я + 1 зілля мани -> 1 повне омолодження', ru: 'Простое полное омоложение: 1 зелье здоровья + 1 зелье маны -> 1 полное омоложение' },
    rejuvDesc: {
      en: 'Any size of potions works. 3 healing + 3 mana potions give 3 Full Rejuvenations in one transmute. The game’s own recipes (with a gem) keep working.',
      uk: 'Підходять зілля будь-якого розміру. 3 зілля здоров’я + 3 зілля мани дають 3 повні омолодження за одне перетворення. Рецепти самої гри (з каменем) працюють як раніше.',
      ru: 'Подходят зелья любого размера. 3 зелья здоровья + 3 зелья маны дают 3 полных омоложения за одно преобразование. Рецепты самой игры (с камнем) работают как раньше.',
    },
    forge: { en: 'Socket forge: Ral + Amn + Thul + weapon, armor, shield or helm -> item with N sockets', uk: 'Кузня гнізд: Ral + Amn + Thul + зброя, обладунок, щит чи шолом -> предмет з N гніздами', ru: 'Кузница гнёзд: Рал + Амн + Тул + оружие, броня, щит или шлем -> вещь с N гнёздами' },
    forgeDesc: {
      en: 'A white or superior item without sockets keeps everything (ethereal, superior bonus) and just gets the sockets. An item that already has sockets becomes a new item of the same base: ethereal stays ethereal, superior stays superior (its bonus is rolled again), anything inside the sockets is lost. A magic item becomes a white one. Never more sockets than the base allows.',
      uk: 'Білий чи покращений предмет без гнізд зберігає все (ефірність, бонус покращення) і просто отримує гнізда. Предмет, що вже має гнізда, стає новим предметом тієї ж основи: ефірний лишається ефірним, покращений — покращеним (його бонус випадає заново), вміст гнізд зникає. Магічний предмет стає білим. Гнізд не більше, ніж дозволяє основа.',
      ru: 'Белая или превосходная вещь без гнёзд сохраняет всё (эфирность, бонус превосходной) и просто получает гнёзда. Вещь, у которой уже есть гнёзда, становится новой вещью той же базы: эфирная остаётся эфирной, превосходная — превосходной (её бонус выпадает заново), содержимое гнёзд пропадает. Магическая вещь становится белой. Гнёзд не больше, чем позволяет база.',
    },
    forgeN: { en: 'Socket forge: number of sockets', uk: 'Кузня гнізд: кількість гнізд', ru: 'Кузница гнёзд: число гнёзд' },
  },
  p: {
    name: { en: '6. Pandemonium keys and essences', uk: '6. Ключі Пандемоніуму й есенції', ru: '6. Ключи Пандемониума и сущности' },
    desc: {
      en: 'Keys for the Uber bosses (Pandemonium Event). They drop only in Hell: Key of Terror from the Countess, Key of Hate from the Summoner, Key of Destruction from Nihlathak. Essences are for the Token of Absolution, which resets stat and skill points.',
      uk: 'Ключі для убер-босів (Пандемоніум). Падають лише в Пеклі: Ключ жаху — з Графині, Ключ ненависті — з Заклинача, Ключ руйнування — з Нілатака. Есенції потрібні для Token of Absolution, який скидає очки характеристик і вмінь.',
      ru: 'Ключи для убер-боссов (Пандемониум). Падают только в аду: Ключ ужаса — с Графини, Ключ ненависти — с Призывателя, Ключ разрушения — с Нихлатака. Сущности нужны для Талисмана очищения, который сбрасывает очки характеристик и умений.',
    },
    ess: { en: 'Every Hell act boss always drops an essence', uk: 'Кожен бос акту в Пеклі завжди дає есенцію', ru: 'Каждый босс акта в аду всегда даёт сущность' },
    essDesc: {
      en: 'One essence from every kill, the rest of the drop stays the same. Andariel or Duriel: Twisted Essence of Suffering. Mephisto: Charged Essence of Hatred. Diablo: Burning Essence of Terror. Baal: Festering Essence of Destruction. Put all four in the Horadric Cube to get a Token of Absolution, then right-click it to reset your stat and skill points.',
      uk: 'Одна есенція з кожного вбивства, решта дропу не змінюється. Андаріель або Дуріель: Twisted Essence of Suffering. Мефісто: Charged Essence of Hatred. Діабло: Burning Essence of Terror. Баал: Festering Essence of Destruction. Покладіть усі чотири в Куб Хорадрика, отримаєте Token of Absolution, потім клацніть по ньому правою кнопкою, щоб скинути очки характеристик і вмінь.',
      ru: 'Одна сущность с каждого убийства, остальной дроп не меняется. Андариэль или Дуриэль: Искаженная сущность Страдания. Мефисто: Заряженная сущность Ненависти. Диабло: Обжигающая сущность Ужаса. Баал: Гниющая эссенция Разрушения. Положите все четыре в Хорадрический куб, получите Талисман очищения, затем нажмите на него правой кнопкой, чтобы сбросить очки характеристик и умений.',
    },
    mult: { en: 'Key drop chance, ×', uk: 'Шанс ключів, ×', ru: 'Шанс ключей, ×' },
    multDesc: {
      en: 'Default 1: as in the normal game, a key in about 1 kill of 10. 10: in more than half of the kills. Maximum 100: almost every kill, often 2 or more keys.',
      uk: 'За замовчуванням 1: як у звичайній грі, ключ приблизно в 1 вбивстві з 10. 10: більш ніж у половині вбивств. Максимум 100: майже з кожного вбивства, часто 2 ключі й більше.',
      ru: 'По умолчанию 1: как в обычной игре, ключ примерно в 1 убийстве из 10. 10: больше чем в половине убийств. Максимум 100: почти с каждого убийства, часто 2 ключа и больше.',
    },
  },
  k: {
    name: { en: '1. Class loot filter', uk: '1. Фільтр луту за класом', ru: '1. Фильтр лута по классу' },
    desc: {
      en: 'Stops class-only items of other classes from dropping (claws, orbs, pelts, primal helms, paladin shields, shrunken heads, amazon weapons, warlock grimoires). Items any class can use, like wands, staves and polearms, still drop. Items you already own are not affected.',
      uk: 'Прибирає з дропу класові предмети інших класів (кігті, сфери, хутра, шоломи варвара, щити паладина, голови некроманта, зброя амазонки, гримуари чорнокнижника). Предмети, які може носити будь-хто (жезли, посохи, древкова зброя), падають далі. Наявні предмети не зачіпаються.',
      ru: 'Убирает из дропа классовые вещи других классов (когти, сферы, шкуры, шлемы варвара, щиты паладина, головы некроманта, оружие амазонки, гримуары чернокнижника). Вещи, которые может носить любой класс (жезлы, посохи, древковое), падают как обычно. Уже имеющиеся вещи не затрагиваются.',
    },
    cls: { en: 'I play as', uk: 'Я граю за', ru: 'Я играю за' },
    classes: {
      all: { en: 'Any class (no filter)', uk: 'Будь-який клас (без фільтра)', ru: 'Любой класс (без фильтра)' },
      ama: { en: 'Amazon', uk: 'Амазонка', ru: 'Амазонка' },
      ass: { en: 'Assassin', uk: 'Ассасин', ru: 'Ассасин' },
      bar: { en: 'Barbarian', uk: 'Варвар', ru: 'Варвар' },
      dru: { en: 'Druid', uk: 'Друїд', ru: 'Друид' },
      nec: { en: 'Necromancer', uk: 'Некромант', ru: 'Некромант' },
      pal: { en: 'Paladin', uk: 'Паладин', ru: 'Паладин' },
      sor: { en: 'Sorceress', uk: 'Чарівниця', ru: 'Волшебница' },
      war: { en: 'Warlock', uk: 'Чорнокнижник', ru: 'Чернокнижник' },
    },
  },
  cats: {
    jewelry: { en: 'Rings, amulets, charms, jewels', uk: 'Персні, амулети, обереги, самоцвіти', ru: 'Кольца, амулеты, обереги, самоцветы' },
    helm: { en: 'Helms', uk: 'Шоломи', ru: 'Шлемы' },
    circ: { en: 'Circlets', uk: 'Обручі', ru: 'Обручи и диадемы' },
    tors: { en: 'Body armor', uk: 'Обладунки', ru: 'Броня' },
    shie: { en: 'Shields', uk: 'Щити', ru: 'Щиты' },
    glov: { en: 'Gloves', uk: 'Рукавиці', ru: 'Перчатки' },
    boot: { en: 'Boots', uk: 'Чоботи', ru: 'Сапоги' },
    belt: { en: 'Belts', uk: 'Пояси', ru: 'Пояса' },
    pole: { en: 'Polearms (Act 2 mercenary)', uk: 'Древкова зброя (найманець 2 акту)', ru: 'Древковое оружие (мерк 2 акта)' },
    spea: { en: 'Spears (Act 2 mercenary)', uk: 'Списи (найманець 2 акту)', ru: 'Копья (мерк 2 акта)' },
    staf: { en: 'Staves', uk: 'Посохи', ru: 'Посохи' },
    wand: { en: 'Wands', uk: 'Жезли', ru: 'Жезлы' },
    orb: { en: 'Orbs (Sorceress)', uk: 'Сфери (чарівниця)', ru: 'Сферы (волшебница)' },
    mace: { en: 'Maces and flails', uk: 'Булави і кистені', ru: 'Булавы и кистени' },
    club: { en: 'Clubs', uk: 'Палиці', ru: 'Дубины' },
    hamm: { en: 'Hammers', uk: 'Молоти', ru: 'Молоты' },
    scep: { en: 'Scepters', uk: 'Скіпетри', ru: 'Скипетры' },
    swor: { en: 'Swords', uk: 'Мечі', ru: 'Мечи' },
    knif: { en: 'Daggers', uk: 'Кинджали', ru: 'Кинжалы' },
    axe: { en: 'Axes', uk: 'Сокири', ru: 'Топоры' },
    bow: { en: 'Bows', uk: 'Луки', ru: 'Луки' },
    xbow: { en: 'Crossbows', uk: 'Арбалети', ru: 'Арбалеты' },
    jave: { en: 'Throwing weapons', uk: 'Метальна зброя', ru: 'Метательное оружие' },
    class: { en: 'Class-only items', uk: 'Класові предмети', ru: 'Классовые вещи' },
  },
};

const CATS = [
  { id: 'jewelry', types: ['ring', 'amul', 'scha', 'mcha', 'lcha', 'jewl'], src: misc },
  { id: 'helm', types: ['helm'] },
  { id: 'circ', types: ['circ'] },
  { id: 'tors', types: ['tors'] },
  { id: 'shie', types: ['shie'] },
  { id: 'glov', types: ['glov'] },
  { id: 'boot', types: ['boot'] },
  { id: 'belt', types: ['belt'] },
  { id: 'pole', types: ['pole'] },
  { id: 'spea', types: ['spea'] },
  { id: 'staf', types: ['staf'] },
  { id: 'wand', types: ['wand'] },
  { id: 'orb', types: ['orb'] },
  { id: 'mace', types: ['mace'] },
  { id: 'club', types: ['club'] },
  { id: 'hamm', types: ['hamm'] },
  { id: 'scep', types: ['scep'] },
  { id: 'swor', types: ['swor'] },
  { id: 'knif', types: ['knif'] },
  { id: 'axe', types: ['axe'] },
  { id: 'bow', types: ['bow'] },
  { id: 'xbow', types: ['xbow'] },
  { id: 'jave', types: ['jave', 'tkni', 'taxe'] },
  { id: 'class', types: ['pelt', 'phlm', 'ashd', 'head', 'h2h', 'h2h2', 'abow', 'aspe', 'ajav', 'cloa', 'grim'] },
];

const allCodes = new Set();
const SLOTS = 6;
const TS = {
  slot: { en: 'Item', uk: 'Предмет', ru: 'Вещь' },
  type: { en: 'type', uk: 'тип', ru: 'тип' },
  none: { en: '— not selected —', uk: '— не вибрано —', ru: '— не выбрано —' },
  slotDesc: {
    en: 'Choose the item type, then the item. The next slot appears when this one is filled. To clear a slot, set its type back to "not selected".',
    uk: 'Оберіть тип предмета, потім сам предмет. Наступний слот з’явиться, коли цей заповнено. Щоб очистити слот, поверніть тип на «не вибрано».',
    ru: 'Выберите тип вещи, потом саму вещь. Следующий слот появится, когда этот заполнен. Чтобы очистить слот, верните тип на «не выбрано».',
  },
  itemDesc: {
    en: 'After the dash: unique items on this base. In brackets: monster level from which the base drops, and the monster level each unique needs.',
    uk: 'Після тире: унікальні предмети на цій основі. У дужках: рівень монстрів, з якого падає основа, і рівень монстрів для кожного унікального.',
    ru: 'После тире: уникальные вещи на этой базе. В скобках: уровень монстров, с которого падает база, и уровень монстров для каждой уникальной.',
  },
  base: { en: 'base', uk: 'основа', ru: 'база' },
  more: { en: 'and', uk: 'і ще', ru: 'и ещё' },
};
const HSLOTS = 6;
const TH = {
  name: { en: '3. Specific item hunt', uk: '3. Полювання на конкретні предмети', ru: '3. Охота за конкретными вещами' },
  desc: {
    en: 'Pick what you want by name: a unique or set item, or a white base for a runeword. Unique and set items: the mod adds the base to the drop where monsters are high enough and makes it roll that quality; other items are not affected. The chosen unique or set item is picked first among items of the same base (rings, amulets). A unique drops only once per game, so start a new game after you find it. Works on its own, no other section is needed.',
    uk: 'Оберіть потрібне за назвою: унікальний чи сетовий предмет або білу основу під рунне слово. Унікальні й сетові: мод додає основу в дроп там, де монстри достатнього рівня, і робить так, щоб вона падала потрібної якості; інші предмети не змінюються. Обраний предмет випадає першим серед предметів тієї ж основи (персні, амулети). Унікальний падає лише раз за гру — після знахідки створіть нову гру. Працює самостійно, інші розділи не потрібні.',
    ru: 'Выберите нужное по названию: уникальную или сетовую вещь либо белую базу под рунное слово. Уникальные и сетовые: мод добавляет базу в дроп там, где монстры достаточного уровня, и делает так, чтобы она падала нужного качества; остальные вещи не меняются. Выбранная вещь выпадает первой среди вещей той же базы (кольца, амулеты). Уникальная вещь выпадает только раз за игру — после находки создайте новую игру. Работает сам по себе, другие разделы не нужны.',
  },
  on: { en: 'Enable item hunt', uk: 'Увімкнути полювання', ru: 'Включить охоту' },
  chance: { en: 'Chance per monster, %', uk: 'Шанс з кожного монстра, %', ru: 'Шанс с каждого монстра, %' },
  chanceDesc: {
    en: 'Default 5: about every 20th monster or chest drops one of the hunted items, on top of its usual loot. 20: every 5th. Maximum 50: every second one. Minimum 1: every 100th. Bosses roll several times. Does not depend on other sections.',
    uk: 'За замовчуванням 5: приблизно кожен 20-й монстр чи скриня кине один із предметів полювання, на додачу до звичайного луту. 20: кожен 5-й. Максимум 50: кожен другий. Мінімум 1: кожен 100-й. Боси кидають кілька разів. Не залежить від інших розділів.',
    ru: 'По умолчанию 5: примерно каждый 20-й монстр или сундук уронит одну из искомых вещей, вдобавок к обычному луту. 20: каждый 5-й. Максимум 50: каждый второй. Минимум 1: каждый 100-й. Боссы бросают несколько раз. Не зависит от других разделов.',
  },
  slot: { en: 'What are you looking for', uk: 'Що шукаємо', ru: 'Что ищем' },
  slotDesc: {
    en: 'Open the list and start typing the name to jump to it. The next slot appears when this one is filled. Where it drops: a unique or set item needs monsters of at least the level shown next to it in the list, otherwise it will not drop. Normal has monsters up to about level 45, Nightmare up to about 66, Hell the rest. If the item does not drop after these settings, the monsters are too low level: look for it where they are higher, on a later act or a higher difficulty. Runeword bases drop on every difficulty from any monster, even elite ones such as Monarch. The list shows the maximum sockets of a base. Tip: the "Runeword bases" preset in section 2 makes bases drop white.',
    uk: 'Відкрийте список і почніть друкувати назву, щоб перейти до неї. Наступний слот з’явиться, коли цей заповнено. Де падає: унікальному чи сетовому предмету потрібні монстри щонайменше того рівня, що вказаний поруч із ним у списку, інакше він не випаде. На Нормі монстри приблизно до 45 рівня, на Кошмарі приблизно до 66, у Пеклі решта. Якщо предмет не падає після цих налаштувань, рівень монстрів замалий: шукайте там, де він вищий, у пізнішому акті або на вищій складності. Основи під рунні слова падають на всіх складностях із будь-яких монстрів, навіть елітні, як-от Монарх. У списку вказано максимум гнізд основи. Порада: пресет «Основи під рунні слова» в розділі 2 робить так, щоб основи падали білими.',
    ru: 'Откройте список и начните печатать название, чтобы перейти к нему. Следующий слот появится, когда этот заполнен. Где падает: уникальной или сетовой вещи нужны монстры не ниже уровня, указанного рядом с ней в списке, иначе она не выпадет. На Норме монстры примерно до 45 уровня, на Кошмаре примерно до 66, в Аду остальные. Если вещь не падает после этих настроек, значит, уровень монстров мал: ищите там, где он выше, в более позднем акте или на сложности выше. Базы под рунные слова падают на всех сложностях с любых монстров, даже элитные, например Монарх. В списке указан максимум гнёзд базы. Совет: пресет «Базы под рунные слова» в разделе 2 делает так, чтобы базы падали белыми.',
  },
  none: { en: '— not selected —', uk: '— не вибрано —', ru: '— не выбрано —' },
  set: { en: 'set', uk: 'сет', ru: 'сет' },
  monsters: { en: 'monsters', uk: 'монстри', ru: 'монстры' },
  baseOf: { en: 'runeword base', uk: 'основа під рунне слово', ru: 'база под рунное слово' },
  sockets: { en: 'sockets', uk: 'гнізд', ru: 'гнёзд' },
  upTo: { en: 'up to', uk: 'до', ru: 'до' },
};
const HUNT = [];
const baseRows = {};
[...armor, ...weapons, ...misc].forEach((r) => {
  if (r.code && r.name) {
    baseRows[r.code] = r;
    allCodes.add(r.code);
  }
});
const VARIANT = {
  'dmg-ltng': { en: 'lightning', uk: 'блискавка', ru: 'молния' },
  'dmg-cold': { en: 'cold', uk: 'холод', ru: 'холод' },
  'dmg-fire': { en: 'fire', uk: 'вогонь', ru: 'огонь' },
  'dmg-pois': { en: 'poison', uk: 'отрута', ru: 'яд' },
  'death-skill': { en: 'on death', uk: 'при смерті', ru: 'при смерти' },
  'levelup-skill': { en: 'on level-up', uk: 'при новому рівні', ru: 'при новом уровне' },
};
const variantLabel = (props, lang) => props.map((p) => (VARIANT[p] ? VARIANT[p][lang] : p)).join(', ');
function huntOptions(lang) {
  const rows = [];
  uniques
    .filter((u) => u.code && u.spawnable !== '0' && u.disabled !== '1' && baseRows[u.code])
    .forEach((u, i, all) => {
      const dup = all.filter((x) => x.index === u.index).length > 1;
      const key = dup ? 'u:' + u.index + '|' + u.prop1 + '|' + u.prop4 : 'u:' + u.index;
      rows.push({ key, kind: 'u', code: u.code, lvl: +u.lvl || 1, idx: u.index, variant: dup ? [u.prop1, u.prop4] : null });
    });
  sets
    .filter((s) => s.item && s.spawnable !== '0' && s.disabled !== '1' && baseRows[s.item])
    .forEach((s) => rows.push({ key: 's:' + s.index, kind: 's', code: s.item, lvl: +s.lvl || 1, idx: s.index }));
  [...armor, ...weapons]
    .filter((r) => r.code && r.name && r.spawnable !== '0' && +r.gemsockets >= 2)
    .filter((r, i, a) => a.findIndex((x) => x.code === r.code) === i)
    .forEach((r) => rows.push({ key: 'b:' + r.code, kind: 'b', code: r.code, lvl: +r.level || 1, idx: r.code, sockets: +r.gemsockets }));
  if (!HUNT.length) rows.forEach((r) => HUNT.push(r));
  const opts = rows.map((r) => {
    const item = loc(r.idx, lang, r.kind === 'b' ? baseRows[r.code].name : r.idx);
    let label;
    if (r.kind === 'b') {
      label = `${item} — ${TH.baseOf[lang]}, ${TH.upTo[lang]} ${r.sockets} ${TH.sockets[lang]}`;
    } else {
      const type = loc(r.code, lang, baseRows[r.code].name);
      const kind = r.kind === 's' ? ` (${TH.set[lang]})` : r.variant ? ` (${variantLabel(r.variant, lang)})` : '';
      label = `${item}${kind} — ${type}, ${TH.monsters[lang]} ${r.lvl}+`;
    }
    return { label, value: r.key, sort: item + (r.kind === 'b' ? ' ~' : '') };
  });
  opts.sort((a, b) => a.sort.localeCompare(b.sort, lang === 'ru' ? 'ru' : 'en'));
  return opts.map(({ label, value }) => ({ label, value }));
}
function huntSection(lang) {
  const options = huntOptions(lang);
  const on = ['value', 'h_on'];
  const fields = [
    { id: 'h_on', type: 'checkbox', name: TH.on[lang], defaultValue: false },
    { id: 'h_chance', type: 'number', name: TH.chance[lang], description: TH.chanceDesc[lang], defaultValue: 5, minValue: 1, maxValue: 50, visible: on },
  ];
  for (let i = 1; i <= HSLOTS; i++) {
    const shown = i === 1 ? on : ['and', on, ['neq', ['value', `h_item_${i - 1}`], 'none']];
    fields.push({
      id: `h_item_${i}`, type: 'select', name: `${TH.slot[lang]} (${i})`, description: TH.slotDesc[lang],
      defaultValue: 'none', visible: shown,
      options: [{ label: TH.none[lang], value: 'none' }, ...options],
    });
  }
  return { id: `sec_h_${lang}`, type: 'section', name: TH.name[lang], description: TH.desc[lang], defaultExpanded: false, children: fields };
}

function itemOptions(lang) {
  const res = [];
  for (const cat of CATS) {
    const src = cat.src || [...armor, ...weapons];
    const rows = src
      .filter((r) => cat.types.includes(r.type) && r.code && r.spawnable !== '0' && r.name)
      .filter((r, i, a) => a.findIndex((x) => x.code === r.code) === i)
      .sort((a, b) => +a.level - +b.level || a.name.localeCompare(b.name));
    if (!rows.length) continue;
    const options = rows.map((r) => {
      allCodes.add(r.code);
      const us = uniques.filter((u) => u.code === r.code && u.spawnable !== '0');
      // Keep labels short: a select is as wide as its longest option
      const shown = us.slice(0, 2).map((u) => `${loc(u.index, lang, u.index)} ${u.lvl}+`);
      if (us.length > 2) shown.push(`${TS.more[lang]} ${us.length - 2}`);
      const uniq = shown.join(', ');
      const label = `${loc(r.code, lang, r.name)}${uniq ? ' — ' + uniq : ''} (${TS.base[lang]} ${r.level || 1}+)`;
      return { label, value: r.code };
    });
    res.push({ cat: cat.id, name: T.cats[cat.id][lang], options });
  }
  return res;
}
function slotFields(lang) {
  const cats = itemOptions(lang);
  const fields = [];
  for (let i = 1; i <= SLOTS; i++) {
    const shown = i === 1 ? ['value', 't_on'] : ['and', ['value', 't_on'], ['neq', ['value', `t_cat_${i - 1}`], 'none']];
    fields.push({
      id: `t_cat_${i}`, type: 'select', name: `${TS.slot[lang]} ${i}: ${TS.type[lang]}`, description: TS.slotDesc[lang],
      defaultValue: 'none', visible: shown,
      options: [{ label: TS.none[lang], value: 'none' }, ...cats.map((c) => ({ label: `${c.name} (${c.options.length})`, value: c.cat }))],
    });
    for (const c of cats) {
      fields.push({
        id: `t_item_${i}_${c.cat}`, type: 'select', name: `${TS.slot[lang]} ${i}: ${c.name}`, description: TS.itemDesc[lang],
        defaultValue: c.options[0].value,
        visible: ['and', shown, ['eq', ['value', `t_cat_${i}`], c.cat]],
        options: c.options,
      });
    }
  }
  return fields;
}

function itemFields(lang) {
  const t = T.t;
  const out = [];
  for (const cat of CATS) {
    const src = cat.src || [...armor, ...weapons];
    const rows = src
      .filter((r) => cat.types.includes(r.type) && r.code && r.spawnable !== '0' && r.name)
      .filter((r, i, a) => a.findIndex((x) => x.code === r.code) === i)
      .sort((a, b) => +a.level - +b.level || a.name.localeCompare(b.name));
    const fields = rows.map((r) => {
      allCodes.add(r.code);
      const name = loc(r.code, lang, r.name);
      const us = uniques.filter((u) => u.code === r.code && u.spawnable !== '0');
      const ss = sets.filter((s) => s.item === r.code);
      const extras = [
        ...us.map((u) => `${loc(u.index, lang, u.index)} (${t.uniq[lang]} ${u.lvl}+)`),
        ...ss.map((s) => `${loc(s.index, lang, s.index)} (${t.set[lang]} ${s.lvl}+)`),
      ];
      const short = us.length ? ' — ' + us.map((u) => loc(u.index, lang, u.index)).join(', ') : '';
      const tier = tierOf[r.code] ? ' · ' + T.tier[lang][tierOf[r.code]] : '';
      return {
        id: 'i_' + r.code,
        type: 'checkbox',
        name: name + short,
        description:
          `${r.name} · ${t.code[lang]} ${r.code}${tier} · ${t.dropsFrom[lang]} ${r.level || 1}+. ` +
          (extras.length ? `${t.onBase[lang]}: ${extras.join('; ')}.` : t.none[lang]),
        defaultValue: false,
      };
    });
    if (!fields.length) continue;
    out.push({
      id: `t_cat_${cat.id}_${lang}`,
      type: 'section',
      name: `${T.cats[cat.id][lang]} (${fields.length})`,
      defaultExpanded: false,
      allowToggleAll: false,
      children: fields,
    });
  }
  return out;
}

const QVALS = { bases: [1, 1, 1, 1, 1], balanced: [10, 15, 10, 25, 25], uniques: [100, 10, 10, 10, 10] };
const QIDS = ['q_unique', 'q_set', 'q_rare', 'q_magic', 'q_superior'];
const QDEF = [0.25, 0.6, 1, 3, 8];
const isPreset = (p) => ['eq', ['value', 'q_preset'], p];
function qOverride(i) {
  return ['if', isPreset('bases'), QVALS.bases[i], ['if', isPreset('balanced'), QVALS.balanced[i], ['if', isPreset('uniques'), QVALS.uniques[i], null]]];
}


// Section 7: easier Uber Tristram
const UVALS = {
  slight: { regen: 25, aura: 85, spell: 60, res: 95, hp: 75, melee: 80, ar: 100, ac: 100, speed: 100 },
  medium: { regen: 0, aura: 40, spell: 35, res: 60, hp: 40, melee: 50, ar: 70, ac: 60, speed: 85 },
  super: { regen: 0, aura: 0, spell: 10, res: 0, hp: 10, melee: 15, ar: 30, ac: 20, speed: 70 },
};
const UDEF = { regen: 100, aura: 125, spell: 100, res: 110, hp: 100, melee: 100, ar: 100, ac: 100, speed: 100 };
const UMIN = { regen: 0, aura: 0, res: 0 };
const UKEYS = ['regen', 'spell', 'res', 'hp', 'melee', 'ar', 'ac', 'speed'];
const uIsPreset = (p) => ['eq', ['value', 'ub_preset'], p];
const uOverride = (key) => ['if', uIsPreset('slight'), UVALS.slight[key], ['if', uIsPreset('medium'), UVALS.medium[key], ['if', uIsPreset('super'), UVALS.super[key], null]]];
T.u = {
  name: { en: '8. Easier Uber Tristram', uk: '8. Легший Uber Tristram', ru: '8. Облегчённый Uber Tristram' },
  desc: {
    en: 'Makes Uber Mephisto, Uber Diablo and Uber Baal easier. Nothing else in the game changes. Tick the box, choose a level, press INSTALL MODS, then RUN D2R. To return to the normal difficulty, untick the box and press INSTALL MODS again. The number of minions cannot be changed: it is set inside the game code.',
    uk: 'Робить легшими Uber Mephisto, Uber Diablo та Uber Baal. Нічого іншого в грі не змінюється. Поставте галочку, оберіть рівень, натисніть INSTALL MODS, потім RUN D2R. Щоб повернути звичайну складність, зніміть галочку й знову натисніть INSTALL MODS. Кількість прислужників змінити не можна: вона задана в коді гри.',
    ru: 'Делает легче Uber Mephisto, Uber Diablo и Uber Baal. Больше ничего в игре не меняется. Поставьте галочку, выберите уровень, нажмите INSTALL MODS, потом RUN D2R. Чтобы вернуть обычную сложность, снимите галочку и снова нажмите INSTALL MODS. Количество прислужников изменить нельзя: оно задано в коде игры.',
  },
  on: { en: 'Make Uber Tristram easier', uk: 'Полегшити Uber Tristram', ru: 'Облегчить Uber Tristram' },
  preset: { en: 'Difficulty', uk: 'Складність', ru: 'Сложность' },
  presetDesc: {
    en: 'The numbers of the chosen level are shown in the boss sections below. Pick "Manual" to change them yourself, separately for each boss.',
    uk: 'Числа обраного рівня показані в розділах босів нижче. Оберіть «Вручну», щоб змінювати їх самостійно, окремо для кожного боса.',
    ru: 'Числа выбранного уровня показаны в разделах боссов ниже. Выберите «Вручную», чтобы менять их самому, отдельно для каждого босса.',
  },
  presets: {
    slight: { en: 'Slightly easier: still hard, needs good gear', uk: 'Трохи легше: усе ще складно, потрібні гарні речі', ru: 'Чуть легче: всё ещё сложно, нужны хорошие вещи' },
    medium: { en: 'Medium: for an ordinary geared character', uk: 'Середньо: для персонажа зі звичайними речами', ru: 'Средне: для персонажа с обычными вещами' },
    super: { en: 'Super easy: for anyone, gear hardly matters', uk: 'Супер легко: для будь-кого, речі майже не важливі', ru: 'Супер легко: для любого, вещи почти не важны' },
    custom: { en: 'Manual: set everything yourself', uk: 'Вручну: налаштувати все самостійно', ru: 'Вручную: настроить всё самому' },
  },
  bosses: {
    m: { en: 'Uber Mephisto', uk: 'Uber Mephisto', ru: 'Uber Mephisto' },
    d: { en: 'Uber Diablo', uk: 'Uber Diablo', ru: 'Uber Diablo' },
    b: { en: 'Uber Baal', uk: 'Uber Baal', ru: 'Uber Baal' },
  },
  bossDesc: {
    en: 'The settings go from the most helpful to the least. 100 means the same as in the normal game.',
    uk: 'Налаштування йдуть від найкорисніших до найменш корисних. 100 означає так само, як у звичайній грі.',
    ru: 'Настройки идут от самых полезных к менее полезным. 100 значит так же, как в обычной игре.',
  },
  fields: {
    regen: { en: 'Life regeneration, %', uk: 'Відновлення здоров’я, %', ru: 'Восстановление здоровья, %' },
    aura: { en: 'Conviction aura strength (0–125)', uk: 'Сила аури Conviction (0–125)', ru: 'Сила ауры Убеждения (0–125)' },
    spell: { en: 'Spell power, %', uk: 'Сила заклять, %', ru: 'Сила заклинаний, %' },
    res: { en: 'Resistance limit', uk: 'Межа опорів', ru: 'Предел сопротивлений' },
    hp: { en: 'Life, %', uk: 'Здоров’я, %', ru: 'Здоровье, %' },
    melee: { en: 'Melee damage, %', uk: 'Шкода в ближньому бою, %', ru: 'Урон в ближнем бою, %' },
    ar: { en: 'Attack rating, %', uk: 'Влучність, %', ru: 'Меткость, %' },
    ac: { en: 'Defense, %', uk: 'Захист, %', ru: 'Защита, %' },
    speed: { en: 'Movement speed, %', uk: 'Швидкість руху, %', ru: 'Скорость движения, %' },
  },
  help: {
    regen: {
      en: 'The most important setting. In the normal game each boss heals about 16,000 life per second, so most characters cannot out-damage him without "Prevent Monster Heal". Works in steps of 25.',
      uk: 'Найважливіше налаштування. У звичайній грі кожен бос відновлює близько 16 000 здоров’я за секунду, тож більшість персонажів не переб’ють це без «Заборони лікування монстрів». Працює кроками по 25.',
      ru: 'Самая важная настройка. В обычной игре каждый босс лечит около 16 000 здоровья в секунду, поэтому большинство персонажей не перебьют это без «Запрета лечения монстров». Работает шагами по 25.',
    },
    aura: {
      en: 'How many points of fire, cold and lightning resistance Mephisto takes from you and your mercenary. His aura also lowers defense by up to 90%; that part shrinks together with this number. Does not touch Infinity or a paladin’s Conviction.',
      uk: 'Скільки опору вогню, холоду й блискавці Мефісто забирає у вас і найманця. Аура також знижує захист до 90%; ця частина зменшується разом із числом. Не впливає на Infinity та Conviction паладина.',
      ru: 'Сколько сопротивления огню, холоду и молнии Мефисто отнимает у вас и наёмника. Аура также снижает защиту до 90%; эта часть уменьшается вместе с числом. Не влияет на Infinity и Убеждение паладина.',
    },
    res: {
      en: 'No resistance of this boss can be higher than this number. 100 and above means immunity. 95 = immunities are gone.',
      uk: 'Жоден опір цього боса не може бути вищим за це число. 100 і більше означає імунітет. 95 = імунітетів немає.',
      ru: 'Ни одно сопротивление этого босса не будет выше этого числа. 100 и выше означает иммунитет. 95 = иммунитетов нет.',
    },
    hp: {
      en: '100 = about 650,000 life on /players 1. 10 = about 65,000.',
      uk: '100 = близько 650 000 здоров’я на /players 1. 10 = близько 65 000.',
      ru: '100 = около 650 000 здоровья на /players 1. 10 = около 65 000.',
    },
    melee: {
      en: 'Damage of his physical attacks, including the fire and freezing added to Baal’s attacks. Spells are set by "Spell power".',
      uk: 'Шкода його фізичних атак, разом із вогнем і заморожуванням в атаках Баала. Закляття налаштовує «Сила заклять».',
      ru: 'Урон его физических атак, вместе с огнём и заморозкой в атаках Баала. Заклинания настраивает «Сила заклинаний».',
    },
    ar: {
      en: 'Lower attack rating means his melee attacks miss more often. Does not affect spells.',
      uk: 'Нижча влучність означає, що його удари частіше промахуються. На закляття не впливає.',
      ru: 'Чем ниже меткость, тем чаще его удары проходят мимо. На заклинания не влияет.',
    },
    ac: {
      en: 'Lower defense means your attacks and your mercenary’s hit him more often. Spells always hit, so casters do not need this.',
      uk: 'Нижчий захист означає, що ваші атаки й атаки найманця частіше влучають. Закляття влучають завжди, тож заклинателям це не потрібно.',
      ru: 'Чем ниже защита, тем чаще по боссу попадаете вы и наёмник. Заклинания попадают всегда, так что заклинателям это не нужно.',
    },
    speed: {
      en: 'Lower speed makes him easier to pull away from the other bosses and to run from.',
      uk: 'Нижча швидкість дозволяє легше відвести його від інших босів і втекти.',
      ru: 'Чем ниже скорость, тем легче увести его от других боссов и убежать.',
    },
  },
  spellHelp: {
    m: {
      en: 'Lowers the level of all his spells. This is what kills your mercenary: his charged bolts have level 20, which is 22 bolts per cast. 50 = 12 weaker bolts, 30 = 8 bolts, the same number as ordinary Mephisto.',
      uk: 'Знижує рівень усіх його заклять. Саме це вбиває найманця: заряджені стріли мають рівень 20, тобто 22 стріли за каст. 50 = 12 слабших стріл, 30 = 8 стріл, як у звичайного Мефісто.',
      ru: 'Снижает уровень всех его заклинаний. Именно это убивает наёмника: заряженные стрелы у него 20 уровня, то есть 22 стрелы за каст. 50 = 12 более слабых стрел, 30 = 8 стрел, как у обычного Мефисто.',
    },
    d: {
      en: 'Lowers the level of his spells: Armageddon, fire wall, fire ring and red lightning. Most of them have low levels, so the effect is small below 50.',
      uk: 'Знижує рівень його заклять: Армагеддон, вогняна стіна, вогняне кільце й червона блискавка. Рівні більшості невисокі, тому нижче 50 ефект малий.',
      ru: 'Снижает уровень его заклинаний: Армагеддон, огненная стена, огненное кольцо и красная молния. Уровни большинства невысоки, поэтому ниже 50 эффект небольшой.',
    },
    b: {
      en: 'Lowers the level of his spells. Most important is his Chilling Armor, level 30: it adds 321% defense, and your mercenary hits him only about one time in three. At 50 it adds 186%.',
      uk: 'Знижує рівень його заклять. Найважливіша Chilling Armor 30 рівня: вона додає 321% захисту, і найманець влучає лише приблизно раз із трьох. При 50 вона додає 186%.',
      ru: 'Снижает уровень его заклинаний. Важнее всего его Леденящий доспех 30 уровня: он добавляет 321% защиты, и наёмник попадает лишь примерно раз из трёх. При 50 он добавляет 186%.',
    },
  },
};
// Default and maximum are the same here: these fields only make a boss weaker
T.u.limits = {
  top: {
    en: (n) => 'Default and maximum ' + n + ': as in the normal game.',
    uk: (n) => 'За замовчуванням і максимум ' + n + ': як у звичайній грі.',
    ru: (n) => 'По умолчанию и максимум ' + n + ': как в обычной игре.',
  },
  low: {
    regen: { en: 'Minimum 0: no healing at all.', uk: 'Мінімум 0: лікування немає зовсім.', ru: 'Минимум 0: лечения нет совсем.' },
    aura: { en: 'Minimum 0: the aura does nothing.', uk: 'Мінімум 0: аура нічого не робить.', ru: 'Минимум 0: аура ничего не делает.' },
    res: { en: 'Minimum 0: no resistances at all.', uk: 'Мінімум 0: опорів немає зовсім.', ru: 'Минимум 0: сопротивлений нет совсем.' },
    spell: { en: 'Minimum 1: all spells have level 1.', uk: 'Мінімум 1: усі закляття 1 рівня.', ru: 'Минимум 1: все заклинания 1 уровня.' },
    hp: { en: 'Minimum 1: about 6,500 life.', uk: 'Мінімум 1: близько 6 500 здоров’я.', ru: 'Минимум 1: около 6 500 здоровья.' },
    melee: { en: 'Minimum 1: his hits barely hurt.', uk: 'Мінімум 1: удари майже не завдають шкоди.', ru: 'Минимум 1: удары почти не наносят урона.' },
    ar: { en: 'Minimum 1: his melee attacks almost always miss.', uk: 'Мінімум 1: удари майже завжди промахуються.', ru: 'Минимум 1: удары почти всегда проходят мимо.' },
    ac: { en: 'Minimum 1: he has almost no defense.', uk: 'Мінімум 1: захисту майже немає.', ru: 'Минимум 1: защиты почти нет.' },
    speed: { en: 'Minimum 1: he barely moves.', uk: 'Мінімум 1: він майже не рухається.', ru: 'Минимум 1: он почти не двигается.' },
  },
};
const uLimits = (key, lang) => T.u.limits.top[lang](uMax(key)) + ' ' + T.u.limits.low[key][lang];
const uMax = (key) => (key === 'res' ? 110 : key === 'aura' ? 125 : 100);
function uberField(boss, key, lang) {
  const u = T.u;
  const help = key === 'spell' ? u.spellHelp[boss][lang] : u.help[key][lang];
  return {
    id: `ub_${boss}_${key}`, type: 'number', name: u.fields[key][lang], description: uLimits(key, lang) + ' ' + help,
    defaultValue: UDEF[key], minValue: UMIN[key] ?? 1, maxValue: uMax(key), overrideValue: uOverride(key),
  };
}

T.ut = {
  name: { en: 'Hellfire Torch', uk: 'Факел пекельного полум’я (Hellfire Torch)', ru: 'Факел адского пламени (Hellfire Torch)' },
  desc: {
    en: 'Drops in Uber Tristram from the last Uber boss you kill. Works whether or not the bosses in section 8 are made easier.',
    uk: 'Випадає в Uber Tristram з останнього вбитого Uber-боса. Працює незалежно від того, чи полегшені боси в розділі 8.',
    ru: 'Выпадает в Uber Tristram из последнего убитого Uber-босса. Работает независимо от того, облегчены ли боссы в разделе 8.',
  },
  cls: { en: 'Torch class', uk: 'Клас факела', ru: 'Класс факела' },
  clsDesc: {
    en: 'Which class gets +3 to skills from the torch. "Random" = as in the normal game.',
    uk: 'Який клас отримає від факела +3 до вмінь. «Випадковий» = як у звичайній грі.',
    ru: 'Какой класс получит от факела +3 к умениям. «Случайный» = как в обычной игре.',
  },
  classes: {
    random: { en: 'Random (normal game)', uk: 'Випадковий (звичайна гра)', ru: 'Случайный (обычная игра)' },
    ama: { en: 'Amazon', uk: 'Амазонка', ru: 'Амазонка' },
    sor: { en: 'Sorceress', uk: 'Чарівниця', ru: 'Волшебница' },
    nec: { en: 'Necromancer', uk: 'Некромант', ru: 'Некромант' },
    pal: { en: 'Paladin', uk: 'Паладин', ru: 'Паладин' },
    bar: { en: 'Barbarian', uk: 'Варвар', ru: 'Варвар' },
    dru: { en: 'Druid', uk: 'Друїд', ru: 'Друид' },
    ass: { en: 'Assassin', uk: 'Асасин', ru: 'Ассасин' },
    war: { en: 'Warlock', uk: 'Чорнокнижник', ru: 'Чернокнижник' },
  },
  roll: { en: 'Attributes and resistances', uk: 'Характеристики й опори', ru: 'Характеристики и сопротивления' },
  rollDesc: {
    en: 'In the normal game each of them is a random number from 10 to 20.',
    uk: 'У звичайній грі кожне з них є випадковим числом від 10 до 20.',
    ru: 'В обычной игре каждое из них это случайное число от 10 до 20.',
  },
  rolls: {
    random: { en: 'Random 10–20 (normal game)', uk: 'Випадково 10–20 (звичайна гра)', ru: 'Случайно 10–20 (обычная игра)' },
    top: { en: 'Best: +20 attributes, +20 resistances', uk: 'Найкращий: +20 характеристик, +20 опорів', ru: 'Лучший: +20 характеристик, +20 сопротивлений' },
    custom: { en: 'Manual: set the numbers yourself', uk: 'Вручну: задати числа самостійно', ru: 'Вручную: задать числа самому' },
  },
  stats: { en: 'All attributes (10–20)', uk: 'Усі характеристики (10–20)', ru: 'Все характеристики (10–20)' },
  statsDesc: {
    en: 'Strength, dexterity, vitality and energy, each by this number. Default and maximum 20: the best in the game. Minimum 10: the worst.',
    uk: 'Сила, спритність, живучість і енергія, кожна на це число. За замовчуванням і максимум 20: найкраще в грі. Мінімум 10: найгірше.',
    ru: 'Сила, ловкость, живучесть и энергия, каждая на это число. По умолчанию и максимум 20: лучшее в игре. Минимум 10: худшее.',
  },
  res: { en: 'All resistances (10–20)', uk: 'Усі опори (10–20)', ru: 'Все сопротивления (10–20)' },
  resDesc: {
    en: 'Fire, cold, lightning and poison, each by this number. Default and maximum 20: the best in the game. Minimum 10: the worst.',
    uk: 'Вогонь, холод, блискавка й отрута, кожен на це число. За замовчуванням і максимум 20: найкраще в грі. Мінімум 10: найгірше.',
    ru: 'Огонь, холод, молния и яд, каждое на это число. По умолчанию и максимум 20: лучшее в игре. Минимум 10: худшее.',
  },
};
function torchSection(lang) {
  const t = T.ut;
  const manual = ['eq', ['value', 'ub_t_roll'], 'custom'];
  return {
    id: `sec_u_t_${lang}`, type: 'section', name: t.name[lang], description: t.desc[lang], defaultExpanded: true,
    children: [
      {
        id: 'ub_t_class', type: 'select', name: t.cls[lang], description: t.clsDesc[lang], defaultValue: 'random',
        options: Object.keys(t.classes).map((c) => ({ label: t.classes[c][lang], value: c })),
      },
      {
        id: 'ub_t_roll', type: 'select', name: t.roll[lang], description: t.rollDesc[lang], defaultValue: 'random',
        options: Object.keys(t.rolls).map((r) => ({ label: t.rolls[r][lang], value: r })),
      },
      { id: 'ub_t_stats', type: 'number', name: t.stats[lang], description: t.statsDesc[lang], defaultValue: 20, minValue: 10, maxValue: 20, visible: manual },
      { id: 'ub_t_res', type: 'number', name: t.res[lang], description: t.resDesc[lang], defaultValue: 20, minValue: 10, maxValue: 20, visible: manual },
    ],
  };
}

T.uc = {
  name: { en: '9. Best charms: Annihilus and Hellfire Torch', uk: '9. Найкращі чарми: Annihilus і факел', ru: '9. Лучшие чармы: Annihilus и факел' },
  desc: {
    en: 'Sets what these two charms will be when they drop. Only a NEW charm gets these values: a charm you already have stays as it is. You can carry only one of each, so move the old one to the stash before picking up a new one.',
    uk: 'Визначає, якими будуть ці два чарми, коли випадуть. Ці значення отримає лише НОВИЙ чарм: той, що вже є, не зміниться. Носити можна лише по одному, тож перед тим як підняти новий, покладіть старий у скриню.',
    ru: 'Определяет, какими будут эти два чарма, когда выпадут. Эти значения получит только НОВЫЙ чарм: уже имеющийся не изменится. Носить можно только по одному, поэтому перед тем как поднять новый, положите старый в сундук.',
  },
  name2: { en: 'Annihilus', uk: 'Annihilus', ru: 'Annihilus' },
  desc2: {
    en: 'Drops from Diablo Clone. To summon him offline, sell a Stone of Jordan to a merchant on Hell difficulty and stay in the same game: he appears in place of a super unique monster. +1 to all skills is always there.',
    uk: 'Випадає з клона Діабло. Щоб викликати його в офлайні, продайте Камінь Йордана (Stone of Jordan) торговцю на складності Пекло й лишайтеся в цій самій грі: він з’явиться замість суперунікального монстра. +1 до всіх умінь є завжди.',
    ru: 'Выпадает из клона Диабло. Чтобы вызвать его в офлайне, продайте Камень Иордана (Stone of Jordan) торговцу на сложности Ад и оставайтесь в этой же игре: он появится вместо суперуникального монстра. +1 ко всем умениям есть всегда.',
  },
  roll: { en: 'Attributes, resistances and experience', uk: 'Характеристики, опори й досвід', ru: 'Характеристики, сопротивления и опыт' },
  rollDesc: {
    en: 'In the normal game each of them is random: attributes and resistances from 10 to 20, experience from 5% to 10%.',
    uk: 'У звичайній грі кожне з них випадкове: характеристики й опори від 10 до 20, досвід від 5% до 10%.',
    ru: 'В обычной игре каждое из них случайно: характеристики и сопротивления от 10 до 20, опыт от 5% до 10%.',
  },
  rolls: {
    random: { en: 'Random (normal game)', uk: 'Випадково (звичайна гра)', ru: 'Случайно (обычная игра)' },
    top: { en: 'Best: +20 attributes, +20 resistances, +10% experience', uk: 'Найкращий: +20 характеристик, +20 опорів, +10% досвіду', ru: 'Лучший: +20 характеристик, +20 сопротивлений, +10% опыта' },
    custom: { en: 'Manual: set the numbers yourself', uk: 'Вручну: задати числа самостійно', ru: 'Вручную: задать числа самому' },
  },
  xp: { en: 'Experience, % (5–10)', uk: 'Досвід, % (5–10)', ru: 'Опыт, % (5–10)' },
  xpDesc: {
    en: 'Extra experience gained from monsters. Default and maximum 10: the best in the game. Minimum 5: the worst.',
    uk: 'Додатковий досвід за монстрів. За замовчуванням і максимум 10: найкраще в грі. Мінімум 5: найгірше.',
    ru: 'Дополнительный опыт за монстров. По умолчанию и максимум 10: лучшее в игре. Минимум 5: худшее.',
  },
};
function annihilusSection(lang) {
  const c = T.uc, t = T.ut;
  const manual = ['eq', ['value', 'ub_a_roll'], 'custom'];
  return {
    id: `sec_u_a_${lang}`, type: 'section', name: c.name2[lang], description: c.desc2[lang], defaultExpanded: true,
    children: [
      {
        id: 'ub_a_roll', type: 'select', name: c.roll[lang], description: c.rollDesc[lang], defaultValue: 'random',
        options: Object.keys(c.rolls).map((r) => ({ label: c.rolls[r][lang], value: r })),
      },
      { id: 'ub_a_stats', type: 'number', name: t.stats[lang], description: t.statsDesc[lang], defaultValue: 20, minValue: 10, maxValue: 20, visible: manual },
      { id: 'ub_a_res', type: 'number', name: t.res[lang], description: t.resDesc[lang], defaultValue: 20, minValue: 10, maxValue: 20, visible: manual },
      { id: 'ub_a_xp', type: 'number', name: c.xp[lang], description: c.xpDesc[lang], defaultValue: 10, minValue: 5, maxValue: 10, visible: manual },
    ],
  };
}
function charmSection(lang) {
  const c = T.uc;
  return {
    id: `sec_c_${lang}`, type: 'section', name: c.name[lang], description: c.desc[lang], defaultExpanded: false,
    children: [annihilusSection(lang), torchSection(lang)],
  };
}

// Section 7: easier Lilith, Uber Duriel, Uber Izual and Diablo Clone. Same levels as Uber Tristram, other order: they fight mostly in melee
const MKEYS = ['regen', 'melee', 'hp', 'ar', 'res', 'ac', 'speed', 'spell'];
const mIsPreset = (p) => ['eq', ['value', 'um_preset'], p];
const mOverride = (key) => ['if', mIsPreset('slight'), UVALS.slight[key], ['if', mIsPreset('medium'), UVALS.medium[key], ['if', mIsPreset('super'), UVALS.super[key], null]]];
T.um = {
  name: { en: '7. Easier Uber bosses: Diablo Clone, Izual, Duriel, Lilith', uk: '7. Легші Uber-боси: клон Діабло, Ізуаль, Дуріель, Ліліт', ru: '7. Облегчённые Uber-боссы: клон Диабло, Изуаль, Дуриэль, Лилит' },
  desc: {
    en: 'Makes easier the three bosses behind the red portals that you open with the keys, and Diablo Clone. Nothing else in the game changes: ordinary Andariel, Duriel, Izual and Diablo stay the same, and so do the bosses of Uber Tristram. Tick the box, choose a level, press INSTALL MODS, then RUN D2R. To return to the normal difficulty, untick the box and press INSTALL MODS again.',
    uk: 'Робить легшими трьох босів за червоними порталами, які відкриваються ключами, і клона Діабло. Нічого іншого в грі не змінюється: звичайні Андаріель, Дуріель, Ізуаль і Діабло лишаються такими самими, як і боси Uber Tristram. Поставте галочку, оберіть рівень, натисніть INSTALL MODS, потім RUN D2R. Щоб повернути звичайну складність, зніміть галочку й знову натисніть INSTALL MODS.',
    ru: 'Делает легче трёх боссов за красными порталами, которые открываются ключами, и клона Диабло. Больше ничего в игре не меняется: обычные Андариэль, Дуриэль, Изуаль и Диабло остаются такими же, как и боссы Uber Tristram. Поставьте галочку, выберите уровень, нажмите INSTALL MODS, потом RUN D2R. Чтобы вернуть обычную сложность, снимите галочку и снова нажмите INSTALL MODS.',
  },
  on: { en: 'Make these bosses easier', uk: 'Полегшити цих босів', ru: 'Облегчить этих боссов' },
  bosses: {
    a: { en: 'Lilith', uk: 'Ліліт', ru: 'Лилит' },
    u: { en: 'Uber Duriel', uk: 'Uber Duriel', ru: 'Uber Duriel' },
    i: { en: 'Uber Izual', uk: 'Uber Izual', ru: 'Uber Izual' },
    c: { en: 'Diablo Clone', uk: 'Клон Діабло', ru: 'Клон Диабло' },
  },
  melee: {
    a: {
      en: 'Damage of her melee attacks and the poison in them. Her poison cloud and poison bolts are not affected: they are shared with ordinary Andariel, so keep antidotes.',
      uk: 'Шкода її ударів і отрута в них. На отруйну хмару й отруйні стріли не впливає: вони спільні зі звичайною Андаріель, тож майте протиотрути.',
      ru: 'Урон её ударов и яд в них. На ядовитое облако и ядовитые стрелы не влияет: они общие с обычной Андариэль, так что держите противоядия.',
    },
    u: {
      en: 'Damage of his melee attacks. They are fast and he freezes with his aura, so this is what saves your mercenary.',
      uk: 'Шкода його ударів. Вони швидкі, а його аура заморожує, тому саме це рятує найманця.',
      ru: 'Урон его ударов. Они быстрые, а его аура замораживает, поэтому именно это спасает наёмника.',
    },
    i: {
      en: 'Damage of his melee attacks, including the cold in them.',
      uk: 'Шкода його ударів, разом із холодом у них.',
      ru: 'Урон его ударов, вместе с холодом в них.',
    },
    c: {
      en: 'Damage of his melee attacks. His spells are set by "Spell power".',
      uk: 'Шкода його ударів. Закляття налаштовує «Сила заклять».',
      ru: 'Урон его ударов. Заклинания настраивает «Сила заклинаний».',
    },
  },
  ar: {
    a: {
      en: 'Her attack rating is the highest of the three, about 30,000. Lower means she misses you and your mercenary more often.',
      uk: 'Її влучність найвища з трьох, близько 30 000. Чим нижча, тим частіше вона промахується по вас і найманцю.',
      ru: 'Её меткость самая высокая из трёх, около 30 000. Чем ниже, тем чаще она промахивается по вам и наёмнику.',
    },
    u: {
      en: 'Lower attack rating means his melee attacks miss more often.',
      uk: 'Нижча влучність означає, що його удари частіше промахуються.',
      ru: 'Чем ниже меткость, тем чаще его удары проходят мимо.',
    },
    i: {
      en: 'Lower attack rating means his melee attacks miss more often.',
      uk: 'Нижча влучність означає, що його удари частіше промахуються.',
      ru: 'Чем ниже меткость, тем чаще его удары проходят мимо.',
    },
    c: {
      en: 'Lower attack rating means his melee attacks miss more often.',
      uk: 'Нижча влучність означає, що його удари частіше промахуються.',
      ru: 'Чем ниже меткость, тем чаще его удары проходят мимо.',
    },
  },
  speed: {
    en: 'Lower speed makes it easier to keep away from the boss.',
    uk: 'Нижча швидкість дозволяє легше триматися подалі від боса.',
    ru: 'Чем ниже скорость, тем легче держаться подальше от босса.',
  },
  regenClone: {
    en: 'He heals about half as fast as the other Uber bosses, about 8,000 life per second. Works in steps of 50.',
    uk: 'Він лікується приблизно вдвічі повільніше за інших Uber-босів, близько 8 000 здоров’я за секунду. Працює кроками по 50.',
    ru: 'Он лечится примерно вдвое медленнее других Uber-боссов, около 8 000 здоровья в секунду. Работает шагами по 50.',
  },
  spell: {
    c: {
      en: 'Lowers the level of his spells: Armageddon, fire ring, red lightning, cold and fire wall. This is what hurts most in this fight.',
      uk: 'Знижує рівень його заклять: Армагеддон, вогняне кільце, червона блискавка, холод і вогняна стіна. Саме вони завдають найбільше шкоди в цьому бою.',
      ru: 'Снижает уровень его заклинаний: Армагеддон, огненное кольцо, красная молния, холод и огненная стена. Именно они бьют больнее всего в этом бою.',
    },
    u: {
      en: 'Lowers the level of his Charge, Jab and Smite.',
      uk: 'Знижує рівень його Charge, Jab і Smite.',
      ru: 'Снижает уровень его Charge, Jab и Smite.',
    },
    i: {
      en: 'Lowers the level of his Frost Nova and Chilling Armor. The armor has level 20 and adds 231% defense, so your mercenary hits him rarely. At 50 it adds 141%.',
      uk: 'Знижує рівень його Frost Nova та Chilling Armor. Броня має 20 рівень і додає 231% захисту, тому найманець влучає рідко. При 50 вона додає 141%.',
      ru: 'Снижает уровень его Frost Nova и Chilling Armor. Chilling Armor 20 уровня добавляет 231% защиты, поэтому наёмник попадает редко. При 50 он добавляет 141%.',
    },
  },
};
function minorField(boss, key, lang) {
  const u = T.u, um = T.um;
  const help = key === 'spell' ? um.spell[boss][lang]
    : key === 'regen' && boss === 'c' ? um.regenClone[lang]
    : key === 'melee' ? um.melee[boss][lang]
    : key === 'ar' ? um.ar[boss][lang]
    : key === 'speed' ? um.speed[lang]
    : u.help[key][lang];
  return {
    id: `um_${boss}_${key}`, type: 'number', name: u.fields[key][lang], description: uLimits(key, lang) + ' ' + help,
    defaultValue: UDEF[key], minValue: UMIN[key] ?? 1, maxValue: uMax(key), overrideValue: mOverride(key),
  };
}
function minorSection(lang) {
  const u = T.u, um = T.um;
  const on = ['value', 'um_on'];
  return {
    id: `sec_um_${lang}`, type: 'section', name: um.name[lang], description: um.desc[lang], defaultExpanded: false,
    children: [
      { id: 'um_on', type: 'checkbox', name: um.on[lang], defaultValue: false },
      {
        id: 'um_preset', type: 'select', name: u.preset[lang], description: u.presetDesc[lang], defaultValue: 'medium', visible: on,
        options: ['slight', 'medium', 'super', 'custom'].map((p) => ({ label: u.presets[p][lang], value: p })),
      },
      ...['c', 'i', 'u', 'a'].map((boss) => ({
        id: `sec_um_${boss}_${lang}`, type: 'section', name: um.bosses[boss][lang], description: u.bossDesc[lang],
        defaultExpanded: false, visible: on,
        // Lilith's skills already have level 1, there is nothing to lower
        children: MKEYS.filter((key) => boss !== 'a' || key !== 'spell').map((key) => minorField(boss, key, lang)),
      })),
    ],
  };
}
function uberSection(lang) {
  const u = T.u;
  const on = ['value', 'ub_on'];
  return {
    id: `sec_u_${lang}`, type: 'section', name: u.name[lang], description: u.desc[lang], defaultExpanded: false,
    children: [
      { id: 'ub_on', type: 'checkbox', name: u.on[lang], defaultValue: false },
      {
        id: 'ub_preset', type: 'select', name: u.preset[lang], description: u.presetDesc[lang], defaultValue: 'slight', visible: on,
        options: ['slight', 'medium', 'super', 'custom'].map((p) => ({ label: u.presets[p][lang], value: p })),
      },
      ...['m', 'd', 'b'].map((boss) => ({
        id: `sec_u_${boss}_${lang}`, type: 'section', name: u.bosses[boss][lang], description: u.bossDesc[lang],
        defaultExpanded: false, visible: on,
        children: (boss === 'm' ? ['regen', 'aura', ...UKEYS.slice(1)] : UKEYS).map((key) => uberField(boss, key, lang)),
      })),
    ],
  };
}

// An info block: a titled section with the text in its tooltip
function infoSection(key, src, lang) {
  return {
    id: `${key}_${lang}`, type: 'section', name: src.name[lang], description: src.lines[lang].join(' '),
    defaultExpanded: false, allowToggleAll: false, children: [],
  };
}

function tree(lang) {
  const q = T.q, r = T.r, t = T.t, x = T.x, k = T.k, p = T.p;
  return [
    {
      id: 'lang', type: 'select', name: T.langLabel[lang], defaultValue: 'en',
      options: LANGS.map((l) => ({ label: T.langName[l], value: l })),
    },
    infoSection('about', T.about, lang),
    {
      id: `sec_k_${lang}`, type: 'section', name: k.name[lang], description: k.desc[lang], defaultExpanded: false,
      children: [
        {
          id: 'k_class', type: 'select', name: k.cls[lang], defaultValue: 'all',
          options: ['all', 'ama', 'ass', 'bar', 'dru', 'nec', 'pal', 'sor', 'war'].map((c) => ({ label: k.classes[c][lang], value: c })),
        },
      ],
    },
    {
      id: `sec_q_${lang}`, type: 'section', name: q.name[lang], description: q.desc[lang], defaultExpanded: false,
      children: [
        { id: 'q_on', type: 'checkbox', name: q.on[lang], defaultValue: false },
        {
          id: 'q_preset', type: 'select', name: q.preset[lang], description: q.presetDesc[lang], defaultValue: 'uniques',
          visible: ['value', 'q_on'],
          options: ['bases', 'balanced', 'uniques', 'custom'].map((p) => ({ label: q.presets[p][lang], value: p })),
        },
        ...QIDS.map((id, i) => ({
          id, type: 'number', name: q.fields[id][lang], description: q.limits[lang](QDEF[i]) + ' ' + q.fieldDesc[lang],
          defaultValue: QDEF[i], minValue: 0, maxValue: 100,
          visible: ['value', 'q_on'], overrideValue: qOverride(i),
        })),
        { id: 'q_nomin', type: 'checkbox', name: q.nomin[lang], description: q.nominDesc[lang], defaultValue: true, visible: ['value', 'q_on'] },
        { id: 'q_nolvl', type: 'checkbox', name: q.nolvl[lang], description: q.nolvlDesc[lang], defaultValue: true, visible: ['value', 'q_on'] },
      ],
    },
    huntSection(lang),
    {
      id: `sec_r_${lang}`, type: 'section', name: r.name[lang], description: r.desc[lang], defaultExpanded: false,
      children: [
        { id: 'r_on', type: 'checkbox', name: r.on[lang], defaultValue: false },
        { id: 'r_good', type: 'number', name: r.good[lang], description: r.goodDesc[lang], defaultValue: 1, minValue: 1, maxValue: 20, visible: ['value', 'r_on'] },
        { id: 'r_amount', type: 'number', name: r.amount[lang], description: r.amountDesc[lang], defaultValue: 1, minValue: 1, maxValue: 50, visible: ['value', 'r_on'] },
        { id: 'r_tier', type: 'number', name: r.tier[lang], description: r.tierDesc[lang], defaultValue: 1, minValue: 1, maxValue: 100, visible: ['value', 'r_on'] },
        { id: 'r_countess', type: 'checkbox', name: r.countess[lang], description: r.countessDesc[lang], defaultValue: false, visible: ['value', 'r_on'] },
      ],
    },
    {
      id: `sec_x_${lang}`, type: 'section', name: x.name[lang], description: x.desc[lang], defaultExpanded: false,
      children: [
        { id: 'x_gem', type: 'checkbox', name: x.gem[lang], description: x.gemDesc[lang], defaultValue: false },
        { id: 'x_rune', type: 'checkbox', name: x.rune[lang], description: x.runeDesc[lang], defaultValue: false },
        { id: 'x_rejuv', type: 'checkbox', name: x.rejuv[lang], description: x.rejuvDesc[lang], defaultValue: false },
        { id: 'x_usock', type: 'checkbox', name: x.usock[lang], description: x.usockDesc[lang], defaultValue: false },
        {
          id: 'x_usock_gem', type: 'select', name: x.usockGem[lang], defaultValue: 'sku', visible: ['value', 'x_usock'],
          options: [
            ...['skc', 'skf', 'sku', 'skl'].map((c) => ({ label: loc(c, lang, c), value: c })),
            { label: x.usockNone[lang], value: 'none' },
          ],
        },
        { id: 'x_forge', type: 'checkbox', name: x.forge[lang], description: x.forgeDesc[lang], defaultValue: false },
        {
          id: 'x_forge_n', type: 'select', name: x.forgeN[lang], defaultValue: 4, visible: ['value', 'x_forge'],
          options: [1, 2, 3, 4, 5, 6].map((n) => ({ label: String(n), value: n })),
        },
      ],
    },
    {
      id: `sec_p_${lang}`, type: 'section', name: p.name[lang], description: p.desc[lang], defaultExpanded: false,
      children: [
        { id: 'p_keys', type: 'number', name: p.mult[lang], description: p.multDesc[lang], defaultValue: 1, minValue: 1, maxValue: 100 },
        { id: 'e_on', type: 'checkbox', name: p.ess[lang], description: p.essDesc[lang], defaultValue: false },
      ],
    },
    minorSection(lang),
    uberSection(lang),
    charmSection(lang),
    {
      id: `sec_dev_${lang}`, type: 'section', name: T.dev.name[lang], description: T.dev.desc[lang],
      defaultExpanded: false, allowToggleAll: false,
      children: [{ id: 'd_code', type: 'text', name: T.dev.field[lang], description: T.dev.fieldDesc[lang], defaultValue: '' }],
    },
    infoSection('compat', T.compat, lang),
  ];
}

T.dev = {
  name: { en: '10. About the author', uk: '10. Про автора', ru: '10. Об авторе' },
  desc: {
    en: 'This mod was made with love for the game and is meant for getting to know its content: it eases some rules of the offline version. If you have wishes, ideas or just a review, write to the developer: rudnik.den@gmail.com. Everyone who writes will receive a developer code: it unlocks a secret item that does not exist in the normal game.',
    uk: 'Цей мод зроблено з любов’ю до гри, і він призначений для знайомства з її контентом: він полегшує деякі правила офлайн-версії. Якщо у вас є побажання, ідеї або просто відгук, напишіть розробнику: rudnik.den@gmail.com. Кожному, хто напише, я надішлю код розробника: він відкриває секретний предмет, якого немає у звичайній грі.',
    ru: 'Этот мод сделан с любовью к игре и предназначен для знакомства с её контентом: он облегчает некоторые правила офлайн-версии. Если у вас есть пожелания, идеи или просто отзыв, напишите разработчику: rudnik.den@gmail.com. Каждому написавшему я вышлю код разработчика: он открывает секретный предмет, которого нет в обычной игре.',
  },
  field: { en: 'Developer code', uk: 'Код розробника', ru: 'Код разработчика' },
  fieldDesc: {
    en: 'Enter the code and press INSTALL MODS, then RUN D2R. Nothing else needs to be turned on: the secret item starts dropping from any monster on Hell difficulty. Its chance is "Chance per monster, %" from section 3, 5 by default. After you find it, clear the field and press INSTALL MODS again. A wrong code does nothing.',
    uk: 'Введіть код, натисніть INSTALL MODS, потім RUN D2R. Більше нічого вмикати не потрібно: секретний предмет почне випадати з будь-яких монстрів на складності Пекло. Його шанс задає «Шанс з кожного монстра, %» із розділу 3, типово 5. Після знахідки очистьте поле й знову натисніть INSTALL MODS. Неправильний код нічого не робить.',
    ru: 'Введите код, нажмите INSTALL MODS, потом RUN D2R. Больше ничего включать не нужно: секретный предмет начнёт падать с любых монстров на сложности Ад. Его шанс задаёт «Шанс с каждого монстра, %» из раздела 3, по умолчанию 5. После находки очистите поле и снова нажмите INSTALL MODS. Неверный код ничего не делает.',
  },
};

const config = [
  ...LANGS.map((l) => ({
    id: `ui_${l}`, type: 'section', name: '', defaultExpanded: true, allowToggleAll: false,
    visible: ['eq', ['value', 'lang'], l], children: tree(l),
  })),
];

const modJson = {
  name: 'D2R_Mode_byRudnikDen',
  description:
    'All-in-one offline loot mod: item quality, rune tier and amount, Countess runes, target item drops, extra cube recipes (gem and rune downgrade, easy Full Rejuvenation, sockets), a class loot filter, Pandemonium key drop chance, easier Uber bosses and Uber Tristram and the best rolls of Annihilus and Hellfire Torch. Everything is off by default. Language: English / Українська / Русский.',
  author: 'RudnikDen',
  version: '1.0',
  config,
};

const modJs = fs.readFileSync(path.join(__dirname, 'rudnik_mod.js'), 'utf8').replace('__VALID_CODES__', JSON.stringify([...allCodes].sort()))
  .replace('__HUNT_MAP__', JSON.stringify(Object.fromEntries(HUNT.map((h) => [h.key, [h.code, h.lvl, h.kind]]))))
  .replace('__UBER_PRESETS__', JSON.stringify(UVALS));

for (const dir of OUT_DIRS) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'mod.json'), JSON.stringify(modJson, null, 2), 'utf8');
  fs.writeFileSync(path.join(dir, 'mod.js'), modJs, 'ascii');
  fs.copyFileSync(path.join(__dirname, 'rudnik_README.md'), path.join(dir, 'README.md'));
  console.log('written:', dir);
}
const count = (n) => (n.children ? n.children.reduce((a, c) => a + count(c), 0) : 1);
console.log('fields:', count({ children: config }), '| item bases:', allCodes.size, '| mod.json KB:', (fs.statSync(path.join(OUT_DIRS[0], 'mod.json')).size / 1024) | 0);
