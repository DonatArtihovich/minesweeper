import { startTimer } from './menu.js';
import { createField } from './field.js';

export function startGame(w, h, count) {
    console.log('start: ', w, h, count)
    createField(w, h, count);
    startTimer();
}