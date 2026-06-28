// ========== WER BIN ICH – SPLASH-MODUS ==========
const WBI_CATS = {
  personen: {
    label: '🎭 Personen',
    words: ['Albert Einstein','Napoleon Bonaparte','Cleopatra','Mozart','Leonardo da Vinci',
      'Marie Curie','Shakespeare','Beethoven','Columbus','Gandhi','Harry Potter',
      'Sherlock Holmes','Superman','Batman','SpongeBob','Mickey Mouse','Darth Vader',
      'Hermione Granger','James Bond','Indiana Jones','Winnie Pooh','Pikachu',
      'Santa Claus','Dracula','Frankenstein','Elon Musk','Taylor Swift','Michael Jackson',
      'Elvis Presley','Marilyn Monroe','Bruce Lee','Jackie Chan','Ronaldo','Messi','LeBron James']
  },
  tiere: {
    label: '🐾 Tiere',
    words: ['Elefant','Giraffe','Pinguin','Delfin','Koalabär','Gorilla','Flamingo',
      'Krokodil','Nashorn','Gepard','Panda','Polarfuchs','Chamäleon','Oktopus',
      'Axolotl','Qualle','Fledermaus','Pfau','Seepferdchen','Mantarochen',
      'Eichhörnchen','Libelle','Glühwürmchen','Erdmännchen','Nasenbär',
      'Hammerhai','Leguan','Schnabeltier','Wombat','Lama']
  },
  berufe: {
    label: '🛠️ Berufe',
    words: ['Feuerwehrmann','Astronaut','Zauberer','Pirat','Ritter','Ninja','Cowboy',
      'Detektiv','Koch','Arzt','Lehrer','Pilot','Taucher','Clown','Zirkusdirektor',
      'Schatzsucher','Superheld','Roboter','Zeitreisender','Meerjungfrau',
      'Drache','Einhorn','Geist','Zombie','Vampir','Bürgermeister','Rockstar','Influencer']
  },
  essen: {
    label: '🍕 Essen',
    words: ['Pizza','Sushi','Hamburger','Eis','Donut','Brezel','Spaghetti','Pommes',
      'Waffel','Croissant','Taco','Hot Dog','Schnitzel','Currywurst','Erdbeere',
      'Wassermelone','Ananas','Avocado','Banane','Kiwi','Broccoli','Tomate',
      'Käse','Schokolade','Gummibär','Ramen','Gyros','Pulled Pork','Cheesecake']
  },
  filme: {
    label: '🎬 Filme & Serien',
    words: ['Titanic','Star Wars','Jurassic Park','Der König der Löwen','Frozen',
      'Spider-Man','Iron Man','Captain America','Thor','Hulk','Shrek','Toy Story',
      'Findet Nemo','Moana','Coco','Up','WALL-E','Ratatouille','Die Incredibles',
      'Zootopia','Minions','Kung Fu Panda','Madagascar','Cars','Avatar',
      'The Dark Knight','Gladiator','Forrest Gump','Matrix','Pulp Fiction']
  },
  sport: {
    label: '⚽ Sport',
    words: ['Fußball','Tennis','Basketball','Schwimmen','Boxen','Skifahren','Surfen',
      'Klettern','Golf','Baseball','Volleyball','Tischtennis','Badminton','Reiten',
      'Turnen','Leichtathletik','Radfahren','Eishockey','Rugby','Fechten',
      'Sumo','Curling','Bogenschießen','Triathlon','Breakdance']
  }
};

let wbi = {
  activeCats: ['personen','tiere','berufe','essen'],
  timerSec: 60,
  timerInterval: null,
  timerLeft: 0,
  score: 0,
  skipped: 0,
  currentTerm: '',
  pool: [],
  poolIndex: 0,
  state: 'idle',       // idle | playing | result
  gyroActive: false,
  tiltLock: false,
  playerName: '',
};

// ---- SETUP ----
function wbiInit() {
  wbiRenderCats();
  wbiUpdateTimerDisplay();
}

function wbiRenderCats() {
  const box = document.getElementById('wbi-cat-checks');
  if (!box) return;
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
  wbi.timerSec = Math.max(30, Math.min(180, wbi.timerSec + d));
  wbiUpdateTimerDisplay();
}

function wbiUpdateTimerDisplay() {
  const el = document.getElementById('wbi-timer-val');
  if (el) el.textContent = wbi.timerSec + 's';
}

// ---- BUILD POOL ----
function wbiBuildPool() {
  let pool = wbi.activeCats.flatMap(k => WBI_CATS[k].words);
  // shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

// ---- START ----
function startWBI() {
  const nameEl = document.getElementById('wbi-player-name');
  wbi.playerName = nameEl ? (nameEl.value.trim() || 'Spieler') : 'Spieler';
  wbi.pool = wbiBuildPool();
  wbi.poolIndex = 0;
  wbi.score = 0;
  wbi.skipped = 0;
  wbi.state = 'playing';
  wbi.timerLeft = wbi.timerSec;

  document.getElementById('wbi-setup').classList.add('hidden');
  document.getElementById('wbi-result').classList.add('hidden');
  document.getElementById('wbi-game').classList.remove('hidden');

  wbiRequestGyro();
  wbiNextTerm();
  wbiStartTimer();
}

function wbiNextTerm() {
  if (wbi.poolIndex >= wbi.pool.length) wbi.pool = wbiBuildPool(), wbi.poolIndex = 0;
  wbi.currentTerm = wbi.pool[wbi.poolIndex++];
  wbi.tiltLock = false;

  const termEl = document.getElementById('wbi-splash-term');
  const overlay = document.getElementById('wbi-tilt-overlay');
  if (termEl) termEl.textContent = wbi.currentTerm;
  if (overlay) {
    overlay.className = 'wbi-tilt-overlay';
    overlay.textContent = '';
  }
}

// ---- TIMER ----
function wbiStartTimer() {
  clearInterval(wbi.timerInterval);
  wbiRenderTimer();
  wbi.timerInterval = setInterval(() => {
    wbi.timerLeft--;
    wbiRenderTimer();
    if (wbi.timerLeft <= 0) {
      clearInterval(wbi.timerInterval);
      wbiEndGame();
    }
  }, 1000);
}

function wbiRenderTimer() {
  const el = document.getElementById('wbi-game-timer');
  if (!el) return;
  el.textContent = wbi.timerLeft + 's';
  el.className = 'wbi-game-timer-val' + (wbi.timerLeft <= 10 ? ' urgent' : '');
  // arc
  const ring = document.getElementById('wbi-timer-ring');
  if (ring) {
    const pct = wbi.timerLeft / wbi.timerSec;
    const c = 2 * Math.PI * 54;
    ring.style.strokeDashoffset = c * (1 - pct);
    ring.style.stroke = wbi.timerLeft <= 10 ? '#f87171' : '#a855f7';
  }
}

// ---- GYROSCOPE ----
function wbiRequestGyro() {
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS 13+
    DeviceOrientationEvent.requestPermission()
      .then(state => {
        if (state === 'granted') wbiAttachGyro();
        else wbiFallbackButtons();
      }).catch(() => wbiFallbackButtons());
  } else if (window.DeviceOrientationEvent) {
    wbiAttachGyro();
  } else {
    wbiFallbackButtons();
  }
}

function wbiAttachGyro() {
  wbi.gyroActive = true;
  document.getElementById('wbi-manual-btns').classList.add('hidden');
  window.addEventListener('deviceorientation', wbiHandleTilt);
}

function wbiFallbackButtons() {
  wbi.gyroActive = false;
  document.getElementById('wbi-manual-btns').classList.remove('hidden');
}

function wbiHandleTilt(e) {
  if (wbi.state !== 'playing' || wbi.tiltLock) return;
  const beta = e.beta; // -180..180: 0=flach, 90=aufrecht, neg=nach hinten
  if (beta === null) return;
  if (beta < -20) {
    // Handy nach hinten kippen = RICHTIG
    wbiCorrect();
  } else if (beta > 50) {
    // Handy nach vorne kippen = WEITER/SKIP
    wbiSkip();
  }
}

function wbiDetachGyro() {
  window.removeEventListener('deviceorientation', wbiHandleTilt);
}

// ---- RICHTIG / SKIP ----
function wbiCorrect() {
  if (wbi.state !== 'playing') return;
  wbi.tiltLock = true;
  wbi.score++;
  document.getElementById('wbi-score-val').textContent = wbi.score;
  wbiShowOverlay('✅', 'richtig', wbi.currentTerm);
  setTimeout(wbiNextTerm, 900);
}

function wbiSkip() {
  if (wbi.state !== 'playing') return;
  wbi.tiltLock = true;
  wbi.skipped++;
  wbiShowOverlay('⏭️', 'skip', wbi.currentTerm);
  setTimeout(wbiNextTerm, 700);
}

function wbiShowOverlay(icon, type, term) {
  const overlay = document.getElementById('wbi-tilt-overlay');
  if (!overlay) return;
  overlay.textContent = '';
  overlay.className = 'wbi-tilt-overlay wbi-overlay-' + type;
  overlay.innerHTML = `<span class="wbi-overlay-icon">${icon}</span><span class="wbi-overlay-term">${term}</span>`;
}

// ---- END ----
function wbiEndGame() {
  wbi.state = 'result';
  wbiDetachGyro();
  document.getElementById('wbi-game').classList.add('hidden');
  document.getElementById('wbi-result').classList.remove('hidden');
  document.getElementById('wbi-result-score').textContent = wbi.score;
  document.getElementById('wbi-result-skipped').textContent = wbi.skipped;
  document.getElementById('wbi-result-name').textContent = wbi.playerName;
}

// ---- RESET ----
function resetWBI() {
  clearInterval(wbi.timerInterval);
  wbiDetachGyro();
  wbi.state = 'idle';
  document.getElementById('wbi-game').classList.add('hidden');
  document.getElementById('wbi-result').classList.add('hidden');
  document.getElementById('wbi-setup').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', wbiInit);
