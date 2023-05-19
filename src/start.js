import { startTimer } from './timer.js';
import { createField } from './field.js';
import { changeTurnsCount } from './turns-count.js';

export function startGame(w, h, count, isRebuild) {
  createField(w, h, count, isRebuild);
  startTimer();
}

export function restartGame(event) {
  if (event?.target.classList.contains('menu-field__restart-button')) {
    const localStorage = window.localStorage;
    if (localStorage.getItem('game')) localStorage.removeItem('game');
  }

  changeTurnsCount(0);
  startGame();
}