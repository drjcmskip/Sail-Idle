export const BOAT_CLASSES = [
  {
    id: 'derive',
    name: 'Dériveur',
    description: 'Pour débuter : léger, réactif, sans prétention.',
    unlockReputation: 0,
  },
  {
    id: 'mini650',
    name: 'Mini 6.50',
    description: 'Petit habitable de course au large en solitaire.',
    unlockReputation: 4,
  },
  {
    id: 'halfton',
    name: 'Half-Tonner',
    description: 'Classique de course au large, solide et polyvalent.',
    unlockReputation: 9,
  },
  {
    id: 'class40',
    name: 'Class40',
    description: 'Monocoque océanique moderne, robuste et rapide.',
    unlockReputation: 16,
  },
  {
    id: 'imoca',
    name: 'IMOCA 60',
    description: 'Monocoque océanique en solitaire, taillé pour le large.',
    unlockReputation: 25,
  },
  {
    id: 'ocean50',
    name: 'Ocean 50',
    description: 'Trimaran océanique volant, trois coques et beaucoup de peps.',
    unlockReputation: 38,
  },
  {
    id: 'ac75',
    name: 'AC75',
    description: "Foiler de haute performance, style America's Cup.",
    unlockReputation: 55,
  },
  {
    id: 'f50',
    name: 'F50 Foiler',
    description: 'Catamaran volant, le sommet de la vitesse en régate.',
    unlockReputation: 85,
  },
  {
    id: 'ultim',
    name: 'Ultim',
    description: "Le plus grand trimaran océanique, l'ultime consécration.",
    unlockReputation: 130,
  },
];

// baseSpeed is calibrated against real recorded/typical speeds (in knots)
// for each class — see the research notes in the commit for sources:
// dériveur (470/Laser) ~14-15kn planing, Mini 6.50 ~20-23kn stabilized
// (proto record 31kn), Half-Tonner ~9-13kn (pre-foil IOR displacement
// hull), Class40 20-25kn, IMOCA 60 up to 35kn surfing, Ocean Fifty up to
// ~40kn, AC75 record 55.6kn (INEOS Britannia), F50 record 58.11kn, Ultim
// ~40kn sustained / ~50kn peak — genuinely a notch under the AC75/F50
// sprint boats, since Ultims are built for ocean distance, not top speed.
// Prices/upgradeBase are scaled up roughly in step with each class's speed
// increase versus the previous (unresearched) numbers, to keep the pacing
// already tuned for "seconds to afford" — except Half-Tonner, F50 and
// Ultim, whose speeds barely changed or dropped, so their cost stayed put
// (Ultim stays the priciest, most prestigious class on cost/gold-multiplier
// alone, not on raw speed).
//
// upgradeBase is a flat gold amount decoupled from `price`/`currency` so
// gem-priced boats still get a sane gold cost for their upgrade ladder.
export const BOATS = [
  { id: 'optimist', classId: 'derive', name: 'Optimist Club', price: 0, currency: 'gold', baseSpeed: 4, goldMultiplier: 1.0, upgradeBase: 40 },
  { id: 'laser', classId: 'derive', name: 'Laser Performance', price: 600, currency: 'gold', baseSpeed: 9, goldMultiplier: 1.05, upgradeBase: 60 },
  { id: '470', classId: 'derive', name: '470 Régate', price: 2400, currency: 'gold', baseSpeed: 14, goldMultiplier: 1.1, upgradeBase: 120 },

  { id: 'mini-serie', classId: 'mini650', name: 'Mini Série', price: 6000, currency: 'gold', baseSpeed: 9, goldMultiplier: 1.15, upgradeBase: 240 },
  { id: 'mini-proto', classId: 'mini650', name: 'Mini Prototype', price: 14000, currency: 'gold', baseSpeed: 14, goldMultiplier: 1.2, upgradeBase: 560 },
  { id: 'mini-foiler', classId: 'mini650', name: 'Mini Foiler', price: 30000, currency: 'gold', baseSpeed: 20, goldMultiplier: 1.25, upgradeBase: 1100 },

  { id: 'halfton-classic', classId: 'halfton', name: 'Half-Ton Classic', price: 30000, currency: 'gold', baseSpeed: 9, goldMultiplier: 1.3, upgradeBase: 1000 },
  { id: 'halfton-racer', classId: 'halfton', name: 'Half-Ton Racer', price: 65000, currency: 'gold', baseSpeed: 11, goldMultiplier: 1.35, upgradeBase: 2200 },
  { id: 'halfton-gp', classId: 'halfton', name: 'Half-Ton Grand Prix', price: 130000, currency: 'gold', baseSpeed: 13, goldMultiplier: 1.4, upgradeBase: 4200 },

  { id: 'class40-series', classId: 'class40', name: 'Class40 Série', price: 364000, currency: 'gold', baseSpeed: 16, goldMultiplier: 1.45, upgradeBase: 11200 },
  { id: 'class40-perf', classId: 'class40', name: 'Class40 Performance', price: 700000, currency: 'gold', baseSpeed: 20, goldMultiplier: 1.5, upgradeBase: 21000 },
  { id: 'class40-foil', classId: 'class40', name: 'Class40 Foil', price: 1330000, currency: 'gold', baseSpeed: 25, goldMultiplier: 1.55, upgradeBase: 39200 },

  { id: 'imoca-foil1', classId: 'imoca', name: 'IMOCA Foil One', price: 2700000, currency: 'gold', baseSpeed: 26, goldMultiplier: 1.6, upgradeBase: 82500 },
  { id: 'imoca-vendee', classId: 'imoca', name: 'IMOCA Vendée Ready', price: 5100000, currency: 'gold', baseSpeed: 31, goldMultiplier: 1.68, upgradeBase: 150000 },
  { id: 'imoca-fullfoiler', classId: 'imoca', name: 'IMOCA Full Foiler', price: 9300000, currency: 'gold', baseSpeed: 35, goldMultiplier: 1.75, upgradeBase: 270000 },

  { id: 'ocean50-series', classId: 'ocean50', name: 'Ocean Fifty Série', price: 13200000, currency: 'gold', baseSpeed: 28, goldMultiplier: 1.85, upgradeBase: 384000 },
  { id: 'ocean50-foil', classId: 'ocean50', name: 'Ocean Fifty Foil', price: 26400000, currency: 'gold', baseSpeed: 34, goldMultiplier: 1.95, upgradeBase: 696000 },
  { id: 'ocean50-elite', classId: 'ocean50', name: 'Ocean Fifty Élite', price: 40, currency: 'gems', baseSpeed: 40, goldMultiplier: 2.05, upgradeBase: 1200000 },

  { id: 'ac75-challenger', classId: 'ac75', name: 'AC75 Challenger', price: 50800000, currency: 'gold', baseSpeed: 42, goldMultiplier: 2.15, upgradeBase: 2286000 },
  { id: 'ac75-defender', classId: 'ac75', name: 'AC75 Defender', price: 95250000, currency: 'gold', baseSpeed: 48, goldMultiplier: 2.3, upgradeBase: 4064000 },
  { id: 'ac75-prototype', classId: 'ac75', name: 'AC75 Prototype', price: 70, currency: 'gems', baseSpeed: 55, goldMultiplier: 2.45, upgradeBase: 6985000 },

  { id: 'f50-sprint', classId: 'f50', name: 'F50 Sprint', price: 140000000, currency: 'gold', baseSpeed: 50, goldMultiplier: 2.6, upgradeBase: 9000000 },
  { id: 'f50-gp', classId: 'f50', name: 'F50 Grand Prix', price: 110, currency: 'gems', baseSpeed: 55, goldMultiplier: 2.8, upgradeBase: 15000000 },
  { id: 'f50-elite', classId: 'f50', name: 'F50 Elite Foiler', price: 180, currency: 'gems', baseSpeed: 58, goldMultiplier: 3.0, upgradeBase: 25000000 },

  { id: 'ultim-entry', classId: 'ultim', name: 'Ultim Entrée', price: 260000000, currency: 'gold', baseSpeed: 44, goldMultiplier: 3.3, upgradeBase: 40000000 },
  { id: 'ultim-record', classId: 'ultim', name: 'Ultim Chasseur de Records', price: 220, currency: 'gems', baseSpeed: 50, goldMultiplier: 3.6, upgradeBase: 70000000 },
  { id: 'ultim-elite', classId: 'ultim', name: 'Ultim Trimaran Élite', price: 380, currency: 'gems', baseSpeed: 54, goldMultiplier: 4.0, upgradeBase: 120000000 },
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
