import createElem from './element.js';
import { openModal } from './modal.js';
import { turnsCount, curTime } from './menu.js';

let isGameOver = false;

export class Cell {
    constructor(isBomb, y, x, matrix) {
        this.isBomb = isBomb;
        this.neighbors = getNeighborCells(y, x, matrix);
        this.value = (isBomb) ? '💣' : this.getCellValue(y, x);
        this.x = x;
        this.y = y;
        this.matrix = matrix;
        isGameOver = false;
        this.appendToField();
    }

    getCellValue() {
        const neighborCells = this.neighbors;
        let count = 0;

        neighborCells.forEach(c => {
            if (c === 'b' || c.isBomb) count++
        })

        return (count) ? count : '';
    }

    appendToField() {
        const field = document.querySelector('.main-field');
        const templateCell = createElem('div', 'main-field__cell');

        const curCell = templateCell.cloneNode();
        if (typeof this.value === 'number') curCell.classList.add(`main-field__cell_${this.value}`);
        field.append(curCell);
        this.cellElem = curCell;

        curCell.addEventListener('click', () => {
            if (this.isBomb && !this.hasFlag || isGameOver) {
                endGame(this.matrix);
                return
            }
            this.openCell(curCell);
            checkStatus(this.matrix);
        })

        curCell.addEventListener('contextmenu', e => {
            e.preventDefault();
            this.makeFlag();
            checkStatus(this.matrix);
        })
    }

    openCell(curCell) {
        if (this.hasFlag) {
            this.cellElem.innerText = '';
            this.hasFlag = false;
            return
        }

        if (this.isOpened || isGameOver) return;
        this.isOpened = true;

        if (!this.value) {
            curCell.classList.add('main-field__cell_opened');
            const neighborCells = getNeighborCells(this.y, this.x, this.matrix);
            neighborCells.forEach(c => {
                if (!c.isOpened) c.openCell(c.cellElem);
            })

        } else if (typeof this.value === 'number' || this.isBomb) {
            curCell.innerText = this.value;
            !this.isBomb ? curCell.classList.add('main-field__cell_opened') :
                curCell.classList.add('main-field__bomb_opened')
        }
    }

    makeFlag() {
        if (this.isOpened) return
        this.cellElem.innerText = '🚩';
        this.hasFlag = true;
    }
}

function getNeighborCells(y, x, matrix) {
    const out = [];
    for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            if (matrix[i]?.[j] !== undefined && !(i === y && j === x)) out.push(matrix[i][j]);
        }
    }
    return out
}



function checkStatus(matrix) {
    let check = true;
    matrix.forEach(matrixLine => {
        matrixLine.forEach(item => {
            if ((!item.isOpened && !item.hasFlag) || (item.hasFlag && !item.isBomb)) {
                check = false;
                return
            }
        })
    })
    if (check) winGame()
}

function endGame(matrix) {
    matrix.forEach(matrixRow => {
        matrixRow.forEach(cell => {
            if (cell.isBomb && !cell.hasFlag) cell.openCell(cell.cellElem);
            cell.cellElem.addEventListener('click', openModal), { caption: true };
        })
    })

    isGameOver = true;
    openModal(false)
}

function winGame() {
    openModal(true, { turnsCount, curTime });
}