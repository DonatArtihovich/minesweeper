import { startGame } from './start';
import { changeTurnsCount } from './turns-count';

let templateSize;

export function setSize() {
  const windowWidth = window.innerWidth;

  if (windowWidth < 790) {
    templateSize = 90;
  } else if (windowWidth < 1200) {
    templateSize = 50;
  } else {
    templateSize = 33;
  }
}

const sizesObj = {
  easy: {
    field: () => `${templateSize}vw`,
    cell: () => `${templateSize / 10}vw`,
    font: () => `${(templateSize / 10) * 0.8}vw`,
  },

  medium: {
    field: () => `${templateSize}vw`,
    cell: () => `${templateSize / 15}vw`,
    font: () => `${(templateSize / 15) * 0.9}vw`,
  },

  hard: {
    field: () => `${templateSize}vw`,
    cell: () => `${templateSize / 25}vw`,
    font: () => `${templateSize / 25}vw`,
  },
};

export let currentSize = sizesObj.easy;
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
    default:
      break;
  }

  const countToggler = document.querySelector('.bombs-toggler');
  countToggler.selectedIndex = levelBombCount - 10;
  changeTurnsCount(0);

}

export function changeBombDifficulty() {
  const bombsToggler = document.querySelector('.bombs-toggler');
  const bombsOptionIndex = bombsToggler.selectedIndex;
  const { count } = bombsToggler.children[bombsOptionIndex].dataset;

  startGame(undefined, undefined, count);

}
