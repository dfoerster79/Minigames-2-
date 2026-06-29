// PWA Install Popup
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

function showInstallPopup() {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) return;
  const popup = document.getElementById('install-popup');
  if (!popup) return;
  if (isIOS) {
    document.getElementById('install-ios').classList.remove('hidden');
    document.getElementById('install-android').classList.add('hidden');
    popup.classList.remove('hidden');
  } else if (isAndroid) {
    document.getElementById('install-ios').classList.add('hidden');
    document.getElementById('install-android').classList.remove('hidden');
    popup.classList.remove('hidden');
  }
}

function triggerAndroidInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; closeInstallPopup(); });
  } else {
    // Fallback: manuelle Anleitung anzeigen
    const androidDiv = document.getElementById('install-android');
    androidDiv.innerHTML = `
      <p style="color:#a0a0c0;font-size:.9rem;margin-bottom:12px">Tippe auf die <strong>drei Punkte ⋮</strong> oben rechts im Browser und wähle:</p>
      <div class="install-steps">
        <div class="install-step"><span>1</span> Tippe auf <strong>⋮ Menü</strong> (oben rechts)</div>
        <div class="install-step"><span>2</span> Wähle <strong>"Zum Startbildschirm hinzufügen"</strong></div>
        <div class="install-step"><span>3</span> Tippe auf <strong>"Hinzufügen"</strong></div>
      </div>
      <button class="btn-ghost" onclick="closeInstallPopup()">Schließen</button>
    `;
  }
}

function closeInstallPopup() {
  document.getElementById('install-popup').classList.add('hidden');
}

window.addEventListener('load', () => {
  setTimeout(showInstallPopup, 3000);
});

function showGame(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(name + '-screen').classList.add('active');
}

function showHome() {
  if (typeof state !== 'undefined') clearInterval(state.timerInterval);
  if (typeof werwolfState !== 'undefined') clearInterval(werwolfState.timerInterval);
  if (typeof wbi !== 'undefined') { clearInterval(wbi.timerInterval); clearInterval(wbi.countdownInterval); }
  // Querformat-Klasse entfernen falls aktiv
  document.body.classList.remove('wbi-force-landscape');
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('home-screen').classList.add('active');
}
