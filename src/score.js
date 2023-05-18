let scoreArr;

export function setScore(status, time, turns, difficulty, bombs) {
    const localStorage = window.localStorage;

    if (!localStorage.getItem('score')) {
        scoreArr = [];
    } else {
        scoreArr = JSON.parse(localStorage.getItem('score'));
    }

    const curScore = { status, time, turns, difficulty, bombs };

    if (scoreArr.length < 10) {
        scoreArr.push(curScore);
    } else {
        scoreArr.splice(0, 1);
        scoreArr.push(curScore);
    }

    if (localStorage.getItem('score')) localStorage.removeItem('score');
    localStorage.setItem('score', JSON.stringify(scoreArr));
}