export const BOAT_CLASSES = [
  {
    id: 'derive',
    name: 'Dériveur',
    description: 'Pour débuter : léger, réactif, sans prétention.',
    unlockReputation: 0,
  },
  {
    id: 'catsport',
    name: 'Catamaran de sport',
    description: 'Multicoque léger de plage, rapide et accessible.',
    unlockReputation: 3,
  },
  {
    id: 'foilers',
    name: 'Foilers',
    description: 'Petits monocoques volants, la voltige en solitaire.',
    unlockReputation: 6,
  },
  {
    id: 'mini650',
    name: 'Mini 6.50',
    description: 'Petit habitable de course au large en solitaire.',
    unlockReputation: 10,
  },
  {
    id: 'class40',
    name: 'Class40',
    description: 'Monocoque océanique moderne, robuste et rapide.',
    unlockReputation: 18,
  },
  {
    id: 'imoca',
    name: 'IMOCA 60',
    description: 'Monocoque océanique en solitaire, taillé pour le large.',
    unlockReputation: 27,
  },
  {
    id: 'ocean50',
    name: 'Ocean 50',
    description: 'Trimaran océanique volant, trois coques et beaucoup de peps.',
    unlockReputation: 40,
  },
  {
    id: 'ac75',
    name: 'AC75',
    description: "Foiler de haute performance, style America's Cup.",
    unlockReputation: 58,
  },
  {
    id: 'f50',
    name: 'F50 Foiler',
    description: 'Catamaran volant, le sommet de la vitesse en régate.',
    unlockReputation: 88,
  },
  {
    id: 'ultim',
    name: 'Ultim',
    description: "Le plus grand trimaran océanique, l'ultime consécration.",
    unlockReputation: 133,
  },
];

// baseSpeed is calibrated against real recorded/typical speeds (in knots)
// for each class — see the research notes in past commits for sources:
// dériveur (470/Laser) ~14-15kn planing, sport catamarans (Hobie 16 to
// Nacra 17) ~12-27kn, small foiling dinghies (WASZP to A-Class) ~20-31kn,
// Mini 6.50 ~20-23kn stabilized (proto record 31kn), Class40 20-25kn,
// IMOCA 60 up to 35kn surfing, Ocean Fifty up to ~40kn, AC75 record
// 55.6kn (INEOS Britannia), F50 record 58.11kn, Ultim ~40kn sustained /
// ~50kn peak — genuinely a notch under the AC75/F50 sprint boats, since
// Ultims are built for ocean distance, not top speed. Note that the
// cheap/early Catamaran de sport and Foilers classes can out-speed the
// pricier Class40/IMOCA that unlock after them — that's true to life
// (small light boats are quick for their size), it just doesn't pay as
// well per mile (see their lower goldMultiplier), so it isn't a
// shortcut around the later classes.
//
// Each class has 5 boats; where a class was extended from an earlier,
// smaller roster, the two extra boats are interpolated between the
// neighbouring boats' price/speed/goldMultiplier/upgradeBase (geometric
// mean for the money figures, linear for speed and the multiplier) so
// the pacing already tuned around a class's cheapest/priciest boat holds.
//
// upgradeBase is a flat gold amount decoupled from `price`/`currency` so
// gem-priced boats still get a sane gold cost for their upgrade ladder.
export const BOATS = [
  { id: 'optimist', classId: 'derive', name: 'Optimist', price: 0, currency: 'gold', baseSpeed: 4, goldMultiplier: 1.0, upgradeBase: 40 },
  { id: 'laser-radial', classId: 'derive', name: 'Laser Radial', price: 250, currency: 'gold', baseSpeed: 6.5, goldMultiplier: 1.02, upgradeBase: 50 },
  { id: 'laser', classId: 'derive', name: 'Laser Standard', price: 600, currency: 'gold', baseSpeed: 9, goldMultiplier: 1.05, upgradeBase: 60 },
  { id: '420', classId: 'derive', name: '420', price: 1200, currency: 'gold', baseSpeed: 11.5, goldMultiplier: 1.075, upgradeBase: 85 },
  { id: '470', classId: 'derive', name: '470', price: 2400, currency: 'gold', baseSpeed: 14, goldMultiplier: 1.1, upgradeBase: 120 },

  { id: 'catsport-hobie16', classId: 'catsport', name: 'Hobie 16', price: 800, currency: 'gold', baseSpeed: 12, goldMultiplier: 1.08, upgradeBase: 60 },
  { id: 'catsport-dart18', classId: 'catsport', name: 'Dart 18', price: 1600, currency: 'gold', baseSpeed: 15, goldMultiplier: 1.1, upgradeBase: 110 },
  { id: 'catsport-f18', classId: 'catsport', name: 'Formula 18', price: 2800, currency: 'gold', baseSpeed: 19, goldMultiplier: 1.13, upgradeBase: 180 },
  { id: 'catsport-tornado', classId: 'catsport', name: 'Tornado', price: 4200, currency: 'gold', baseSpeed: 23, goldMultiplier: 1.16, upgradeBase: 280 },
  { id: 'catsport-nacra17', classId: 'catsport', name: 'Nacra 17', price: 6000, currency: 'gold', baseSpeed: 27, goldMultiplier: 1.19, upgradeBase: 400 },

  { id: 'foilers-waszp', classId: 'foilers', name: 'WASZP', price: 5500, currency: 'gold', baseSpeed: 20, goldMultiplier: 1.2, upgradeBase: 350 },
  { id: 'foilers-ufo', classId: 'foilers', name: 'UFO', price: 8000, currency: 'gold', baseSpeed: 22, goldMultiplier: 1.23, upgradeBase: 480 },
  { id: 'foilers-ifly15', classId: 'foilers', name: 'iFLY15', price: 11500, currency: 'gold', baseSpeed: 25, goldMultiplier: 1.26, upgradeBase: 650 },
  { id: 'foilers-moth', classId: 'foilers', name: 'International Moth', price: 16000, currency: 'gold', baseSpeed: 28, goldMultiplier: 1.29, upgradeBase: 850 },
  { id: 'foilers-aclass', classId: 'foilers', name: 'A-Class Catamaran', price: 22000, currency: 'gold', baseSpeed: 31, goldMultiplier: 1.32, upgradeBase: 1100 },

  { id: 'mini-serie', classId: 'mini650', name: 'Mini Série', price: 6000, currency: 'gold', baseSpeed: 9, goldMultiplier: 1.15, upgradeBase: 240 },
  { id: 'mini-pogo3', classId: 'mini650', name: 'Pogo 3', price: 9200, currency: 'gold', baseSpeed: 11.5, goldMultiplier: 1.175, upgradeBase: 370 },
  { id: 'mini-proto', classId: 'mini650', name: 'Proto Manuard', price: 14000, currency: 'gold', baseSpeed: 14, goldMultiplier: 1.2, upgradeBase: 560 },
  { id: 'mini-proto-foiler', classId: 'mini650', name: 'Proto Finot-Conq', price: 20500, currency: 'gold', baseSpeed: 17, goldMultiplier: 1.225, upgradeBase: 790 },
  { id: 'mini-foiler', classId: 'mini650', name: 'Proto Lombard', price: 30000, currency: 'gold', baseSpeed: 20, goldMultiplier: 1.25, upgradeBase: 1100 },

  { id: 'class40-series', classId: 'class40', name: 'Akilaria RC3', price: 364000, currency: 'gold', baseSpeed: 16, goldMultiplier: 1.45, upgradeBase: 11200 },
  { id: 'class40-sport', classId: 'class40', name: 'Mach40', price: 505000, currency: 'gold', baseSpeed: 18, goldMultiplier: 1.475, upgradeBase: 15300 },
  { id: 'class40-perf', classId: 'class40', name: 'Lift V2', price: 700000, currency: 'gold', baseSpeed: 20, goldMultiplier: 1.5, upgradeBase: 21000 },
  { id: 'class40-elite', classId: 'class40', name: 'Crédit Mutuel', price: 965000, currency: 'gold', baseSpeed: 22.5, goldMultiplier: 1.525, upgradeBase: 28700 },
  { id: 'class40-foil', classId: 'class40', name: 'Alla Grande Pirelli', price: 1330000, currency: 'gold', baseSpeed: 25, goldMultiplier: 1.55, upgradeBase: 39200 },

  { id: 'imoca-foil1', classId: 'imoca', name: 'PRB', price: 2700000, currency: 'gold', baseSpeed: 26, goldMultiplier: 1.6, upgradeBase: 82500 },
  { id: 'imoca-newgen', classId: 'imoca', name: 'Apivia', price: 3700000, currency: 'gold', baseSpeed: 28.5, goldMultiplier: 1.64, upgradeBase: 111000 },
  { id: 'imoca-vendee', classId: 'imoca', name: 'Charal 2', price: 5100000, currency: 'gold', baseSpeed: 31, goldMultiplier: 1.68, upgradeBase: 150000 },
  { id: 'imoca-vendee-elite', classId: 'imoca', name: 'Malizia - SeaExplorer', price: 6900000, currency: 'gold', baseSpeed: 33, goldMultiplier: 1.715, upgradeBase: 201000 },
  { id: 'imoca-fullfoiler', classId: 'imoca', name: '11th Hour Racing', price: 9300000, currency: 'gold', baseSpeed: 35, goldMultiplier: 1.75, upgradeBase: 270000 },

  { id: 'ocean50-series', classId: 'ocean50', name: 'Koesio', price: 13200000, currency: 'gold', baseSpeed: 28, goldMultiplier: 1.85, upgradeBase: 384000 },
  { id: 'ocean50-sport', classId: 'ocean50', name: 'Inter Invest', price: 18700000, currency: 'gold', baseSpeed: 31, goldMultiplier: 1.9, upgradeBase: 517000 },
  { id: 'ocean50-foil', classId: 'ocean50', name: 'Upwind by MerConcept', price: 26400000, currency: 'gold', baseSpeed: 34, goldMultiplier: 1.95, upgradeBase: 696000 },
  { id: 'ocean50-course', classId: 'ocean50', name: 'Réalités', price: 37400000, currency: 'gold', baseSpeed: 37, goldMultiplier: 2.0, upgradeBase: 950000 },
  { id: 'ocean50-elite', classId: 'ocean50', name: 'Edenred', price: 40, currency: 'gems', baseSpeed: 40, goldMultiplier: 2.05, upgradeBase: 1200000 },

  { id: 'ac75-challenger', classId: 'ac75', name: 'Orient Express', price: 50800000, currency: 'gold', baseSpeed: 42, goldMultiplier: 2.15, upgradeBase: 2286000 },
  { id: 'ac75-contender', classId: 'ac75', name: 'Patriot', price: 69600000, currency: 'gold', baseSpeed: 45, goldMultiplier: 2.225, upgradeBase: 3050000 },
  { id: 'ac75-defender', classId: 'ac75', name: 'Luna Rossa', price: 95250000, currency: 'gold', baseSpeed: 48, goldMultiplier: 2.3, upgradeBase: 4064000 },
  { id: 'ac75-racespec', classId: 'ac75', name: 'Britannia', price: 111000000, currency: 'gold', baseSpeed: 51.5, goldMultiplier: 2.375, upgradeBase: 5300000 },
  { id: 'ac75-prototype', classId: 'ac75', name: 'Taihoro', price: 70, currency: 'gems', baseSpeed: 55, goldMultiplier: 2.45, upgradeBase: 6985000 },

  { id: 'f50-sprint', classId: 'f50', name: 'F50 France', price: 140000000, currency: 'gold', baseSpeed: 50, goldMultiplier: 2.6, upgradeBase: 9000000 },
  { id: 'f50-race', classId: 'f50', name: 'F50 Grande-Bretagne', price: 190000000, currency: 'gold', baseSpeed: 52.5, goldMultiplier: 2.7, upgradeBase: 12000000 },
  { id: 'f50-gp', classId: 'f50', name: 'F50 États-Unis', price: 110, currency: 'gems', baseSpeed: 55, goldMultiplier: 2.8, upgradeBase: 15000000 },
  { id: 'f50-championship', classId: 'f50', name: 'F50 Nouvelle-Zélande', price: 145, currency: 'gems', baseSpeed: 56.5, goldMultiplier: 2.9, upgradeBase: 20000000 },
  { id: 'f50-elite', classId: 'f50', name: 'F50 Australie', price: 180, currency: 'gems', baseSpeed: 58, goldMultiplier: 3.0, upgradeBase: 25000000 },

  { id: 'ultim-entry', classId: 'ultim', name: 'Actual Ultim 4', price: 260000000, currency: 'gold', baseSpeed: 44, goldMultiplier: 3.3, upgradeBase: 40000000 },
  { id: 'ultim-challenger', classId: 'ultim', name: "Sodebo Ultim' 3", price: 350000000, currency: 'gold', baseSpeed: 47, goldMultiplier: 3.45, upgradeBase: 54000000 },
  { id: 'ultim-record', classId: 'ultim', name: 'Banque Populaire XI', price: 220, currency: 'gems', baseSpeed: 50, goldMultiplier: 3.6, upgradeBase: 70000000 },
  { id: 'ultim-legende', classId: 'ultim', name: 'SVR-Lazartigue', price: 300, currency: 'gems', baseSpeed: 52, goldMultiplier: 3.8, upgradeBase: 95000000 },
  { id: 'ultim-elite', classId: 'ultim', name: 'Gitana 18', price: 380, currency: 'gems', baseSpeed: 54, goldMultiplier: 4.0, upgradeBase: 120000000 },
];

export function getBoat(boatId) {
  return BOATS.find((b) => b.id === boatId);
}

export function getClass(classId) {
  return BOAT_CLASSES.find((c) => c.id === classId);
}

export function getBoatsByClass(classId) {
  return BOATS.filter((b) => b.classId === classId);
}

export function isClassUnlocked(classId, reputation) {
  const boatClass = getClass(classId);
  return boatClass ? reputation >= boatClass.unlockReputation : false;
}
