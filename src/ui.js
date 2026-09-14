import { formatNumber } from './format.js';
import * as Game from './game.js';
import { BOAT_CLASSES, getBoat, getBoatsByClass, isClassUnlocked } from './boats.js';
import { GEM_PACKS } from './shop.js';

const els = {
  gold: document.getElementById('gold'),
  gems: document.getElementById('gems'),
  reputation: document.getElementById('reputation'),
  distance: document.getElementById('distance'),
  speed: document.getElementById('speed'),
  windArrow: document.getElementById('wind-arrow'),
  windSpeed: document.getElementById('wind-speed'),
  boat: document.getElementById('boat'),
  boostHint: document.getElementById('boost-hint'),
  activeBoatName: document.getElementById('active-boat-name'),

  sailLevel: document.getElementById('sail-level'),
  sailCost: document.getElementById('sail-cost'),
  buySail: document.getElementById('buy-sail'),

  electronicsLevel: document.getElementById('electronics-level'),
  electronicsCost: document.getElementById('electronics-cost'),
  buyElectronics: document.getElementById('buy-electronics'),

  crewLevel: document.getElementById('crew-level'),
  crewCost: document.getElementById('crew-cost'),
  buyCrew: document.getElementById('buy-crew'),

  prestigeBtn: document.getElementById('prestige-btn'),
  prestigeGain: document.getElementById('prestige-gain'),

  toast: document.getElementById('toast'),

  views: {
    sea: document.getElementById('view-sea'),
    garage: document.getElementById('view-garage'),
    shop: document.getElementById('view-shop'),
  },
  tabButtons: Array.from(document.querySelectorAll('.tab-btn')),
  garageList: document.getElementById('garage-list'),
  shopList: document.getElementById('shop-list'),
};

let toastTimer = null;
let currentView = 'sea';
let lastGarageRender = 0;
let boatActionHandlers = null;
let currentState = null;

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

export function switchView(view) {
  currentView = view;
  for (const [name, el] of Object.entries(els.views)) {
    el.hidden = name !== view;
  }
  for (const btn of els.tabButtons) {
    btn.classList.toggle('is-active', btn.dataset.view === view);
  }
  if (view === 'garage') renderGarage(currentState, true);
}

function currencyIcon(currency) {
  return currency === 'gems' ? '💎' : '🪙';
}

function renderGarage(state, force = false) {
  if (!state) return;
  const now = Date.now();
  if (!force && now - lastGarageRender < 400) return;
  lastGarageRender = now;

  els.garageList.innerHTML = '';

  for (const boatClass of BOAT_CLASSES) {
    const unlocked = isClassUnlocked(boatClass.id, state.reputation);

    const section = document.createElement('section');
    section.className = 'boat-class';

    const header = document.createElement('div');
    header.className = 'boat-class-header';
    header.innerHTML = `
      <div class="boat-class-name">${boatClass.name}</div>
      <div class="boat-class-desc">${boatClass.description}</div>
      ${unlocked ? '' : `<div class="boat-class-lock">🔒 Débloqué à ${boatClass.unlockReputation} réputation</div>`}
    `;
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'boat-grid';

    for (const boat of getBoatsByClass(boatClass.id)) {
      const owned = state.ownedBoats.includes(boat.id);
      const active = state.activeBoatId === boat.id;
      const balance = boat.currency === 'gems' ? state.gems : state.gold;
      const affordable = balance >= boat.price;

      const card = document.createElement('div');
      card.className = 'boat-card';
      if (!unlocked) card.classList.add('boat-card-locked');
      if (active) card.classList.add('boat-card-active');

      let actionHtml;
      if (!unlocked) {
        actionHtml = `<div class="boat-card-locked-label">Verrouillé</div>`;
      } else if (active) {
        actionHtml = `<div class="boat-card-active-label">Bateau actif</div>`;
      } else if (owned) {
        actionHtml = `<button class="boat-card-btn boat-select-btn" data-boat="${boat.id}">Sélectionner</button>`;
      } else {
        actionHtml = `<button class="boat-card-btn boat-buy-btn" data-boat="${boat.id}" ${affordable ? '' : 'disabled'}>Acheter — ${currencyIcon(boat.currency)} ${formatNumber(boat.price)}</button>`;
      }

      card.innerHTML = `
        <div class="boat-card-name">${boat.name}</div>
        <div class="boat-card-stats">${boat.baseSpeed} kn de base</div>
        ${actionHtml}
      `;
      grid.appendChild(card);
    }

    section.appendChild(grid);
    els.garageList.appendChild(section);
  }

  if (boatActionHandlers) {
    els.garageList.querySelectorAll('.boat-buy-btn').forEach((btn) => {
      btn.addEventListener('click', () => boatActionHandlers.onBuyBoat(btn.dataset.boat));
    });
    els.garageList.querySelectorAll('.boat-select-btn').forEach((btn) => {
      btn.addEventListener('click', () => boatActionHandlers.onSelectBoat(btn.dataset.boat));
    });
  }
}

function renderShopOnce(onBuyGemPack) {
  els.shopList.innerHTML = '';
  for (const pack of GEM_PACKS) {
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <div class="shop-card-gems">💎 ${formatNumber(pack.gems)}</div>
      ${pack.bonusLabel ? `<div class="shop-card-bonus">${pack.bonusLabel}</div>` : ''}
      <button class="shop-card-btn" data-pack="${pack.id}" disabled>Bientôt disponible</button>
      <div class="shop-card-price">${pack.priceLabel}</div>
    `;
    els.shopList.appendChild(card);
  }
  els.shopList.querySelectorAll('.shop-card-btn').forEach((btn) => {
    btn.addEventListener('click', () => onBuyGemPack(btn.dataset.pack));
  });
}

export function render(state, now) {
  currentState = state;

  els.gold.textContent = formatNumber(state.gold);
  els.gems.textContent = formatNumber(state.gems);
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

  const activeBoat = getBoat(state.activeBoatId);
  const upgrades = state.boatUpgrades[state.activeBoatId];
  els.activeBoatName.textContent = activeBoat.name;

  const sailCost = Game.sailCost(activeBoat, upgrades.sailLevel);
  els.sailLevel.textContent = upgrades.sailLevel;
  els.sailCost.textContent = formatNumber(sailCost);
  els.buySail.disabled = state.gold < sailCost;

  const electronicsCost = Game.electronicsCost(activeBoat, upgrades.electronicsLevel);
  els.electronicsLevel.textContent = upgrades.electronicsLevel;
  els.electronicsCost.textContent = formatNumber(electronicsCost);
  els.buyElectronics.disabled = state.gold < electronicsCost;

  const crewCost = Game.crewCost(activeBoat, upgrades.crewLevel);
  els.crewLevel.textContent = upgrades.crewLevel;
  els.crewCost.textContent = formatNumber(crewCost);
  els.buyCrew.disabled = state.gold < crewCost;

  const eligible = Game.canPrestige(state);
  els.prestigeBtn.hidden = !eligible;
  if (eligible) {
    els.prestigeGain.textContent = `+${Game.reputationGain(state)}`;
  }

  if (currentView === 'garage') renderGarage(state);
}

export function bindActions(handlers) {
  els.buySail.addEventListener('click', handlers.onBuySail);
  els.buyElectronics.addEventListener('click', handlers.onBuyElectronics);
  els.buyCrew.addEventListener('click', handlers.onBuyCrew);
  els.prestigeBtn.addEventListener('click', handlers.onPrestige);
  document.getElementById('boat-tap-target').addEventListener('click', handlers.onBoatTap);

  boatActionHandlers = { onBuyBoat: handlers.onBuyBoat, onSelectBoat: handlers.onSelectBoat };

  for (const btn of els.tabButtons) {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  }

  renderShopOnce(handlers.onBuyGemPack);
}
