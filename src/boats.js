export const BOAT_CLASSES = [
  {
    id: 'derive',
    name: 'Dériveur',
    description: 'Pour débuter : léger, réactif, sans prétention.',
    unlockReputation: 0,
  },
  {
    id: 'halfton',
    name: 'Half-Tonner',
    description: 'Classique de course au large, solide et polyvalent.',
    unlockReputation: 5,
  },
  {
    id: 'imoca',
    name: 'IMOCA 60',
    description: 'Monocoque océanique en solitaire, taillé pour le large.',
    unlockReputation: 20,
  },
  {
    id: 'ac75',
    name: 'AC75',
    description: "Foiler de haute performance, style America's Cup.",
    unlockReputation: 50,
  },
  {
    id: 'f50',
    name: 'F50 Foiler',
    description: 'Catamaran volant, le sommet de la vitesse en régate.',
    unlockReputation: 100,
  },
];

// upgradeBase is a flat gold amount decoupled from `price`/`currency` so
// gem-priced boats still get a sane gold cost for their upgrade ladder.
export const BOATS = [
  { id: 'optimist', classId: 'derive', name: 'Optimist Club', price: 0, currency: 'gold', baseSpeed: 3, goldMultiplier: 1.0, upgradeBase: 20 },
  { id: 'laser', classId: 'derive', name: 'Laser Performance', price: 300, currency: 'gold', baseSpeed: 4, goldMultiplier: 1.05, upgradeBase: 30 },
  { id: '470', classId: 'derive', name: '470 Régate', price: 1200, currency: 'gold', baseSpeed: 5, goldMultiplier: 1.1, upgradeBase: 60 },

  { id: 'halfton-classic', classId: 'halfton', name: 'Half-Ton Classic', price: 4000, currency: 'gold', baseSpeed: 6, goldMultiplier: 1.15, upgradeBase: 150 },
  { id: 'halfton-racer', classId: 'halfton', name: 'Half-Ton Racer', price: 12000, currency: 'gold', baseSpeed: 7.5, goldMultiplier: 1.2, upgradeBase: 400 },
  { id: 'halfton-gp', classId: 'halfton', name: 'Half-Ton Grand Prix', price: 30000, currency: 'gold', baseSpeed: 9, goldMultiplier: 1.25, upgradeBase: 1000 },

  { id: 'imoca-foil1', classId: 'imoca', name: 'IMOCA Foil One', price: 80000, currency: 'gold', baseSpeed: 11, goldMultiplier: 1.3, upgradeBase: 3000 },
  { id: 'imoca-vendee', classId: 'imoca', name: 'IMOCA Vendée Ready', price: 220000, currency: 'gold', baseSpeed: 13.5, goldMultiplier: 1.4, upgradeBase: 8000 },
  { id: 'imoca-fullfoiler', classId: 'imoca', name: 'IMOCA Full Foiler', price: 600000, currency: 'gold', baseSpeed: 16, goldMultiplier: 1.5, upgradeBase: 20000 },

  { id: 'ac75-challenger', classId: 'ac75', name: 'AC75 Challenger', price: 1500000, currency: 'gold', baseSpeed: 20, goldMultiplier: 1.6, upgradeBase: 55000 },
  { id: 'ac75-defender', classId: 'ac75', name: 'AC75 Defender', price: 4000000, currency: 'gold', baseSpeed: 24, goldMultiplier: 1.75, upgradeBase: 150000 },
  { id: 'ac75-prototype', classId: 'ac75', name: 'AC75 Prototype', price: 50, currency: 'gems', baseSpeed: 29, goldMultiplier: 1.9, upgradeBase: 250000 },

  { id: 'f50-sprint', classId: 'f50', name: 'F50 Sprint', price: 12000000, currency: 'gold', baseSpeed: 34, goldMultiplier: 2.0, upgradeBase: 500000 },
  { id: 'f50-gp', classId: 'f50', name: 'F50 Grand Prix', price: 30, currency: 'gems', baseSpeed: 40, goldMultiplier: 2.2, upgradeBase: 900000 },
  { id: 'f50-elite', classId: 'f50', name: 'F50 Elite Foiler', price: 80, currency: 'gems', baseSpeed: 48, goldMultiplier: 2.5, upgradeBase: 1500000 },
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
