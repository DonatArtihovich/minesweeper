import { gameMatrix } from './matrix.js';
import { openModal } from './modal.js';
import { playSound } from './sound.js';
import { turnsCount } from './turns-count.js';
import { currentTime, stopTimer } from './timer.js';
import { setScore } from './score.js';
import { currentDifficulty } from './resize.js';
import { bombCount } from './field.js';

export function checkStatus() {
  let check = true;

  gameMatrix.forEach(matrixLine => {
    matrixLine.forEach(item => {
      if ((!item.isOpened && !item.isBomb) || (item.hasFlag && !item.isBomb) || (item.isBomb && item.isOpened)) {
        check = false;
      }
    })
  })

  if (check) winGame()
}

export function endGame() {
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
    })
  })
  openModal(false);
  setScore('Loss', currentTime, turnsCount, currentDifficulty, bombCount);
}

function winGame() {
  if (!!document.querySelector('.game-modal')) return
  stopTimer();
  playSound('win');
  openModal(true);
  setScore('Win', currentTime, turnsCount, currentDifficulty, bombCount);
}