// ========== WÜRDEST DU EHER ==========
const WDL_CATS = {
  klassik: {
    label: '😅 Klassik',
    emoji: '😅',
    questions: [
      ['einen kleinen Pickel dein Leben lang im Gesicht haben', 'eine kleine Narbe dein Leben lang im Gesicht haben'],
      ['nie wieder duschen dürfen', 'nie wieder die Zähne putzen dürfen'],
      ['immer zu laut sprechen', 'immer zu leise sprechen'],
      ['unsichtbar sein können', 'fliegen können'],
      ['immer lügen müssen', 'nie lügen dürfen'],
      ['100 Jahre alt werden und arm sein', '50 Jahre alt werden und reich sein'],
      ['nie wieder Musik hören', 'nie wieder Filme schauen'],
      ['immer schwitzen', 'immer frieren'],
      ['eine Superkraft haben die du nicht kontrollieren kannst', 'keine Superkraft aber alles unter Kontrolle'],
      ['dein Handy verlieren', 'deine Geldbörse verlieren'],
      ['in der Vergangenheit leben', 'in der Zukunft leben'],
      ['für immer 10 Jahre alt sein', 'für immer 80 Jahre alt sein'],
      ['nur kalte Duschen haben', 'nur langsames Internet haben'],
      ['jeden Tag dasselbe Outfit tragen', 'jeden Tag dasselbe Essen essen'],
      ['mit einem Gorilla kämpfen', 'mit 50 Enten kämpfen'],
      ['alle deine Erinnerungen verlieren', 'alle deine Freunde verlieren'],
      ['jede Nacht albträumen', 'überhaupt nicht schlafen können'],
      ['doppelt so groß sein', 'halb so groß sein'],
      ['eine Sprache perfekt sprechen', '10 Sprachen mittelmäßig sprechen'],
      ['immer müde sein', 'immer aufgedreht sein'],
      ['im Winter frieren', 'im Sommer schwitzen'],
      ['berühmt aber unglücklich sein', 'unbekannt aber glücklich sein'],
      ['jeden Tag Sport machen müssen', 'nie wieder Sport machen dürfen'],
      ['eine Schachtel Lego mit bloßen Füßen überqueren', 'eine Stunde auf einem unbequemen Stuhl sitzen'],
      ['dein ganzes Leben auf dem Land wohnen', 'dein ganzes Leben in der Stadt wohnen'],
      ['immer das Falsche sagen', 'immer das Richtige denken aber schweigen'],
      ['ein brillantes Gedächtnis haben', 'körperlich sehr stark sein'],
      ['rückwärts gehen müssen wenn du lügst', 'laut singen müssen wenn du lügst'],
      ['Gedanken lesen können', 'die Zukunft sehen können'],
      ['immer der Erste sein', 'immer der Letzte sein'],
    ]
  },
  freunde: {
    label: '👫 Freunde & Soziales',
    emoji: '👫',
    questions: [
      ['mit deinem besten Freund streiten', 'deinen besten Freund 1 Jahr nicht sehen'],
      ['alle deine Follower verlieren', 'alle deine Fotos verlieren'],
      ['auf einer Party der Mittelpunkt sein', 'auf einer Party unbemerkt bleiben'],
      ['einen peinlichen Moment mit Fremden erleben', 'einen peinlichen Moment vor Freunden erleben'],
      ['mit 10 guten Bekannten feiern', 'mit 2 besten Freunden feiern'],
      ['immer ehrlich zu Freunden sein auch wenn es wehtut', 'manchmal lügen um Freunde zu schonen'],
      ['von allen gemocht werden aber keinen besten Freund haben', 'einen besten Freund haben aber von vielen nicht gemocht werden'],
      ['Nachrichten nie beantworten', 'sofort auf jede Nachricht antworten müssen'],
      ['immer zu spät kommen', 'immer viel zu früh kommen'],
      ['nie wieder Social Media nutzen', 'nie wieder Partys besuchen'],
      ['ein Geheimnis deines Freundes verraten', 'deinen Freund in einer wichtigen Situation im Stich lassen'],
      ['immer der Gruppenclown sein', 'immer der ernste der Gruppe sein'],
      ['auf einer WG mit 10 Leuten leben', 'alleine wohnen mit sehr kleiner Wohnung'],
      ['Freunde immer überraschen', 'immer von Freunden überrascht werden'],
      ['dein Handy für eine Woche abgeben', 'deine Freunde für eine Woche nicht sehen'],
    ]
  },
  extrem: {
    label: '🔥 Extrem & Mutig',
    emoji: '🔥',
    questions: [
      ['aus einem Flugzeug springen', 'auf einem Hai surfen'],
      ['24 Stunden in einem Spukhaus verbringen', '24 Stunden in einem Erdloch verbringen'],
      ['eine Schlange um den Hals tragen', 'eine Spinne in der Hand halten'],
      ['mit 200 km/h Achterbahn fahren', 'mit 200 km/h Boot fahren'],
      ['auf einem Gletscher schlafen', 'in der Wüste schlafen'],
      ['eine Woche ohne Essen auskommen', 'eine Woche ohne Schlaf auskommen'],
      ['eine lebende Heuschrecke essen', 'eine lebende Raupe essen'],
      ['in einem Käfig mit einem Löwen sitzen', 'im Wasser mit einem Weißen Hai schwimmen'],
      ['von einer Klippe ins Meer springen (10m)', 'eine Brücke mit Bungeeseil überspringen (50m)'],
      ['deine größte Angst ein Mal überwinden', 'deine zweitgrößte Angst für immer haben'],
      ['einen Monat in der Wildnis überleben', 'einen Monat auf einem einsamen Schiff auf dem Meer sein'],
      ['mit einem Skorpion in einem Schlafsack schlafen', 'mit 100 Spinnen in einem Zimmer schlafen'],
      ['10 Meter tief tauchen ohne Ausrüstung', 'auf einem 10m-Sprungbrett stehen ohne zu springen'],
      ['kostenlos Fallschirmspringen', 'kostenlos Wildwasser-Rafting'],
      ['blindlings eine fremde Mahlzeit essen', 'blindlings in einem fremden Land landen'],
    ]
  },
  schule: {
    label: '📚 Schule & Alltag',
    emoji: '📚',
    questions: [
      ['jede Prüfung bestehen aber nichts verstehen', 'alles verstehen aber jede Prüfung knapp nicht bestehen'],
      ['immer Hausaufgaben vergessen', 'immer zu spät in die Schule kommen'],
      ['der klügste in der Schule sein aber keine Freunde haben', 'viele Freunde haben aber schlechte Noten'],
      ['eine Klasse wiederholen', 'eine Klasse überspringen und nichts verstehen'],
      ['einen strengen aber guten Lehrer haben', 'einen netten aber schlechten Lehrer haben'],
      ['jede Schulstunde vorne sitzen', 'jede Schulstunde hinten sitzen'],
      ['eine Stunde früher aufstehen', 'eine Stunde später Schluss machen'],
      ['Mathe-Genie sein', 'Sprachen-Genie sein'],
      ['Schulsprecher sein', 'der beliebteste Schüler sein ohne Amt'],
      ['eine Woche keine Hausaufgaben machen', 'eine Woche nicht in die Schule gehen müssen'],
      ['in einem Schultheaterstück die Hauptrolle spielen', 'in einer Schulband auftreten'],
      ['immer die Antwort wissen aber nie drankommen', 'immer drankommen aber nie die Antwort wissen'],
      ['in einer Klasse mit deinen besten Freunden sein aber schlechte Lehrer haben', 'top Lehrer haben aber keine Freunde in der Klasse'],
      ['nur digitale Bücher haben', 'nur schwere physische Bücher haben'],
      ['Schulessen selbst kochen', 'Schulessen jeden Tag kaufen'],
    ]
  },
  fortnite: {
    label: '🎮 Fortnite',
    emoji: '🎮',
    questions: [
      ['immer als erster aus dem Battle Bus springen', 'immer als letzter springen'],
      ['nur eine Pump Shotgun haben', 'nur ein Sturmgewehr haben'],
      ['in Tilted Towers landen', 'in Pleasant Park landen'],
      ['immer alleine spielen (Solo)', 'immer mit zufälligen Spielern (Fill) spielen'],
      ['ein Sniper One-Shot sein', 'ein Shotgun Headshot sein'],
      ['nie bauen dürfen', 'nie schießen dürfen nur bauen'],
      ['den Sturm ignorieren und Loot sammeln', 'sofort in die Mitte rennen ohne Loot'],
      ['immer auf Platz 2 landen', 'einmal gewinnen und dann für immer aufhören'],
      ['Peely als fester Skin', 'Fishstick als fester Skin'],
      ['Zero Build spielen', 'nur Classic mit Building spielen'],
      ['Battle Pass immer komplett machen', 'nie Battle Pass kaufen aber vbucks sparen'],
      ['Midas Berührung haben – alles wird Gold', 'Jonesy sein – immer mittelmäßig'],
      ['nur mit dem Battle Bus landen', 'immer vom stärksten Sturm getroffen werden'],
      ['auf einem Shopping Cart durch die Map fahren', 'auf einem Motorrad durch die Map fahren'],
      ['immer den schlechtesten Loot finden', 'immer im letzten Kreis ohne Heilitems sein'],
    ]
  },
  brawlstars: {
    label: '🌟 Brawl Stars',
    emoji: '🌟',
    questions: [
      ['immer als Shelly spielen', 'immer als El Primo spielen'],
      ['in Gem Grab immer die Gems halten müssen', 'in Showdown immer als letzter spawnen'],
      ['Jacky als Haupt-Brawler', 'Frank als Haupt-Brawler'],
      ['nie mehr Gadgets benutzen dürfen', 'nie mehr Star Powers benutzen dürfen'],
      ['immer Solo Showdown spielen', 'immer Duo Showdown mit einem Random spielen'],
      ['Brawl Ball immer als Torwart spielen', 'Brawl Ball immer als Stürmer spielen'],
      ['immer in Bronze Trophy Road stecken', 'Power League spielen aber immer verlieren'],
      ['Mega Box öffnen', '3 normale Boxen öffnen'],
      ['einen Legendary Brawler zufällig bekommen', 'deinen Lieblings-Brawler selbst wählen aber nur Epic'],
      ['in Heist immer den Safe angreifen', 'in Heist immer den Safe verteidigen'],
      ['Edgar Rush-Spieler sein', 'Piper Sniper-Spieler sein'],
      ['Club League mit schlechten Mitgliedern spielen', 'ohne Club spielen'],
      ['immer 1v3 in Showdown starten', 'immer mit vollen Leben starten aber kein Power-Up'],
      ['Starr Park für immer besuchen', 'nie wieder Events spielen können'],
      ['immer Tick als Support', 'immer Barley als Support'],
    ]
  },
  spicy: {
    label: '🌶️ Spicy (18+)',
    emoji: '🌶️',
    questions: [
      ['nie wieder Sex haben', 'nie wieder Alkohol trinken'],
      ['deinen Ex wieder daten', 'für immer Single bleiben'],
      ['eine Nacht mit deinem Chef verbringen', 'deinen Job verlieren'],
      ['auf einer Nacktparty sein', 'in der Sauna mit deinen Eltern sitzen'],
      ['deinen schlimmsten Kuss nochmal erleben', 'deinen besten Kuss mit einer anderen Person wiederholen'],
      ['ein Sextape von dir entdeckt werden', 'dein Suchverlauf von allen gesehen werden'],
      ['Stripclub besuchen', 'einen Strip für jemanden machen'],
      ['für immer nur Quickies', 'für immer nur langsamen Sex'],
      ['mit 20 Personen geschlafen haben', 'mit einer Person geschlafen haben die du nicht magst'],
      ['immer derjenige sein der anfängt', 'immer derjenige sein der aufhört'],
      ['3 Stunden Vorspiel ohne mehr', 'direkt zum Punkt in 5 Minuten'],
      ['Handschellen ausprobieren', 'Rollenspiel ausprobieren'],
      ['nackt kochen', 'nackt einkaufen gehen'],
      ['dein attraktivstes Date nochmal sehen', 'dein schlechtestes Date vergessen können'],
      ['immer zu offensiv flirten', 'nie den ersten Schritt machen'],
    ]
  }
};

let wdl = {
  activeCats: ['klassik','freunde'],
  usedKeys: {},
  totalAnswered: 0,
};

function wdlInit() {
  wdlRenderCats();
}

function wdlRenderCats() {
  const box = document.getElementById('wdl-cat-checks');
  if (!box) return;
  box.innerHTML = '';
  Object.entries(WDL_CATS).forEach(([key, cat]) => {
    const isActive = wdl.activeCats.includes(key);
    const label = document.createElement('label');
    label.className = 'splash-cat-card wdl-cat-' + key + (isActive ? ' active-cat' : '');
    label.innerHTML = `
      <input type="checkbox" ${isActive ? 'checked' : ''} onchange="wdlToggleCat('${key}')" />
      <span class="scc-emoji">${cat.emoji}</span>
      <span class="scc-label">${cat.label.replace(/^[^\s]+ /, '')}</span>
    `;
    box.appendChild(label);
  });
}

function wdlToggleCat(key) {
  if (wdl.activeCats.includes(key)) {
    if (wdl.activeCats.length > 1) wdl.activeCats = wdl.activeCats.filter(c => c !== key);
  } else {
    wdl.activeCats.push(key);
  }
  wdlRenderCats();
}

function startWDL() {
  wdl.usedKeys = {};
  wdl.activeCats.forEach(k => { wdl.usedKeys[k] = []; });
  wdl.totalAnswered = 0;

  document.getElementById('wdl-setup').classList.add('hidden');
  document.getElementById('wdl-game').classList.remove('hidden');
  document.getElementById('wdl-result').classList.add('hidden');
  wdlNextQuestion();
}

function wdlPickQuestion() {
  const cats = [...wdl.activeCats].sort(() => Math.random() - .5);
  for (const cat of cats) {
    const qs = WDL_CATS[cat].questions;
    const used = wdl.usedKeys[cat] || [];
    const available = qs.map((_,i) => i).filter(i => !used.includes(i));
    if (available.length > 0) {
      const idx = available[Math.floor(Math.random() * available.length)];
      wdl.usedKeys[cat].push(idx);
      return { cat, q: qs[idx] };
    }
  }
  wdl.activeCats.forEach(k => { wdl.usedKeys[k] = []; });
  return wdlPickQuestion();
}

function wdlNextQuestion() {
  const picked = wdlPickQuestion();

  const optA = document.getElementById('wdl-opt-a');
  const optB = document.getElementById('wdl-opt-b');
  const catBadge = document.getElementById('wdl-cat-badge');
  const counter = document.getElementById('wdl-counter');
  const nextBtn = document.getElementById('wdl-next-btn');
  const card = document.getElementById('wdl-card');

  wdl.totalAnswered++;
  if (counter) counter.textContent = wdl.totalAnswered;
  if (catBadge) catBadge.textContent = WDL_CATS[picked.cat].label;

  // Reset styles
  card.classList.remove('wdl-chosen-a', 'wdl-chosen-b');
  optA.className = 'wdl-option-card wdl-option-a';
  optB.className = 'wdl-option-card wdl-option-b';
  optA.disabled = false;
  optB.disabled = false;

  // Set text (without emoji prefix)
  document.getElementById('wdl-opt-a-text').textContent = picked.q[0];
  document.getElementById('wdl-opt-b-text').textContent = picked.q[1];

  // Hide next button
  nextBtn.classList.add('hidden');

  // Animate card in
  card.classList.remove('wdl-card-pop');
  void card.offsetWidth;
  card.classList.add('wdl-card-pop');
}

function wdlChoose(side) {
  const optA = document.getElementById('wdl-opt-a');
  const optB = document.getElementById('wdl-opt-b');
  const nextBtn = document.getElementById('wdl-next-btn');

  optA.disabled = true;
  optB.disabled = true;

  if (side === 'a') {
    optA.classList.add('wdl-option-chosen');
    optB.classList.add('wdl-option-dimmed');
  } else {
    optB.classList.add('wdl-option-chosen');
    optA.classList.add('wdl-option-dimmed');
  }

  nextBtn.classList.remove('hidden');
}

function resetWDL() {
  document.getElementById('wdl-game').classList.add('hidden');
  document.getElementById('wdl-result').classList.add('hidden');
  document.getElementById('wdl-setup').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', wdlInit);
