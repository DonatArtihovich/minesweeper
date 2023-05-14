import { createMatrix } from './matrix.js';
import { startTimer } from './menu.js';

export function startGame(w, h, count) {
    createMatrix(w, h, count);
    startTimer();
}