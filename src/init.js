import { startGame } from './start.js';
import { turnsCount } from './cell.js';
import createMenu from './menu.js';

export function initGame() {
    const gameField = document.createElement('div');
    gameField.classList.add('main-field');

    document.body.append(gameField);
    createMenu()
    startGame()
}
