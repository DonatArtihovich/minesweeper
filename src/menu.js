import { restartGame } from './start.js';
import { toggleSound } from './sound.js';
import { resizeField, changeBombDifficulty } from './resize.js';
import { openScoreModal } from './modal.js';
import { createTurnsCounter } from './turns-count.js';
import createElem from './element.js';
import saveGame from './save.js';

export default function createMenu() {
  const menuField = createElem('div', 'menu-field');

  const menuWrapper = createElem('div', 'menu-field__btns-wrapper');
  const headerWrapper = createElem('div', 'menu-field__header-wrapper');

  const menuHeader = createElem('h1', 'menu-field__header', 'Minesweeper');

  const turnsFieldCount = createTurnsCounter();

  const fieldTimer = createElem('p', 'menu-field__timer menu-counter');

  const restartButton = createElem('button', 'menu-field__restart-button menu-field__button', 'Restart');
  restartButton.addEventListener('click', restartGame);

  const bombFieldCount = createElem('p', 'menu-field__bomb-counter menu-counter');
  const flagFieldCount = createElem('p', 'menu-field__flag-counter menu-counter');

  const soundToggler = createElem('button', 'menu-field__sound-button menu-field__button', 'Sound: on');
  soundToggler.addEventListener('click', toggleSound);

  const sizeTogglerWrapper = createElem('div', 'size-toggler__wrapper toggler__wrapper');
  const sizeToggler = createSizeToggler();
  const sizeTogglerHeader = createElem('span', 'menu-counter size-toggler__header toggler__header', 'Difficulty: ');
  sizeTogglerWrapper.append(sizeTogglerHeader, sizeToggler);

  const countTogglerWrapper = createElem('div', 'bombs-toggler__wrapper toggler__wrapper');
  const countToggler = createBombCountToggler();
  const countTogglerHeader = createElem('span', 'menu-counter bombs-toggler__header toggler__header', 'Bombs: ');
  countTogglerWrapper.append(countTogglerHeader, countToggler);

  const scoreButton = createElem('button', 'menu-field__score-button menu-field__button menu-field__bottom-button', 'Score');
  scoreButton.addEventListener('click', openScoreModal);

  const saveButton = createElem('button', 'menu-field__save-button menu-field__button menu-field__bottom-button', 'Save');
  saveButton.addEventListener('click', saveGame);

  headerWrapper.append(menuHeader);
  menuWrapper.append(turnsFieldCount, fieldTimer, bombFieldCount,
    flagFieldCount, restartButton, soundToggler, sizeTogglerWrapper,
    countTogglerWrapper, scoreButton, saveButton);
  menuField.append(headerWrapper, menuWrapper);
  document.body.prepend(menuField);
}

function createSizeToggler() {
  const sizeToggler = createElem('select', 'size-toggler toggler');

  const easyOption = createElem('option', 'size-toggler__option toggler__option', 'Easy');
  easyOption.dataset.level = 'easy';
  const mediumOption = createElem('option', 'size-toggler__option toggler__option', 'Medium');
  mediumOption.dataset.level = 'medium';
  const hardOption = createElem('option', 'size-toggler__option toggler__option', 'Hard');
  hardOption.dataset.level = 'hard';
  sizeToggler.append(easyOption, mediumOption, hardOption);

  sizeToggler.addEventListener('change', () => resizeField())

  return sizeToggler
}

function createBombCountToggler() {
  const countToggler = createElem('select', 'bombs-toggler toggler');
  const templateOption = createElem('option', 'bombs-toggler__option toggler__option');

  for (let i = 10; i <= 99; i++) {
    const curOption = templateOption.cloneNode();
    curOption.textContent = i;
    curOption.dataset.count = i;
    countToggler.append(curOption);
  }

  countToggler.addEventListener('change', () => changeBombDifficulty());

  return countToggler
}