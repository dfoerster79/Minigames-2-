const IMPOSTER_DATA = {
  alltag: [
    // Haushalt
    { word: 'Zahnbürste',    hint: 'Morgens und abends benutzt' },
    { word: 'Kühlschrank',    hint: 'Hält Sachen kalt' },
    { word: 'Wecker',          hint: 'Macht morgens Krach' },
    { word: 'Einkaufstasche',  hint: 'Trägt man zum Laden mit' },
    { word: 'Schlüssel',       hint: 'Ohne ihn kommt man nicht rein' },
    { word: 'Kaffeetasse',     hint: 'Ein heißes Getränk drin' },
    { word: 'Haustür',         hint: 'Der erste Eingang' },
    { word: 'Briefkasten',     hint: 'Post landet hier' },
    { word: 'Regenschirm',     hint: 'Schutz bei Regen' },
    { word: 'Lichtschalter',   hint: 'An der Wand, hell oder dunkel' },
    { word: 'Handtuch',        hint: 'Nach dem Duschen wichtig' },
    { word: 'Spülmaschine',    hint: 'Wäscht Geschirr automatisch' },
    { word: 'Mülleimer',       hint: 'Für alles was man wegwirft' },
    { word: 'Fernbedienung',   hint: 'Steuert den Fernseher' },
    { word: 'Kopfkissen',      hint: 'Liegt im Bett' },
    { word: 'Geldbörse',       hint: 'Geld und Karten drin' },
    { word: 'Fahrradhelm',     hint: 'Schutz für den Kopf' },
    { word: 'Joghurt',         hint: 'Milchprodukt aus dem Kühlregal' },
    { word: 'Waschmaschine',   hint: 'Wäscht Klamotten' },
    { word: 'Hausschuhe',      hint: 'Drinnen an den Füßen' },
    { word: 'Klopapier',       hint: 'Im Bad unverzichtbar' },
    { word: 'Balkon',          hint: 'Außen an der Wohnung' },
    { word: 'Parkplatz',       hint: 'Fürs Auto' },
    { word: 'Supermarkt',      hint: 'Einkaufen gehen' },
    { word: 'Bushaltestelle',  hint: 'Dort wartet man auf den Bus' },
    { word: 'Rezept',          hint: 'Anleitung zum Kochen oder vom Arzt' },
    { word: 'Trinkflasche',    hint: 'Wasser unterwegs' },
    { word: 'Lunchbox',        hint: 'Essen für die Arbeit' },
    { word: 'Terminkalender',  hint: 'Verpasst keine Verabredungen' },
    { word: 'Handy',           hint: 'Immer dabei, immer online' },
    // Essen & Trinken
    { word: 'Brotdose',        hint: 'Brot geht nicht kaputt darin' },
    { word: 'Kaffeemaschine',  hint: 'Braut das Morgengetränk' },
    { word: 'Toaster',         hint: 'Macht Brot knusprig' },
    { word: 'Mikrowelle',      hint: 'Wärmt Essen schnell auf' },
    { word: 'Schneidebrett',   hint: 'Zum Gemüse schneiden' },
    { word: 'Pfanne',          hint: 'Braten auf dem Herd' },
    { word: 'Kochtopf',        hint: 'Suppe oder Nudeln darin' },
    { word: 'Gewürze',         hint: 'Salz und Pfeffer sind dabei' },
    { word: 'Tiefkühlpizza',   hint: 'Schnelles Abendessen' },
    { word: 'Apfelsaft',       hint: 'Aus Obst gepresst' },
    // Mobilität
    { word: 'Fahrrad',         hint: 'Zwei Räder, kein Motor' },
    { word: 'Haltestelle',     hint: 'Bus oder Bahn wartet hier' },
    { word: 'Tankstelle',      hint: 'Hier wird das Auto befüllt' },
    { word: 'Bahnsteig',       hint: 'Dort fährt der Zug ein' },
    { word: 'Navi',            hint: 'Zeigt den Weg' },
    { word: 'Autoparkschein',  hint: 'Bezahlt fürs Parken' },
    { word: 'Koffer',          hint: 'Im Urlaub dabei' },
    { word: 'Rucksack',        hint: 'Auf dem Rücken getragen' },
    // Arbeit & Alltag
    { word: 'Laptop',          hint: 'Portabler Computer' },
    { word: 'Drucker',         hint: 'Macht Papier aus Daten' },
    { word: 'Stempel',         hint: 'Hässliche Spuren auf Papier' },
    { word: 'Kugelschreiber',  hint: 'Schreiben auf Papier' },
    { word: 'Haftnotiz',       hint: 'Kleiner gelber Zettel' },
    { word: 'Konferenzraum',   hint: 'Meeting findet hier statt' },
    { word: 'Feierabend',      hint: 'Das Schönste an der Arbeit' },
    { word: 'Krankenhaus',     hint: 'Ärzte und Schwestern arbeiten hier' },
    { word: 'Apotheke',        hint: 'Hier kauft man Medikamente' },
    { word: 'Post',            hint: 'Pakete und Briefe' },
    { word: 'Bank',            hint: 'Geld verwalten' },
    { word: 'Behörde',          hint: 'Formulare ausfüllen müssen' },
    // Wohnen
    { word: 'Sofa',            hint: 'Darauf sitzen oder liegen' },
    { word: 'Schreibtisch',    hint: 'Dort arbeitet man zu Hause' },
    { word: 'Regal',           hint: 'Bücher und Dinge drauf' },
    { word: 'Badewanne',       hint: 'Entspannen im Wasser' },
    { word: 'Dusche',          hint: 'Schneller als Baden' },
    { word: 'Spiegel',         hint: 'Zeigt das eigene Gesicht' },
    { word: 'Vorhang',         hint: 'Hängt am Fenster' },
    { word: 'Teppich',         hint: 'Liegt auf dem Boden' },
    { word: 'Blumentopf',      hint: 'Pflanze darin' },
    { word: 'Nachttisch',      hint: 'Neben dem Bett' },
    // Freizeit
    { word: 'Spielkarten',     hint: 'Für viele Spiele geeignet' },
    { word: 'Brettspiel',      hint: 'Gemeinsam am Tisch spielen' },
    { word: 'Kopfhörer',       hint: 'Musik für die Ohren' },
    { word: 'Fernseher',       hint: 'Großer Bildschirm im Wohnzimmer' },
    { word: 'Buch',            hint: 'Viele Seiten, eine Geschichte' },
    { word: 'Zeitschrift',     hint: 'Gedruckt, wöchentlich oder monatlich' },
    { word: 'Kino',            hint: 'Große Leinwand, Popcorn' },
    { word: 'Restaurant',      hint: 'Jemand kocht für dich' },
    { word: 'Café',            hint: 'Kaffee und Kuchen' },
    { word: 'Einkaufszentrum', hint: 'Viele Läden unter einem Dach' },
    // Natur & Wetter
    { word: 'Sonnencreme',     hint: 'Schutz vor der Sonne' },
    { word: 'Gummistiefel',    hint: 'Bei Regen und Matsch' },
    { word: 'Thermometer',     hint: 'Misst die Temperatur' },
    { word: 'Gartenmöbel',     hint: 'Draußen sitzen' },
    { word: 'Gartenschlauch',  hint: 'Pflanzen gießen draussen' },
    { word: 'Mülltrennung',    hint: 'Gelbe Tonne, Papiertonne...' },
    // Körper & Gesundheit
    { word: 'Arzttermin',      hint: 'Kalender eintragen nicht vergessen' },
    { word: 'Pflaster',        hint: 'Kleine Wunden abdecken' },
    { word: 'Tablette',        hint: 'Schlucken mit Wasser' },
    { word: 'Brille',          hint: 'Besser sehen damit' },
    { word: 'Sportschuhe',     hint: 'Fürs Training' },
    { word: 'Fitnessstudio',   hint: 'Muskeln trainieren' },
    { word: 'Spaziergang',     hint: 'Einfach draußen gehen' }
  ]
};

let state = {
  players: 4,
  names: [],
  gameMins: 3,
  category: 'alltag',
  word: '',
  hint: '',
  imposterIndex: -1,
  currentDealing: 0,
  timerInterval: null,
  timerSeconds: 0,
  totalSeconds: 0,
  hintEnabled: false
};

// ── SETUP ────────────────────────────────────
function renderNameInputs() {
  const container = document.getElementById('name-inputs');
  container.innerHTML = '';
  for (let i = 0; i < state.players; i++) {
    const row = document.createElement('div');
    row.className = 'name-row';
    row.innerHTML = `<label>Spieler ${i+1}</label>
      <input type="text" id="name-${i}" placeholder="Name eingeben" maxlength="20" />`;
    container.appendChild(row);
  }
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

// ── START ────────────────────────────────────
function startImposter() {
  state.names = [];
  for (let i = 0; i < state.players; i++) {
    const el = document.getElementById('name-' + i);
    state.names.push(el && el.value.trim() ? el.value.trim() : 'Spieler ' + (i+1));
  }
  state.hintEnabled = document.getElementById('hint-toggle').checked;

  const cat = document.getElementById('category-select').value;
  const entries = IMPOSTER_DATA[cat];
  const entry = entries[Math.floor(Math.random() * entries.length)];
  state.category = cat;
  state.word = entry.word;
  state.hint = entry.hint;
  state.imposterIndex = Math.floor(Math.random() * state.players);
  state.currentDealing = 0;

  show('imposter-deal');
  hide('imposter-setup');
  hide('imposter-play');
  hide('imposter-reveal');
  showDealWaiting();
}

// ── DEAL ────────────────────────────────────
function showDealWaiting() {
  document.getElementById('deal-player-name').textContent =
    state.names[state.currentDealing];
  show('deal-waiting');
  hide('deal-card');
}

function showCard() {
  const i = state.currentDealing;
  const isImposter = i === state.imposterIndex;
  const card   = document.getElementById('player-card');
  const roleEl = document.getElementById('card-role');
  const wordEl = document.getElementById('card-word');
  const hintEl = document.getElementById('card-hint');
  const catEl  = document.getElementById('card-cat');

  if (isImposter) {
    card.className = 'card imposter-card';
    roleEl.textContent = '🕵️ Du bist der Imposter!';
    wordEl.textContent = '???';
    catEl.textContent  = 'Kategorie: Alltag';
    if (state.hintEnabled) {
      hintEl.innerHTML = '💡 Tipp: <span>' + state.hint + '</span>';
      hintEl.classList.remove('hidden');
    } else {
      hintEl.classList.add('hidden');
    }
  } else {
    card.className = 'card';
    roleEl.textContent = '✅ Kein Imposter';
    wordEl.textContent = state.word;
    catEl.textContent  = 'Kategorie: Alltag';
    hintEl.classList.add('hidden');
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

// ── PLAY ────────────────────────────────────
function startPlayPhase() {
  hide('imposter-deal');
  show('imposter-play');
  state.totalSeconds = state.gameMins * 60;
  state.timerSeconds = state.totalSeconds;
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
  const textEl = document.getElementById('timer-text');
  textEl.textContent = mins + ':' + secs;
  if (s <= 30) textEl.classList.add('urgent');
  else textEl.classList.remove('urgent');
  const circ = 2 * Math.PI * 54;
  const fraction = Math.max(0, s / state.totalSeconds);
  document.getElementById('timer-ring').style.strokeDashoffset = circ * (1 - fraction);
  const ring = document.getElementById('timer-ring');
  if (s <= 30) ring.classList.add('urgent');
  else ring.classList.remove('urgent');
}

// ── REVEAL ──────────────────────────────────
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
    row.innerHTML = `<span class="player-name">${name}</span>
      <span class="player-tag ${isImp ? 'imposter-tag' : ''}">
        ${isImp ? '🕵️ Imposter' : '✅ Unschuldig'}</span>`;
    list.appendChild(row);
  });
}

// ── RESET ──────────────────────────────────
function resetImposter() {
  clearInterval(state.timerInterval);
  hide('imposter-deal');
  hide('imposter-play');
  hide('imposter-reveal');
  show('imposter-setup');
  renderNameInputs();
}

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', renderNameInputs);
