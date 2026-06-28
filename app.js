function showGame(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(name + '-screen').classList.add('active');
}

function showHome() {
  clearInterval(state.timerInterval);
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('home-screen').classList.add('active');
}
