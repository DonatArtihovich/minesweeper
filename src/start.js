import { createMatrix } from './matrix.js';

let intervalID;

export function startGame(w, h, count) {
    createMatrix(w, h, count);
    startTimer()
}

function startTimer() {
    const fieldTimer = document.querySelector('.menu-field__timer');
    fieldTimer.textContent = 'Time: 00';
    let curTime = 0;
    clearInterval(intervalID);

    intervalID = setInterval(() => {
        curTime++;

        const timeContent = (curTime > 9) ? curTime : '0' + `${curTime}`;
        fieldTimer.textContent = 'Time: ' + timeContent;
    }, 1000)
}