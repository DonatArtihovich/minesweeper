import { startTimer } from './menu.js';
import { createField } from './field.js';
import { openCell, flagSell } from './event';

export function startGame(w, h, count) {
    createField(w, h, count);
    addCellListeners();
    startTimer();
}

function addCellListeners() {
    const gameField = document.querySelector('.main-field');

    gameField.addEventListener('click', event => {
        if (event.target.classList.contains('main-field__cell')) openCell(event.target)
    });
    gameField.addEventListener('contextmenu', event => {
        if (event.target.classList.contains('main-field__cell')) flagSell(event, event.target);
    }
    );
}