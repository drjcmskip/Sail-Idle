// Cosmetic tier names shown in place of raw upgrade levels — the level
// number itself still drives cost/bonus formulas in game.js, this just
// gives the player a material/role/gear name to read instead of "Niveau 7".
//
// Sail fiber order follows real sailmaking material evolution: cotton,
// then synthetics — polyester/Dacron (cheap, UV-resistant, the cruising
// standard), nylon (elastic, light, spinnakers), aramids/Kevlar-Twaron
// (stiff, resist stretch, but UV-sensitive), carbon (ultra-light and
// stiff, racing/offshore), and finally Dyneema/Spectra & Vectran (highest
// tensile strength, least stretch, top-end racing sails).
const SAIL_TIERS = [
  { min: 1, name: 'Coton' },
  { min: 5, name: 'Dacron (polyester)' },
  { min: 10, name: 'Nylon' },
  { min: 16, name: 'Kevlar / Twaron' },
  { min: 24, name: 'Carbone' },
  { min: 34, name: 'Dyneema / Vectran' },
];

// Real racing-crew hierarchy, roughly novice to specialist: équipier
// (generalist), embraqueur/grinder (winch power), piano (halyards at the
// mast), régleur (sail trimmer), barreur (helmsman), tacticien (strategist,
// only fielded past ~6 crew), navigateur (routing/weather), skipper.
const CREW_TIERS = [
  { min: 0, name: 'Équipier' },
  { min: 3, name: 'Embraqueur' },
  { min: 6, name: 'Piano' },
  { min: 10, name: 'Régleur' },
  { min: 15, name: 'Barreur' },
  { min: 21, name: 'Tacticien' },
  { min: 28, name: 'Navigateur' },
  { min: 36, name: 'Skipper' },
];

// Onboard gear, basic to high-tech: manual winch, then self-tailing
// (standard upgrade), GPS/instruments, autopilot, powered (electric/
// hydraulic) winches, carbon rigging, and foils at the top end.
const EQUIPMENT_TIERS = [
  { min: 1, name: 'Winch manuel' },
  { min: 4, name: 'Winch self-tailing' },
  { min: 8, name: 'GPS & instruments' },
  { min: 13, name: 'Pilote automatique' },
  { min: 19, name: 'Winch électrique' },
  { min: 26, name: 'Espars carbone' },
  { min: 34, name: 'Système de foils' },
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
