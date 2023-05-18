import createElem from './element.js';
import { turnsCount, curTime, restartGame } from './menu.js';

export function openModal(boolean) {
    setTimeout(() => {
        if (boolean) {
            createWinModal()
        } else {
            createEndModal()
        }
    }, 100);
}

function createEndModal() {
    const modalOverlay = createElem('div', 'modal-overlay');
    const modal = createElem('div', 'game-modal');

    const modalHeaderWrapper = createElem('div', 'game-modal__header-wrapper');
    const modalHeader = createElem('p', 'game-modal__header', 'Game over. Try again!');
    modalHeaderWrapper.append(modalHeader);

    const tryAgainButton = createElem('button', 'game-modal__button', 'Try again');
    tryAgainButton.addEventListener('click', tryAgain);

    modal.append(modalHeaderWrapper, tryAgainButton);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);
}

function createWinModal() {
    const modalOverlay = createElem('div', 'modal-overlay');
    const modal = createElem('div', 'game-modal');

    const modalHeaderWrapper = createElem('div', 'game-modal__header-wrapper');
    const modalHeader = createElem('p', 'game-modal__header', `Hooray! You found all mines in ${curTime} seconds and ${turnsCount} moves!`);
    modalHeaderWrapper.append(modalHeader);

    const tryAgainButton = createElem('button', 'game-modal__button', 'Play again');
    tryAgainButton.addEventListener('click', tryAgain);

    modal.append(modalHeaderWrapper, tryAgainButton);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);
}

function tryAgain() {
    setTimeout(() => {
        closeModal();
        restartGame();
    }, 90);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    modal.remove();
}

export function openScoreModal() {
    const modalOverlay = createElem('div', 'modal-overlay');
    const modal = createElem('div', 'game-modal game-modal_score');

    const closeButton = createElem('button', 'game-modal__close-button', 'x');
    closeButton.addEventListener('click', closeModal);

    const modalHeaderWrapper = createElem('div', 'game-modal__header-wrapper');
    const modalHeader = createElem('p', 'game-modal__header', 'Your Score');
    modalHeaderWrapper.append(modalHeader);

    const modalTable = createScoreTable();

    modal.append(closeButton, modalHeaderWrapper, modalTable);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);
}

function createScoreTable() {
    const localStorage = window.localStorage;
    const scoreArr = JSON.parse(localStorage.getItem('score'));

    const modalTable = createElem('table', 'score-table');
    const templateRow = createElem('tr', 'score-table__row');
    const templateHeader = createElem('th', 'score-table__header-cell');
    const templateCell = createElem('td', 'score-table__cell');

    const headerRow = templateRow.cloneNode();
    console.log(scoreArr)
    Object.keys(scoreArr[0]).forEach(key => {
        const curCell = templateHeader.cloneNode();
        const text = key.split('')[0].toUpperCase() + key.slice(1);
        curCell.textContent = text;

        headerRow.append(curCell);
    })

    scoreArr.forEach(obj => {
        const curRow = templateRow.cloneNode();

        const statusCell = templateCell.cloneNode();
        statusCell.textContent = obj['status'];
        const timeCell = templateCell.cloneNode();
        timeCell.textContent = obj['time'] + 's';
        const turnsCell = templateCell.cloneNode();
        turnsCell.textContent = obj['turns'];
        const difficultyCell = templateCell.cloneNode();
        const difficultyText = obj['difficulty'].split('')[0].toUpperCase() + obj['difficulty'].slice(1);
        difficultyCell.textContent = difficultyText;
        const bombsCell = templateCell.cloneNode();
        bombsCell.textContent = obj['bombs'];

        curRow.append(statusCell, timeCell, turnsCell, difficultyCell, bombsCell);
        modalTable.prepend(curRow);
    })

    modalTable.prepend(headerRow);

    return modalTable
}