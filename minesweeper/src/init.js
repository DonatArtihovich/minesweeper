import { startGame } from './start';
import { openCell, flagCell } from './event';
import { rebuildField } from './save';
import { changeSizes } from './field';
import { setSize } from './resize';
import createElem from './element';
import createMenu from './menu';
import changeTheme from './theme';

export function initGame() {
  const gameField = createElem('div', 'main-field');
  document.body.append(gameField);

  createMenu();
  addThemeTogglerButton();

  setSize();

  const { localStorage } = window;
  localStorage.getItem('game') ? rebuildField() : startGame();

  window.addEventListener('resize', changeSizes);

  addCellListeners();
}

function addCellListeners() {
  const gameField = document.querySelector('.main-field');

  gameField.addEventListener('click', (event) => {
    if (event.target.classList.contains('main-field__cell')) openCell(event.target);
  });
  gameField.addEventListener('contextmenu', (event) => {
    if (event.target.classList.contains('main-field__cell')) flagCell(event, event.target);
  });
}

function addThemeTogglerButton() {
  const themeToggler = createElem('button', 'theme-toggler-button', 'Change Theme!');
  document.body.append(themeToggler);
  themeToggler.addEventListener('click', changeTheme);
}
