import { startTimer } from './timer.js';
import { createField } from './field.js';
import { changeTurnsCount } from './turns-count.js';
import { changeGameOverStatus } from './status.js';

export function startGame(w, h, count, isRebuild) {
  createField(w, h, count, isRebuild);
  startTimer();
}

export function restartGame() {
  changeGameOverStatus(false);
  changeTurnsCount(0);
  startGame();
}