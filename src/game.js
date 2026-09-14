export const BASE_SPEED_KN = 3;
export const SAIL_SPEED_PER_LEVEL = 0.6;
export const CREW_SPEED_PER_LEVEL = 0.3;

export const GOLD_PER_NM = 2;
export const HULL_GOLD_BONUS = 0.02;
export const CREW_GOLD_BONUS = 0.01;
export const REPUTATION_GOLD_BONUS = 0.02;

export const BOOST_MULTIPLIER = 1.5;
export const BOOST_DURATION_MS = 10_000;
export const BOOST_COOLDOWN_MS = 5_000;

// 1 real second = 1 sailing hour, so real nautical speeds (a few knots)
// still translate into a satisfying idle pace instead of hours per upgrade.
export const HOURS_PER_REAL_SECOND = 1;

export const PRESTIGE_THRESHOLD_NM = 2000;
export const OFFLINE_CAP_MS = 8 * 60 * 60 * 1000;

export function sailCost(level) {
  return Math.floor(50 * Math.pow(1.15, level - 1));
}

export function hullCost(level) {
  return Math.floor(40 * Math.pow(1.18, level - 1));
}

export function crewCost(level) {
  return Math.floor(80 * Math.pow(1.2, level));
}

// Smooth pseudo-random wind: two overlapping sine waves so it drifts
// instead of oscillating on a single obvious period.
export function windMultiplier(now) {
  return 1 + 0.3 * Math.sin(now / 15000) + 0.15 * Math.sin(now / 4700 + 1.3);
}

export function currentSpeedKn(state, now) {
  let speed = BASE_SPEED_KN + state.sailLevel * SAIL_SPEED_PER_LEVEL + state.crewLevel * CREW_SPEED_PER_LEVEL;
  speed *= windMultiplier(now);
  if (now < state.boostUntil) speed *= BOOST_MULTIPLIER;
  return Math.max(0.5, speed);
}

export function goldMultiplier(state) {
  return (
    (1 + state.hullLevel * HULL_GOLD_BONUS) *
    (1 + state.crewLevel * CREW_GOLD_BONUS) *
    (1 + state.reputation * REPUTATION_GOLD_BONUS)
  );
}

export function applyElapsed(state, dtMs, atTime) {
  const dtHours = (dtMs / 1000) * HOURS_PER_REAL_SECOND;
  const speed = currentSpeedKn(state, atTime);
  const nm = speed * dtHours;
  state.distance += nm;
  state.totalDistance += nm;
  state.gold += nm * GOLD_PER_NM * goldMultiplier(state);
}

export function tick(state, now) {
  const dtMs = Math.min(now - state.lastTick, 1000);
  if (dtMs > 0) applyElapsed(state, dtMs, now);
  state.lastTick = now;
}

// Approximates offline progress with the wind multiplier at the midpoint
// of the absence, since we can't replay the actual wind curve tick by tick.
export function applyOfflineProgress(state) {
  const now = Date.now();
  const elapsedMs = Math.min(now - state.lastTick, OFFLINE_CAP_MS);
  if (elapsedMs > 2000) {
    applyElapsed(state, elapsedMs, state.lastTick + elapsedMs / 2);
  }
  state.lastTick = now;
  return elapsedMs;
}

export function canPrestige(state) {
  return state.distance >= PRESTIGE_THRESHOLD_NM;
}

export function reputationGain(state) {
  return Math.max(1, Math.floor(Math.sqrt(state.distance / 50)));
}

export function buySail(state) {
  const cost = sailCost(state.sailLevel);
  if (state.gold < cost) return false;
  state.gold -= cost;
  state.sailLevel += 1;
  return true;
}

export function buyHull(state) {
  const cost = hullCost(state.hullLevel);
  if (state.gold < cost) return false;
  state.gold -= cost;
  state.hullLevel += 1;
  return true;
}

export function buyCrew(state) {
  const cost = crewCost(state.crewLevel);
  if (state.gold < cost) return false;
  state.gold -= cost;
  state.crewLevel += 1;
  return true;
}

export function startBoost(state, now) {
  if (now < state.boostReadyAt) return false;
  state.boostUntil = now + BOOST_DURATION_MS;
  state.boostReadyAt = now + BOOST_DURATION_MS + BOOST_COOLDOWN_MS;
  return true;
}

export function prestige(state) {
  if (!canPrestige(state)) return 0;
  const gain = reputationGain(state);
  state.reputation += gain;
  state.gold = 0;
  state.distance = 0;
  state.sailLevel = 1;
  state.hullLevel = 1;
  state.crewLevel = 0;
  return gain;
}
