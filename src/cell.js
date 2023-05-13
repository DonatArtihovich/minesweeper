export class Cell {
    constructor(isBomb, y, x, matrix) {
        this.isBomb = isBomb;
        this.neighbors = getNeighborCells(y, x, matrix);
        this.value = (isBomb) ? '💣' : this.getCellValue(y, x);
        console.log(matrix)
    }

    getCellValue() {
        const neighborCells = this.neighbors;
        let count = 0;

        neighborCells.forEach(c => {
            if (c === 'b' || c.isBomb) count++
        })

        return (count) ? count : '';
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