import { loadState, saveState } from './state.js';
import * as Game from './game.js';
import * as UI from './ui.js';
import { formatDuration } from './format.js';
import { GEM_PACKS } from './shop.js';
import { STRIPE_PAYMENT_LINKS } from './stripe-config.js';
import * as Regatta from './regatta.js';

const state = loadState();

if (!state.playerId) {
  state.playerId = crypto.randomUUID ? crypto.randomUUID() : `p_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

const offlineMs = Game.applyOfflineProgress(state);
if (offlineMs > 60_000) {
  UI.showToast(`Bienvenue à bord ! Votre équipage a navigué ${formatDuration(offlineMs)} en votre absence.`);
}

// Handles the redirect back from a Stripe Payment Link (?gem_pack=...&session_id=...).
// See src/stripe-config.js for why this trusts the URL rather than verifying
// the payment server-side.
function handleStripeReturn() {
  const params = new URLSearchParams(window.location.search);
  const packId = params.get('gem_pack');
  const sessionId = params.get('session_id');
  if (!packId || !sessionId) return;

  history.replaceState({}, '', window.location.pathname);

  if (state.claimedStripeSessions.includes(sessionId)) return;
  const pack = GEM_PACKS.find((p) => p.id === packId);
  if (!pack) return;

  state.gems += pack.gems;
  state.claimedStripeSessions.push(sessionId);
  saveState(state);
  UI.showToast(`Merci pour votre achat ! +${pack.gems} gemmes.`);
}
handleStripeReturn();

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
  onBuyGemPack: (packId) => {
    const link = STRIPE_PAYMENT_LINKS[packId];
    if (!link) {
      UI.showToast("Paiement non configuré pour l'instant — revenez bientôt !");
      return;
    }
    const url = new URL(link);
    url.searchParams.set('client_reference_id', state.playerId);
    saveState(state);
    window.location.href = url.toString();
  },
  onStartRegatta: (trims) => {
    const result = Regatta.startRegatta(state, Date.now(), trims);
    if (!result) return;
    saveState(state);
    UI.playRegatta(result);
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
