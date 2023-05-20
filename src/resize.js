import { startGame } from "./start";
import { changeTurnsCount } from "./turns-count";

let templateSize;

export function setSize() {
  let windowWidth = window.innerWidth;

  if (windowWidth < 790) {
    templateSize = 90;
  } else if (windowWidth < 1200) {
    templateSize = 50;
  } else {
    templateSize = 33;
  }

  console.log(templateSize);
}

const sizesObj = {
  easy: {
    field: () => { return `${templateSize}vw` },
    cell: () => { return `${templateSize / 10}vw` },
    font: () => { return `${templateSize / 10 * 0.8}vw` }
  },

  medium: {
    field: () => { return `${templateSize}vw` },
    cell: () => { return `${templateSize / 15}vw` },
    font: () => { return `${templateSize / 15 * 0.9}vw` }
  },

  hard: {
    field: () => { return `${templateSize}vw` },
    cell: () => { return `${templateSize / 25}vw` },
    font: () => { return `${templateSize / 25}vw` }
  }
}

export let currentSize = sizesObj['easy'];
export let currentDifficulty = 'easy';
export let currentDifficultyIndex = 0;

export function resizeField(newLevel, isRebuild) {
  const sizeToggler = document.querySelector('.size-toggler');
  const sizeOptionIndex = sizeToggler.selectedIndex;
  const level = newLevel || sizeToggler.children[sizeOptionIndex].dataset.level;
  let levelBombCount;

  currentDifficultyIndex = sizeOptionIndex;
  currentDifficulty = level;
  currentSize = sizesObj[level];

  switch (level) {
    case 'easy':
      levelBombCount = 10;
      startGame(10, 10, levelBombCount, isRebuild);
      break;
    case 'medium':
      levelBombCount = 20;
      startGame(15, 15, levelBombCount, isRebuild);
      break;
    case 'hard':
      levelBombCount = 60;
      startGame(25, 25, levelBombCount, isRebuild);
      break;
  }

  const countToggler = document.querySelector('.bombs-toggler');
  countToggler.selectedIndex = levelBombCount - 10;
  changeTurnsCount(0);
}

export function changeBombDifficulty() {
  const countToggler = document.querySelector('.count-toggler');
  const countOptionIndex = countToggler.selectedIndex;
  const count = countToggler.children[countOptionIndex].dataset.count;

  startGame(undefined, undefined, count);
}