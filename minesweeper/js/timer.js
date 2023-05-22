let intervalID;
export let currentTime = 0;

export function startTimer(startTime = 0) {
  const fieldTimer = document.querySelector('.menu-field__timer');
  const timerStartTimeText = startTime < 10 ? `0${startTime}` : startTime;
  fieldTimer.textContent = `🕑 ${timerStartTimeText}`;
  currentTime = startTime;

  clearInterval(intervalID);

  intervalID = setInterval(() => {
    currentTime += 1;

    const timeContent = (currentTime > 9) ? currentTime : '0' + `${currentTime}`;
    fieldTimer.textContent = `🕑 ${timeContent}`;
  }, 1000);
}

export function stopTimer() {
  clearInterval(intervalID);
}
