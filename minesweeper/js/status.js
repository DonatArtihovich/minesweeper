import { gameMatrix } from './matrix';
import { openModal } from './modal';
import { playSound } from './sound';
import { turnsCount } from './turns-count';
import { currentTime, stopTimer } from './timer';
import { currentDifficulty } from './resize';
import { bombCount } from './field';
import setScore from './score';

export let isGameOver = false;

export function changeGameOverStatus(b) {
  isGameOver = b;
}

export function endGame() {
  if (isGameOver) return;

  gameMatrix.forEach((matrixRow, y) => {
    matrixRow.forEach((cell, x) => {
      const index = (gameMatrix[0].length * y) + x;
      const curElem = document.querySelector(`[data-index="${index}"]`);

      if (cell.isBomb && !cell.hasFlag && !cell.isOpened) {
        curElem.classList.add('main-field__bomb_opened');
        curElem.textContent = cell.value;
        cell.isOpened = true;
      }

      stopTimer();
    });
  });
  openModal(false);
  changeGameOverStatus(true);
  setScore('Loss', currentTime, turnsCount, currentDifficulty, bombCount);
}

function winGame() {
  if (isGameOver) return;

  if (document.querySelector('.game-modal')) return;
  stopTimer();
  playSound('win');
  openModal(true);
  changeGameOverStatus(true);
  setScore('Win', currentTime, turnsCount, currentDifficulty, bombCount);
}

export function checkStatus() {
  let check = true;

  gameMatrix.forEach((matrixLine) => {
    matrixLine.forEach((item) => {
      if ((!item.isOpened && !item.isBomb)
        || (item.hasFlag && !item.isBomb)
        || (item.isBomb && item.isOpened)) {
        check = false;
      }
    });
  });

  if (check) winGame();
}
