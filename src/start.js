import { startTimer } from './menu.js';
import { createField } from './field.js';
import { openCell, flagSell } from './event';

export function startGame(w, h, count) {
    createField(w, h, count);
    addCellListeners();
    startTimer();
}

function addCellListeners() {
    const cellsArr = document.querySelectorAll('.main-field__cell');

    cellsArr.forEach(c => {
        c.addEventListener('click', () => openCell(c));
        c.addEventListener('contextmenu', event => flagSell(event, c));
    })
}