import createElem from './element.js';
import { turnsCount, curTime } from './menu.js';

export function openModal(boolean) {
    setTimeout(() => {
        if (boolean) {
            createWinModal()
        } else {
            createEndModal()
        }
    }, 100);
}

function createEndModal() {
    const modalOverlay = createElem('div', 'modal-overlay');
    const modal = createElem('div', 'game-modal');

    const modalAlertWrapper = createElem('div', 'game-modal__alert-wrapper');
    const modalAlert = createElem('p', 'game-modal__alert', 'Game over. Try again!');
    modalAlertWrapper.append(modalAlert);

    const tryAgainButton = createElem('button', 'game-modal__button', 'Try again');
    tryAgainButton.addEventListener('click', closeModal);

    modal.append(modalAlertWrapper, tryAgainButton);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);
}

function createWinModal() {

    const modalOverlay = createElem('div', 'modal-overlay');
    const modal = createElem('div', 'game-modal');

    const modalAlertWrapper = createElem('div', 'game-modal__alert-wrapper');
    const modalAlert = createElem('p', 'game-modal__alert', `Hooray! You found all mines in ${curTime} seconds and ${turnsCount} moves!`);
    modalAlertWrapper.append(modalAlert);

    const tryAgainButton = createElem('button', 'game-modal__button', 'Play again');
    tryAgainButton.addEventListener('click', closeModal);

    modal.append(modalAlertWrapper, tryAgainButton);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    setTimeout(() => { modal.remove() }, 90);
}
