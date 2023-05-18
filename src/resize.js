import { startGame } from "./start";

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

export let curSize = sizesObj['easy'];
export let curDifficulty = 'easy';

export function resizeField() {
    const sizeToggler = document.querySelector('.size-toggler');
    const sizeOptionIndex = sizeToggler.selectedIndex;
    const level = sizeToggler.children[sizeOptionIndex].dataset.level;

    curDifficulty = level;
    curSize = sizesObj[level];
    let levelBombCount;

    switch (level) {
        case 'easy':
            levelBombCount = 10;
            startGame(10, 10, levelBombCount);
            break;
        case 'medium':
            levelBombCount = 20;
            startGame(15, 15, levelBombCount);
            break;
        case 'hard':
            levelBombCount = 60;
            startGame(25, 25, levelBombCount);
            break;
    }

    const countToggler = document.querySelector('.count-toggler');
    countToggler.selectedIndex = levelBombCount - 10;
}

export function changeBombCount() {
    const countToggler = document.querySelector('.count-toggler');
    const countOptionIndex = countToggler.selectedIndex;
    const count = countToggler.children[countOptionIndex].dataset.count;

    startGame(undefined, undefined, count);
}