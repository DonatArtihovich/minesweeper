import { gameMatrix } from './matrix.js';

export function getCellData(cell) {
    const matrixWidth = gameMatrix[0].length;
    const cellIndex = cell.dataset.index;
    const y = Math.floor(cellIndex / matrixWidth);
    const x = cellIndex % matrixWidth;
    const cellData = gameMatrix[y][x];

    return cellData
}

export function getCellNeighbors(y, x) {
    const out = [];
    for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            if (gameMatrix[i]?.[j] !== undefined && !(i === y && j === x)) out.push(gameMatrix[i][j]);
        }
    }

    return out
}
