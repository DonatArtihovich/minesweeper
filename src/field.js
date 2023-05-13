import { gameMatrix } from './matrix.js';

export default function createGameField() {
    const field = document.querySelector('.main-field');
    const templateCell = document.createElement('div');
    templateCell.classList.add('main-field__cell');

    gameMatrix.forEach(matrixRow => {
        matrixRow.forEach(cell => {
            const curCell = templateCell.cloneNode();
            curCell.innerText = cell.value;

            field.append(curCell);
        })
    })
}