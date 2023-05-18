import { startGame } from './start.js';
import createElem from './element.js';
import { toggleSound } from './sound.js';
import { resizeField, changeBombCount } from './resize.js';
import { openScoreModal } from './modal.js';

export let turnsCount = 0;
export let curTime = 0;
let intervalID;

export default function createMenu() {
    const menuField = createElem('div', 'menu-field');

    const menuWrapper = createElem('div', 'menu-field__btns-wrapper');
    const headerWrapper = createElem('div', 'menu-field__header-wrapper');

    const menuHeader = createElem('h1', 'menu-field__header', 'Minesweeper');

    const turnsFieldCount = createCount();

    const restartButton = createElem('button', 'menu-field__restart-button menu-field__button', 'Play');
    restartButton.addEventListener('click', restartGame);

    const fieldTimer = createElem('p', 'menu-field__timer menu-counter');

    const bombFieldCount = createElem('p', 'menu-field__bomb-count menu-counter');
    const flagFieldCount = createElem('p', 'menu-field__flag-count menu-counter');

    const soundToggler = createElem('button', 'menu-field__sound-button menu-field__button', 'Sound: on');
    soundToggler.addEventListener('click', toggleSound);

    const sizeTogglerWrapper = createElem('div', 'size-toggler__wrapper toggler__wrapper');
    const sizeToggler = createSizeToggler();
    const sizeTogglerHeader = createElem('span', 'menu-counter', 'Difficulty: ');
    sizeTogglerWrapper.append(sizeTogglerHeader, sizeToggler);

    const countTogglerWrapper = createElem('div', 'count-toggler__wrapper toggler__wrapper');
    const countToggler = createBombCountToggler();
    const countTogglerHeader = createElem('span', 'menu-counter', 'Bombs: ');
    countTogglerWrapper.append(countTogglerHeader, countToggler);

    const scoreButton = createElem('button', 'menu-field__score-button menu-field__button', 'Score');
    scoreButton.addEventListener('click', openScoreModal);

    headerWrapper.append(menuHeader);
    menuWrapper.append(turnsFieldCount, fieldTimer, bombFieldCount, flagFieldCount,
        restartButton, soundToggler, sizeTogglerWrapper, countTogglerWrapper, scoreButton);
    menuField.append(headerWrapper, menuWrapper);
    document.body.prepend(menuField);
}

function createCount() {
    const turnsFieldCount = createElem('p', 'menu-field__turns-count menu-counter', `Turns: ${turnsCount}`);

    const mainField = document.querySelector('.main-field');
    mainField.addEventListener('click', e => {
        if (!e.target.classList.contains('main-field__cell') || e.target.classList.contains('main-field__cell_opened') || e.target.textContent === '🚩') return;
        turnsCount++
        const turnsFieldCount = document.querySelector('.menu-field__turns-count');
        turnsFieldCount.innerText = `Turns: ${turnsCount}`;
    }, { capture: true });
    return turnsFieldCount
}

function createSizeToggler() {
    const sizeToggler = createElem('select', 'size-toggler toggler');
    const easyOption = createElem('option', 'size-toggler__option', 'Easy');
    easyOption.dataset.level = 'easy';
    const mediumOption = createElem('option', 'size-toggler__option toggler__option', 'Medium');
    mediumOption.dataset.level = 'medium';
    const hardOption = createElem('option', 'size-toggler__option', 'Hard');
    hardOption.dataset.level = 'hard';

    sizeToggler.append(easyOption, mediumOption, hardOption);

    sizeToggler.addEventListener('change', () => resizeField())

    return sizeToggler
}

function createBombCountToggler() {
    const countToggler = createElem('select', 'count-toggler toggler');
    const templateOption = createElem('option', 'count-toggler__option toggler__option');

    for (let i = 10; i <= 99; i++) {
        const curOption = templateOption.cloneNode();
        curOption.textContent = i;
        curOption.dataset.count = i;
        countToggler.append(curOption);
    }

    countToggler.addEventListener('change', () => changeBombCount());

    return countToggler
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