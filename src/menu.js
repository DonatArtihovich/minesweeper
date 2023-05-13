import { startGame } from './start.js';

let turnsCount = 0;

export default function createMenu() {
    const menuField = document.createElement('div');
    menuField.classList.add('menu-field');

    const turnsFieldCount = createCount();

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Start Game!';
    restartButton.addEventListener('click', restartGame);
    restartButton.classList.add('menu-field__restart-button');

    menuField.append(turnsFieldCount, restartButton);
    document.body.prepend(menuField);
}

function createCount() {
    const turnsFieldCount = document.createElement('p');
    turnsFieldCount.innerText = `Turns: ${turnsCount}`;
    turnsFieldCount.classList.add('menu-field__turns-count');

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