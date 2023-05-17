import createElem from './element';
import { createMatrix } from './matrix';
import { getCellData } from './cell-data';
import { changeFlagCount } from './event';
import { curSize } from './resize';

export let bombCount = 0;
let curWidth = 10;
let curHeight = 10;
let curBombCount = 10;

export function createField(w = curWidth, h = curHeight, count = curBombCount) {
    if (curWidth !== w) curWidth = w;
    if (curHeight !== h) curHeight = h;
    if (curBombCount !== count) curBombCount = count;

    const field = document.querySelector('.main-field');
    field.innerHTML = '';
    bombCount = count;
    const templateCell = createElem('div', 'main-field__cell');
    const templateRow = createElem('div', 'main-field__row');

    for (let i = 0; i < h; i++) {
        const curRow = templateRow.cloneNode();
        for (let i = 0; i < w; i++) {
            const curCell = templateCell.cloneNode();
            curRow.append(curCell);
        }
        field.append(curRow);
    }

    createMatrix(w, h, count);

    const cellsArr = document.querySelectorAll('.main-field__cell');

    cellsArr.forEach((c, i) => {
        c.dataset.index = i;

        const data = getCellData(c);
        data.elem = c
        if (typeof data.value === 'number') c.classList.add(`main-field__cell_${data.value}`);
    })

    const bombCountElement = document.querySelector('.menu-field__bomb-count');
    bombCountElement.textContent = `Bombs: ${bombCount}`;
    changeFlagCount(false, true);

    changeSizes()
}

export function changeBombCount(b) {
    if (!bombCount) return;
    b ? bombCount++ : bombCount--;
    const bombCountElement = document.querySelector('.menu-field__bomb-count');
    bombCountElement.textContent = `Bombs: ${bombCount}`;
}

function changeSizes() {
    const fieldContainer = document.querySelector('.main-field');
    const fieldCells = document.querySelectorAll('.main-field__cell');

    fieldContainer.style.width = `${curSize.field}px`;
    fieldContainer.style.height = `${curSize.field}px`;

    fieldCells.forEach(c => {
        c.style.width = `${curSize.cell}px`;
        c.style.height = `${curSize.cell}px`;
        c.style.fontSize = `${curSize.font}px`;
    })
}
