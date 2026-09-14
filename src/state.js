// v2: boats are owned individually with per-boat upgrades instead of one
// global sail/hull/crew triplet, so old v1 saves are intentionally dropped.
const SAVE_KEY = 'sail-idle-save-v2';

export function createDefaultState() {
  return {
    gold: 0,
    gems: 0,
    distance: 0,
    totalDistance: 0,
    reputation: 0,
    ownedBoats: ['optimist'],
    activeBoatId: 'optimist',
    boatUpgrades: {
      optimist: { sailLevel: 1, electronicsLevel: 1, crewLevel: 0 },
    },
    boostUntil: 0,
    boostReadyAt: 0,
    lastTick: Date.now(),
    playerId: null,
    claimedStripeSessions: [],
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createDefaultState();
    return { ...createDefaultState(), ...JSON.parse(raw) };
  } catch {
    return createDefaultState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable (private mode, quota) — progress just won't persist
  }
}
