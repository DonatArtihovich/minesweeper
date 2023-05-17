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

export function resizeField() {
    const sizeToggler = document.querySelector('.size-toggler');
    const sizeOptionIndex = sizeToggler.selectedIndex;
    const level = sizeToggler.children[sizeOptionIndex].dataset.level;

    curSize = sizesObj[level];

    switch (level) {
        case 'easy':
            startGame(10, 10, 10);
            break;
        case 'medium':
            startGame(15, 15, 20);
            break;
        case 'hard':
            startGame(25, 25, 60);
            break;
    }
}

export function changeBombCount() {
    const countToggler = document.querySelector('.count-toggler');
    const countOptionIndex = countToggler.selectedIndex;
    const count = countToggler.children[countOptionIndex].dataset.count;

    startGame(undefined, undefined, count);
}