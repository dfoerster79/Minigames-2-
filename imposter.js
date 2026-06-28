const IMPOSTER_WORDS = {
  alltag: [
    "Zahnbürste",
    "Kühlschrank",
    "Wecker",
    "Einkaufstasche",
    "Schlüssel",
    "Kaffeetasse",
    "Haustür",
    "Briefkasten",
    "Regenschirm",
    "Lichtschalter",
    "Handtuch",
    "Spülmaschine",
    "Mülleimer",
    "Fernbedienung",
    "Kopfkissen",
    "Geldbörse",
    "Fahrradhelm",
    "Joghurt",
    "Waschmaschine",
    "Hausschuhe",
    "Klopapier",
    "Balkon",
    "Parkplatz",
    "Supermarkt",
    "Bushaltestelle",
    "Rezept",
    "Trinkflasche",
    "Lunchbox",
    "Terminkalender",
    "Handy"
  ]
};

let imposterState = {
  players: 4,
  category: 'alltag',
  word: '',
  imposterIndex: -1,
  currentDealing: 0,
  cardVisible: false
};

function startImposter() {
  const cat = document.getElementById('category-select').value;
  const words = IMPOSTER_WORDS[cat];
  const word = words[Math.floor(Math.random() * words.length)];
  const imposterIndex = Math.floor(Math.random() * imposterState.players);

  imposterState.category = cat;
  imposterState.word = word;
  imposterState.imposterIndex = imposterIndex;
  imposterState.currentDealing = 0;
  imposterState.cardVisible = false;

  document.getElementById('imposter-setup').classList.add('hidden');
  document.getElementById('imposter-deal').classList.remove('hidden');
  document.getElementById('imposter-play').classList.add('hidden');
  document.getElementById('deal-waiting').classList.remove('hidden');
  document.getElementById('deal-card').classList.add('hidden');

  updateDealUI();
}

function updateDealUI() {
  document.getElementById('current-player-num').textContent = imposterState.currentDealing + 1;
  document.getElementById('total-players').textContent = imposterState.players;
}

function showCard() {
  const i = imposterState.currentDealing;
  const isImposter = i === imposterState.imposterIndex;
  const card = document.getElementById('player-card');
  const roleEl = document.getElementById('card-role');
  const wordEl = document.getElementById('card-word');

  if (isImposter) {
    card.className = 'card imposter-card';
    roleEl.textContent = '🕵️ Du bist der Imposter!';
    wordEl.textContent = '???';
  } else {
    card.className = 'card';
    roleEl.textContent = '✅ Du bist kein Imposter';
    wordEl.textContent = imposterState.word;
  }

  document.getElementById('deal-waiting').classList.add('hidden');
  document.getElementById('deal-card').classList.remove('hidden');
}

function nextPlayer() {
  imposterState.currentDealing++;

  if (imposterState.currentDealing >= imposterState.players) {
    // All cards dealt → play phase
    document.getElementById('imposter-deal').classList.add('hidden');
    document.getElementById('imposter-play').classList.remove('hidden');
    document.getElementById('play-word').textContent = imposterState.word;
  } else {
    document.getElementById('deal-waiting').classList.remove('hidden');
    document.getElementById('deal-card').classList.add('hidden');
    updateDealUI();
  }
}

function resetImposter() {
  document.getElementById('imposter-play').classList.add('hidden');
  document.getElementById('imposter-deal').classList.add('hidden');
  document.getElementById('imposter-setup').classList.remove('hidden');
}

function changeCount(delta) {
  const current = imposterState.players;
  const next = Math.max(3, Math.min(12, current + delta));
  imposterState.players = next;
  document.getElementById('player-count').textContent = next;
}
