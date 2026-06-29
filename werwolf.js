// ========== WERWOLF ==========
const ROLLEN = [
  { name: 'Werwolf',       emoji: '🐺', desc: 'Du bist ein Werwolf! Jede Nacht wählst du mit den anderen Werwölfen ein Opfer. Bleib tagsüber unerkannt!', team: 'wolf', power: false },
  { name: 'Dorfbewohner',  emoji: '🧑‍🌾', desc: 'Du bist ein normaler Dorfbewohner. Diskutiere, beobachte und votiere die Werwölfe raus!', team: 'village', power: false },
  { name: 'Seherin',       emoji: '🔮', desc: 'Jede Nacht darfst du die Rolle eines Spielers aufdecken.', team: 'village', power: true },
  { name: 'Hexe',          emoji: '🧝‍♀️', desc: 'Du hast einen Heiltrank und einen Gifttrank. Jeder einmal einsetzbar.', team: 'village', power: true },
  { name: 'Amor',          emoji: '💘', desc: 'In der ersten Nacht verknüpfst du zwei Spieler. Stirbt einer, stirbt der andere.', team: 'village', power: true },
  { name: 'Jäger',          emoji: '🎯', desc: 'Wenn du stirbst, reißt du jemanden mit.', team: 'village', power: true },
  { name: 'Dieb',          emoji: '🥷', desc: 'Tausche in der ersten Nacht deine Rolle mit einer Zusatzkarte.', team: 'village', power: true },
  { name: 'Dorfmatratze',  emoji: '🛌', desc: 'Jeder weiß wer du bist. Überlebe!', team: 'village', power: false },
  { name: 'Bürgermeister', emoji: '🌿', desc: 'Deine Stimme zählt doppelt. Bestimme bei deinem Tod deinen Nachfolger.', team: 'village', power: true },
];

const SONDER_ROLLEN = [
  { key: 'seherin',        name: 'Seherin',       emoji: '🔮',     desc: 'Schaut jede Nacht in die Rolle eines Spielers',    default: false },
  { key: 'hexe',           name: 'Hexe',          emoji: '🧝‍♀️', desc: 'Hat je einen Heil- und einen Gifttrank',            default: true  },
  { key: 'amor',           name: 'Amor',          emoji: '💘',     desc: 'Verknüpft Nacht 1 zwei Spieler – sterben gemeinsam', default: true  },
  { key: 'jaeger',         name: 'Jäger',          emoji: '🎯',     desc: 'Beim Tod darf er noch einen Spieler erschießen',    default: false },
  { key: 'dieb',           name: 'Dieb',          emoji: '🥷',     desc: 'Tauscht Nacht 1 seine Rolle mit einer Zusatzkarte', default: false },
  { key: 'dorfmatratze',   name: 'Dorfmatratze',  emoji: '🛌',     desc: 'Alle wissen wer er ist – muss dennoch überleben',    default: false },
  { key: 'buergermeister', name: 'Bürgermeister', emoji: '🌿', desc: 'Stimme zählt doppelt, bestimmt seinen Nachfolger',  default: false },
];

let ws = {
  players: 6,
  wolves: 1,
  narrator: false,
  names: [],
  assignedRoles: [],
  currentDealing: 0,
  customRoles: Object.fromEntries(SONDER_ROLLEN.map(r => [r.key, r.default])),
  dead: [],
  lovers: [],
  hexeHeil: true,
  hexeGift: true,
  mayorIdx: -1,
  round: 0,
  nightVictim: -1,
  seherinResult: null,
  hexeAction: null,
  poisonTarget: -1,
  jaegerMode: false,
  jaegerVictim: -1,
  nightStep: 0,
  diebCards: [],
  _prevDead: [],
};

// ===================== ERZÄHLER (TTS) =====================

// Beste deutsche Stimme wählen – bevorzuge natürlich klingende Online-Stimmen
function getBestGermanVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Priorität 1: Google Deutsch (klingt sehr natürlich)
  const googleDE = voices.find(v => v.lang.startsWith('de') && v.name.includes('Google'));
  if (googleDE) return googleDE;

  // Priorität 2: Online/Remote-Stimmen auf Deutsch (z.B. Microsoft Anna, Hedda etc.)
  const onlineDE = voices.find(v => v.lang.startsWith('de') && !v.localService);
  if (onlineDE) return onlineDE;

  // Priorität 3: Beste lokale deutsche Stimme
  const localDE = voices.find(v => v.lang === 'de-DE') ||
                  voices.find(v => v.lang.startsWith('de'));
  return localDE || null;
}

function speak(text) {
  if (!ws.narrator) return;
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'de-DE';
  // Langsamere, entspanntere Rate klingt menschlicher
  utt.rate  = 0.88;
  // Etwas tiefere Tonlage wirkt ruhiger und natürlicher
  utt.pitch = 0.95;
  utt.volume = 1.0;

  // Stimme sofort setzen falls verfügbar, sonst nach onvoiceschanged
  const voice = getBestGermanVoice();
  if (voice) {
    utt.voice = voice;
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      const v = getBestGermanVoice();
      if (v) utt.voice = v;
      window.speechSynthesis.onvoiceschanged = null;
    };
  }

  window.speechSynthesis.speak(utt);
}

function stopSpeak() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function toggleNarrator() {
  ws.narrator = document.getElementById('ww-narrator-toggle').checked;
  const label = document.getElementById('ww-narrator-label');
  label.textContent = ws.narrator ? '🔊 Erzähler aktiv' : '🔇 Erzähler aus';
  if (ws.narrator) speak('Der Erzähler ist jetzt aktiv. Viel Spaß beim Spielen!');
  else stopSpeak();
}

// Sagt generisch "[Rolle], schließ die Augen und schlaf ein." dann ruft fn() auf
function speakSleepThen(rollenText, fn) {
  if (!ws.narrator || !window.speechSynthesis) { fn(); return; }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(rollenText + ', schließ die Augen und schlaf ein.');
  utt.lang = 'de-DE';
  utt.rate  = 0.88;
  utt.pitch = 0.95;
  utt.volume = 1.0;
  const voice = getBestGermanVoice();
  if (voice) utt.voice = voice;
  utt.onend = () => fn();
  window.speechSynthesis.speak(utt);
}

// ===================== SETUP =====================
function werwolfRenderSetup() {
  const container = document.getElementById('ww-role-rows');
  container.innerHTML = '';
  SONDER_ROLLEN.forEach(r => {
    const checked = ws.customRoles[r.key] ? 'checked' : '';
    const row = document.createElement('div');
    row.className = 'role-row';
    row.innerHTML = `
      <div class="role-row-left">
        <span class="role-row-emoji">${r.emoji}</span>
        <div class="role-row-text">
          <strong>${r.name}</strong>
          <span>${r.desc}</span>
        </div>
      </div>
      <label class="toggle">
        <input type="checkbox" id="ww-role-${r.key}" ${checked} onchange="toggleWWRole('${r.key}')" />
        <span class="toggle-slider"></span>
      </label>`;
    container.appendChild(row);
  });
  werwolfRenderNameInputs();
}

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
  const maxWolves = Math.floor(ws.players / 2);
  if (ws.wolves > maxWolves) { ws.wolves = maxWolves; document.getElementById('ww-wolf-count').textContent = ws.wolves; }
  werwolfRenderNameInputs();
}

function changeWWWolves(delta) {
  const max = Math.floor(ws.players / 2);
  ws.wolves = Math.max(1, Math.min(max, ws.wolves + delta));
  document.getElementById('ww-wolf-count').textContent = ws.wolves;
  updateWerwolfRollenInfo();
}

function updateWerwolfRollenInfo() {
  const n = ws.players;
  const w = ws.wolves;
  const activeSpecials = SONDER_ROLLEN.filter(r => ws.customRoles[r.key]).length;
  const specials = Math.min(activeSpecials, n - w);
  const village = Math.max(0, n - w - specials);
  document.getElementById('ww-wolf-count').textContent = w;
  document.getElementById('ww-special-count').textContent = specials;
  document.getElementById('ww-village-count').textContent = village;
}

function toggleWWRole(key) {
  ws.customRoles[key] = document.getElementById('ww-role-'+key).checked;
  updateWerwolfRollenInfo();
}

function buildRollenPool() {
  const n = ws.players;
  const w = ws.wolves;
  let pool = [];
  for(let i=0;i<w;i++) pool.push('Werwolf');
  SONDER_ROLLEN.filter(r => ws.customRoles[r.key]).forEach(r => pool.push(r.name));
  while(pool.length < n) pool.push('Dorfbewohner');
  if(pool.length > n) pool = pool.slice(0, n);
  for(let i=pool.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
  return pool;
}

// ===================== START & DEAL =====================
function startWerwolf() {
  ws.names = [];
  for(let i=0; i<ws.players; i++) {
    const el = document.getElementById('ww-name-'+i);
    ws.names.push(el&&el.value.trim() ? el.value.trim() : 'Spieler '+(i+1));
  }
  ws.assignedRoles = buildRollenPool();
  ws.currentDealing = 0;
  ws.dead=[]; ws.lovers=[]; ws.hexeHeil=true; ws.hexeGift=true;
  ws.mayorIdx = ws.assignedRoles.indexOf('Bürgermeister');
  ws.round=0; ws.nightVictim=-1; ws._prevDead=[];
  ws.diebCards = ['Dorfbewohner','Dorfbewohner'];
  wwShowOnly('werwolf-deal');
  wwShowDealWaiting();
}

// Kein speak() – Erzähler schweigt während der Rollenverteilung
function wwShowDealWaiting() {
  document.getElementById('ww-deal-player-name').textContent = ws.names[ws.currentDealing];
  wwShow('ww-deal-waiting'); wwHide('ww-deal-card');
}

function wwShowCard() {
  const i = ws.currentDealing;
  const roleName = ws.assignedRoles[i];
  const rolle = ROLLEN.find(r=>r.name===roleName)||{name:roleName,emoji:'❓',desc:'',team:'village',power:false};
  const card = document.getElementById('ww-player-card');
  card.className = 'card '+(rolle.team==='wolf'?'imposter-card':rolle.power?'power-card':'');
  document.getElementById('ww-card-emoji').textContent = rolle.emoji;
  document.getElementById('ww-card-role').textContent = rolle.name;
  document.getElementById('ww-card-sub').textContent = rolle.team==='wolf'?'🐺 Du bist ein Werwolf!':'✅ Du gehörst zum Dorf';
  document.getElementById('ww-card-desc').textContent = rolle.desc;
  wwHide('ww-deal-waiting'); wwShow('ww-deal-card');
  // Kein speak() – Rolle ist geheim
}

function wwNextPlayer() {
  stopSpeak();
  ws.currentDealing++;
  if(ws.currentDealing >= ws.players) startNightPhase();
  else wwShowDealWaiting();
}

// ===================== NIGHT PHASE =====================
function startNightPhase() {
  ws.round++;
  ws.nightVictim=-1; ws.hexeAction=null; ws.poisonTarget=-1; ws.seherinResult=null; ws.nightStep=0;
  wwShowOnly('werwolf-night');
  runNightStep();
}

function runNightStep() {
  const steps = buildNightSteps();
  if(ws.nightStep >= steps.length) { nightPhaseEnd(); return; }
  steps[ws.nightStep]();
}

function buildNightSteps() {
  const alive = aliveIndices();
  const steps = [];
  steps.push(showAllSleep);
  if(ws.round===1 && alive.some(i=>ws.assignedRoles[i]==='Amor')) steps.push(showAmorPhase);
  if(ws.round===1 && alive.some(i=>ws.assignedRoles[i]==='Dieb')) steps.push(showDiebPhase);
  steps.push(showWolfPhase);
  if(ws.customRoles['seherin'] && alive.some(i=>ws.assignedRoles[i]==='Seherin')) steps.push(showSeherinPhase);
  if(ws.customRoles['hexe'] && alive.some(i=>ws.assignedRoles[i]==='Hexe') && (ws.hexeHeil||ws.hexeGift)) steps.push(showHexePhase);
  steps.push(showAllWake);
  return steps;
}

function nightNext() { stopSpeak(); ws.nightStep++; runNightStep(); }

function showAllSleep() {
  setNightScreen('🌙','Nacht '+ws.round,'Alle schließen die Augen und schlafen ein...',null,null,
    [{label:'Weiter →',fn:'nightNext()'}],
    'Nacht '+ws.round+'. Alle Dorfbewohner schließen nun die Augen und schlafen ein. Es wird still im Dorf.');
}

function showAllWake() {
  setNightScreen('☀️','Morgengrauen','Alle öffnen die Augen!',null,null,
    [{label:'Zum Tagesablauf →',fn:'startDayPhase()'}],
    'Die Sonne geht auf. Alle Dorfbewohner öffnen die Augen und schauen sich um.');
}

function showAmorPhase() {
  if(ws.lovers.length>0){nightNext();return;}
  setNightScreen('💘','Amor, erwache!',
    'Amor öffnet die Augen und tippt zwei Spieler an, die sich verlieben.',
    buildPlayerSelector('amor', 2, aliveIndices()),
    null,
    [{label:'Bestätigen & einschlafen',fn:'confirmAmor()'}],
    'Amor, erwache! Öffne die Augen und tippe zwei Spieler an, die sich von nun an lieben.');
}

function confirmAmor(){
  const s=getSelected('amor');
  if(s.length!==2){alert('Bitte genau 2 Spieler auswählen!');return;}
  ws.lovers=s;
  speakSleepThen('Amor', ()=>nightNext());
}

function showDiebPhase(){
  const diebIdx=aliveIndices().find(i=>ws.assignedRoles[i]==='Dieb');
  const cards=ws.diebCards;
  setNightScreen('🥷','Dieb, erwache!',
    'Der Dieb schaut die Zusatzkarten an: '+cards[0]+' & '+cards[1]+'. Möchte der Dieb tauschen?',null,
    `<div class="night-choice-col"><button class="btn-secondary night-btn" onclick="confirmDieb(0)">Karte 1: ${cards[0]}</button><button class="btn-secondary night-btn" onclick="confirmDieb(1)">Karte 2: ${cards[1]}</button><button class="btn-ghost night-btn" onclick="confirmDieb(-1)">Nicht tauschen</button></div>`,[],
    'Dieb, erwache! Du darfst eine der zwei Zusatzkarten nehmen oder deine Rolle behalten.');
}
function confirmDieb(cardIdx){
  stopSpeak();
  if(cardIdx>=0){
    const diebIdx=aliveIndices().find(i=>ws.assignedRoles[i]==='Dieb');
    ws.assignedRoles[diebIdx]=ws.diebCards[cardIdx];
  }
  speakSleepThen('Dieb', ()=>nightNext());
}

function showWolfPhase(){
  const targets=aliveIndices().filter(i=>ws.assignedRoles[i]!=='Werwolf');
  setNightScreen('🐺','Werwölfe, erwacht!',
    'Die Werwölfe öffnen die Augen und wählen ihr Opfer.',
    buildPlayerSelector('wolf',1,targets),null,
    [{label:'Opfer festlegen & schlafen',fn:'confirmWolf()'}],
    'Werwölfe, erwacht! Öffnet die Augen, erkennt euch und wählt lautlos euer heutiges Opfer.');
}
function confirmWolf(){
  const s=getSelected('wolf');
  if(s.length!==1){alert('Bitte genau 1 Opfer auswählen!');return;}
  ws.nightVictim=s[0];
  speakSleepThen('Werwölfe', ()=>nightNext());
}

function showSeherinPhase(){
  const targets=aliveIndices();
  setNightScreen('🔮','Seherin, erwache!',
    'Die Seherin zeigt auf eine Person – der Spielleiter zeigt ihr die Rolle.',
    buildPlayerSelector('seherin',1,targets),null,
    [{label:'Rolle anzeigen',fn:'confirmSeherin()'}],
    'Seherin, erwache! Öffne die Augen und zeige lautlos auf eine Person.');
}
function confirmSeherin(){
  const s=getSelected('seherin');
  if(s.length!==1){alert('Bitte eine Person auswählen!');return;}
  const idx=s[0];
  ws.seherinResult={idx,role:ws.assignedRoles[idx]};
  const rolle=ROLLEN.find(r=>r.name===ws.assignedRoles[idx])||{emoji:'❓'};
  const isWolf = ws.assignedRoles[idx]==='Werwolf';
  setNightScreen('🔮','Seherin – Ergebnis','Diese Person ist:',null,
    `<div class="reveal-card" style="margin:12px 0"><div style="font-size:2.5rem">${isWolf?'🐺':'✅'}</div><div class="card-word" style="font-size:1.6rem">${isWolf?'Werwolf!':'Kein Werwolf'}</div></div>`,
    [{label:'Einschlafen & weiter',fn:'confirmSeherin2()'}],
    isWolf ? 'Ja! Diese Person ist ein Werwolf.' : 'Nein. Diese Person ist kein Werwolf.');
}
function confirmSeherin2(){
  speakSleepThen('Seherin', ()=>nightNext());
}

function showHexePhase(){
  const victimName=ws.nightVictim>=0?ws.names[ws.nightVictim]:'niemand';
  const rolle=ws.nightVictim>=0?ROLLEN.find(r=>r.name===ws.assignedRoles[ws.nightVictim])||{emoji:'❓'}:null;
  let btns=[];
  if(ws.hexeHeil&&ws.nightVictim>=0) btns.push({label:'💚 Heiltrank (rettet '+victimName+')',fn:'confirmHexe("heal")'});
  if(ws.hexeGift) btns.push({label:'☠️ Gifttrank einsetzen',fn:'showHexeGift()'});
  btns.push({label:'Keine Tränke einsetzen',fn:'confirmHexe("skip")'});
  const ttsText = 'Hexe, erwache! '
    +(ws.hexeHeil?'Du hast noch den Heiltrank. ':'')+(ws.hexeGift?'Du hast noch den Gifttrank. ':'')
    +'Was möchtest du tun?';
  setNightScreen('🧝‍♀️','Hexe, erwache!',
    'Opfer: '+victimName+(rolle?' '+rolle.emoji:'')+(ws.hexeHeil?' | Heiltrank ✅':' | Heiltrank ❌')+(ws.hexeGift?' | Gifttrank ✅':' | Gifttrank ❌'),
    null,`<div class="night-choice-col">${btns.map(b=>`<button class="btn-secondary night-btn" onclick="${b.fn}">${b.label}</button>`).join('')}</div>`,[],ttsText);
}
function showHexeGift(){
  const targets=aliveIndices();
  setNightScreen('☠️','Hexe – Gifttrank','Wen möchte die Hexe vergiften?',
    buildPlayerSelector('hexe',1,targets),null,
    [{label:'Vergiften & schlafen',fn:'confirmHexeGift()'}],
    'Wen soll der Gifttrank treffen?');
}
function confirmHexeGift(){
  const s=getSelected('hexe');
  if(s.length!==1){alert('Bitte 1 Ziel auswählen!');return;}
  ws.poisonTarget=s[0];
  ws.hexeGift=false; ws.hexeAction='poison';
  speakSleepThen('Hexe', ()=>nightNext());
}
function confirmHexe(action){
  stopSpeak();
  if(action==='heal'){
    ws.hexeHeil=false; ws.hexeAction='heal';
  } else {
    ws.hexeAction='skip';
  }
  speakSleepThen('Hexe', ()=>nightNext());
}

function nightPhaseEnd(){
  let newDead=[];
  if(ws.nightVictim>=0){
    if(ws.hexeAction==='heal'){/* saved */}else newDead.push(ws.nightVictim);
  }
  if(ws.poisonTarget>=0&&!newDead.includes(ws.poisonTarget)) newDead.push(ws.poisonTarget);
  if(ws.lovers.length===2){
    newDead.forEach(d=>{
      if(ws.lovers.includes(d)){const other=ws.lovers.find(l=>l!==d);if(!newDead.includes(other)&&!ws.dead.includes(other))newDead.push(other);}
    });
  }
  newDead.forEach(d=>{if(!ws.dead.includes(d))ws.dead.push(d);});
  showAllWake();
}

// ===================== DAY PHASE =====================
function startDayPhase(){
  stopSpeak();
  if(checkWin()) return;
  wwShowOnly('werwolf-day');
  renderDayScreen();
}

function renderDayScreen(){
  const newDead=ws.dead.filter(d=>!ws._prevDead||!ws._prevDead.includes(d));
  ws._prevDead=[...ws.dead];
  let annHtml=''; let ttsAnn='';
  if(newDead.length===0){
    annHtml='<div class="day-announce safe">👍 Eine ruhige Nacht! Niemand ist gestorben.</div>';
    ttsAnn='Es war eine ruhige Nacht. Niemand ist gestorben.';
  } else {
    annHtml=newDead.map(i=>{
      const rolle=ROLLEN.find(r=>r.name===ws.assignedRoles[i])||{emoji:'❓'};
      return `<div class="day-announce dead">💀 ${ws.names[i]} ist gestorben! (${rolle.emoji} ${ws.assignedRoles[i]})</div>`;
    }).join('');
    ttsAnn = newDead.length === 1
      ? 'Das Dorf erwacht. In der Nacht wurde jemand getötet!'
      : 'Das Dorf erwacht. In der Nacht wurden mehrere Personen getötet!';
  }
  document.getElementById('ww-day-announce').innerHTML=annHtml;
  speak(ttsAnn+' Das Dorf diskutiert nun, wer ein Werwolf sein könnte.');
  const jaegerDead=newDead.find(i=>ws.assignedRoles[i]==='Jäger');
  if(jaegerDead!==undefined&&ws.customRoles['jaeger']){showJaegerShot(jaegerDead);return;}
  renderPlayerStatus();
  renderVoting();
  document.getElementById('ww-round-num').textContent=ws.round;
}

function renderPlayerStatus(){
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

function renderVoting(){
  const section=document.getElementById('ww-vote-section');
  section.innerHTML='<div class="section-title">Abstimmung – Wen verbannt das Dorf?</div>';
  aliveIndices().forEach(i=>{
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

function voteOut(idx){
  stopSpeak();
  if(idx>=0){
    if(!ws.dead.includes(idx)) ws.dead.push(idx);
    if(ws.lovers.includes(idx)){const other=ws.lovers.find(l=>l!==idx);if(!ws.dead.includes(other))ws.dead.push(other);}
    if(ws.assignedRoles[idx]==='Jäger'&&ws.customRoles['jaeger']){showJaegerShot(idx);return;}
    const rolle=ROLLEN.find(r=>r.name===ws.assignedRoles[idx])||{emoji:'❓'};
    wwShowOnly('werwolf-night');
    const isWolf = ws.assignedRoles[idx]==='Werwolf';
    setNightScreen(rolle.emoji,'Verbannt!',ws.names[idx]+' verlässt das Dorf und zeigt seine Rolle:',null,
      `<div class="reveal-card" style="margin:12px 0"><div style="font-size:2.5rem">${rolle.emoji}</div><div class="card-word" style="font-size:1.6rem">${ws.assignedRoles[idx]}</div></div>`,
      [{label:'Nächste Nacht →',fn:'startNightPhase()'}],
      isWolf ? 'Ein Werwolf wurde verbannt! Das Dorf jubelt.' : 'Ein unschuldiger Dorfbewohner wurde verbannt. Die Werwölfe lachen leise.');
    if(checkWin()) return;
  } else {
    speak('Das Dorf konnte sich nicht einigen. Die Nacht bricht erneut herein.');
    setTimeout(()=>startNightPhase(), 1200);
  }
}

function showJaegerShot(jaegerIdx){
  const targets=aliveIndices().filter(i=>i!==jaegerIdx);
  wwShowOnly('werwolf-night');
  setNightScreen('🎯','Jäger!',ws.names[jaegerIdx]+' stirbt und darf noch einen letzten Schuss abgeben!',
    buildPlayerSelector('jaeger',1,targets),null,
    [{label:'💥 Schießen!',fn:'confirmJaeger()'}],
    'Der Jäger stirbt! Doch er hat noch einen letzten Schuss. Wen nimmt er mit in den Tod?');
}
function confirmJaeger(){
  const s=getSelected('jaeger');
  if(s.length!==1){alert('Bitte 1 Ziel auswählen!');return;}
  const target=s[0];
  if(!ws.dead.includes(target)) ws.dead.push(target);
  if(ws.lovers.includes(target)){const other=ws.lovers.find(l=>l!==target);if(!ws.dead.includes(other))ws.dead.push(other);}
  speak('Der Jäger hat geschossen!');
  setTimeout(()=>{ if(!checkWin()) startNightPhase(); }, 1500);
}

// ===================== WIN CHECK =====================
function checkWin(){
  const alive=aliveIndices();
  const wolves=alive.filter(i=>ws.assignedRoles[i]==='Werwolf');
  const villagers=alive.filter(i=>ws.assignedRoles[i]!=='Werwolf');
  if(wolves.length===0){showWinScreen('village');return true;}
  if(wolves.length>=villagers.length){showWinScreen('wolf');return true;}
  return false;
}

function showWinScreen(winner){
  stopSpeak();
  wwShowOnly('werwolf-win');
  document.getElementById('ww-win-emoji').textContent=winner==='village'?'🏡':'🐺';
  document.getElementById('ww-win-title').textContent=winner==='village'?'Das Dorf hat gewonnen!':'Die Werwölfe haben gewonnen!';
  document.getElementById('ww-win-sub').textContent=winner==='village'?'Alle Werwölfe wurden entlarvt!':'Die Werwölfe beherrschen das Dorf!';
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
  setTimeout(()=>speak(winner==='village'
    ?'Glückwunsch! Das Dorf hat alle Werwölfe entlarvt und gewonnen!'
    :'Die Werwölfe haben gesiegt! Sie beherrschen nun das Dorf!'), 300);
}

// ===================== NIGHT SCREEN BUILDER =====================
function setNightScreen(emoji,title,desc,selectorHtml,extraHtml,buttons,ttsText){
  document.getElementById('ww-night-emoji').textContent=emoji||'';
  document.getElementById('ww-night-title').textContent=title||'';
  document.getElementById('ww-night-desc').textContent=desc||'';
  document.getElementById('ww-night-selector').innerHTML=selectorHtml||'';
  document.getElementById('ww-night-extra').innerHTML=extraHtml||'';
  const btns=document.getElementById('ww-night-buttons');
  btns.innerHTML='';
  (buttons||[]).forEach(b=>{
    const btn=document.createElement('button');
    btn.className='btn-primary'; btn.style.marginTop='8px';
    btn.textContent=b.label; btn.setAttribute('onclick',b.fn);
    btns.appendChild(btn);
  });
  const text = ttsText || (title ? title+'. '+desc : desc);
  speak(text);
}

// ===================== PLAYER SELECTOR =====================
function buildPlayerSelector(id,max,indices){
  return `<div class="player-selector" id="sel-${id}">`+
    indices.filter(i=>!ws.dead.includes(i)).map(i=>
      `<button class="sel-btn" data-sel="${id}" data-idx="${i}" onclick="toggleSel('${id}',${i},${max})">${ws.names[i]}</button>`
    ).join('')+
    '</div>';
}
function toggleSel(id,idx,max){
  const btn=document.querySelector(`[data-sel="${id}"][data-idx="${idx}"]`);
  const selected=Array.from(document.querySelectorAll(`[data-sel="${id}"].selected`));
  if(btn.classList.contains('selected')){btn.classList.remove('selected');return;}
  if(selected.length>=max) selected[0].classList.remove('selected');
  btn.classList.add('selected');
}
function getSelected(id){
  return Array.from(document.querySelectorAll(`[data-sel="${id}"].selected`)).map(b=>parseInt(b.dataset.idx));
}

// ===================== HELPERS =====================
function aliveIndices(){return ws.names.map((_,i)=>i).filter(i=>!ws.dead.includes(i));}

function wwShowOnly(id){
  ['werwolf-setup','werwolf-deal','werwolf-night','werwolf-day','werwolf-win'].forEach(s=>document.getElementById(s).classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function resetWerwolf(){
  stopSpeak();
  ws.dead=[]; ws.lovers=[]; ws.round=0; ws.nightVictim=-1; ws._prevDead=[];
  wwShowOnly('werwolf-setup');
}
function wwShow(id){document.getElementById(id).classList.remove('hidden');}
function wwHide(id){document.getElementById(id).classList.add('hidden');}

document.addEventListener('DOMContentLoaded', werwolfRenderSetup);
