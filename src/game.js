import { getBoat, getClass, isClassUnlocked } from './boats.js';

export const SAIL_SPEED_PER_LEVEL = 0.6;
export const CREW_SPEED_PER_LEVEL = 0.3;

export const GOLD_PER_NM = 2;
export const ELECTRONICS_GOLD_BONUS = 0.02;
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

export function sailCost(boat, level) {
  return Math.floor(boat.upgradeBase * Math.pow(1.15, level - 1));
}

export function electronicsCost(boat, level) {
  return Math.floor(boat.upgradeBase * 1.1 * Math.pow(1.16, level - 1));
}

export function crewCost(boat, level) {
  return Math.floor(boat.upgradeBase * 1.6 * Math.pow(1.18, level));
}

// Smooth pseudo-random wind: two overlapping sine waves so it drifts
// instead of oscillating on a single obvious period.
export function windMultiplier(now) {
  return 1 + 0.3 * Math.sin(now / 15000) + 0.15 * Math.sin(now / 4700 + 1.3);
}

function activeBoatAndUpgrades(state) {
  const boat = getBoat(state.activeBoatId);
  const upgrades = state.boatUpgrades[state.activeBoatId];
  return { boat, upgrades };
}

export function currentSpeedKn(state, now) {
  const { boat, upgrades } = activeBoatAndUpgrades(state);
  let speed = boat.baseSpeed + upgrades.sailLevel * SAIL_SPEED_PER_LEVEL + upgrades.crewLevel * CREW_SPEED_PER_LEVEL;
  speed *= windMultiplier(now);
  if (now < state.boostUntil) speed *= BOOST_MULTIPLIER;
  return Math.max(0.5, speed);
}

export function goldMultiplier(state) {
  const { boat, upgrades } = activeBoatAndUpgrades(state);
  return (
    boat.goldMultiplier *
    (1 + upgrades.electronicsLevel * ELECTRONICS_GOLD_BONUS) *
    (1 + upgrades.crewLevel * CREW_GOLD_BONUS) *
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

export function buySailUpgrade(state) {
  const { boat, upgrades } = activeBoatAndUpgrades(state);
  const cost = sailCost(boat, upgrades.sailLevel);
  if (state.gold < cost) return false;
  state.gold -= cost;
  upgrades.sailLevel += 1;
  return true;
}

export function buyElectronicsUpgrade(state) {
  const { boat, upgrades } = activeBoatAndUpgrades(state);
  const cost = electronicsCost(boat, upgrades.electronicsLevel);
  if (state.gold < cost) return false;
  state.gold -= cost;
  upgrades.electronicsLevel += 1;
  return true;
}

export function buyCrewUpgrade(state) {
  const { boat, upgrades } = activeBoatAndUpgrades(state);
  const cost = crewCost(boat, upgrades.crewLevel);
  if (state.gold < cost) return false;
  state.gold -= cost;
  upgrades.crewLevel += 1;
  return true;
}

export function startBoost(state, now) {
  if (now < state.boostReadyAt) return false;
  state.boostUntil = now + BOOST_DURATION_MS;
  state.boostReadyAt = now + BOOST_DURATION_MS + BOOST_COOLDOWN_MS;
  return true;
}

// Boats and their upgrades are a permanent fleet investment: prestige only
// resets this season's currency/distance, not the boats you paid for.
export function prestige(state) {
  if (!canPrestige(state)) return 0;
  const gain = reputationGain(state);
  state.reputation += gain;
  state.gold = 0;
  state.distance = 0;
  return gain;
}

export function buyBoat(state, boatId) {
  const boat = getBoat(boatId);
  if (!boat) return { ok: false, reason: 'unknown' };
  if (state.ownedBoats.includes(boatId)) return { ok: false, reason: 'owned' };

  const boatClass = getClass(boat.classId);
  if (!isClassUnlocked(boatClass.id, state.reputation)) return { ok: false, reason: 'locked' };

  const balance = boat.currency === 'gems' ? state.gems : state.gold;
  if (balance < boat.price) return { ok: false, reason: 'funds' };

  if (boat.currency === 'gems') state.gems -= boat.price;
  else state.gold -= boat.price;

  state.ownedBoats.push(boatId);
  state.boatUpgrades[boatId] = { sailLevel: 1, electronicsLevel: 1, crewLevel: 0 };
  state.activeBoatId = boatId;
  return { ok: true };
}

export function selectBoat(state, boatId) {
  if (!state.ownedBoats.includes(boatId)) return false;
  state.activeBoatId = boatId;
  return true;
}
