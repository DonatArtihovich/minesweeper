import { startTimer } from './timer.js';
import { createField } from './field.js';
import { changeTurnsCount } from './turns-count.js';

export function startGame(w, h, count, isRebuild) {
  createField(w, h, count, isRebuild);
  startTimer();
}

export function restartGame() {
  changeTurnsCount(0);
  startGame();
}