import { startGame } from './start.js';
import { openCell, flagCell } from './event';
import { rebuildField } from './save.js';
import { changeSizes } from './field.js';
import createElem from './element.js';
import createMenu from './menu.js';

export function initGame() {
  const gameField = createElem('div', 'main-field')
  document.body.append(gameField);

  createMenu();

  const localStorage = window.localStorage;
  localStorage.getItem('game') ? rebuildField() : startGame();

  window.addEventListener('resize', changeSizes);

  addCellListeners();
}

function addCellListeners() {
  const gameField = document.querySelector('.main-field');

  gameField.addEventListener('click', event => {
    if (event.target.classList.contains('main-field__cell')) openCell(event.target);
  });
  gameField.addEventListener('contextmenu', event => {
    if (event.target.classList.contains('main-field__cell')) flagCell(event, event.target);
  });
}