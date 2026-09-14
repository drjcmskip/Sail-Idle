import { loadState, saveState } from './state.js';
import * as Game from './game.js';
import * as UI from './ui.js';
import { formatDuration } from './format.js';

const state = loadState();

const offlineMs = Game.applyOfflineProgress(state);
if (offlineMs > 60_000) {
  UI.showToast(`Bienvenue à bord ! Votre équipage a navigué ${formatDuration(offlineMs)} en votre absence.`);
}

UI.bindActions({
  onBuySail: () => Game.buySail(state) && saveState(state),
  onBuyHull: () => Game.buyHull(state) && saveState(state),
  onBuyCrew: () => Game.buyCrew(state) && saveState(state),
  onBoatTap: () => {
    if (Game.startBoost(state, Date.now())) saveState(state);
  },
  onPrestige: () => {
    const gain = Game.prestige(state);
    if (gain > 0) {
      UI.showToast(`Nouvelle saison ! +${gain} réputation.`);
      saveState(state);
    }
  },
});

function loop() {
  const now = Date.now();
  Game.tick(state, now);
  UI.render(state, now);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

setInterval(() => saveState(state), 5000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveState(state);
});
window.addEventListener('beforeunload', () => saveState(state));
