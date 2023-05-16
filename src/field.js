import createElem from './element';
import { createMatrix } from './matrix';
import { getCellData } from './cell-data';
import { changeFlagCount } from './event';

export let bombCount = 0;

export function createField(w = 10, h = 10, count = 10) {
    const cellsCount = w * h;
    const field = document.querySelector('.main-field');
    field.innerHTML = '';
    bombCount = count;
    const templateCell = createElem('div', 'main-field__cell');

    for (let i = 0; i < cellsCount; i++) {
        const curCell = templateCell.cloneNode();
        field.append(curCell);
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
}

export function changeBombCount(b) {
    if (!bombCount) return;
    b ? bombCount++ : bombCount--;
    const bombCountElement = document.querySelector('.menu-field__bomb-count');
    bombCountElement.textContent = `Bombs: ${bombCount}`;
}

