import { gameMatrix } from './matrix.js';
import { openModal } from './modal.js';
import { stopTimer } from './menu.js';


export function checkStatus() {
    let check = true;

    gameMatrix.forEach(matrixLine => {
        matrixLine.forEach(item => {
            if ((!item.isOpened && !item.hasFlag) || (item.hasFlag && !item.isBomb) || (item.isBomb && item.isOpened)) {
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

            curElem.addEventListener('click', () => { openModal() }), { caption: true };
            curElem.addEventListener('contextmenu', () => { openModal() }), { caption: true };
        })
    })
    openModal(false)
}

function winGame() {
    stopTimer()
    openModal(true);
}