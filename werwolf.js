// ========== WERWOLF ==========
const ROLLEN = [
  { name: 'Werwolf',      emoji: '🐺', desc: 'Du bist ein Werwolf! Jede Nacht wählst du mit den anderen Werwölfen ein Opfer. Bleib tagsüber unerkannt!', team: 'wolf', power: false },
  { name: 'Dorfbewohner', emoji: '🗓️', desc: 'Du bist ein normaler Dorfbewohner. Finde die Werwölfe und votä sie raus!', team: 'village', power: false },
  { name: 'Seherin',      emoji: '🔮', desc: 'Jede Nacht darfst du die Rolle eines Spielers aufdecken. Nutze dein Wissen weise!', team: 'village', power: true },
  { name: 'Hexe',         emoji: '🧛', desc: 'Du hast einen Heiltrank (rettet ein Opfer) und einen Gifttrank (tötet jemanden). Jeder Trank kann nur einmal eingesetzt werden.', team: 'village', power: true },
  { name: 'Jäger',         emoji: '🎯', desc: 'Wenn du stirbst, darfst du sofort jemanden mit in den Tod reißen!', team: 'village', power: true },
  { name: 'Amor',         emoji: '💘', desc: 'In der ersten Nacht verliebt du zwei Spieler. Wenn einer stirbt, stirbt auch der andere.', team: 'village', power: true },
  { name: 'Dorfidiot',    emoji: '🤪', desc: 'Du wirst nie rausgevoted – wenn du enttarnt wirst, verlierst du nur dein Stimmrecht.', team: 'village', power: false },
  { name: 'Hauptmann',    emoji: '🏅', desc: 'Deine Stimme zählt doppelt. Wenn du stirbst, bestimmst du deinen Nachfolger.', team: 'village', power: false },
];

const WERWOLF_CONFIGS = [
  { min: 5,  max: 6,  wolves: 1, special: [] },
  { min: 7,  max: 8,  wolves: 2, special: ['Seherin'] },
  { min: 9,  max: 10, wolves: 2, special: ['Seherin', 'Hexe'] },
  { min: 11, max: 12, wolves: 3, special: ['Seherin', 'Hexe', 'Jäger'] },
  { min: 13, max: 15, wolves: 3, special: ['Seherin', 'Hexe', 'Jäger', 'Amor'] },
  { min: 16, max: 20, wolves: 4, special: ['Seherin', 'Hexe', 'Jäger', 'Amor', 'Dorfidiot'] },
];

let werwolfState = {
  players: 6,
  names: [],
  assignedRoles: [],
  currentDealing: 0,
  customRoles: { seherin: true, hexe: false, jaeger: false, amor: false, dorfidiot: false, hauptmann: false },
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
  document.getElementById('ww-wolf-count').textContent = cfg.wolves;
  document.getElementById('ww-village-count').textContent = n - cfg.wolves;
}

function buildRollenPool() {
  const n = werwolfState.players;
  const cfg = WERWOLF_CONFIGS.find(c => n >= c.min && n <= c.max) || WERWOLF_CONFIGS[WERWOLF_CONFIGS.length-1];
  let pool = [];
  // Wolves
  for (let i = 0; i < cfg.wolves; i++) pool.push('Werwolf');
  // Special roles (based on checkboxes)
  const specials = ['Seherin','Hexe','J\u00e4ger','Amor','Dorfidiot','Hauptmann'];
  const keys = ['seherin','hexe','jaeger','amor','dorfidiot','hauptmann'];
  keys.forEach((k, idx) => {
    if (werwolfState.customRoles[k]) pool.push(specials[idx]);
  });
  // Fill rest with Dorfbewohner
  while (pool.length < n) pool.push('Dorfbewohner');
  // Trim if too many specials
  if (pool.length > n) pool = pool.slice(0, n);
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
  const pool = buildRollenPool();
  werwolfState.assignedRoles = pool;
  werwolfState.currentDealing = 0;
  wwShow('werwolf-deal'); wwHide('werwolf-setup'); wwHide('werwolf-overview'); wwHide('werwolf-guide');
  wwShowDealWaiting();
}

function wwShowDealWaiting() {
  document.getElementById('ww-deal-player-name').textContent = werwolfState.names[werwolfState.currentDealing];
  wwShow('ww-deal-waiting'); wwHide('ww-deal-card');
}

function wwShowCard() {
  const i = werwolfState.currentDealing;
  const roleName = werwolfState.assignedRoles[i];
  const rolle = ROLLEN.find(r => r.name === roleName) || { name: roleName, emoji: '❓', desc: '', team: 'village' };
  const card = document.getElementById('ww-player-card');
  card.className = 'card ' + (rolle.team === 'wolf' ? 'imposter-card' : (rolle.power ? 'power-card' : ''));
  document.getElementById('ww-card-emoji').textContent = rolle.emoji;
  document.getElementById('ww-card-role').textContent = rolle.name;
  document.getElementById('ww-card-desc').textContent = rolle.desc;
  wwHide('ww-deal-waiting'); wwShow('ww-deal-card');
}

function wwNextPlayer() {
  werwolfState.currentDealing++;
  if (werwolfState.currentDealing >= werwolfState.players) wwShowOverview();
  else wwShowDealWaiting();
}

function wwShowOverview() {
  wwShow('werwolf-overview'); wwHide('werwolf-deal');
  const list = document.getElementById('ww-overview-list');
  list.innerHTML = '';
  werwolfState.names.forEach((name, i) => {
    const roleName = werwolfState.assignedRoles[i];
    const rolle = ROLLEN.find(r => r.name === roleName) || { emoji: '❓', team: 'village', power: false };
    const row = document.createElement('div');
    row.className = 'player-row';
    row.innerHTML = `<span class="player-name">${rolle.emoji} ${name}</span><span class="player-tag">${roleName}</span>`;
    list.appendChild(row);
  });
  // Role summary
  const counts = {};
  werwolfState.assignedRoles.forEach(r => counts[r] = (counts[r]||0)+1);
  const summary = document.getElementById('ww-role-summary');
  summary.innerHTML = Object.entries(counts).map(([r,c]) => {
    const ro = ROLLEN.find(x => x.name===r);
    return `<span class="role-badge ${ro && ro.team==='wolf'?'wolf-badge':ro&&ro.power?'power-badge':''}'">${ro?ro.emoji:'❓'} ${r}${c>1?' ×'+c:''}</span>`;
  }).join('');
}

function wwShowGuide() {
  wwShow('werwolf-guide'); wwHide('werwolf-overview');
}

function wwBackToOverview() {
  wwShow('werwolf-overview'); wwHide('werwolf-guide');
}

function resetWerwolf() {
  wwShow('werwolf-setup'); wwHide('werwolf-deal'); wwHide('werwolf-overview'); wwHide('werwolf-guide');
  werwolfRenderNameInputs();
}

function wwShow(id) { document.getElementById(id).classList.remove('hidden'); }
function wwHide(id) { document.getElementById(id).classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', werwolfRenderNameInputs);
