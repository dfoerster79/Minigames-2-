// ========== WER BIN ICH ==========
const WBI_CATS = {
  personen: {
    label: '🎭 Personen', emoji: '🎭',
    words: ['Albert Einstein','Napoleon Bonaparte','Cleopatra','Mozart','Leonardo da Vinci',
      'Marie Curie','Shakespeare','Beethoven','Columbus','Gandhi','Harry Potter',
      'Sherlock Holmes','Superman','Batman','SpongeBob','Mickey Mouse','Darth Vader',
      'Hermione Granger','James Bond','Indiana Jones','Winnie Pooh','Pikachu',
      'Santa Claus','Dracula','Frankenstein','Elon Musk','Taylor Swift','Michael Jackson',
      'Elvis Presley','Marilyn Monroe','Bruce Lee','Jackie Chan','Ronaldo','Messi','LeBron James']
  },
  tiere: {
    label: '🐾 Tiere', emoji: '🐾',
    words: ['Elefant','Giraffe','Pinguin','Delfin','Koalabär','Gorilla','Flamingo',
      'Krokodil','Nashorn','Gepard','Panda','Polarfuchs','Chamäleon','Oktopus',
      'Axolotl','Qualle','Fledermaus','Pfau','Seepferdchen','Mantarochen',
      'Eichhörnchen','Libelle','Glühwürmchen','Erdmännchen','Nasenbär',
      'Hammerhai','Leguan','Schnabeltier','Wombat','Lama']
  },
  berufe: {
    label: '🛠️ Berufe', emoji: '🛠️',
    words: ['Feuerwehrmann','Astronaut','Zauberer','Pirat','Ritter','Ninja','Cowboy',
      'Detektiv','Koch','Arzt','Lehrer','Pilot','Taucher','Clown','Zirkusdirektor',
      'Schatzsucher','Superheld','Roboter','Zeitreisender','Meerjungfrau',
      'Drache','Einhorn','Geist','Zombie','Vampir','Bürgermeister','Rockstar','Influencer']
  },
  essen: {
    label: '🍕 Essen', emoji: '🍕',
    words: ['Pizza','Sushi','Hamburger','Eis','Donut','Brezel','Spaghetti','Pommes',
      'Waffel','Croissant','Taco','Hot Dog','Schnitzel','Currywurst','Erdbeere',
      'Wassermelone','Ananas','Avocado','Banane','Kiwi','Broccoli','Tomate',
      'Käse','Schokolade','Gummibär','Ramen','Gyros','Pulled Pork','Cheesecake']
  },
  filme: {
    label: '🎬 Filme', emoji: '🎬',
    words: ['Titanic','Star Wars','Jurassic Park','Der König der Löwen','Frozen',
      'Spider-Man','Iron Man','Captain America','Thor','Hulk','Shrek','Toy Story',
      'Findet Nemo','Moana','Coco','Up','WALL-E','Ratatouille','Die Incredibles',
      'Zootopia','Minions','Kung Fu Panda','Madagascar','Cars','Avatar',
      'The Dark Knight','Gladiator','Forrest Gump','Matrix','Pulp Fiction']
  },
  sport: {
    label: '⚽ Sport', emoji: '⚽',
    words: ['Fußball','Tennis','Basketball','Schwimmen','Boxen','Skifahren','Surfen',
      'Klettern','Golf','Baseball','Volleyball','Tischtennis','Badminton','Reiten',
      'Turnen','Leichtathletik','Radfahren','Eishockey','Rugby','Fechten',
      'Sumo','Curling','Bogenschießen','Triathlon','Breakdance']
  },
  fortnite: {
    label: '🎮 Fortnite', emoji: '🎮',
    words: ['Tilted Towers','Loot Lake','Pleasant Park','Salty Springs','Dusty Divot',
      'Retail Row','Lazy Lake','The Mothership','Jonesy','Peely','Fishstick','Meowscles',
      'Midas','The Mandalorian','Master Chief','Ariana Grande','Travis Scott',
      'Drift','Raven','Ghoul Trooper','Black Knight','Skull Trooper','Ikonik',
      'Battle Bus','Chug Jug','Slurp Juice','Launch Pad','Port-a-Fort',
      'Pump Shotgun','Minigun','Rocket Launcher','Storm','Victory Royale',
      'Building','Edit Course','Creative Mode','Chapter 1','Zero Point','Omni Sword']
  },
  brawlstars: {
    label: '🌟 Brawl Stars', emoji: '🌟',
    words: ['Shelly','Colt','Bull','Brock','El Primo','Barley','Poco','Rosa',
      'Jessie','Dynamike','Tick','8-Bit','Rico','Darryl','Penny','Carl',
      'Jacky','Gus','Bo','Emz','Stu','Piper','Pam','Frank','Bibi','Bea',
      'Nani','Edgar','Griff','Grom','Bonnie','Gale','Colette','Belle',
      'Ash','Lola','Sam','Mandy','Maisie','Hank','Pearl','Larry & Lawrie',
      'Angelo','Berry','Clancy','Moe','Juju','Melodie','Lily','Draco',
      'Gem Grab','Showdown','Brawl Ball','Heist','Bounty','Hot Zone',
      'Siege','Trophy Road','Power League','Club League','Starr Park']
  },
  spicy: {
    label: '🌶️ Spicy 18+', emoji: '🌶️',
    words: ['Dildo','Vibrator','Striptease','Lap Dance','Kondom','Nackt','One-Night-Stand',
      'Sextape','Orgie','Fetisch','BDSM','Handschellen','Whirlpool','Sauna nackt',
      'Fremdgehen','Schmusen','Po klatschen','Nutte','Stripper','Erotikkino',
      'Sexspielzeug','Anmachen','Dirty Talk','Aufreißen','Lovense',
      'Geilheit','Ficken','Einhorn-Kostüm','Nacktbaden','Swinger-Club']
  }
};

let wbi = {
  activeCats: ['personen','tiere','berufe','essen'],
  timerSec: 60,
  timerInterval: null,
  countdownInterval: null,
  timerLeft: 0,
  score: 0,
  skipped: 0,
  currentTerm: '',
  pool: [],
  poolIndex: 0,
  state: 'idle',
  playerName: '',
};

function wbiInit() {
  wbiRenderCats();
  wbiUpdateTimerDisplay();
}

function wbiRenderCats() {
  const box = document.getElementById('wbi-cat-checks');
  if (!box) return;
  box.innerHTML = '';
  Object.entries(WBI_CATS).forEach(([key, cat]) => {
    const isActive = wbi.activeCats.includes(key);
    const label = document.createElement('label');
    label.className = 'splash-cat-card' + (isActive ? ' active-cat' : '');
    label.dataset.cat = key;
    label.innerHTML = `
      <input type="checkbox" ${isActive ? 'checked' : ''} onchange="wbiToggleCat('${key}', this)" />
      <span class="scc-emoji">${cat.emoji}</span>
      <span class="scc-label">${cat.label.replace(/^[^\s]+\s/, '')}</span>
    `;
    box.appendChild(label);
  });
}

function wbiToggleCat(key, el) {
  const label = el ? el.closest('label') : null;
  if (wbi.activeCats.includes(key)) {
    if (wbi.activeCats.length > 1) {
      wbi.activeCats = wbi.activeCats.filter(c => c !== key);
      if (label) label.classList.remove('active-cat');
    } else {
      if (el) el.checked = true;
    }
  } else {
    wbi.activeCats.push(key);
    if (label) label.classList.add('active-cat');
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

function wbiBuildPool() {
  let pool = wbi.activeCats.flatMap(k => WBI_CATS[k].words);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

function startWBI() {
  const nameEl = document.getElementById('wbi-player-name');
  wbi.playerName = nameEl ? (nameEl.value.trim() || 'Spieler') : 'Spieler';
  wbi.pool = wbiBuildPool();
  wbi.poolIndex = 0;
  wbi.score = 0;
  wbi.skipped = 0;
  wbi.state = 'countdown';

  document.getElementById('wbi-setup').classList.add('hidden');
  document.getElementById('wbi-result').classList.add('hidden');
  document.getElementById('wbi-game').classList.remove('hidden');
  document.getElementById('wbi-countdown-wrap').classList.remove('hidden');
  document.getElementById('wbi-splash-center').classList.add('hidden');
  document.getElementById('wbi-game-timer-bar').classList.add('hidden');

  // CSS-Rotation: body bekommt Klasse, dreht alles via CSS (funktioniert auch im Browser)
  document.body.classList.add('wbi-force-landscape');

  // Zusätzlich native API versuchen (klappt nur als installierte PWA)
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(() => {});
  }

  wbiStartCountdown();
}

function wbiStartCountdown() {
  let count = 3;
  const numEl = document.getElementById('wbi-countdown-num');
  numEl.textContent = count;
  wbi.countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      numEl.textContent = count;
      numEl.classList.remove('wbi-cd-pop');
      void numEl.offsetWidth;
      numEl.classList.add('wbi-cd-pop');
    } else {
      clearInterval(wbi.countdownInterval);
      wbiLaunchGame();
    }
  }, 1000);
}

function wbiLaunchGame() {
  wbi.state = 'playing';
  wbi.timerLeft = wbi.timerSec;
  document.getElementById('wbi-countdown-wrap').classList.add('hidden');
  document.getElementById('wbi-splash-center').classList.remove('hidden');
  document.getElementById('wbi-game-timer-bar').classList.remove('hidden');
  wbiNextTerm();
  wbiStartTimer();
}

function wbiNextTerm() {
  if (wbi.poolIndex >= wbi.pool.length) wbi.pool = wbiBuildPool(), wbi.poolIndex = 0;
  wbi.currentTerm = wbi.pool[wbi.poolIndex++];
  const termEl = document.getElementById('wbi-splash-term');
  const overlay = document.getElementById('wbi-tilt-overlay');
  if (termEl) termEl.textContent = wbi.currentTerm;
  if (overlay) { overlay.className = 'wbi-tilt-overlay'; overlay.textContent = ''; }
}

function wbiStartTimer() {
  clearInterval(wbi.timerInterval);
  wbiRenderTimer();
  wbi.timerInterval = setInterval(() => {
    wbi.timerLeft--;
    wbiRenderTimer();
    if (wbi.timerLeft <= 0) { clearInterval(wbi.timerInterval); wbiEndGame(); }
  }, 1000);
}

function wbiRenderTimer() {
  const el = document.getElementById('wbi-game-timer');
  if (!el) return;
  el.textContent = wbi.timerLeft + 's';
  el.className = 'wbi-game-timer-val' + (wbi.timerLeft <= 10 ? ' urgent' : '');
}

function wbiCorrect() {
  if (wbi.state !== 'playing') return;
  wbi.score++;
  document.getElementById('wbi-score-val').textContent = wbi.score;
  wbiShowOverlay('✅', 'richtig', wbi.currentTerm);
  setTimeout(wbiNextTerm, 700);
}

function wbiSkip() {
  if (wbi.state !== 'playing') return;
  wbi.skipped++;
  wbiShowOverlay('⏭️', 'skip', wbi.currentTerm);
  setTimeout(wbiNextTerm, 500);
}

function wbiShowOverlay(icon, type, term) {
  const overlay = document.getElementById('wbi-tilt-overlay');
  if (!overlay) return;
  overlay.className = 'wbi-tilt-overlay wbi-overlay-' + type;
  overlay.innerHTML = `<span class="wbi-overlay-icon">${icon}</span><span class="wbi-overlay-term">${term}</span>`;
}

function wbiEndGame() {
  wbi.state = 'result';
  document.body.classList.remove('wbi-force-landscape');
  if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
  document.getElementById('wbi-game').classList.add('hidden');
  document.getElementById('wbi-result').classList.remove('hidden');
  document.getElementById('wbi-result-score').textContent = wbi.score;
  document.getElementById('wbi-result-skipped').textContent = wbi.skipped;
  document.getElementById('wbi-result-name').textContent = wbi.playerName;
}

function resetWBI() {
  clearInterval(wbi.timerInterval);
  clearInterval(wbi.countdownInterval);
  document.body.classList.remove('wbi-force-landscape');
  if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
  wbi.state = 'idle';
  document.getElementById('wbi-game').classList.add('hidden');
  document.getElementById('wbi-result').classList.add('hidden');
  document.getElementById('wbi-setup').classList.remove('hidden');
}

function toggleWBIHowTo() {
  const body = document.getElementById('wbi-howto-body');
  const arrow = document.getElementById('wbi-howto-arrow');
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  arrow.textContent = isOpen ? '▶' : '▼';
}

document.addEventListener('DOMContentLoaded', wbiInit);
