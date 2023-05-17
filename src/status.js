import { gameMatrix } from './matrix.js';
import { openModal } from './modal.js';
import { stopTimer } from './menu.js';
import { playSound } from './sound.js';

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

            stopTimer()
        })
    })
    openModal(false)
}

function winGame() {
    if (document.querySelector('.game-modal')) return
    playSound('win');
    stopTimer()
    openModal(true);
}