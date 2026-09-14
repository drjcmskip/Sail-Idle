import { formatNumber } from './format.js';
import * as Game from './game.js';
import { BOAT_CLASSES, getBoat, getBoatsByClass, isClassUnlocked } from './boats.js';
import { GEM_PACKS } from './shop.js';
import { STRIPE_PAYMENT_LINKS } from './stripe-config.js';
import * as Regatta from './regatta.js';
import { ALLURES, TRIM_OPTIONS } from './sailing.js';

const els = {
  gold: document.getElementById('gold'),
  gems: document.getElementById('gems'),
  reputation: document.getElementById('reputation'),
  distance: document.getElementById('distance'),
  distanceGoal: document.getElementById('distance-goal'),
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
    regatta: document.getElementById('view-regatta'),
    shop: document.getElementById('view-shop'),
  },
  tabButtons: Array.from(document.querySelectorAll('.tab-btn')),
  garageList: document.getElementById('garage-list'),
  shopList: document.getElementById('shop-list'),

  regattaIntro: document.getElementById('regatta-intro'),
  regattaStartBtn: document.getElementById('regatta-start-btn'),
  regattaCooldown: document.getElementById('regatta-cooldown'),
  regattaTrimSetup: document.getElementById('regatta-trim-setup'),
  regattaWindInfo: document.getElementById('regatta-wind-info'),
  regattaLegs: document.getElementById('regatta-legs'),
  regattaGoBtn: document.getElementById('regatta-go-btn'),
  regattaRace: document.getElementById('regatta-race'),
  regattaResults: document.getElementById('regatta-results'),
};

let toastTimer = null;
let currentView = 'sea';
let lastGarageRender = 0;
let boatActionHandlers = null;
let currentState = null;
let regattaPhase = 'idle';
let regattaResultsTimer = null;
let selectedTrims = {};

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
  if (view === 'regatta' && regattaPhase === 'idle') renderRegattaIdle(currentState, Date.now());
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
    const configured = Boolean(STRIPE_PAYMENT_LINKS[pack.id]);
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <div class="shop-card-gems">💎 ${formatNumber(pack.gems)}</div>
      ${pack.bonusLabel ? `<div class="shop-card-bonus">${pack.bonusLabel}</div>` : ''}
      <button class="shop-card-btn" data-pack="${pack.id}" ${configured ? '' : 'disabled'}>${configured ? 'Acheter' : 'Bientôt disponible'}</button>
      <div class="shop-card-price">${pack.priceLabel}</div>
    `;
    els.shopList.appendChild(card);
  }
  els.shopList.querySelectorAll('.shop-card-btn').forEach((btn) => {
    btn.addEventListener('click', () => onBuyGemPack(btn.dataset.pack));
  });
}

function renderRegattaIdle(state, now) {
  if (!state) return;
  const canStart = Regatta.canStartRegatta(state, now);
  els.regattaStartBtn.disabled = !canStart;
  if (canStart) {
    els.regattaCooldown.hidden = true;
  } else {
    const remaining = Math.ceil(Regatta.regattaCooldownRemainingMs(state, now) / 1000);
    els.regattaCooldown.hidden = false;
    els.regattaCooldown.textContent = `Prochaine régate dans ${remaining}s`;
  }
}

function buildTrimLegs() {
  els.regattaLegs.innerHTML = ALLURES.map(
    (allure) => `
      <div class="regatta-leg">
        <div class="regatta-leg-header">
          <span class="regatta-leg-name">${allure.name}</span>
          <span class="regatta-leg-desc">${allure.description}</span>
        </div>
        <div class="regatta-trim-options">
          ${TRIM_OPTIONS.map(
            (trim) => `
              <button
                class="regatta-trim-btn ${selectedTrims[allure.id] === trim.id ? 'is-selected' : ''}"
                data-allure="${allure.id}" data-trim="${trim.id}"
              >${trim.label}</button>
            `
          ).join('')}
        </div>
      </div>
    `
  ).join('');

  els.regattaLegs.querySelectorAll('.regatta-trim-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedTrims[btn.dataset.allure] = btn.dataset.trim;
      buildTrimLegs();
    });
  });
}

function openTrimSetup(state, now) {
  regattaPhase = 'trim-setup';
  selectedTrims = Object.fromEntries(ALLURES.map((a) => [a.id, 'milieu']));
  els.regattaIntro.hidden = true;
  els.regattaTrimSetup.hidden = false;

  const wind = Game.windMultiplier(now);
  els.regattaWindInfo.textContent = `Vent actuel : ${(wind * 10).toFixed(0)} kn`;
  buildTrimLegs();
}

export function playRegatta(result) {
  regattaPhase = 'racing';
  els.regattaTrimSetup.hidden = true;
  els.regattaResults.hidden = true;
  els.regattaRace.hidden = false;
  els.regattaRace.innerHTML = '';

  const markers = result.racers.map((racer) => {
    const lane = document.createElement('div');
    lane.className = 'regatta-lane' + (racer.id === 'player' ? ' regatta-lane-player' : '');
    lane.innerHTML = `
      <div class="regatta-lane-name">${racer.name}</div>
      <div class="regatta-track"><span class="regatta-marker">⛵</span></div>
    `;
    els.regattaRace.appendChild(lane);
    return lane.querySelector('.regatta-marker');
  });

  // Two rAFs so the browser paints the marker at left:0 first, then the
  // transition to the target position actually animates instead of jumping.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      result.racers.forEach((racer, i) => {
        markers[i].style.transition = `left ${racer.animationMs}ms linear`;
        markers[i].style.left = '90%';
      });
    });
  });

  const maxDuration = Math.max(...result.racers.map((r) => r.animationMs));
  clearTimeout(regattaResultsTimer);
  regattaResultsTimer = setTimeout(() => showRegattaResults(result), maxDuration + 300);
}

function showRegattaResults(result) {
  regattaPhase = 'results';
  els.regattaRace.hidden = true;
  els.regattaResults.hidden = false;

  const standings = result.racers
    .map(
      (racer, i) => `
      <div class="regatta-standing-row ${racer.id === 'player' ? 'regatta-standing-player' : ''}">
        <span class="regatta-standing-rank">${i + 1}</span>
        <span class="regatta-standing-name">${racer.name}</span>
      </div>
    `
    )
    .join('');

  const TRIM_FEEDBACK = ['✅ Optimal', '➖ Correct', '❌ À revoir'];
  const trimFeedback = result.trimLegs
    .map((leg) => {
      const allure = ALLURES.find((a) => a.id === leg.allureId);
      return `
        <div class="regatta-trim-feedback-row">
          <span>${allure.name}</span>
          <span>${TRIM_FEEDBACK[leg.diff]}</span>
        </div>
      `;
    })
    .join('');

  els.regattaResults.innerHTML = `
    <div class="regatta-result-headline">${result.rank === 1 ? '🏆 Victoire !' : `${result.rank}e place sur ${result.totalRacers}`}</div>
    <div class="regatta-standings">${standings}</div>
    <div class="regatta-trim-feedback">${trimFeedback}</div>
    <div class="regatta-reward">+${formatNumber(result.goldReward)} or${result.gemsReward ? ` · +${result.gemsReward} 💎` : ''}</div>
    <button class="regatta-start-btn" id="regatta-again-btn">Retour</button>
  `;

  document.getElementById('regatta-again-btn').addEventListener('click', () => {
    regattaPhase = 'idle';
    els.regattaResults.hidden = true;
    els.regattaIntro.hidden = false;
    renderRegattaIdle(currentState, Date.now());
  });
}

export function render(state, now) {
  currentState = state;

  els.gold.textContent = formatNumber(state.gold);
  els.gems.textContent = formatNumber(state.gems);
  els.reputation.textContent = formatNumber(state.reputation);
  els.distance.textContent = formatNumber(state.distance);
  els.distanceGoal.textContent = formatNumber(Game.prestigeThreshold(state));
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
  if (currentView === 'regatta' && regattaPhase === 'idle') renderRegattaIdle(state, now);
}

export function bindActions(handlers) {
  els.buySail.addEventListener('click', handlers.onBuySail);
  els.buyElectronics.addEventListener('click', handlers.onBuyElectronics);
  els.buyCrew.addEventListener('click', handlers.onBuyCrew);
  els.prestigeBtn.addEventListener('click', handlers.onPrestige);
  document.getElementById('boat-tap-target').addEventListener('click', handlers.onBoatTap);
  els.regattaStartBtn.addEventListener('click', () => openTrimSetup(currentState, Date.now()));
  els.regattaGoBtn.addEventListener('click', () => handlers.onStartRegatta(selectedTrims));

  boatActionHandlers = { onBuyBoat: handlers.onBuyBoat, onSelectBoat: handlers.onSelectBoat };

  for (const btn of els.tabButtons) {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  }

  renderShopOnce(handlers.onBuyGemPack);
}
