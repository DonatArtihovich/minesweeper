export class Cell {
    constructor(isBomb, y, x, matrix) {
        this.isBomb = isBomb;
        this.neighbors = getNeighborCells(y, x, matrix);
        this.value = (isBomb) ? '💣' : this.getCellValue(y, x);
        this.x = x;
        this.y = y;
        this.matrix = matrix;
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
        const templateCell = document.createElement('div');
        templateCell.classList.add('main-field__cell');


        const curCell = templateCell.cloneNode();
        field.append(curCell);
        this.cellElem = curCell;

        curCell.addEventListener('click', () => {
            this.openCell(curCell);
        })

        curCell.addEventListener('contextmenu', e => {
            e.preventDefault();
            this.makeFlag();
        })
    }

    openCell(curCell) {
        if (this.hasFlag) {
            this.cellElem.innerText = '';
            this.hasFlag = false;
            return
        }

        if (this.isOpened) return;
        this.isOpened = true;
        curCell.classList.add('main-field__cell_opened');

        if (!this.value) {
            const neighborCells = getNeighborCells(this.y, this.x, this.matrix);
            neighborCells.forEach(c => {
                if (!c.isOpened) c.openCell(c.cellElem);
            })

        } else if (typeof this.value === 'number' || this.isBomb) {
            curCell.innerText = this.value;

            if (this.isBomb) endGame(this.matrix);
        }
    }

    makeFlag() {
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