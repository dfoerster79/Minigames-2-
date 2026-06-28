// ========== WER BIN ICH ==========
const WBI_CATS = {
  personen: {
    label: '🎭 Personen',
    words: ['Albert Einstein','Napoleon Bonaparte','Cleopatra','Mozart','Leonardo da Vinci',
      'Marie Curie','Shakespeare','Beethoven','Columbus','Gandhi','Harry Potter',
      'Sherlock Holmes','Superman','Batman','SpongeBob','Mickey Mouse','Darth Vader',
      'Hermione Granger','James Bond','Indiana Jones','Winnie Pooh','Pikachu',
      'Santa Claus','Dracula','Frankenstein']
  },
  tiere: {
    label: '🐾 Tiere',
    words: ['Elefant','Giraffe','Pinguin','Delfin','Koalabär','Gorilla','Flamingo',
      'Krokodil','Nashorn','Gepard','Panda','Polarfuchs','Chamäleon','Oktopus',
      'Axolotl','Qualle','Fledermaus','Pfau','Seepferdchen','Mantarochen',
      'Eichhörnchen','Libelle','Glühwürmchen','Erdmännchen','Nasenbär']
  },
  berufe: {
    label: '🛠️ Berufe',
    words: ['Feuerwehrmann','Astronaut','Zauberer','Pirat','Ritter','Ninja','Cowboy',
      'Detektiv','Koch','Arzt','Lehrer','Pilot','Taucher','Clown','Zirkusdirektor',
      'Schatzsucher','Superheld','Roboter','Zeitreisender','Meerjungfrau',
      'Drache','Einhorn','Geist','Zombie','Vampir']
  },
  essen: {
    label: '🍕 Essen',
    words: ['Pizza','Sushi','Hamburger','Eis','Donut','Brezel','Spaghetti','Pommes',
      'Waffel','Croissant','Taco','Hot Dog','Schnitzel','Currywurst','Erdbeere',
      'Wassermelone','Ananas','Avocado','Banane','Kiwi','Broccoli','Tomate',
      'Käse','Schokolade','Gummibär']
  },
  filme: {
    label: '🎬 Filme & Serien',
    words: ['Titanic','Star Wars','Jurassic Park','Der König der Löwen','Frozen',
      'Spider-Man','Iron Man','Captain America','Thor','Hulk','Shrek','Toy Story',
      'Findet Nemo','Moana','Coco','Up','WALL-E','Ratatouille','Incredibles',
      'Zootopia','Minions','Despicable Me','Kung Fu Panda','Madagascar','Cars']
  },
  sport: {
    label: '⚽ Sport',
    words: ['Fußball','Tennis','Basketball','Schwimmen','Boxen','Skifahren','Surfen',
      'Klettern','Golf','Baseball','Volleyball','Tischtennis','Badminton','Reiten',
      'Turnen','Leichtathletik','Radfahren','Eishockey','Rugby','Fechten']
  }
};

let wbi = {
  players: [],
  current: 0,
  terms: {},       // playerIndex -> term
  scores: {},      // playerIndex -> score
  activeCats: ['personen','tiere','berufe','essen'],
  timerSec: 30,
  timerEnabled: true,
  timerInterval: null,
  timerLeft: 0,
  round: 1,
  playerCount: 3,
};

// ---- SETUP ----
function wbiInit() {
  wbi.playerCount = 3;
  wbiRenderNameInputs();
  wbiRenderCats();
  wbiUpdateTimerDisplay();
}

function wbiRenderNameInputs() {
  const box = document.getElementById('wbi-name-inputs');
  box.innerHTML = '';
  for (let i = 0; i < wbi.playerCount; i++) {
    const old = wbi.players[i] || '';
    box.innerHTML += `<div class="name-row">
      <label>Spieler ${i+1}</label>
      <input type="text" id="wbi-name-${i}" placeholder="Spieler ${i+1}" maxlength="16" value="${old}" />
    </div>`;
  }
  document.getElementById('wbi-player-count').textContent = wbi.playerCount;
}

function wbiChangeCount(d) {
  wbi.playerCount = Math.max(2, Math.min(10, wbi.playerCount + d));
  wbiRenderNameInputs();
}

function wbiRenderCats() {
  const box = document.getElementById('wbi-cat-checks');
  box.innerHTML = '';
  Object.entries(WBI_CATS).forEach(([key, cat]) => {
    const checked = wbi.activeCats.includes(key) ? 'checked' : '';
    box.innerHTML += `<label class="cat-check">
      <input type="checkbox" ${checked} onchange="wbiToggleCat('${key}')" />
      <span>${cat.label}</span>
    </label>`;
  });
}

function wbiToggleCat(key) {
  if (wbi.activeCats.includes(key)) {
    if (wbi.activeCats.length > 1) wbi.activeCats = wbi.activeCats.filter(c => c !== key);
  } else {
    wbi.activeCats.push(key);
  }
}

function wbiChangeTimer(d) {
  wbi.timerSec = Math.max(10, Math.min(120, wbi.timerSec + d));
  wbiUpdateTimerDisplay();
}

function wbiUpdateTimerDisplay() {
  document.getElementById('wbi-timer-val').textContent = wbi.timerSec + 's';
}

function wbiToggleTimerEnabled() {
  wbi.timerEnabled = document.getElementById('wbi-timer-toggle').checked;
  document.getElementById('wbi-timer-controls').style.display = wbi.timerEnabled ? 'flex' : 'none';
}

// ---- START ----
function startWBI() {
  wbi.players = [];
  for (let i = 0; i < wbi.playerCount; i++) {
    const v = document.getElementById('wbi-name-' + i);
    wbi.players.push(v ? (v.value.trim() || 'Spieler ' + (i+1)) : 'Spieler ' + (i+1));
  }
  wbi.scores = {};
  wbi.players.forEach((_, i) => wbi.scores[i] = 0);
  wbi.round = 1;
  wbiAssignTerms();
  wbi.current = 0;
  document.getElementById('wbi-setup').classList.add('hidden');
  document.getElementById('wbi-deal').classList.remove('hidden');
  wbiShowDealWaiting();
}

function wbiAssignTerms() {
  const pool = wbi.activeCats.flatMap(k => WBI_CATS[k].words);
  wbi.terms = {};
  const used = [];
  wbi.players.forEach((_, i) => {
    let word;
    do { word = pool[Math.floor(Math.random() * pool.length)]; } while (used.includes(word));
    used.push(word);
    wbi.terms[i] = word;
  });
}

// ---- DEAL (Stirnband-Modus) ----
function wbiShowDealWaiting() {
  document.getElementById('wbi-deal-waiting').classList.remove('hidden');
  document.getElementById('wbi-deal-card').classList.add('hidden');
  document.getElementById('wbi-deal-player').textContent = wbi.players[wbi.current];
}

function wbiShowCard() {
  document.getElementById('wbi-deal-waiting').classList.add('hidden');
  document.getElementById('wbi-deal-card').classList.remove('hidden');
  // Show term to OTHERS only — the current player looks away
  document.getElementById('wbi-card-term').textContent = wbi.terms[wbi.current];
  document.getElementById('wbi-card-playername').textContent = wbi.players[wbi.current];
}

function wbiDealNext() {
  wbi.current++;
  if (wbi.current >= wbi.players.length) {
    // All dealt — start game
    wbi.current = 0;
    document.getElementById('wbi-deal').classList.add('hidden');
    document.getElementById('wbi-play').classList.remove('hidden');
    wbiStartTurn();
  } else {
    wbiShowDealWaiting();
  }
}

// ---- PLAY ----
function wbiStartTurn() {
  clearInterval(wbi.timerInterval);
  const name = wbi.players[wbi.current];
  document.getElementById('wbi-turn-name').textContent = name;
  document.getElementById('wbi-turn-term-hidden').textContent = '???';
  document.getElementById('wbi-answer-btns').classList.remove('hidden');
  document.getElementById('wbi-guess-btn').classList.remove('hidden');
  document.getElementById('wbi-next-btn').classList.add('hidden');
  wbiRenderScoreboard();
  wbiRenderPlayerList();

  if (wbi.timerEnabled) {
    wbi.timerLeft = wbi.timerSec;
    wbiUpdateTimerBar();
    document.getElementById('wbi-timer-wrap').classList.remove('hidden');
    wbi.timerInterval = setInterval(() => {
      wbi.timerLeft--;
      wbiUpdateTimerBar();
      if (wbi.timerLeft <= 0) {
        clearInterval(wbi.timerInterval);
        wbiTimeUp();
      }
    }, 1000);
  } else {
    document.getElementById('wbi-timer-wrap').classList.add('hidden');
  }
}

function wbiUpdateTimerBar() {
  const pct = (wbi.timerLeft / wbi.timerSec) * 100;
  const bar = document.getElementById('wbi-timer-bar');
  bar.style.width = pct + '%';
  bar.className = 'wbi-timer-fill' + (pct < 30 ? ' urgent' : '');
  document.getElementById('wbi-timer-text').textContent = wbi.timerLeft + 's';
}

function wbiTimeUp() {
  document.getElementById('wbi-answer-btns').classList.add('hidden');
  document.getElementById('wbi-guess-btn').classList.add('hidden');
  document.getElementById('wbi-next-btn').classList.remove('hidden');
  showWBIToast('⏰ Zeit abgelaufen!');
}

function wbiGuess() {
  clearInterval(wbi.timerInterval);
  document.getElementById('wbi-answer-btns').classList.add('hidden');
  document.getElementById('wbi-guess-btn').classList.add('hidden');
  document.getElementById('wbi-next-btn').classList.remove('hidden');
  // Reveal term
  document.getElementById('wbi-turn-term-hidden').textContent = wbi.terms[wbi.current];
  // Ask if correct via confirm UI
  document.getElementById('wbi-confirm-wrap').classList.remove('hidden');
}

function wbiConfirmGuess(correct) {
  document.getElementById('wbi-confirm-wrap').classList.add('hidden');
  if (correct) {
    wbi.scores[wbi.current]++;
    showWBIToast('🎉 Richtig! +1 Punkt');
    wbiRenderScoreboard();
  } else {
    showWBIToast('❌ Leider falsch!');
  }
}

function wbiNext() {
  clearInterval(wbi.timerInterval);
  document.getElementById('wbi-confirm-wrap').classList.add('hidden');
  wbi.current = (wbi.current + 1) % wbi.players.length;
  if (wbi.current === 0) wbi.round++;
  wbiStartTurn();
}

function wbiRenderScoreboard() {
  const box = document.getElementById('wbi-scoreboard');
  box.innerHTML = wbi.players.map((n, i) =>
    `<div class="wbi-score-row${i === wbi.current ? ' active' : ''}">
      <span class="wbi-score-name">${n}</span>
      <span class="wbi-score-pts">${wbi.scores[i]} Pkt</span>
    </div>`
  ).join('');
}

function wbiRenderPlayerList() {
  document.getElementById('wbi-round-num').textContent = wbi.round;
}

function showWBIToast(msg) {
  let t = document.getElementById('wbi-toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  t.classList.add('wbi-toast-show');
  setTimeout(() => { t.classList.remove('wbi-toast-show'); t.classList.add('hidden'); }, 2200);
}

// ---- RESET ----
function resetWBI() {
  clearInterval(wbi.timerInterval);
  document.getElementById('wbi-deal').classList.add('hidden');
  document.getElementById('wbi-play').classList.add('hidden');
  document.getElementById('wbi-setup').classList.remove('hidden');
  wbiInit();
}

function wbiNewRound() {
  clearInterval(wbi.timerInterval);
  wbiAssignTerms();
  wbi.current = 0;
  wbi.round++;
  document.getElementById('wbi-play').classList.add('hidden');
  document.getElementById('wbi-deal').classList.remove('hidden');
  wbiShowDealWaiting();
}

// init on load
document.addEventListener('DOMContentLoaded', wbiInit);
