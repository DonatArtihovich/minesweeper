import { startGame } from "./start";
import { changeTurnsCount } from "./turns-count";

const sizesObj = {
    easy: {
        field: 500,
        cell: 50,
        font: 40
    },

    medium: {
        field: 495,
        cell: 33,
        font: 30
    },

    hard: {
        field: 500,
        cell: 20,
        font: 20
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

    const countToggler = document.querySelector('.count-toggler');
    countToggler.selectedIndex = levelBombCount - 10;
    changeTurnsCount(0);
}

export function changeBombDifficulty() {
    const countToggler = document.querySelector('.count-toggler');
    const countOptionIndex = countToggler.selectedIndex;
    const count = countToggler.children[countOptionIndex].dataset.count;

    startGame(undefined, undefined, count);
}