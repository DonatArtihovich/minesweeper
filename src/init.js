import { startGame } from './start.js';

export function initGame() {
    const gameField = document.createElement('div');
    gameField.classList.add('main-field');

    document.body.append(gameField);
    startGame()
}