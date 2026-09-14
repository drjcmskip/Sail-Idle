// Cosmetic tier names shown in place of raw upgrade levels — the level
// number itself still drives cost/bonus formulas in game.js, this just
// gives the player a material/role/gear name to read instead of "Niveau 7".
const SAIL_TIERS = [
  { min: 1, name: 'Coton' },
  { min: 5, name: 'Nylon' },
  { min: 10, name: 'Mylar' },
  { min: 16, name: 'Kevlar' },
  { min: 24, name: 'Vectran' },
  { min: 34, name: 'PBO' },
];

const CREW_TIERS = [
  { min: 0, name: 'Mousse' },
  { min: 1, name: 'Équipier' },
  { min: 4, name: 'Barreur' },
  { min: 8, name: 'Régleur' },
  { min: 13, name: 'Tacticien' },
  { min: 19, name: 'Navigateur' },
  { min: 26, name: 'Skipper pro' },
];

const EQUIPMENT_TIERS = [
  { min: 1, name: 'Poulies' },
  { min: 4, name: 'Winches' },
  { min: 9, name: 'GPS' },
  { min: 16, name: 'Espars carbone' },
  { min: 25, name: 'Système de foils' },
];

function tierName(tiers, level) {
  let name = tiers[0].name;
  for (const tier of tiers) {
    if (level >= tier.min) name = tier.name;
    else break;
  }
  return name;
}

export function sailTierName(level) {
  return tierName(SAIL_TIERS, level);
}

export function crewTierName(level) {
  return tierName(CREW_TIERS, level);
}

export function equipmentTierName(level) {
  return tierName(EQUIPMENT_TIERS, level);
}
