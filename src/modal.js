import createElem from './element.js';

export function openModal() {
    setTimeout(() => { createEndModal() }, 100);
}

export function createEndModal() {
    const modalOverlay = createElem('div', 'modal-overlay');
    const modal = createElem('div', 'game-over-modal');

    const modalAlertWrapper = createElem('div', 'game-over-modal__alert-wrapper');
    const modalAlert = createElem('p', 'game-over-modal__alert', 'Game over. Try again!');
    modalAlertWrapper.append(modalAlert);

    const tryAgainButton = createElem('button', 'game-over-modal__button', 'Try again');
    tryAgainButton.addEventListener('click', closeModal);

    modal.append(modalAlertWrapper, tryAgainButton);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    setTimeout(() => { modal.remove() }, 90);
}

