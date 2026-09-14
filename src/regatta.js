import { currentSpeedKn, goldMultiplier, windMultiplier, GOLD_PER_NM } from './game.js';
import { raceTrimMultiplier } from './sailing.js';

export const REGATTA_COOLDOWN_MS = 90_000;
export const REGATTA_OPPONENT_COUNT = 5;
// Reward is framed as "N seconds of your current idle income", scaled by
// placement, so a quick regatta stays worth playing at any boat tier.
export const REGATTA_REWARD_SECONDS = 180;
export const REGATTA_MIN_ANIMATION_MS = 4000;

const AI_NAMES = ['Neptune', 'Albatros', 'Sirène', 'Trident', 'Mistral', 'Zéphyr', 'Corsaire', 'Kraken'];
const PLACEMENT_GOLD_MULTIPLIER = [3.0, 2.0, 1.5, 1.0, 0.8, 0.6];
const PLACEMENT_GEMS = [2, 1, 0, 0, 0, 0];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export function canStartRegatta(state, now) {
  return now >= (state.regattaCooldownUntil ?? 0);
}

export function regattaCooldownRemainingMs(state, now) {
  return Math.max(0, (state.regattaCooldownUntil ?? 0) - now);
}

// Resolves the whole race immediately (gold/gems credited, cooldown started)
// and returns everything the UI needs to *animate* the reveal afterwards —
// the animation is purely presentational, not a source of truth.
//
// `trimsByAllure` is the player's sail trim choice for each leg of the
// triangle course (see sailing.js), picked before the race starts. It only
// affects the player's own speed relative to their untrimmed baseline — AI
// opponents' own trim skill is already folded into their ±30% variance —
// so good trim is a genuine, skill-based edge rather than free bonus gold.
export function startRegatta(state, now, trimsByAllure) {
  if (!canStartRegatta(state, now)) return null;

  const baseSpeed = currentSpeedKn(state, now);
  const crewLevel = state.boatUpgrades[state.activeBoatId]?.crewLevel ?? 0;
  const trimResult = raceTrimMultiplier(trimsByAllure, windMultiplier(now), crewLevel);
  const playerSpeed = baseSpeed * trimResult.overall;

  const racers = [{ id: 'player', name: 'Vous', speed: playerSpeed }];
  for (let i = 0; i < REGATTA_OPPONENT_COUNT; i++) {
    racers.push({ id: `ai-${i}`, name: AI_NAMES[i % AI_NAMES.length], speed: baseSpeed * randomBetween(0.7, 1.3) });
  }
  racers.sort((a, b) => b.speed - a.speed);

  const rank = racers.findIndex((r) => r.id === 'player') + 1;
  const placementIndex = Math.min(rank - 1, PLACEMENT_GOLD_MULTIPLIER.length - 1);

  const goldPerSecond = baseSpeed * GOLD_PER_NM * goldMultiplier(state);
  const goldReward = Math.max(1, Math.round(goldPerSecond * REGATTA_REWARD_SECONDS * PLACEMENT_GOLD_MULTIPLIER[placementIndex]));
  const gemsReward = PLACEMENT_GEMS[placementIndex];

  state.gold += goldReward;
  state.gems += gemsReward;
  state.regattaCooldownUntil = now + REGATTA_COOLDOWN_MS;

  const fastestSpeed = racers[0].speed;
  const racersWithTiming = racers.map((r) => ({
    ...r,
    animationMs: Math.round(REGATTA_MIN_ANIMATION_MS * (fastestSpeed / r.speed)),
  }));

  return { racers: racersWithTiming, rank, totalRacers: racers.length, goldReward, gemsReward, trimLegs: trimResult.legs };
}
