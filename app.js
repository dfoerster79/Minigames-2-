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
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
  }
  closeInstallPopup();
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
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('home-screen').classList.add('active');
}
