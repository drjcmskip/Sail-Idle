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

// upgradeBase is a flat gold amount decoupled from `price`/`currency` so
// gem-priced boats still get a sane gold cost for their upgrade ladder.
export const BOATS = [
  { id: 'optimist', classId: 'derive', name: 'Optimist Club', price: 0, currency: 'gold', baseSpeed: 3, goldMultiplier: 1.0, upgradeBase: 20 },
  { id: 'laser', classId: 'derive', name: 'Laser Performance', price: 300, currency: 'gold', baseSpeed: 4, goldMultiplier: 1.05, upgradeBase: 30 },
  { id: '470', classId: 'derive', name: '470 Régate', price: 1200, currency: 'gold', baseSpeed: 5, goldMultiplier: 1.1, upgradeBase: 60 },

  { id: 'mini-serie', classId: 'mini650', name: 'Mini Série', price: 3000, currency: 'gold', baseSpeed: 6, goldMultiplier: 1.15, upgradeBase: 120 },
  { id: 'mini-proto', classId: 'mini650', name: 'Mini Prototype', price: 7000, currency: 'gold', baseSpeed: 7, goldMultiplier: 1.2, upgradeBase: 280 },
  { id: 'mini-foiler', classId: 'mini650', name: 'Mini Foiler', price: 15000, currency: 'gold', baseSpeed: 8.2, goldMultiplier: 1.25, upgradeBase: 550 },

  { id: 'halfton-classic', classId: 'halfton', name: 'Half-Ton Classic', price: 30000, currency: 'gold', baseSpeed: 9, goldMultiplier: 1.3, upgradeBase: 1000 },
  { id: 'halfton-racer', classId: 'halfton', name: 'Half-Ton Racer', price: 65000, currency: 'gold', baseSpeed: 10.2, goldMultiplier: 1.35, upgradeBase: 2200 },
  { id: 'halfton-gp', classId: 'halfton', name: 'Half-Ton Grand Prix', price: 130000, currency: 'gold', baseSpeed: 11.5, goldMultiplier: 1.4, upgradeBase: 4200 },

  { id: 'class40-series', classId: 'class40', name: 'Class40 Série', price: 260000, currency: 'gold', baseSpeed: 13, goldMultiplier: 1.45, upgradeBase: 8000 },
  { id: 'class40-perf', classId: 'class40', name: 'Class40 Performance', price: 500000, currency: 'gold', baseSpeed: 14.5, goldMultiplier: 1.5, upgradeBase: 15000 },
  { id: 'class40-foil', classId: 'class40', name: 'Class40 Foil', price: 950000, currency: 'gold', baseSpeed: 16, goldMultiplier: 1.55, upgradeBase: 28000 },

  { id: 'imoca-foil1', classId: 'imoca', name: 'IMOCA Foil One', price: 1800000, currency: 'gold', baseSpeed: 18, goldMultiplier: 1.6, upgradeBase: 55000 },
  { id: 'imoca-vendee', classId: 'imoca', name: 'IMOCA Vendée Ready', price: 3400000, currency: 'gold', baseSpeed: 20, goldMultiplier: 1.68, upgradeBase: 100000 },
  { id: 'imoca-fullfoiler', classId: 'imoca', name: 'IMOCA Full Foiler', price: 6200000, currency: 'gold', baseSpeed: 22.5, goldMultiplier: 1.75, upgradeBase: 180000 },

  { id: 'ocean50-series', classId: 'ocean50', name: 'Ocean Fifty Série', price: 11000000, currency: 'gold', baseSpeed: 25, goldMultiplier: 1.85, upgradeBase: 320000 },
  { id: 'ocean50-foil', classId: 'ocean50', name: 'Ocean Fifty Foil', price: 22000000, currency: 'gold', baseSpeed: 28, goldMultiplier: 1.95, upgradeBase: 580000 },
  { id: 'ocean50-elite', classId: 'ocean50', name: 'Ocean Fifty Élite', price: 40, currency: 'gems', baseSpeed: 31, goldMultiplier: 2.05, upgradeBase: 1000000 },

  { id: 'ac75-challenger', classId: 'ac75', name: 'AC75 Challenger', price: 40000000, currency: 'gold', baseSpeed: 34, goldMultiplier: 2.15, upgradeBase: 1800000 },
  { id: 'ac75-defender', classId: 'ac75', name: 'AC75 Defender', price: 75000000, currency: 'gold', baseSpeed: 38, goldMultiplier: 2.3, upgradeBase: 3200000 },
  { id: 'ac75-prototype', classId: 'ac75', name: 'AC75 Prototype', price: 70, currency: 'gems', baseSpeed: 42, goldMultiplier: 2.45, upgradeBase: 5500000 },

  { id: 'f50-sprint', classId: 'f50', name: 'F50 Sprint', price: 140000000, currency: 'gold', baseSpeed: 46, goldMultiplier: 2.6, upgradeBase: 9000000 },
  { id: 'f50-gp', classId: 'f50', name: 'F50 Grand Prix', price: 110, currency: 'gems', baseSpeed: 51, goldMultiplier: 2.8, upgradeBase: 15000000 },
  { id: 'f50-elite', classId: 'f50', name: 'F50 Elite Foiler', price: 180, currency: 'gems', baseSpeed: 56, goldMultiplier: 3.0, upgradeBase: 25000000 },

  { id: 'ultim-entry', classId: 'ultim', name: 'Ultim Entrée', price: 260000000, currency: 'gold', baseSpeed: 60, goldMultiplier: 3.3, upgradeBase: 40000000 },
  { id: 'ultim-record', classId: 'ultim', name: 'Ultim Chasseur de Records', price: 220, currency: 'gems', baseSpeed: 66, goldMultiplier: 3.6, upgradeBase: 70000000 },
  { id: 'ultim-elite', classId: 'ultim', name: 'Ultim Trimaran Élite', price: 380, currency: 'gems', baseSpeed: 72, goldMultiplier: 4.0, upgradeBase: 120000000 },
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
