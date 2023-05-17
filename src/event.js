import { gameMatrix } from './matrix.js';
import { getCellData, getCellNeighbors } from './cell-data.js';
import { checkStatus, endGame } from './status.js';
import { createField } from './field.js';
import { changeBombCount } from './field.js';
import { playSound } from './sound.js';

export let flagCount = 0;

export function openCell(cell) {
    const cellData = getCellData(cell);

    if (cellData.hasFlag) {
        playSound('flag');

        cell.textContent = '';
        cellData.hasFlag = false;

        if (cellData.isBomb) changeBombCount(true);
        changeFlagCount();
        return
    }

    if (cellData.isOpened) return;

    cellData.isOpened = true;

    if (!cellData.value) {
        playSound('cell');

        cell.classList.add('main-field__cell_opened');

        const neighborCells = getCellNeighbors(cellData.y, cellData.x);
        neighborCells.forEach(c => {
            if (!c.isOpened) openCell(c.elem);
        })

    } else if (typeof cellData.value === 'number') {
        playSound('cell')

        cell.textContent = cellData.value;
        cell.classList.add('main-field__cell_opened');
    } else if (cellData.isBomb) {

        const b = checkFirstTurnBomb();

        if (!b) {
            playSound('bomb');

            cell.textContent = cellData.value;
            cell.classList.add('main-field__bomb_opened');
            endGame()
        } else {
            createField()
            const index = (gameMatrix[0].length * cellData.y) + cellData.x;
            const curElem = document.querySelector(`[data-index="${index}"]`);
            openCell(curElem);
        }
    }

    checkStatus()
}

export function flagSell(event, cell) {
    event.preventDefault();

    const cellData = getCellData(cell);

    if (cellData.isOpened || cellData.hasFlag) return
    playSound('flag');
    changeFlagCount(true);
    cell.textContent = '🚩';
    cellData.hasFlag = true;

    if (cellData.isBomb) changeBombCount()
    checkStatus()
}

function checkFirstTurnBomb() {
    let check = true;
    gameMatrix.forEach(matrixRow => {
        matrixRow.forEach(cell => {
            if (cell.isOpened && !cell.isBomb) check = false
        })
    })

    return check
}

export function changeFlagCount(b, clear) {
    b ? flagCount++ : flagCount--;
    if (clear) flagCount = 0;
    const flagCountElement = document.querySelector('.menu-field__flag-count');
    flagCountElement.textContent = `Flags: ${flagCount}`;
}