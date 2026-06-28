// ========== TIC TAC TOE ==========
let ttt = {
  size: 3,
  board: [],
  current: 'X',
  nameX: 'Spieler X',
  nameO: 'Spieler O',
  scores: { X: 0, O: 0, draw: 0 },
  winLine: 3,
  gameOver: false,
  winCells: [],
};

function setTTTSize(s) {
  ttt.size = s;
  document.getElementById('ttt-size-3').classList.toggle('ttt-size-active', s === 3);
  document.getElementById('ttt-size-5').classList.toggle('ttt-size-active', s === 5);
}

function startTTT() {
  ttt.nameX = document.getElementById('ttt-name-x').value.trim() || 'Spieler X';
  ttt.nameO = document.getElementById('ttt-name-o').value.trim() || 'Spieler O';
  ttt.winLine = ttt.size === 3 ? 3 : 4;
  ttt.scores = { X: 0, O: 0, draw: 0 };
  document.getElementById('ttt-score-name-x').textContent = ttt.nameX;
  document.getElementById('ttt-score-name-o').textContent = ttt.nameO;
  document.getElementById('ttt-setup').classList.add('hidden');
  document.getElementById('ttt-game').classList.remove('hidden');
  resetTTTRound();
}

function showTTTSetup() {
  document.getElementById('ttt-setup').classList.remove('hidden');
  document.getElementById('ttt-game').classList.add('hidden');
}

function resetTTTRound() {
  ttt.board = Array(ttt.size * ttt.size).fill(null);
  ttt.current = 'X';
  ttt.gameOver = false;
  ttt.winCells = [];
  document.getElementById('ttt-result').classList.add('hidden');
  updateTTTScoreboard();
  updateTTTStatus();
  renderTTTBoard();
}

function renderTTTBoard() {
  const board = document.getElementById('ttt-board');
  board.innerHTML = '';
  board.className = 'ttt-board ttt-board-' + ttt.size;
  ttt.board.forEach((cell, i) => {
    const btn = document.createElement('button');
    btn.className = 'ttt-cell' +
      (cell ? ' ttt-cell-' + cell.toLowerCase() : '') +
      (ttt.winCells.includes(i) ? ' ttt-cell-win' : '');
    btn.textContent = cell === 'X' ? '✖' : cell === 'O' ? '◯' : '';
    btn.disabled = !!cell || ttt.gameOver;
    btn.onclick = () => tttMove(i);
    board.appendChild(btn);
  });
}

function tttMove(i) {
  if (ttt.gameOver || ttt.board[i]) return;
  ttt.board[i] = ttt.current;
  playTTTSound('move');
  const win = checkTTTWin();
  if (win) {
    ttt.winCells = win;
    ttt.gameOver = true;
    ttt.scores[ttt.current]++;
    renderTTTBoard();
    updateTTTScoreboard();
    setTimeout(() => showTTTResult(ttt.current), 400);
  } else if (ttt.board.every(c => c)) {
    ttt.gameOver = true;
    ttt.scores.draw++;
    renderTTTBoard();
    updateTTTScoreboard();
    setTimeout(() => showTTTResult(null), 400);
  } else {
    ttt.current = ttt.current === 'X' ? 'O' : 'X';
    updateTTTStatus();
    renderTTTBoard();
  }
}

function checkTTTWin() {
  const s = ttt.size, n = ttt.winLine, b = ttt.board, p = ttt.current;
  for (let r = 0; r < s; r++) {
    for (let c = 0; c <= s - n; c++) {
      const line = Array.from({length: n}, (_, k) => r * s + c + k);
      if (line.every(i => b[i] === p)) return line;
    }
  }
  for (let c = 0; c < s; c++) {
    for (let r = 0; r <= s - n; r++) {
      const line = Array.from({length: n}, (_, k) => (r + k) * s + c);
      if (line.every(i => b[i] === p)) return line;
    }
  }
  for (let r = 0; r <= s - n; r++) {
    for (let c = 0; c <= s - n; c++) {
      const line = Array.from({length: n}, (_, k) => (r + k) * s + (c + k));
      if (line.every(i => b[i] === p)) return line;
    }
  }
  for (let r = 0; r <= s - n; r++) {
    for (let c = n - 1; c < s; c++) {
      const line = Array.from({length: n}, (_, k) => (r + k) * s + (c - k));
      if (line.every(i => b[i] === p)) return line;
    }
  }
  return null;
}

function showTTTResult(winner) {
  const res = document.getElementById('ttt-result');
  const name = winner === 'X' ? ttt.nameX : winner === 'O' ? ttt.nameO : null;
  document.getElementById('ttt-result-emoji').textContent = winner ? '🎉' : '🤝';
  document.getElementById('ttt-result-text').textContent = winner ? name + ' gewinnt!' : 'Unentschieden!';
  res.classList.remove('hidden');
  if (winner) playTTTSound('win'); else playTTTSound('draw');
}

function updateTTTStatus() {
  const name = ttt.current === 'X' ? ttt.nameX : ttt.nameO;
  const icon = ttt.current === 'X' ? '✖' : '◯';
  document.getElementById('ttt-status').textContent = icon + ' ' + name + ' ist dran';
  document.getElementById('ttt-score-x-box').classList.toggle('ttt-score-active', ttt.current === 'X');
  document.getElementById('ttt-score-o-box').classList.toggle('ttt-score-active', ttt.current === 'O');
}

function updateTTTScoreboard() {
  document.getElementById('ttt-score-x').textContent = ttt.scores.X;
  document.getElementById('ttt-score-o').textContent = ttt.scores.O;
  document.getElementById('ttt-score-draws').textContent = ttt.scores.draw;
}

function playTTTSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (type === 'move') {
      osc.frequency.value = 440; gain.gain.value = 0.12;
      osc.start(); osc.stop(ctx.currentTime + 0.07);
    } else if (type === 'win') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24);
      gain.gain.value = 0.18;
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.frequency.value = 300; gain.gain.value = 0.1;
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    }
  } catch(e) {}
}
