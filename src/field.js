import createElem from './element';
import { createMatrix } from './matrix';
import { getCellData } from './cell-data.js';

export function createField(w = 10, h = 10, count = 10) {
    const cellsCount = w * h;
    const field = document.querySelector('.main-field');
    field.innerHTML = '';

    const templateCell = createElem('div', 'main-field__cell');

    for (let i = 0; i < cellsCount; i++) {
        const curCell = templateCell.cloneNode();
        field.append(curCell);
    }

    const matrix = createMatrix(w, h, count);

    const cellsArr = document.querySelectorAll('.main-field__cell');

    cellsArr.forEach((c, i) => {
        c.dataset.index = i;

        const data = getCellData(c);
        data.elem = c
        if (typeof data.value === 'number') c.classList.add(`main-field__cell_${data.value}`);
    })

    console.log(matrix);
}