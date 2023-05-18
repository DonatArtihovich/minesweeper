import { startGame } from './start.js';
import createMenu from './menu.js';
import { openCell, flagCell } from './event';
import { rebuildField } from './save.js';


export function initGame() {
    const gameField = document.createElement('div');
    gameField.classList.add('main-field');
    document.body.append(gameField);

    createMenu();

    const localStorage = window.localStorage;
    if (localStorage.getItem('game')) {
        rebuildField();
    } else {
        startGame();
    }

    addCellListeners();
}

function addCellListeners() {
    const gameField = document.querySelector('.main-field');

    gameField.addEventListener('click', event => {
        if (event.target.classList.contains('main-field__cell')) openCell(event.target)
    });
    gameField.addEventListener('contextmenu', event => {
        if (event.target.classList.contains('main-field__cell')) flagCell(event, event.target);
    }
    );
}