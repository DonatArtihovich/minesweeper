import { startGame } from './start.js';
import createElem from './element.js';
let turnsCount = 0;

export default function createMenu() {
    const menuField = createElem('div', 'menu-field');

    const menuHeader = createElem('h1', 'menu-field__header', 'Minesweeper');

    const turnsFieldCount = createCount();

    const restartButton = createElem('button', 'menu-field__restart-button', 'Start Game!');
    restartButton.addEventListener('click', restartGame);

    const fieldTimer = createElem('p', 'menu-field__timer');

    menuField.append(menuHeader, turnsFieldCount, fieldTimer, restartButton);
    document.body.prepend(menuField);
}

function createCount() {
    const turnsFieldCount = createElem('p', 'menu-field__turns-count', `Turns: ${turnsCount}`);

    const mainField = document.querySelector('.main-field');
    mainField.addEventListener('click', e => {
        if (!e.target.classList.contains('main-field__cell') || e.target.classList.contains('main-field__cell_opened') || e.target.textContent === '🚩') return;
        turnsCount++
        const turnsFieldCount = document.querySelector('.menu-field__turns-count');
        turnsFieldCount.innerText = `Turns: ${turnsCount}`;
    }, { capture: true });
    return turnsFieldCount
}

function restartGame() {
    turnsCount = 0;
    const turnsFieldCount = document.querySelector('.menu-field__turns-count');
    turnsFieldCount.innerText = `Turns: ${turnsCount}`;

    const gameField = document.querySelector('.main-field');
    gameField.innerHTML = '';
    startGame()
}