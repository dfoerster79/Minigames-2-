// ========== TIC TAC TOE ==========
let ttt = {
  board: [],
  size: 3,
  winLen: 3,
  current: 'X',
  scores: { X: 0, O: 0, draw: 0 },
  names: { X: 'Spieler X', O: 'Spieler O' },
  gameOver: false,
  vsBot: false,
  botDifficulty: 'medium', // easy | medium | hard
  botSymbol: 'O',
  humanSymbol: 'X',
};

function setTTTSize(s) {
  ttt.size = s;
  ttt.winLen = s === 3 ? 3 : 4;
  document.getElementById('ttt-size-3').classList.toggle('ttt-size-active', s === 3);
  document.getElementById('ttt-size-5').classList.toggle('ttt-size-active', s === 5);
}

function setTTTDifficulty(d) {
  ttt.botDifficulty = d;
  document.querySelectorAll('.ttt-diff-btn').forEach(b => b.classList.remove('ttt-diff-active'));
  document.getElementById('ttt-diff-' + d).classList.add('ttt-diff-active');
}

function toggleTTTBot() {
  ttt.vsBot = document.getElementById('ttt-bot-toggle').checked;
  const diffRow = document.getElementById('ttt-diff-row');
  const nameO   = document.getElementById('ttt-name-o-row');
  if (diffRow) diffRow.classList.toggle('hidden', !ttt.vsBot);
  if (nameO)   nameO.classList.toggle('hidden', ttt.vsBot);
}

function showTTTSetup() {
  document.getElementById('ttt-setup').classList.remove('hidden');
  document.getElementById('ttt-game').classList.add('hidden');
}

function startTTT() {
  const nx = document.getElementById('ttt-name-x').value.trim() || 'Spieler X';
  const no = ttt.vsBot ? '🤖 Bot' : (document.getElementById('ttt-name-o').value.trim() || 'Spieler O');
  ttt.names = { X: nx, O: no };
  ttt.scores = { X: 0, O: 0, draw: 0 };
  ttt.humanSymbol = 'X';
  ttt.botSymbol   = 'O';

  document.getElementById('ttt-score-name-x').textContent = nx;
  document.getElementById('ttt-score-name-o').textContent = no;
  document.getElementById('ttt-score-x').textContent = '0';
  document.getElementById('ttt-score-o').textContent = '0';
  document.getElementById('ttt-score-draws').textContent = '0';

  document.getElementById('ttt-setup').classList.add('hidden');
  document.getElementById('ttt-game').classList.remove('hidden');
  resetTTTRound();
}

function resetTTTRound() {
  ttt.board = Array(ttt.size * ttt.size).fill('');
  ttt.current = 'X';
  ttt.gameOver = false;
  document.getElementById('ttt-result').classList.add('hidden');
  renderTTTBoard();
  updateTTTStatus();
  // If bot goes first (shouldn't by default, but just in case)
  if (ttt.vsBot && ttt.current === ttt.botSymbol) {
    setTimeout(botMove, 500);
  }
}

function renderTTTBoard() {
  const board = document.getElementById('ttt-board');
  board.className = `ttt-board ttt-board-${ttt.size}`;
  board.innerHTML = '';
  ttt.board.forEach((cell, i) => {
    const btn = document.createElement('button');
    btn.className = 'ttt-cell' + (cell ? ` ttt-cell-${cell.toLowerCase()}` : '');
    btn.textContent = cell;
    btn.disabled = !!cell || ttt.gameOver;
    btn.onclick = () => tttClick(i);
    board.appendChild(btn);
  });
}

function tttClick(i) {
  if (ttt.gameOver || ttt.board[i]) return;
  if (ttt.vsBot && ttt.current === ttt.botSymbol) return;
  tttPlace(i, ttt.current);
}

function tttPlace(i, sym) {
  ttt.board[i] = sym;
  renderTTTBoard();
  const win = checkTTTWin(sym);
  if (win) {
    highlightWin(win);
    ttt.gameOver = true;
    ttt.scores[sym]++;
    updateScoreDisplay();
    setTimeout(() => showTTTResult(sym === 'X' ? ttt.names.X : ttt.names.O, false), 600);
    return;
  }
  if (ttt.board.every(c => c)) {
    ttt.gameOver = true;
    ttt.scores.draw++;
    updateScoreDisplay();
    setTimeout(() => showTTTResult(null, true), 400);
    return;
  }
  ttt.current = ttt.current === 'X' ? 'O' : 'X';
  updateTTTStatus();
  if (ttt.vsBot && ttt.current === ttt.botSymbol && !ttt.gameOver) {
    setTimeout(botMove, 420);
  }
}

function updateTTTStatus() {
  const el = document.getElementById('ttt-status');
  const name = ttt.current === 'X' ? ttt.names.X : ttt.names.O;
  el.textContent = `${name} ist dran`;
  document.getElementById('ttt-score-x-box').classList.toggle('ttt-score-active', ttt.current === 'X');
  document.getElementById('ttt-score-o-box').classList.toggle('ttt-score-active', ttt.current === 'O');
}

function updateScoreDisplay() {
  document.getElementById('ttt-score-x').textContent = ttt.scores.X;
  document.getElementById('ttt-score-o').textContent = ttt.scores.O;
  document.getElementById('ttt-score-draws').textContent = ttt.scores.draw;
}

function showTTTResult(winner, isDraw) {
  const el = document.getElementById('ttt-result');
  el.classList.remove('hidden');
  if (isDraw) {
    document.getElementById('ttt-result-emoji').textContent = '🤝';
    document.getElementById('ttt-result-text').textContent = 'Unentschieden!';
  } else {
    document.getElementById('ttt-result-emoji').textContent = '🎉';
    document.getElementById('ttt-result-text').textContent = `${winner} gewinnt!`;
  }
}

function highlightWin(cells) {
  const btns = document.querySelectorAll('.ttt-cell');
  cells.forEach(i => btns[i]?.classList.add('ttt-cell-win'));
}

// ===== WIN CHECK =====
function checkTTTWin(sym) {
  const s = ttt.size;
  const w = ttt.winLen;
  const b = ttt.board;

  for (let r = 0; r < s; r++) {
    for (let c = 0; c <= s - w; c++) {
      const cells = Array.from({length: w}, (_, k) => r * s + c + k);
      if (cells.every(i => b[i] === sym)) return cells;
    }
  }
  for (let c = 0; c < s; c++) {
    for (let r = 0; r <= s - w; r++) {
      const cells = Array.from({length: w}, (_, k) => (r + k) * s + c);
      if (cells.every(i => b[i] === sym)) return cells;
    }
  }
  for (let r = 0; r <= s - w; r++) {
    for (let c = 0; c <= s - w; c++) {
      const cells = Array.from({length: w}, (_, k) => (r + k) * s + (c + k));
      if (cells.every(i => b[i] === sym)) return cells;
    }
  }
  for (let r = 0; r <= s - w; r++) {
    for (let c = w - 1; c < s; c++) {
      const cells = Array.from({length: w}, (_, k) => (r + k) * s + (c - k));
      if (cells.every(i => b[i] === sym)) return cells;
    }
  }
  return null;
}

function tttHasWinner(board, sym, size, winLen) {
  const s = size, w = winLen, b = board;
  const check = cells => cells.every(i => b[i] === sym);
  for (let r = 0; r < s; r++)
    for (let c = 0; c <= s - w; c++)
      if (check(Array.from({length:w},(_,k)=>r*s+c+k))) return true;
  for (let c = 0; c < s; c++)
    for (let r = 0; r <= s - w; r++)
      if (check(Array.from({length:w},(_,k)=>(r+k)*s+c))) return true;
  for (let r = 0; r <= s - w; r++)
    for (let c = 0; c <= s - w; c++)
      if (check(Array.from({length:w},(_,k)=>(r+k)*s+(c+k)))) return true;
  for (let r = 0; r <= s - w; r++)
    for (let c = w-1; c < s; c++)
      if (check(Array.from({length:w},(_,k)=>(r+k)*s+(c-k)))) return true;
  return false;
}

// ===== BOT LOGIC =====
function botMove() {
  if (ttt.gameOver) return;
  const empty = ttt.board.map((v,i)=>v?-1:i).filter(i=>i>=0);
  if (!empty.length) return;

  let idx;
  const diff = ttt.botDifficulty;

  if (diff === 'easy') {
    idx = empty[Math.floor(Math.random() * empty.length)];
  } else if (diff === 'medium') {
    // 60% smart, 40% random (only for 3x3 minimax is fast; for 5x5 use heuristic)
    if (ttt.size === 3 && Math.random() < 0.6) {
      idx = minimaxBest(ttt.board, ttt.botSymbol);
    } else {
      idx = heuristicBest(ttt.board, ttt.botSymbol) ?? empty[Math.floor(Math.random() * empty.length)];
    }
  } else { // hard
    if (ttt.size === 3) {
      idx = minimaxBest(ttt.board, ttt.botSymbol);
    } else {
      idx = heuristicBest(ttt.board, ttt.botSymbol) ?? empty[0];
    }
  }

  tttPlace(idx, ttt.botSymbol);
}

// ----- Minimax (3x3 only) -----
function minimaxBest(board, botSym) {
  const humanSym = botSym === 'O' ? 'X' : 'O';
  let bestScore = -Infinity, bestIdx = -1;
  board.forEach((v, i) => {
    if (!v) {
      board[i] = botSym;
      const score = minimax(board, 0, false, botSym, humanSym, -Infinity, Infinity);
      board[i] = '';
      if (score > bestScore) { bestScore = score; bestIdx = i; }
    }
  });
  return bestIdx;
}

function minimax(board, depth, isMax, botSym, humanSym, alpha, beta) {
  const s = ttt.size, w = ttt.winLen;
  if (tttHasWinner(board, botSym, s, w))   return 10 - depth;
  if (tttHasWinner(board, humanSym, s, w)) return depth - 10;
  if (board.every(c => c)) return 0;
  if (depth > 8) return 0; // depth limit

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = botSym;
        best = Math.max(best, minimax(board, depth+1, false, botSym, humanSym, alpha, beta));
        board[i] = '';
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = humanSym;
        best = Math.min(best, minimax(board, depth+1, true, botSym, humanSym, alpha, beta));
        board[i] = '';
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  }
}

// ----- Heuristic (5x5) -----
function heuristicBest(board, botSym) {
  const humanSym = botSym === 'O' ? 'X' : 'O';
  const s = ttt.size, w = ttt.winLen;
  // 1. Win immediately
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = botSym;
      if (tttHasWinner(board, botSym, s, w)) { board[i] = ''; return i; }
      board[i] = '';
    }
  }
  // 2. Block human win
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = humanSym;
      if (tttHasWinner(board, humanSym, s, w)) { board[i] = ''; return i; }
      board[i] = '';
    }
  }
  // 3. Center
  const center = Math.floor(s/2) * s + Math.floor(s/2);
  if (!board[center]) return center;
  // 4. Random empty
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  // Init difficulty button
  const diffBtn = document.getElementById('ttt-diff-medium');
  if (diffBtn) diffBtn.classList.add('ttt-diff-active');
});
