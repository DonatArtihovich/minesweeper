import { gameMatrix, setMatrix } from "./matrix";
import { getCellData } from "./cell-data";
import { bombCount, curBombCount } from "./field";
import { flagCount } from "./event";
import { turnsCount, curTime, startTimer, setTurnsCount } from "./menu";
import { curDifficulty, curDifficultyIndex, resizeField } from "./resize";
import { soundOn, handleSoundButton } from "./sound";

export default function saveGame() {
    const localStorage = window.localStorage;

    const mainField = document.querySelector('.main-field');

    const stateObject = {
        matrix: gameMatrix,
        field: mainField.innerHTML,
        bombCount: bombCount,
        flagCount: flagCount,
        turnsCount: turnsCount,
        curTime: curTime,
        curDifficulty: curDifficulty,
        curDifficultyIndex: curDifficultyIndex,
        curBombIndex: curBombCount - 10,
        sound: soundOn
    }
    localStorage.setItem('game', JSON.stringify(stateObject));
}

export function rebuildField() {
    const localStorage = window.localStorage;
    const state = JSON.parse(localStorage.getItem('game'));
    resizeField(state.curDifficulty);
    const mainField = document.querySelector('.main-field');

    setMatrix(state.matrix);

    mainField.innerHTML = state.field;

    const cellsArr = document.querySelectorAll('.main-field__cell');
    cellsArr.forEach(c => {
        const data = getCellData(c);
        data.elem = c;
    })

    const bombCountElement = document.querySelector('.menu-field__bomb-counter');
    bombCountElement.textContent = `Bombs: ${state.bombCount}`;

    const flagCountElement = document.querySelector('.menu-field__flag-counter');
    flagCountElement.textContent = `Flags: ${state.flagCount}`;

    const turnsCounter = document.querySelector('.menu-field__turns-counter');
    turnsCounter.textContent = `Turns: ${state.turnsCount}`;
    setTurnsCount(state.turnsCount)

    const sizeToggler = document.querySelector('.size-toggler');
    sizeToggler.selectedIndex = state.curDifficultyIndex;

    const countToggler = document.querySelector('.count-toggler');
    countToggler.selectedIndex = state.curBombIndex;

    if (soundOn !== state.sound) handleSoundButton();

    startTimer(state.curTime);
}