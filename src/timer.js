let intervalID;
export let currentTime = 0;

export function startTimer(startTime = 0) {
  const fieldTimer = document.querySelector('.menu-field__timer');
  const timerStartTimeText = startTime < 10 ? `0${startTime}` : startTime;
  fieldTimer.textContent = 'Time: ' + timerStartTimeText;
  currentTime = startTime;

  clearInterval(intervalID);

  intervalID = setInterval(() => {
    currentTime++;

    const timeContent = (currentTime > 9) ? currentTime : '0' + `${currentTime}`;
    fieldTimer.textContent = 'Time: ' + timeContent;
  }, 1000)
}

export function stopTimer() {
  clearInterval(intervalID);
}