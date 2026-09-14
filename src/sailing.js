// A simplified point-of-sail / sail-trim model: each leg of a buoy course
// has one ideal trim, and how far off the player's choice is (0/1/2 steps)
// determines the speed bonus or penalty for that leg.
export const TRIM_OPTIONS = [
  { id: 'borde', label: 'Bordé', hint: 'voile serrée', index: 0 },
  { id: 'milieu', label: 'Mi-choqué', hint: 'voile à mi-chemin', index: 1 },
  { id: 'choque', label: 'Choqué', hint: 'voile relâchée', index: 2 },
];

export const ALLURES = [
  { id: 'pres', name: 'Bord de près', description: 'Au plus près du vent', idealTrim: 'borde' },
  { id: 'portant', name: 'Bord de portant', description: 'Vent de travers arrière', idealTrim: 'milieu' },
  { id: 'vent-arriere', name: 'Vent arrière', description: 'Vent dans le dos', idealTrim: 'choque' },
];

const TRIM_INDEX = Object.fromEntries(TRIM_OPTIONS.map((t) => [t.id, t.index]));
const DIFF_BASE_MULTIPLIER = [1.15, 1.0, 0.8]; // diff 0 (optimal) / 1 (close) / 2 (wrong way round)

export function getAllure(allureId) {
  return ALLURES.find((a) => a.id === allureId);
}

export function trimDiff(allureId, trimId) {
  return Math.abs(TRIM_INDEX[trimId] - TRIM_INDEX[getAllure(allureId).idealTrim]);
}

// Stronger wind amplifies a leg's bonus/penalty (a trim mistake matters more
// in a blow than in light air); a stronger crew only softens the penalty
// side, since they can partly correct a player's misjudged trim mid-leg.
export function legSpeedMultiplier(allureId, trimId, windMultiplierNow, crewLevel) {
  const diff = trimDiff(allureId, trimId);
  const base = DIFF_BASE_MULTIPLIER[diff];
  const windIntensity = Math.min(1.5, Math.max(0.5, windMultiplierNow));
  let delta = (base - 1) * windIntensity;
  if (delta < 0) delta /= 1 + crewLevel * 0.04;
  return { multiplier: 1 + delta, diff };
}

export function raceTrimMultiplier(trimsByAllure, windMultiplierNow, crewLevel) {
  const legs = ALLURES.map((allure) => {
    const trimId = trimsByAllure[allure.id];
    const { multiplier, diff } = legSpeedMultiplier(allure.id, trimId, windMultiplierNow, crewLevel);
    return { allureId: allure.id, trimId, multiplier, diff };
  });
  const overall = legs.reduce((sum, leg) => sum + leg.multiplier, 0) / legs.length;
  return { overall, legs };
}
