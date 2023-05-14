import { gameMatrix } from './matrix.js';
import { getCellData, getCellNeighbors } from './cell-data.js';
import { checkStatus, endGame } from './status.js';
import { createField } from './field.js';

let isGameOver = false;

export function openCell(cell) {

    const cellData = getCellData(cell);

    if (cellData.hasFlag) {
        cell.textContent = '';
        cellData.hasFlag = false;
        return
    }

    if (cellData.isOpened || isGameOver) return;

    cellData.isOpened = true;

    if (!cellData.value) {
        cell.classList.add('main-field__cell_opened');

        const neighborCells = getCellNeighbors(cellData.y, cellData.x);
        neighborCells.forEach(c => {
            if (!c.isOpened) openCell(c.elem);
        })

    } else if (typeof cellData.value === 'number') {

        cell.textContent = cellData.value;
        cell.classList.add('main-field__cell_opened');
    } else if (cellData.isBomb) {

        const b = checkFirstTurnBomb();

        if (!b) {
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
    event.preventDefault()
    const cellData = getCellData(cell);

    if (cellData.isOpened) return
    cell.textContent = '🚩';
    cellData.hasFlag = true;

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