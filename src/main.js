import { loadState, saveState } from './state.js';
import * as Game from './game.js';
import * as UI from './ui.js';
import { formatDuration } from './format.js';

const state = loadState();

const offlineMs = Game.applyOfflineProgress(state);
if (offlineMs > 60_000) {
  UI.showToast(`Bienvenue à bord ! Votre équipage a navigué ${formatDuration(offlineMs)} en votre absence.`);
}

const BUY_BOAT_FAILURE_MESSAGES = {
  locked: 'Cette classe de bateaux est encore verrouillée.',
  funds: "Fonds insuffisants pour ce bateau.",
  owned: 'Vous possédez déjà ce bateau.',
  unknown: 'Bateau introuvable.',
};

UI.bindActions({
  onBuySail: () => Game.buySailUpgrade(state) && saveState(state),
  onBuyElectronics: () => Game.buyElectronicsUpgrade(state) && saveState(state),
  onBuyCrew: () => Game.buyCrewUpgrade(state) && saveState(state),
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
  onBuyBoat: (boatId) => {
    const result = Game.buyBoat(state, boatId);
    if (result.ok) {
      saveState(state);
    } else {
      UI.showToast(BUY_BOAT_FAILURE_MESSAGES[result.reason] ?? 'Achat impossible.');
    }
  },
  onSelectBoat: (boatId) => {
    if (Game.selectBoat(state, boatId)) saveState(state);
  },
  onBuyGemPack: () => {
    UI.showToast("Paiement non configuré pour l'instant — revenez bientôt !");
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
