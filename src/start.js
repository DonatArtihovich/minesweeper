import { startTimer } from './timer.js';
import { createField } from './field.js';
import { changeTurnsCount } from './turns-count.js';

export function startGame(w, h, count) {
  createField(w, h, count);
  startTimer();
}

export function restartGame() {
  const localStorage = window.localStorage;
  if (localStorage.getItem('game')) localStorage.removeItem('game');

  changeTurnsCount(0);
  startGame();
}