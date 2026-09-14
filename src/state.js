const SAVE_KEY = 'sail-idle-save-v1';

export function createDefaultState() {
  return {
    gold: 0,
    distance: 0,
    totalDistance: 0,
    reputation: 0,
    sailLevel: 1,
    hullLevel: 1,
    crewLevel: 0,
    boostUntil: 0,
    boostReadyAt: 0,
    lastTick: Date.now(),
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
