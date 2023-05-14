import { getCellNeighbors } from './cell-data.js';

export class Cell {
    constructor(isBomb, y, x, matrix) {
        this.isBomb = isBomb;
        this.value = (isBomb) ? '💣' : this.getCellValue(y, x);
        this.matrix = matrix;
        this.y = y;
        this.x = x;
    }

    getCellValue(y, x) {
        const neighborCells = getCellNeighbors(y, x);
        let count = 0;

        neighborCells.forEach(c => {
            if (c === 'b' || c.isBomb) count++
        })

        return (count) ? count : '';
    }
}