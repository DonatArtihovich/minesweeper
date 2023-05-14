import { startGame } from './start.js';
import createElem from './element.js';

export let turnsCount = 0;
export let curTime = 0;
let intervalID;

export default function createMenu() {
    const menuField = createElem('div', 'menu-field');

    const menuWrapper = createElem('div', 'menu-field__btns-wrapper');
    const headerWrapper = createElem('div', 'menu-field__header-wrapper');

    const menuHeader = createElem('h1', 'menu-field__header', 'Minesweeper');

    const turnsFieldCount = createCount();

    const restartButton = createElem('button', 'menu-field__restart-button', 'Start Game!');
    restartButton.addEventListener('click', restartGame);

    const fieldTimer = createElem('p', 'menu-field__timer');

    headerWrapper.append(menuHeader);
    menuWrapper.append(turnsFieldCount, fieldTimer, restartButton);
    menuField.append(headerWrapper, menuWrapper);
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

export function restartGame() {
    turnsCount = 0;
    const turnsFieldCount = document.querySelector('.menu-field__turns-count');
    turnsFieldCount.textContent = `Turns: ${turnsCount}`;

    startGame()
}

export function startTimer() {
    const fieldTimer = document.querySelector('.menu-field__timer');
    fieldTimer.textContent = 'Time: 00';
    curTime = 0;

    clearInterval(intervalID);

    intervalID = setInterval(() => {
        curTime++;

        const timeContent = (curTime > 9) ? curTime : '0' + `${curTime}`;
        fieldTimer.textContent = 'Time: ' + timeContent;
    }, 1000)
}

export function stopTimer() {
    clearInterval(intervalID);
}
