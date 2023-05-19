import { gameMatrix, setMatrix } from "./matrix";
import { currentBombCount, bombCount, changeBombCount, changeSizes } from "./field";
import { flagCount, changeFlagCount } from "./event";
import { turnsCount, changeTurnsCount } from "./turns-count";
import { currentTime, startTimer } from "./timer";
import { currentDifficulty, currentDifficultyIndex, resizeField } from "./resize";
import { soundOn, toggleSound } from "./sound";
import { getCellData } from "./cell-data";

export default function saveGame() {
    let check = true;
    gameMatrix.forEach(matrixRow => {
        matrixRow.forEach(cell => {
            if (cell.isBomb && cell.isOpened) check = false;
        })
    })
    if (!check) return
    const localStorage = window.localStorage;
    if (localStorage.getItem('game')) localStorage.removeItem('game');
    const mainField = document.querySelector('.main-field');

    const stateObject = {
        matrix: gameMatrix,
        field: mainField.innerHTML,
        bombCount: currentBombCount,
        flagCount: flagCount,
        turnsCount: turnsCount,
        curTime: currentTime,
        curDifficulty: currentDifficulty,
        curDifficultyIndex: currentDifficultyIndex,
        curBombIndex: bombCount - 10,
        sound: soundOn
    }

    localStorage.setItem('game', JSON.stringify(stateObject));
}

export function rebuildField() {
    const localStorage = window.localStorage;
    const state = JSON.parse(localStorage.getItem('game'));
    const mainField = document.querySelector('.main-field');
    setMatrix(state.matrix);

    resizeField(state.curDifficulty, true);

    mainField.innerHTML = state.field;
    changeSizes();

    const cellsArr = document.querySelectorAll('.main-field__cell');
    cellsArr.forEach(c => {
        const data = getCellData(c);
        data.elem = c;
    })

    changeBombCount(state.bombCount);
    changeFlagCount(state.flagCount);
    changeTurnsCount(state.turnsCount);

    const sizeToggler = document.querySelector('.size-toggler');
    sizeToggler.selectedIndex = state.curDifficultyIndex;

    const countToggler = document.querySelector('.bombs-toggler');
    countToggler.selectedIndex = state.curBombIndex;

    if (soundOn !== state.sound) toggleSound();
    startTimer(state.curTime);
}