import createElem from './element';
import { createMatrix } from './matrix';
import { getCellData } from './cell-data';
import { changeFlagCount } from './event';
import { currentSize, setSize } from './resize';

export let currentBombCount = 0;
export let bombCount = 10;
let curWidth = 10;
let curHeight = 10;

export function createField(w = curWidth, h = curHeight, count = bombCount, isRebuild) {
  if (curWidth !== w) curWidth = w;
  if (curHeight !== h) curHeight = h;
  if (bombCount !== count) bombCount = count;
  currentBombCount = count;

  const field = document.querySelector('.main-field');
  field.innerHTML = '';
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

  const cellsArr = document.querySelectorAll('.main-field__cell');
  cellsArr.forEach((c, i) => {
    c.dataset.index = i;
  });

  if (!isRebuild) createMatrix(w, h, count);

  cellsArr.forEach((c) => {
    const data = getCellData(c);
    data.elem = c;
    if (typeof data.value === 'number') c.classList.add(`main-field__cell_${data.value}`);
  });

  const bombCountElement = document.querySelector('.menu-field__bomb-counter');
  bombCountElement.textContent = `Bombs: ${currentBombCount}`;
  changeFlagCount(0);

  changeSizes();
}

export function changeBombCount(value) {
  if (value < 0) return;

  currentBombCount = value;
  const bombCountElement = document.querySelector('.menu-field__bomb-counter');
  bombCountElement.textContent = `💣 ${currentBombCount}`;
}

export function changeSizes() {
  const fieldContainer = document.querySelector('.main-field');
  const fieldCells = document.querySelectorAll('.main-field__cell');

  setSize();

  fieldContainer.style.width = currentSize.field();
  fieldContainer.style.height = currentSize.field();

  fieldCells.forEach((c) => {
    c.style.width = currentSize.cell();
    c.style.height = currentSize.cell();
    c.style.fontSize = currentSize.font();
  });
}
