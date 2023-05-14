import { startGame } from './start.js';
import createMenu from './menu.js';
import { openCell, flagSell } from './event';

export function initGame() {
    const gameField = document.createElement('div');
    gameField.classList.add('main-field');

    document.body.append(gameField);
    createMenu()
    startGame()
    addCellListeners();
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