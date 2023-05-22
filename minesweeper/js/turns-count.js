import createElem from './element';

export let turnsCount = 0;

export function changeTurnsCount(value) {
  turnsCount = value;
  const turnsFieldCount = document.querySelector('.menu-field__turns-counter');
  turnsFieldCount.innerText = `👆 ${turnsCount}`;
}

export function createTurnsCounter() {
  const turnsFieldCounter = createElem('p', 'menu-field__turns-counter menu-counter', `👆 ${turnsCount}`);

  const mainField = document.querySelector('.main-field');
  mainField.addEventListener('click', (event) => {
    if (!event.target.classList.contains('main-field__cell')
      || event.target.classList.contains('main-field__cell_opened')
      || event.target.textContent === '🚩') return;
    changeTurnsCount(turnsCount + 1);
  }, { capture: true });
  return turnsFieldCounter;
}
