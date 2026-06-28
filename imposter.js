const IMPOSTER_WORDS = {
  alltag: [
    'Zahnbürste','Kühlschrank','Wecker','Einkaufstasche','Schlüssel',
    'Kaffeetasse','Haustür','Briefkasten','Regenschirm','Lichtschalter',
    'Handtuch','Spülmaschine','Mülleimer','Fernbedienung','Kopfkissen',
    'Geldbörse','Fahrradhelm','Joghurt','Waschmaschine','Hausschuhe',
    'Klopapier','Balkon','Parkplatz','Supermarkt','Bushaltestelle',
    'Rezept','Trinkflasche','Lunchbox','Terminkalender','Handy'
  ]
};

let state = {
  players: 4,
  names: [],
  gameMins: 3,
  category: 'alltag',
  word: '',
  imposterIndex: -1,
  currentDealing: 0,
  timerInterval: null,
  timerSeconds: 0,
  totalSeconds: 0
};

// ── SETUP ────────────────────────────────────────────────
function renderNameInputs() {
  const container = document.getElementById('name-inputs');
  container.innerHTML = '';
  for (let i = 0; i < state.players; i++) {
    const row = document.createElement('div');
    row.className = 'name-row';
    row.innerHTML = `
      <label>Spieler ${i + 1}</label>
      <input type="text" id="name-${i}" placeholder="Name eingeben" maxlength="20" />`;
    container.appendChild(row);
  }
  // restore saved names
  state.names.forEach((n, i) => {
    const el = document.getElementById('name-' + i);
    if (el) el.value = n;
  });
}

function changeCount(delta) {
  state.players = Math.max(3, Math.min(12, state.players + delta));
  document.getElementById('player-count').textContent = state.players;
  renderNameInputs();
}

function changeTime(delta) {
  state.gameMins = Math.max(1, Math.min(15, state.gameMins + delta));
  document.getElementById('game-time').textContent = state.gameMins;
}

// ── START ────────────────────────────────────────────────
function startImposter() {
  // collect names
  state.names = [];
  for (let i = 0; i < state.players; i++) {
    const el = document.getElementById('name-' + i);
    state.names.push(el && el.value.trim() ? el.value.trim() : 'Spieler ' + (i + 1));
  }

  const cat = document.getElementById('category-select').value;
  const words = IMPOSTER_WORDS[cat];
  state.category = cat;
  state.word = words[Math.floor(Math.random() * words.length)];
  state.imposterIndex = Math.floor(Math.random() * state.players);
  state.currentDealing = 0;

  show('imposter-deal');
  hide('imposter-setup');
  hide('imposter-play');
  hide('imposter-reveal');
  showDealWaiting();
}

// ── DEAL ─────────────────────────────────────────────────
function showDealWaiting() {
  document.getElementById('deal-player-name').textContent =
    state.names[state.currentDealing];
  show('deal-waiting');
  hide('deal-card');
}

function showCard() {
  const i = state.currentDealing;
  const isImposter = i === state.imposterIndex;
  const card = document.getElementById('player-card');
  const roleEl = document.getElementById('card-role');
  const wordEl = document.getElementById('card-word');
  const catEl  = document.getElementById('card-cat');

  if (isImposter) {
    card.className = 'card imposter-card';
    roleEl.textContent = '🕵️ Du bist der Imposter!';
    wordEl.textContent = '???';
    catEl.textContent  = 'Kategorie: ' + state.category;
  } else {
    card.className = 'card';
    roleEl.textContent = '✅ Kein Imposter';
    wordEl.textContent = state.word;
    catEl.textContent  = 'Kategorie: ' + state.category;
  }

  hide('deal-waiting');
  show('deal-card');
}

function nextPlayer() {
  state.currentDealing++;
  if (state.currentDealing >= state.players) {
    startPlayPhase();
  } else {
    showDealWaiting();
  }
}

// ── PLAY ─────────────────────────────────────────────────
function startPlayPhase() {
  hide('imposter-deal');
  show('imposter-play');

  state.totalSeconds  = state.gameMins * 60;
  state.timerSeconds  = state.totalSeconds;
  updateTimerDisplay();

  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    updateTimerDisplay();
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      revealImposter();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const s = state.timerSeconds;
  const mins = String(Math.floor(s / 60)).padStart(2, '0');
  const secs = String(s % 60).padStart(2, '0');
  document.getElementById('timer-text').textContent = mins + ':' + secs;

  const circ = 2 * Math.PI * 54; // 339.3
  const fraction = Math.max(0, s / state.totalSeconds);
  document.getElementById('timer-ring').style.strokeDashoffset =
    circ * (1 - fraction);

  const ring = document.getElementById('timer-ring');
  if (s <= 30) ring.classList.add('urgent');
  else ring.classList.remove('urgent');
}

// ── REVEAL ───────────────────────────────────────────────
function revealImposter() {
  clearInterval(state.timerInterval);
  hide('imposter-play');
  show('imposter-reveal');

  document.getElementById('reveal-word').textContent = state.word;
  document.getElementById('reveal-imposter').textContent =
    '🕵️ ' + state.names[state.imposterIndex];

  const list = document.getElementById('reveal-players-list');
  list.innerHTML = '';
  state.names.forEach((name, i) => {
    const row = document.createElement('div');
    const isImp = i === state.imposterIndex;
    row.className = 'player-row' + (isImp ? ' is-imposter' : '');
    row.innerHTML = `
      <span class="player-name">${name}</span>
      <span class="player-tag ${isImp ? 'imposter-tag' : ''}">
        ${isImp ? '🕵️ Imposter' : '✅ Unschuldig'}
      </span>`;
    list.appendChild(row);
  });
}

// ── RESET ────────────────────────────────────────────────
function resetImposter() {
  clearInterval(state.timerInterval);
  hide('imposter-deal');
  hide('imposter-play');
  hide('imposter-reveal');
  show('imposter-setup');
  renderNameInputs();
}

// ── HELPERS ──────────────────────────────────────────────
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

// init name inputs on load
document.addEventListener('DOMContentLoaded', renderNameInputs);
