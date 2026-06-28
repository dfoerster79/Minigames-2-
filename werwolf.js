// ========== WERWOLF ==========
const ROLLEN = [
  { name: 'Werwolf',       emoji: '🐺', desc: 'Du bist ein Werwolf! Jede Nacht wählst du mit den anderen Werwölfen ein Opfer. Bleib tagsüber unerkannt!', team: 'wolf', power: false },
  { name: 'Dorfbewohner',  emoji: '🧑‍🌾', desc: 'Du bist ein normaler Dorfbewohner. Diskutiere, beobachte und votiere die Werwölfe raus!', team: 'village', power: false },
  { name: 'Seherin',       emoji: '🔮', desc: 'Jede Nacht darfst du die Rolle eines Spielers aufdecken. Nutze dein Wissen weise!', team: 'village', power: true },
  { name: 'Hexe',          emoji: '🧝‍♀️', desc: 'Du hast einen Heiltrank und einen Gifttrank. Jeder einmal einsetzbar.', team: 'village', power: true },
  { name: 'Amor',          emoji: '💘', desc: 'In der ersten Nacht verknüpfst du zwei Spieler. Stirbt einer, stirbt der andere.', team: 'village', power: true },
  { name: 'Jäger',          emoji: '🎯', desc: 'Wenn du stirbst, reißt du jemanden mit.', team: 'village', power: true },
  { name: 'Dieb',          emoji: '🥷', desc: 'Tausche in der ersten Nacht deine Rolle mit einer Zusatzkarte.', team: 'village', power: true },
  { name: 'Dorfmatratze',  emoji: '🛌', desc: 'Jeder weiß wer du bist. Überlebe!', team: 'village', power: false },
  { name: 'Bürgermeister', emoji: '🌿', desc: 'Deine Stimme zählt doppelt. Bestimme bei deinem Tod deinen Nachfolger.', team: 'village', power: true },
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
  { key: 'seherin',        name: 'Seherin',       emoji: '🔮',     default: false },
  { key: 'hexe',           name: 'Hexe',          emoji: '🧝‍♀️', default: true  },
  { key: 'amor',           name: 'Amor',          emoji: '💘',     default: true  },
  { key: 'jaeger',         name: 'Jäger',          emoji: '🎯',     default: false },
  { key: 'dieb',           name: 'Dieb',          emoji: '🥷',     default: false },
  { key: 'dorfmatratze',   name: 'Dorfmatratze',  emoji: '🛌',     default: false },
  { key: 'buergermeister', name: 'Bürgermeister', emoji: '🌿', default: false, extra: true },
];

let ws = {
  players: 6,
  names: [],
  assignedRoles: [],
  currentDealing: 0,
  customRoles: Object.fromEntries(SONDER_ROLLEN.map(r => [r.key, r.default])),
  // Spielstatus
  dead: [],           // indices of dead players
  lovers: [],         // [idx, idx] or []
  hexeHeil: true,
  hexeGift: true,
  mayorIdx: -1,
  round: 0,
  nightVictim: -1,    // chosen by wolves
  seherinResult: null,// { idx, role }
  hexeAction: null,   // 'heal' | 'poison' | 'skip'
  poisonTarget: -1,
  jaegerMode: false,  // waiting for hunter shot
  jaegerVictim: -1,
  // night phase control
  nightStep: 0,
  diebCards: [],
};

// ===================== SETUP =====================
function werwolfRenderNameInputs() {
  const c = document.getElementById('werwolf-name-inputs');
  c.innerHTML = '';
  for (let i = 0; i < ws.players; i++) {
    const row = document.createElement('div');
    row.className = 'name-row';
    row.innerHTML = `<label>Spieler ${i+1}</label><input type="text" id="ww-name-${i}" placeholder="Name eingeben" maxlength="20" />`;
    c.appendChild(row);
  }
  ws.names.forEach((n,i) => { const el = document.getElementById('ww-name-'+i); if(el) el.value=n; });
  updateWerwolfRollenInfo();
}

function changeWWCount(delta) {
  ws.players = Math.max(5, Math.min(20, ws.players + delta));
  document.getElementById('ww-player-count').textContent = ws.players;
  werwolfRenderNameInputs();
}

function updateWerwolfRollenInfo() {
  const n = ws.players;
  const cfg = WERWOLF_CONFIGS.find(c => n>=c.min&&n<=c.max)||WERWOLF_CONFIGS[WERWOLF_CONFIGS.length-1];
  const activeSpecials = SONDER_ROLLEN.filter(r=>!r.extra&&ws.customRoles[r.key]).length;
  document.getElementById('ww-wolf-count').textContent = cfg.wolves;
  document.getElementById('ww-special-count').textContent = Math.min(activeSpecials, n-cfg.wolves);
  document.getElementById('ww-village-count').textContent = Math.max(0, n-cfg.wolves-Math.min(activeSpecials, n-cfg.wolves));
}

function toggleWWRole(key) {
  ws.customRoles[key] = document.getElementById('ww-role-'+key).checked;
  updateWerwolfRollenInfo();
}

function buildRollenPool() {
  const n = ws.players;
  const cfg = WERWOLF_CONFIGS.find(c => n>=c.min&&n<=c.max)||WERWOLF_CONFIGS[WERWOLF_CONFIGS.length-1];
  let pool = [];
  for(let i=0;i<cfg.wolves;i++) pool.push('Werwolf');
  SONDER_ROLLEN.filter(r=>!r.extra&&ws.customRoles[r.key]).forEach(r=>pool.push(r.name));
  while(pool.length<n) pool.push('Dorfbewohner');
  if(pool.length>n) pool=pool.slice(0,n);
  if(ws.customRoles['buergermeister']) {
    const idx=pool.lastIndexOf('Dorfbewohner');
    if(idx!==-1) pool[idx]='Bürgermeister';
  }
  for(let i=pool.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
  return pool;
}

// ===================== START & DEAL =====================
function startWerwolf() {
  ws.names=[];
  for(let i=0;i<ws.players;i++) {
    const el=document.getElementById('ww-name-'+i);
    ws.names.push(el&&el.value.trim()?el.value.trim():'Spieler '+(i+1));
  }
  ws.assignedRoles=buildRollenPool();
  ws.currentDealing=0;
  ws.dead=[]; ws.lovers=[]; ws.hexeHeil=true; ws.hexeGift=true;
  ws.mayorIdx=ws.assignedRoles.indexOf('Bürgermeister');
  ws.round=0; ws.nightVictim=-1;
  // Dieb-Zusatzkarten (2 extra Dorfbewohner-like)
  ws.diebCards=['Dorfbewohner','Dorfbewohner'];
  wwShowOnly('werwolf-deal');
  wwShowDealWaiting();
}

function wwShowDealWaiting() {
  document.getElementById('ww-deal-player-name').textContent = ws.names[ws.currentDealing];
  wwShow('ww-deal-waiting'); wwHide('ww-deal-card');
}

function wwShowCard() {
  const i=ws.currentDealing;
  const roleName=ws.assignedRoles[i];
  const rolle=ROLLEN.find(r=>r.name===roleName)||{name:roleName,emoji:'❓',desc:'',team:'village',power:false};
  const card=document.getElementById('ww-player-card');
  card.className='card '+(rolle.team==='wolf'?'imposter-card':rolle.power?'power-card':'');
  document.getElementById('ww-card-emoji').textContent=rolle.emoji;
  document.getElementById('ww-card-role').textContent=rolle.name;
  document.getElementById('ww-card-sub').textContent=rolle.team==='wolf'?'🐺 Du bist ein Werwolf!':'✅ Du gehörst zum Dorf';
  document.getElementById('ww-card-desc').textContent=rolle.desc;
  wwHide('ww-deal-waiting'); wwShow('ww-deal-card');
}

function wwNextPlayer() {
  ws.currentDealing++;
  if(ws.currentDealing>=ws.players) startNightPhase();
  else wwShowDealWaiting();
}

// ===================== NIGHT PHASE =====================
function startNightPhase() {
  ws.round++;
  ws.nightVictim=-1;
  ws.hexeAction=null;
  ws.poisonTarget=-1;
  ws.seherinResult=null;
  ws.nightStep=0;
  wwShowOnly('werwolf-night');
  runNightStep();
}

function runNightStep() {
  // Build sequence of active night steps
  const steps = buildNightSteps();
  if(ws.nightStep>=steps.length) { nightPhaseEnd(); return; }
  steps[ws.nightStep]();
}

function buildNightSteps() {
  const alive = aliveIndices();
  const steps = [];

  // 1. Alle schlafen ein (immer)
  steps.push(showAllSleep);

  // 2. Amor (nur Runde 1)
  if(ws.round===1 && ws.assignedRoles.includes('Amor') && alive.some(i=>ws.assignedRoles[i]==='Amor')) {
    steps.push(showAmorPhase);
  }

  // 3. Dieb (nur Runde 1)
  if(ws.round===1 && ws.assignedRoles.includes('Dieb') && alive.some(i=>ws.assignedRoles[i]==='Dieb')) {
    steps.push(showDiebPhase);
  }

  // 4. Werwölfe
  steps.push(showWolfPhase);

  // 5. Seherin (wenn aktiv & am Leben)
  if(ws.customRoles['seherin'] && alive.some(i=>ws.assignedRoles[i]==='Seherin')) {
    steps.push(showSeherinPhase);
  }

  // 6. Hexe (wenn aktiv & am Leben & noch Tränke)
  if(ws.customRoles['hexe'] && alive.some(i=>ws.assignedRoles[i]==='Hexe') && (ws.hexeHeil||ws.hexeGift)) {
    steps.push(showHexePhase);
  }

  // 7. Alle aufwachen
  steps.push(showAllWake);

  return steps;
}

function nightNext() {
  ws.nightStep++;
  runNightStep();
}

// --- Alle schlafen ein ---
function showAllSleep() {
  setNightScreen(
    '🌙', 'Nacht ' + ws.round,
    'Alle schließen die Augen und schlafen ein...',
    null, null,
    [{ label: 'Weiter →', fn: 'nightNext()' }]
  );
}

// --- Alle aufwachen ---
function showAllWake() {
  setNightScreen(
    '☀️', 'Morgengrauen',
    'Alle öffnen die Augen!',
    null, null,
    [{ label: 'Zum Tagesablauf →', fn: 'startDayPhase()' }]
  );
}

// --- Amor ---
function showAmorPhase() {
  if(ws.lovers.length>0) { nightNext(); return; }
  const amorIdx = aliveIndices().find(i=>ws.assignedRoles[i]==='Amor');
  setNightScreen(
    '💘', 'Amor erwacht',
    ws.names[amorIdx] + ' öffnet die Augen und wählt zwei Spieler, die sich verlieben.',
    buildPlayerSelector('amor', 2, aliveIndices()),
    null,
    [{ label: 'Bestätigen & schlafen', fn: 'confirmAmor()' }]
  );
}

function confirmAmor() {
  const selected = getSelected('amor');
  if(selected.length!==2) { alert('Bitte genau 2 Spieler auswählen!'); return; }
  ws.lovers = selected;
  nightNext();
}

// --- Dieb ---
function showDiebPhase() {
  const diebIdx = aliveIndices().find(i=>ws.assignedRoles[i]==='Dieb');
  const cards = ws.diebCards;
  setNightScreen(
    '🥷', 'Dieb erwacht',
    ws.names[diebIdx] + ' schaut die Zusatzkarten an: ' + cards[0] + ' & ' + cards[1] + '. Möchte der Dieb tauschen?',
    null,
    `<div class="night-choice-row">
      <button class="btn-secondary" onclick="confirmDieb(0)">Karte 1: ${cards[0]}</button>
      <button class="btn-secondary" onclick="confirmDieb(1)">Karte 2: ${cards[1]}</button>
      <button class="btn-ghost" onclick="confirmDieb(-1)">Nicht tauschen</button>
    </div>`,
    []
  );
}

function confirmDieb(cardIdx) {
  if(cardIdx>=0) {
    const diebIdx=aliveIndices().find(i=>ws.assignedRoles[i]==='Dieb');
    ws.assignedRoles[diebIdx]=ws.diebCards[cardIdx];
  }
  nightNext();
}

// --- Werwölfe ---
function showWolfPhase() {
  const wolfNames = aliveIndices().filter(i=>ws.assignedRoles[i]==='Werwolf').map(i=>ws.names[i]).join(', ');
  const targets = aliveIndices().filter(i=>ws.assignedRoles[i]!=='Werwolf');
  setNightScreen(
    '🐺', 'Werwölfe erwachen',
    'Die Werwölfe (' + wolfNames + ') öffnen die Augen und wählen ihr Opfer.',
    buildPlayerSelector('wolf', 1, targets),
    null,
    [{ label: 'Opfer festlegen & schlafen', fn: 'confirmWolf()' }]
  );
}

function confirmWolf() {
  const selected=getSelected('wolf');
  if(selected.length!==1) { alert('Bitte genau 1 Opfer auswählen!'); return; }
  ws.nightVictim=selected[0];
  nightNext();
}

// --- Seherin ---
function showSeherinPhase() {
  const sIdx=aliveIndices().find(i=>ws.assignedRoles[i]==='Seherin');
  const targets=aliveIndices().filter(i=>i!==sIdx);
  setNightScreen(
    '🔮', 'Seherin erwacht',
    ws.names[sIdx] + ' öffnet die Augen und zeigt auf eine Person. Der Spielleiter zeigt ihr die Rolle.',
    buildPlayerSelector('seherin', 1, targets),
    null,
    [{ label: 'Rolle anzeigen', fn: 'confirmSeherin()' }]
  );
}

function confirmSeherin() {
  const selected=getSelected('seherin');
  if(selected.length!==1) { alert('Bitte eine Person auswählen!'); return; }
  const idx=selected[0];
  ws.seherinResult={idx, role:ws.assignedRoles[idx]};
  const rolle=ROLLEN.find(r=>r.name===ws.assignedRoles[idx])||{emoji:'❓'};
  setNightScreen(
    '🔮', 'Seherin – Ergebnis',
    ws.names[idx] + ' ist:',
    null,
    `<div class="reveal-card" style="margin:12px 0">
       <div style="font-size:2.5rem">${rolle.emoji}</div>
       <div class="card-word" style="font-size:1.6rem">${ws.assignedRoles[idx]}</div>
     </div>`,
    [{ label: 'Augen schließen & weiter', fn: 'nightNext()' }]
  );
}

// --- Hexe ---
function showHexePhase() {
  const hIdx=aliveIndices().find(i=>ws.assignedRoles[i]==='Hexe');
  const victimName=ws.nightVictim>=0?ws.names[ws.nightVictim]:'niemand';
  const rolle=ws.nightVictim>=0?ROLLEN.find(r=>r.name===ws.assignedRoles[ws.nightVictim])||{emoji:'❓'}:null;
  let btns=[];
  if(ws.hexeHeil&&ws.nightVictim>=0) btns.push({ label: '💚 Heiltrank einsetzen (rettet '+victimName+')', fn: 'confirmHexe("heal")' });
  if(ws.hexeGift) btns.push({ label: '☠️ Gifttrank einsetzen', fn: 'showHexeGift()' });
  btns.push({ label: 'Keine Tränke einsetzen', fn: 'confirmHexe("skip")' });
  setNightScreen(
    '🧝‍♀️', 'Hexe erwacht',
    ws.names[hIdx] + ' erwacht. Das heutige Opfer ist: ' + victimName + (rolle?(' '+rolle.emoji):'') + (ws.hexeHeil?' | Heiltrank: ✅':' | Heiltrank: ❌') + (ws.hexeGift?' | Gifttrank: ✅':' | Gifttrank: ❌'),
    null,
    `<div class="night-choice-col">${btns.map(b=>`<button class="btn-secondary night-btn" onclick="${b.fn}">${b.label}</button>`).join('')}</div>`,
    []
  );
}

function showHexeGift() {
  const targets=aliveIndices().filter(i=>ws.assignedRoles[i]!=='Hexe');
  setNightScreen(
    '☠️', 'Hexe – Gifttrank',
    'Wen möchte die Hexe vergiften?',
    buildPlayerSelector('hexe', 1, targets),
    null,
    [{ label: 'Vergiften & schlafen', fn: 'confirmHexeGift()' }]
  );
}

function confirmHexeGift() {
  const selected=getSelected('hexe');
  if(selected.length!==1) { alert('Bitte 1 Ziel auswählen!'); return; }
  ws.poisonTarget=selected[0];
  ws.hexeGift=false;
  ws.hexeAction='poison';
  nightNext();
}

function confirmHexe(action) {
  if(action==='heal') { ws.hexeHeil=false; ws.hexeAction='heal'; }
  else { ws.hexeAction='skip'; }
  nightNext();
}

// --- Night resolution ---
function nightPhaseEnd() {
  // Apply wolf kill
  let newDead=[];
  let saved=false;
  if(ws.nightVictim>=0) {
    if(ws.hexeAction==='heal') saved=true;
    else newDead.push(ws.nightVictim);
  }
  // Apply poison
  if(ws.poisonTarget>=0 && !newDead.includes(ws.poisonTarget)) newDead.push(ws.poisonTarget);
  // Lovers: if one dies, other dies too
  if(ws.lovers.length===2) {
    newDead.forEach(d=>{
      if(ws.lovers.includes(d)) {
        const other=ws.lovers.find(l=>l!==d);
        if(!newDead.includes(other)&&!ws.dead.includes(other)) newDead.push(other);
      }
    });
  }
  newDead.forEach(d=>{ if(!ws.dead.includes(d)) ws.dead.push(d); });
  showAllWake();
}

// ===================== DAY PHASE =====================
function startDayPhase() {
  // Check win first
  if(checkWin()) return;
  wwShowOnly('werwolf-day');
  renderDayScreen();
}

function renderDayScreen() {
  const newDead = ws.dead.filter(d=>!ws._prevDead||!ws._prevDead.includes(d));
  ws._prevDead = [...ws.dead];

  // Announcement
  let annHtml = '';
  if(newDead.length===0) {
    annHtml = '<div class="day-announce safe">👍 Eine ruhige Nacht! Niemand ist gestorben.</div>';
  } else {
    annHtml = newDead.map(i=>{
      const rolle=ROLLEN.find(r=>r.name===ws.assignedRoles[i])||{emoji:'❓'};
      return `<div class="day-announce dead">💀 ${ws.names[i]} ist gestorben! (${rolle.emoji} ${ws.assignedRoles[i]})</div>`;
    }).join('');
  }
  document.getElementById('ww-day-announce').innerHTML = annHtml;

  // Jaeger check
  const jaegerDead = newDead.find(i=>ws.assignedRoles[i]==='Jäger');
  if(jaegerDead!==undefined && ws.customRoles['jaeger']) {
    showJaegerShot(jaegerDead);
    return;
  }

  // Player status list
  renderPlayerStatus();

  // Voting section
  renderVoting();

  document.getElementById('ww-round-num').textContent = ws.round;
}

function renderPlayerStatus() {
  const list=document.getElementById('ww-player-status');
  list.innerHTML='';
  ws.names.forEach((name,i)=>{
    const dead=ws.dead.includes(i);
    const row=document.createElement('div');
    row.className='player-row'+(dead?' dead-row':'');
    const rolle=ROLLEN.find(r=>r.name===ws.assignedRoles[i])||{emoji:'❓'};
    row.innerHTML=`<span class="player-name">${dead?'☠️':rolle.emoji} ${name}</span><span class="player-tag">${dead?'❌ Tot':ws.assignedRoles[i]}</span>`;
    list.appendChild(row);
  });
}

function renderVoting() {
  const section=document.getElementById('ww-vote-section');
  section.innerHTML='<div class="section-title">Abstimmung – Wen verbannt das Dorf?</div>';
  const alive=aliveIndices();
  alive.forEach(i=>{
    const btn=document.createElement('button');
    btn.className='player-vote-btn';
    btn.innerHTML=`🗣️ ${ws.names[i]}`;
    btn.onclick=()=>voteOut(i);
    section.appendChild(btn);
  });
  const skipBtn=document.createElement('button');
  skipBtn.className='btn-ghost'; skipBtn.style.marginTop='8px';
  skipBtn.innerHTML='🤷 Niemand wird verbannt';
  skipBtn.onclick=()=>voteOut(-1);
  section.appendChild(skipBtn);
}

function voteOut(idx) {
  if(idx>=0) {
    if(!ws.dead.includes(idx)) ws.dead.push(idx);
    // Lovers
    if(ws.lovers.includes(idx)) {
      const other=ws.lovers.find(l=>l!==idx);
      if(!ws.dead.includes(other)) ws.dead.push(other);
    }
    // Jaeger
    if(ws.assignedRoles[idx]==='Jäger' && ws.customRoles['jaeger']) {
      showJaegerShot(idx); return;
    }
    const rolle=ROLLEN.find(r=>r.name===ws.assignedRoles[idx])||{emoji:'❓'};
    // Show role reveal
    wwShowOnly('werwolf-night');
    setNightScreen(
      rolle.emoji, 'Verbannt!',
      ws.names[idx]+' verlässt das Dorf und zeigt seine Rolle:',
      null,
      `<div class="reveal-card" style="margin:12px 0">
         <div style="font-size:2.5rem">${rolle.emoji}</div>
         <div class="card-word" style="font-size:1.6rem">${ws.assignedRoles[idx]}</div>
       </div>`,
      [{ label: 'Nächste Nacht →', fn: 'startNightPhase()' }]
    );
  } else {
    startNightPhase();
  }
  if(!checkWin()) {}
}

function showJaegerShot(jaegerIdx) {
  const targets=aliveIndices().filter(i=>i!==jaegerIdx);
  wwShowOnly('werwolf-night');
  setNightScreen(
    '🎯', 'Jäger!',
    ws.names[jaegerIdx] + ' stirbt und darf noch einen letzten Schuss abgeben!',
    buildPlayerSelector('jaeger', 1, targets),
    null,
    [{ label: '💥 Schießen!', fn: 'confirmJaeger()' }]
  );
}

function confirmJaeger() {
  const selected=getSelected('jaeger');
  if(selected.length!==1) { alert('Bitte 1 Ziel auswählen!'); return; }
  const target=selected[0];
  if(!ws.dead.includes(target)) ws.dead.push(target);
  if(ws.lovers.includes(target)) {
    const other=ws.lovers.find(l=>l!==target);
    if(!ws.dead.includes(other)) ws.dead.push(other);
  }
  if(!checkWin()) startNightPhase();
}

// ===================== WIN CHECK =====================
function checkWin() {
  const alive=aliveIndices();
  const wolves=alive.filter(i=>ws.assignedRoles[i]==='Werwolf');
  const villagers=alive.filter(i=>ws.assignedRoles[i]!=='Werwolf');
  if(wolves.length===0) { showWinScreen('village'); return true; }
  if(wolves.length>=villagers.length) { showWinScreen('wolf'); return true; }
  return false;
}

function showWinScreen(winner) {
  wwShowOnly('werwolf-win');
  document.getElementById('ww-win-emoji').textContent = winner==='village'?'🏦':'🐺';
  document.getElementById('ww-win-title').textContent = winner==='village'?'Das Dorf hat gewonnen!':'Die Werwölfe haben gewonnen!';
  document.getElementById('ww-win-sub').textContent = winner==='village'?'Alle Werwölfe wurden entlarvt!':'Die Werwölfe beherrschen das Dorf!';
  const list=document.getElementById('ww-win-list');
  list.innerHTML='';
  ws.names.forEach((name,i)=>{
    const dead=ws.dead.includes(i);
    const rolle=ROLLEN.find(r=>r.name===ws.assignedRoles[i])||{emoji:'❓'};
    const row=document.createElement('div');
    row.className='player-row'+(ws.assignedRoles[i]==='Werwolf'?' is-imposter':'');
    row.innerHTML=`<span class="player-name">${rolle.emoji} ${name}</span><span class="player-tag ${ws.assignedRoles[i]==='Werwolf'?'imposter-tag':''}">${ws.assignedRoles[i]} ${dead?'(tot)':''}</span>`;
    list.appendChild(row);
  });
}

// ===================== NIGHT SCREEN BUILDER =====================
function setNightScreen(emoji, title, desc, selectorHtml, extraHtml, buttons) {
  document.getElementById('ww-night-emoji').textContent  = emoji||'';
  document.getElementById('ww-night-title').textContent  = title||'';
  document.getElementById('ww-night-desc').textContent   = desc||'';
  const sel=document.getElementById('ww-night-selector');
  sel.innerHTML = selectorHtml||'';
  const ext=document.getElementById('ww-night-extra');
  ext.innerHTML = extraHtml||'';
  const btns=document.getElementById('ww-night-buttons');
  btns.innerHTML='';
  (buttons||[]).forEach(b=>{
    const btn=document.createElement('button');
    btn.className='btn-primary'; btn.style.marginTop='8px';
    btn.textContent=b.label;
    btn.setAttribute('onclick', b.fn);
    btns.appendChild(btn);
  });
}

// ===================== PLAYER SELECTOR =====================
function buildPlayerSelector(id, max, indices) {
  const alive = aliveIndices();
  return `<div class="player-selector" id="sel-${id}">`+
    indices.map(i=>{
      const dead=ws.dead.includes(i);
      if(dead) return '';
      return `<button class="sel-btn" data-sel="${id}" data-idx="${i}" onclick="toggleSel('${id}',${i},${max})">${ws.names[i]}</button>`;
    }).join('')+
    '</div>';
}

function toggleSel(id, idx, max) {
  const btns=document.querySelectorAll(`[data-sel="${id}"]`);
  const btn=document.querySelector(`[data-sel="${id}"][data-idx="${idx}"]`);
  const selected=Array.from(btns).filter(b=>b.classList.contains('selected'));
  if(btn.classList.contains('selected')) { btn.classList.remove('selected'); return; }
  if(selected.length>=max) { selected[0].classList.remove('selected'); }
  btn.classList.add('selected');
}

function getSelected(id) {
  return Array.from(document.querySelectorAll(`[data-sel="${id}"].selected`)).map(b=>parseInt(b.dataset.idx));
}

// ===================== HELPERS =====================
function aliveIndices() {
  return ws.names.map((_,i)=>i).filter(i=>!ws.dead.includes(i));
}

function wwShowOnly(id) {
  ['werwolf-setup','werwolf-deal','werwolf-night','werwolf-day','werwolf-win'].forEach(s=>{
    document.getElementById(s).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

function resetWerwolf() {
  ws.dead=[]; ws.lovers=[]; ws.round=0; ws.nightVictim=-1; ws._prevDead=[];
  wwShowOnly('werwolf-setup');
  werwolfRenderNameInputs();
}

function wwShow(id) { document.getElementById(id).classList.remove('hidden'); }
function wwHide(id) { document.getElementById(id).classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', werwolfRenderNameInputs);
