// ========== IMPOSTER ==========
const CATEGORIES = {
  alltag: {
    label: '🏠 Alltag',
    words: ['Kühlschrank','Waschmaschine','Fernbedienung','Staubsauger','Mikrowelle',
      'Bücherregal','Wecker','Briefkasten','Haustür','Badewanne','Duschvorhang',
      'Spülmaschine','Toaster','Kaffeemaschine','Schreibtisch','Kleiderschrank',
      'Fensterbank','Blumentopf','Treppengeländer','Türklingel','Garderobe',
      'Fußmatte','Lichtschalter','Steckdose','Vorhang','Spiegel','Seife',
      'Zahnnbürste','Handtuch','Bettdecke','Kissen','Nachttischlampe']
  },
  tiere: {
    label: '🐾 Tiere',
    words: ['Elefant','Giraffe','Pinguin','Delfin','Koalabär','Gorilla','Flamingo',
      'Krokodil','Nashorn','Gepard','Panda','Fledermaus','Pfau','Seepferdchen',
      'Oktopus','Axolotl','Chamäleon','Hammerhai','Leguan','Schnabeltier',
      'Erdmännchen','Wombat','Lama','Qualle','Glühwürmchen','Libelle']
  },
  sehenswuerdigkeiten: {
    label: '🏙️ Sehenswürdigkeiten',
    words: ['Eiffelturm','Big Ben','Kolosseum','Taj Mahal','Freiheitsstatue',
      'Brandenburger Tor','Chinesische Mauer','Machu Picchu','Stonehenge',
      'Akropolis','Burj Khalifa','Sydney Opera House','Sagrada Família',
      'Niagara Falls','Mount Rushmore','Neuschwanstein','Louvre','Vatikan',
      'Alhambra','Angkor Wat','Petra','Chichen Itza','Pyramiden von Gizeh',
      'Golden Gate Bridge','Tower Bridge','Trevi-Brunnen']
  },
  essen: {
    label: '🍕 Essen & Trinken',
    words: ['Pizza','Sushi','Hamburger','Eis','Donut','Brezel','Spaghetti','Pommes',
      'Waffel','Croissant','Taco','Hot Dog','Schnitzel','Currywurst','Erdbeere',
      'Wassermelone','Ananas','Avocado','Käse','Schokolade','Gummibär','Ramen',
      'Gyros','Cheesecake','Latte Macchiato','Bubble Tea','Smoothie']
  },
  sport: {
    label: '⚽ Sport',
    words: ['Fußball','Tennis','Basketball','Schwimmen','Boxen','Skifahren','Surfen',
      'Klettern','Golf','Baseball','Volleyball','Tischtennis','Badminton',
      'Turnen','Leichtathletik','Radfahren','Eishockey','Rugby','Sumo',
      'Curling','Bogenschießen','Triathlon','Breakdance','Reiten']
  },
  filme: {
    label: '🎬 Filme & Serien',
    words: ['Titanic','Star Wars','Jurassic Park','Der König der Löwen','Frozen',
      'Spider-Man','Iron Man','Shrek','Toy Story','Findet Nemo','Moana','Avatar',
      'The Dark Knight','Forrest Gump','Matrix','Pulp Fiction','Inception',
      'Interstellar','Harry Potter','Herr der Ringe','Breaking Bad',
      'Game of Thrones','Stranger Things','The Office','Friends']
  },
  urlaub: {
    label: '✈️ Urlaub & Reisen',
    words: ['Mallorca','Maldiven','New York','Paris','Tokyo','Dubai','Bali',
      'Barcelona','Rom','Amsterdam','London','Sydney','Malediven','Safari',
      'Kreuzfahrt','Camping','Skiurlaub','Strandurlaub','Städtereise',
      'Rucksackreisen','Alpen','Karibik','Teneriffa','Kreta']
  },
  berufe: {
    label: '🛠️ Berufe & Jobs',
    words: ['Feuerwehrmann','Astronaut','Zauberer','Pirat','Ninja','Detektiv',
      'Koch','Arzt','Lehrer','Pilot','Taucher','Clown','Schatzsucher',
      'Superheld','Roboter','Rockstar','Influencer','Streamer','YouTuber',
      'Tierarzt','Bestatter','Tausendsassa','Zirkusdirektor']
  },
  musik: {
    label: '🎸 Musik & Bands',
    words: ['Beatles','Rammstein','ABBA','Queen','Metallica','Coldplay','BTS',
      'Billie Eilish','Taylor Swift','Eminem','Michael Jackson','Elvis',
      'Mozart','Beethoven','Ed Sheeran','Adele','Drake','Kanye West',
      'The Weeknd','Dua Lipa','Imagine Dragons','Linkin Park','Nirvana',
      'AC/DC','Rolling Stones','Pink Floyd','David Bowie']
  },
  wissenschaft: {
    label: '🔬 Wissenschaft & Natur',
    words: ['Schwarzes Loch','Vulkan','Tsunami','Regenbogen','Blitz','Tornado',
      'Aurora Borealis','Komet','Asteroid','DNA','Atom','Quanten','Fotosynthese',
      'Gravitation','Elektrizität','Magnet','Laser','Klonen','KI','Robotik',
      'Impfstoff','Penicillin','Röntgenstrahlen','Radioaktivität']
  },
  technik: {
    label: '📱 Technik & Gadgets',
    words: ['Smartphone','Laptop','Smartwatch','Drohne','VR-Brille','3D-Drucker',
      'Alexa','Siri','ChatGPT','Bitcoin','NFT','TikTok','Instagram','YouTube',
      'Netflix','Spotify','Tesla','Roboterstaub­sauger','Smartfridge',
      'Dashcam','Action-Kamera','Gaming-PC','Mechanische Tastatur','RGB-Maus']
  },
  fortnite: {
    label: '🎮 Fortnite',
    words: ['Tilted Towers','Loot Lake','Pleasant Park','Salty Springs','Dusty Divot',
      'Retail Row','Lazy Lake','The Mothership','Jonesy','Peely','Fishstick',
      'Meowscles','Midas','Drift','Raven','Ghoul Trooper','Black Knight',
      'Skull Trooper','Battle Bus','Chug Jug','Slurp Juice','Launch Pad',
      'Port-a-Fort','Pump Shotgun','Minigun','Rocket Launcher','Storm',
      'Victory Royale','Building','Zero Point','Omni Sword','Chapter 1',
      'Creative Mode','The Mandalorian','Master Chief','Travis Scott']
  },
  brawlstars: {
    label: '🌟 Brawl Stars',
    words: ['Shelly','Colt','Bull','Brock','El Primo','Barley','Poco','Rosa',
      'Jessie','Dynamike','Tick','8-Bit','Rico','Darryl','Penny','Carl',
      'Jacky','Gus','Bo','Emz','Stu','Piper','Pam','Frank','Bibi','Bea',
      'Nani','Edgar','Griff','Grom','Bonnie','Gale','Colette','Belle',
      'Ash','Lola','Sam','Mandy','Maisie','Hank','Pearl','Angelo','Berry',
      'Gem Grab','Showdown','Brawl Ball','Heist','Bounty','Hot Zone',
      'Starr Park','Trophy Road','Power League','Club League']
  },
  spicy: {
    label: '🌶️ Spicy (18+)',
    words: ['Dildo','Vibrator','Striptease','Lap Dance','Kondom','One-Night-Stand',
      'Sextape','Orgie','Fetisch','BDSM','Handschellen','Whirlpool','Fremdgehen',
      'Po klatschen','Stripper','Erotikkino','Sexspielzeug','Dirty Talk',
      'Aufreißen','Lovense','Ficken','Nacktbaden','Swinger-Club','Nutte']
  }
};

let imposterState = {
  players: [], playerCount: 4, activeCats: ['alltag'],
  gameTime: 3, timerInterval: null, timerLeft: 0,
  currentPlayer: 0, word: '', imposterIndex: -1,
  hint: false, hintWord: '', cat: ''
};

const HINTS = {
  alltag: ['Haushalt','zu Hause','Zuhause'],
  tiere: ['Tier','Natur','Wildtier'],
  sehenswuerdigkeiten: ['Reise','Tourismus','Wahrzeichen'],
  essen: ['Essen','Trinken','Genuss'],
  sport: ['Sport','Bewegung','Fitness'],
  filme: ['Unterhaltung','Kino','Serie'],
  urlaub: ['Urlaub','Reisen','Fernweh'],
  berufe: ['Arbeit','Beruf','Job'],
  musik: ['Musik','Band','Klang'],
  wissenschaft: ['Wissenschaft','Natur','Forschung'],
  technik: ['Technik','Digital','Gadget'],
  fortnite: ['Videospiel','Shooter','Battle Royale'],
  brawlstars: ['Videospiel','Mobile Game','Brawler'],
  spicy: ['Erwachsene','18+','Spaß']
};

function toggleCat(key) {
  const selected = imposterState.activeCats;
  if (selected.includes(key)) {
    if (selected.length > 1) imposterState.activeCats = selected.filter(c => c !== key);
    else return;
  } else {
    if (selected.length < 3) imposterState.activeCats.push(key);
    else { imposterState.activeCats.shift(); imposterState.activeCats.push(key); }
  }
  Object.keys(CATEGORIES).forEach(k => {
    const el = document.getElementById('cat-' + k);
    if (el) el.checked = imposterState.activeCats.includes(k);
  });
}

function changeTime(d) {
  imposterState.gameTime = Math.max(1, Math.min(10, imposterState.gameTime + d));
  document.getElementById('game-time').textContent = imposterState.gameTime;
}

function changeCount(d) {
  imposterState.playerCount = Math.max(3, Math.min(15, imposterState.playerCount + d));
  document.getElementById('player-count').textContent = imposterState.playerCount;
  renderNameInputs();
}

function renderNameInputs() {
  const box = document.getElementById('name-inputs');
  if (!box) return;
  box.innerHTML = '';
  for (let i = 0; i < imposterState.playerCount; i++) {
    const prev = imposterState.players[i] || '';
    box.innerHTML += `<div class="name-row"><label>Spieler ${i+1}</label>
      <input type="text" placeholder="Name" maxlength="16" value="${prev}"
        oninput="imposterState.players[${i}]=this.value" /></div>`;
  }
}

function startImposter() {
  const names = [];
  for (let i = 0; i < imposterState.playerCount; i++) {
    const inp = document.querySelectorAll('#name-inputs input')[i];
    names.push(inp && inp.value.trim() ? inp.value.trim() : 'Spieler '+(i+1));
  }
  imposterState.players = names;

  const pool = imposterState.activeCats.flatMap(k => CATEGORIES[k].words);
  imposterState.word = pool[Math.floor(Math.random() * pool.length)];
  imposterState.cat = imposterState.activeCats[Math.floor(Math.random() * imposterState.activeCats.length)];
  imposterState.imposterIndex = Math.floor(Math.random() * imposterState.playerCount);
  imposterState.hint = document.getElementById('hint-toggle').checked;
  const hintPool = HINTS[imposterState.cat] || ['?'];
  imposterState.hintWord = hintPool[Math.floor(Math.random() * hintPool.length)];
  imposterState.currentPlayer = 0;

  document.getElementById('imposter-setup').classList.add('hidden');
  document.getElementById('imposter-deal').classList.remove('hidden');
  showDealWaiting();
}

function showDealWaiting() {
  document.getElementById('deal-waiting').classList.remove('hidden');
  document.getElementById('deal-card').classList.add('hidden');
  document.getElementById('deal-player-name').textContent = imposterState.players[imposterState.currentPlayer];
}

function showCard() {
  const i = imposterState.currentPlayer;
  const isImposter = i === imposterState.imposterIndex;
  document.getElementById('deal-waiting').classList.add('hidden');
  document.getElementById('deal-card').classList.remove('hidden');
  const card = document.getElementById('player-card');
  const roleEl = document.getElementById('card-role');
  const wordEl = document.getElementById('card-word');
  const hintEl = document.getElementById('card-hint');
  const catEl  = document.getElementById('card-cat');
  card.className = 'card' + (isImposter ? ' imposter-card' : '');
  if (isImposter) {
    roleEl.textContent = '🕵️ Du bist der IMPOSTER!';
    wordEl.textContent = '???';
    if (imposterState.hint) {
      hintEl.classList.remove('hidden');
      hintEl.innerHTML = `Tipp: <span>${imposterState.hintWord}</span>`;
    } else { hintEl.classList.add('hidden'); }
    catEl.textContent = '';
  } else {
    roleEl.textContent = '✅ Du bist ein normaler Spieler';
    wordEl.textContent = imposterState.word;
    hintEl.classList.add('hidden');
    catEl.textContent = CATEGORIES[imposterState.cat]?.label || '';
  }
}

function nextPlayer() {
  imposterState.currentPlayer++;
  if (imposterState.currentPlayer >= imposterState.playerCount) {
    document.getElementById('imposter-deal').classList.add('hidden');
    document.getElementById('imposter-play').classList.remove('hidden');
    startGameTimer();
  } else {
    showDealWaiting();
  }
}

function startGameTimer() {
  const total = imposterState.gameTime * 60;
  imposterState.timerLeft = total;
  const ring = document.getElementById('timer-ring');
  const text = document.getElementById('timer-text');
  const circ = 339.3;
  clearInterval(imposterState.timerInterval);
  function tick() {
    const mins = Math.floor(imposterState.timerLeft / 60);
    const secs = imposterState.timerLeft % 60;
    text.textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
    const pct = imposterState.timerLeft / total;
    ring.style.strokeDashoffset = circ * (1 - pct);
    if (pct < 0.25) { ring.classList.add('urgent'); text.classList.add('urgent'); }
    if (imposterState.timerLeft <= 0) { clearInterval(imposterState.timerInterval); text.textContent = '0:00'; return; }
    imposterState.timerLeft--;
  }
  tick();
  imposterState.timerInterval = setInterval(tick, 1000);
}

function revealImposter() {
  clearInterval(imposterState.timerInterval);
  document.getElementById('imposter-play').classList.add('hidden');
  document.getElementById('imposter-reveal').classList.remove('hidden');
  document.getElementById('reveal-word').textContent = imposterState.word;
  document.getElementById('reveal-imposter').textContent = imposterState.players[imposterState.imposterIndex];
  const list = document.getElementById('reveal-players-list');
  list.innerHTML = '';
  imposterState.players.forEach((name, i) => {
    const isImp = i === imposterState.imposterIndex;
    list.innerHTML += `<div class="player-row${isImp?' is-imposter':''}">
      <span class="player-name">${name}</span>
      <span class="player-tag${isImp?' imposter-tag':''}">${isImp?'🕵️ Imposter':'✅ Normal'}</span>
    </div>`;
  });
}

function resetImposter() {
  clearInterval(imposterState.timerInterval);
  ['imposter-deal','imposter-play','imposter-reveal'].forEach(id => document.getElementById(id).classList.add('hidden'));
  document.getElementById('imposter-setup').classList.remove('hidden');
  renderNameInputs();
}

document.addEventListener('DOMContentLoaded', () => {
  renderNameInputs();
});
