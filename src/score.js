export function setScore(status, time, turns, difficulty, bombs) {
    const localStorage = window.localStorage;
    const scoreArr = !localStorage.getItem('score') ? [] : JSON.parse(localStorage.getItem('score'));
    const newScore = { status, time, turns, difficulty, bombs };

    if (scoreArr.length < 10) {
        scoreArr.push(newScore);
    } else {
        scoreArr.splice(0, 1);
        scoreArr.push(newScore);
    }

    if (localStorage.getItem('score')) localStorage.removeItem('score');
    localStorage.setItem('score', JSON.stringify(scoreArr));
}