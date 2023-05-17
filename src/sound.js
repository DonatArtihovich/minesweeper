import cellPath from './assets/audio/cell.mp3';
import bombPath from './assets/audio/bomb.mp3';
import flagPath from './assets/audio/flag.mp3';
import winPath from './assets/audio/win.mp3';

const cellSound = new Audio(cellPath);
const bombSound = new Audio(bombPath);
const flagSound = new Audio(flagPath);
const winSound = new Audio(winPath);

let soundOn = true;

export function playSound(sound) {
    if (!soundOn) return
    switch (sound) {
        case 'cell':
            cellSound.currentTime = 0;
            cellSound.play();
            break;
        case 'bomb':
            bombSound.play();
            break;
        case 'flag':
            flagSound.currentTime = 0;
            flagSound.play();
            break;
        case 'win':
            winSound.play();
            break;
    }
}

export function toggleSound() {
    soundOn = !soundOn;
    const soundToggler = document.querySelector('.menu-field__sound-button');
    soundToggler.classList.toggle('sound-off');
    soundToggler.textContent = soundOn ? 'Sound: on' : 'Sound: off';

}