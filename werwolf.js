// ========== WERWOLF ==========
const ROLLEN = [
  { name: 'Werwolf',       emoji: '🐺', desc: 'Du bist ein Werwolf! Jede Nacht wählst du mit den anderen Werwölfen ein Opfer. Bleib tagsüber unerkannt!', team: 'wolf', power: false },
  { name: 'Dorfbewohner',  emoji: '🧑‍🌾', desc: 'Du bist ein normaler Dorfbewohner. Diskutiere, beobachte und votiere die Werwölfe raus!', team: 'village', power: false },
  { name: 'Seherin',       emoji: '🔮', desc: 'Jede Nacht darfst du die Rolle eines Spielers aufdecken. Nutze dein Wissen weise – ohne dich zu verraten!', team: 'village', power: true },
  { name: 'Hexe',          emoji: '🧝‍♀️', desc: 'Du hast einen Heiltrank (rettet das Nacht-Opfer) und einen Gifttrank (tötet jemanden). Jeder Trank kann nur einmal eingesetzt werden.', team: 'village', power: true },
  { name: 'Amor',          emoji: '💘', desc: 'In der ersten Nacht verliebt du zwei Spieler. Wenn einer stirbt, stirbt auch der andere – selbst wenn einer ein Werwolf ist!', team: 'village', power: true },
  { name: 'Jäger',          emoji: '🎯', desc: 'Wenn du stirbst, darfst du sofort jemanden mit in den Tod reißen. Dein letzter Schuss!', team: 'village', power: true },
  { name: 'Dieb',          emoji: '🥷', desc: 'Zu Spielbeginn liegen 2 Zusatzkarten verdeckt aus. Du darfst eine nehmen und damit deine Rolle tauschen – auch gegen einen Werwolf!', team: 'village', power: true },
  { name: 'Dorfmatratze',  emoji: '🛌', desc: 'Du bist die Dorfmatratze! Jeder weiß, wer du bist – du liegst allen auf der Tasche. Kannst du trotzdem überleben?', team: 'village', power: false },
  { name: 'Bürgermeister', emoji: '🌿', desc: 'Du bist der Bürgermeister! Deine Stimme zählt doppelt bei der Abstimmung. Wenn du stirbst, bestimmst du heimlich deinen Nachfolger.', team: 'village', power: true },
];

const WERWOLF_CONFIGS = [
  { min: 5,  max: 6,  wolves: 1 },
  { min: 7,  max: 8,  wolves: 2 },
  { min: 9,  max: 10, wolves: 2 },
  { min: 11, max: 12, wolves: 3 },
  { min: 13, max: 15, wolves: 3 },
  { min: 16, max: 20, wolves: 4 },
];

const SONDER_ROLLEN = [
  { key: 'seherin',        name: 'Seherin',       emoji: '🔮',         default: false },
  { key: 'hexe',           name: 'Hexe',          emoji: '🧝‍♀️',     default: true  },
  { key: 'amor',           name: 'Amor',          emoji: '💘',         default: true  },
  { key: 'jaeger',         name: 'Jäger',          emoji: '🎯',         default: false },
  { key: 'dieb',           name: 'Dieb',          emoji: '🥷',         default: false },
  { key: 'dorfmatratze',   name: 'Dorfmatratze',  emoji: '🛌',         default: false },
  { key: 'buergermeister', name: 'Bürgermeister', emoji: '🌿', default: false, extra: true },
];

let werwolfState = {
  players: 6,
  names: [],
  assignedRoles: [],
  currentDealing: 0,
  customRoles: Object.fromEntries(SONDER_ROLLEN.map(r => [r.key, r.default])),
  timerInterval: null
};

function werwolfRenderNameInputs() {
  const container = document.getElementById('werwolf-name-inputs');
  container.innerHTML = '';
  for (let i = 0; i < werwolfState.players; i++) {
    const row = document.createElement('div');
    row.className = 'name-row';
    row.innerHTML = `<label>Spieler ${i+1}</label><input type="text" id="ww-name-${i}" placeholder="Name eingeben" maxlength="20" />`;
    container.appendChild(row);
  }
  werwolfState.names.forEach((n, i) => { const el = document.getElementById('ww-name-'+i); if (el) el.value = n; });
  updateWerwolfRollenInfo();
}

function changeWWCount(delta) {
  werwolfState.players = Math.max(5, Math.min(20, werwolfState.players + delta));
  document.getElementById('ww-player-count').textContent = werwolfState.players;
  werwolfRenderNameInputs();
}

function updateWerwolfRollenInfo() {
  const n = werwolfState.players;
  const cfg = WERWOLF_CONFIGS.find(c => n >= c.min && n <= c.max) || WERWOLF_CONFIGS[WERWOLF_CONFIGS.length-1];
  const activeSpecials = SONDER_ROLLEN.filter(r => !r.extra && werwolfState.customRoles[r.key]).length;
  document.getElementById('ww-wolf-count').textContent = cfg.wolves;
  document.getElementById('ww-special-count').textContent = Math.min(activeSpecials, n - cfg.wolves);
  document.getElementById('ww-village-count').textContent = Math.max(0, n - cfg.wolves - Math.min(activeSpecials, n - cfg.wolves));
}

function buildRollenPool() {
  const n = werwolfState.players;
  const cfg = WERWOLF_CONFIGS.find(c => n >= c.min && n <= c.max) || WERWOLF_CONFIGS[WERWOLF_CONFIGS.length-1];
  let pool = [];
  for (let i = 0; i < cfg.wolves; i++) pool.push('Werwolf');
  SONDER_ROLLEN.filter(r => !r.extra && werwolfState.customRoles[r.key]).forEach(r => pool.push(r.name));
  while (pool.length < n) pool.push('Dorfbewohner');
  if (pool.length > n) pool = pool.slice(0, n);
  // Bürgermeister ersetzt einen Dorfbewohner
  if (werwolfState.customRoles['buergermeister']) {
    const idx = pool.lastIndexOf('Dorfbewohner');
    if (idx !== -1) pool[idx] = 'Bürgermeister';
  }
  // Shuffle
  for (let i = pool.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

function toggleWWRole(key) {
  werwolfState.customRoles[key] = document.getElementById('ww-role-'+key).checked;
  updateWerwolfRollenInfo();
}

function startWerwolf() {
  werwolfState.names = [];
  for (let i = 0; i < werwolfState.players; i++) {
    const el = document.getElementById('ww-name-' + i);
    werwolfState.names.push(el && el.value.trim() ? el.value.trim() : 'Spieler '+(i+1));
  }
  werwolfState.assignedRoles = buildRollenPool();
  werwolfState.currentDealing = 0;
  wwShow('werwolf-deal');
  wwHide('werwolf-setup'); wwHide('werwolf-overview'); wwHide('werwolf-guide');
  wwShowDealWaiting();
}

// ---- DEAL (identical flow to Imposter) ----
function wwShowDealWaiting() {
  document.getElementById('ww-deal-player-name').textContent = werwolfState.names[werwolfState.currentDealing];
  wwShow('ww-deal-waiting');
  wwHide('ww-deal-card');
}

function wwShowCard() {
  const i = werwolfState.currentDealing;
  const roleName = werwolfState.assignedRoles[i];
  const rolle = ROLLEN.find(r => r.name === roleName) || { name: roleName, emoji: '❓', desc: '', team: 'village', power: false };
  const card = document.getElementById('ww-player-card');
  // Card style: wolf = imposter-card (rot), power = power-card (gold), normal = default
  card.className = 'card ' + (rolle.team === 'wolf' ? 'imposter-card' : (rolle.power ? 'power-card' : ''));
  document.getElementById('ww-card-emoji').textContent = rolle.emoji;
  document.getElementById('ww-card-role').textContent = rolle.name;
  document.getElementById('ww-card-sub').textContent = rolle.team === 'wolf' ? '🐺 Du bist ein Werwolf!' : '✅ Du gehörst zum Dorf';
  document.getElementById('ww-card-desc').textContent = rolle.desc;
  wwHide('ww-deal-waiting');
  wwShow('ww-deal-card');
}

function wwNextPlayer() {
  werwolfState.currentDealing++;
  if (werwolfState.currentDealing >= werwolfState.players) wwShowOverview();
  else wwShowDealWaiting();
}

// ---- OVERVIEW ----
function wwShowOverview() {
  wwShow('werwolf-overview');
  wwHide('werwolf-deal');
  const list = document.getElementById('ww-overview-list');
  list.innerHTML = '';
  werwolfState.names.forEach((name, i) => {
    const roleName = werwolfState.assignedRoles[i];
    const rolle = ROLLEN.find(r => r.name === roleName) || { emoji: '❓', team: 'village', power: false };
    const row = document.createElement('div');
    row.className = 'player-row' + (rolle.team === 'wolf' ? ' is-imposter' : '');
    row.innerHTML = `<span class="player-name">${rolle.emoji} ${name}</span><span class="player-tag ${rolle.team === 'wolf' ? 'imposter-tag' : ''}">${roleName}</span>`;
    list.appendChild(row);
  });
  const counts = {};
  werwolfState.assignedRoles.forEach(r => counts[r] = (counts[r]||0)+1);
  document.getElementById('ww-role-summary').innerHTML = Object.entries(counts).map(([r,c]) => {
    const ro = ROLLEN.find(x => x.name===r);
    return `<span class="role-badge ${ro && ro.team==='wolf' ? 'wolf-badge' : ro && ro.power ? 'power-badge' : ''}">${ro ? ro.emoji : '❓'} ${r}${c>1 ? ' ×'+c : ''}</span>`;
  }).join('');
}

function wwShowGuide()      { wwShow('werwolf-guide');    wwHide('werwolf-overview'); }
function wwBackToOverview() { wwShow('werwolf-overview'); wwHide('werwolf-guide');    }

function resetWerwolf() {
  wwShow('werwolf-setup');
  wwHide('werwolf-deal'); wwHide('werwolf-overview'); wwHide('werwolf-guide');
  werwolfRenderNameInputs();
}

function wwShow(id) { document.getElementById(id).classList.remove('hidden'); }
function wwHide(id) { document.getElementById(id).classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', werwolfRenderNameInputs);
