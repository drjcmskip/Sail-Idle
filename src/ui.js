import { formatNumber } from './format.js';
import * as Game from './game.js';

const els = {
  gold: document.getElementById('gold'),
  reputation: document.getElementById('reputation'),
  distance: document.getElementById('distance'),
  speed: document.getElementById('speed'),
  windArrow: document.getElementById('wind-arrow'),
  windSpeed: document.getElementById('wind-speed'),
  boat: document.getElementById('boat'),
  boostHint: document.getElementById('boost-hint'),

  sailLevel: document.getElementById('sail-level'),
  sailCost: document.getElementById('sail-cost'),
  buySail: document.getElementById('buy-sail'),

  hullLevel: document.getElementById('hull-level'),
  hullCost: document.getElementById('hull-cost'),
  buyHull: document.getElementById('buy-hull'),

  crewLevel: document.getElementById('crew-level'),
  crewCost: document.getElementById('crew-cost'),
  buyCrew: document.getElementById('buy-crew'),

  prestigeBtn: document.getElementById('prestige-btn'),
  prestigeGain: document.getElementById('prestige-gain'),

  toast: document.getElementById('toast'),
};

let toastTimer = null;

export function showToast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  els.toast.classList.add('toast-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.classList.remove('toast-visible');
    els.toast.hidden = true;
  }, 3500);
}

export function render(state, now) {
  els.gold.textContent = formatNumber(state.gold);
  els.reputation.textContent = formatNumber(state.reputation);
  els.distance.textContent = formatNumber(state.distance);
  els.speed.textContent = Game.currentSpeedKn(state, now).toFixed(1);

  const wind = Game.windMultiplier(now);
  els.windSpeed.textContent = `${(wind * 10).toFixed(0)} kn`;
  els.windArrow.style.transform = `rotate(${(wind - 1) * 60}deg)`;

  const boosted = now < state.boostUntil;
  els.boat.classList.toggle('boosted', boosted);
  const onCooldown = now < state.boostReadyAt && !boosted;
  els.boostHint.textContent = boosted
    ? 'Coup de vent !'
    : onCooldown
    ? 'Le vent se prépare…'
    : 'Touchez le bateau pour un coup de vent';
  els.boostHint.classList.toggle('boost-ready', !boosted && !onCooldown);

  const sailCost = Game.sailCost(state.sailLevel);
  els.sailLevel.textContent = state.sailLevel;
  els.sailCost.textContent = formatNumber(sailCost);
  els.buySail.disabled = state.gold < sailCost;

  const hullCost = Game.hullCost(state.hullLevel);
  els.hullLevel.textContent = state.hullLevel;
  els.hullCost.textContent = formatNumber(hullCost);
  els.buyHull.disabled = state.gold < hullCost;

  const crewCost = Game.crewCost(state.crewLevel);
  els.crewLevel.textContent = state.crewLevel;
  els.crewCost.textContent = formatNumber(crewCost);
  els.buyCrew.disabled = state.gold < crewCost;

  const eligible = Game.canPrestige(state);
  els.prestigeBtn.hidden = !eligible;
  if (eligible) {
    els.prestigeGain.textContent = `+${Game.reputationGain(state)}`;
  }
}

export function bindActions(handlers) {
  els.buySail.addEventListener('click', handlers.onBuySail);
  els.buyHull.addEventListener('click', handlers.onBuyHull);
  els.buyCrew.addEventListener('click', handlers.onBuyCrew);
  els.prestigeBtn.addEventListener('click', handlers.onPrestige);
  document.getElementById('boat-tap-target').addEventListener('click', handlers.onBoatTap);
}
