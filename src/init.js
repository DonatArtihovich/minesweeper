import { startGame } from './start.js';
import { turnsCount } from './cell.js';

export function initGame() {
    const gameField = document.createElement('div');
    gameField.classList.add('main-field');

    document.body.append(gameField);
    createMenu()
    startGame()
}

function createMenu() {
    const menuField = document.createElement('div');
    menuField.classList.add('menu-field');

    const turnsFieldCount = document.createElement('p');
    turnsFieldCount.innerText = `turns: ${turnsCount}`;
    turnsFieldCount.classList.add('main-field__turns-count');

    menuField.append(turnsFieldCount);
    document.body.prepend(menuField);
}