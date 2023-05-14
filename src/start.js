import { startTimer, clearTurnsCount } from './menu.js';
import { createField } from './field.js';

export function startGame(w, h, count) {
    createField(w, h, count);
    startTimer();
}