import { startTimer } from './timer';
import { createField } from './field';
import { changeTurnsCount } from './turns-count';
import { changeGameOverStatus } from './status';

export function startGame(w, h, count, isRebuild) {
  changeGameOverStatus(false);
  createField(w, h, count, isRebuild);
  startTimer();
}

export function restartGame() {
  changeGameOverStatus(false);
  changeTurnsCount(0);
  startGame();
}
