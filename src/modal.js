import createElem from './element.js';

export function openModal(boolean, values) {
    setTimeout(() => {
        if (boolean) {
            createWinModal(values)
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

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    setTimeout(() => { modal.remove() }, 90);
}

function createWinModal(values) {
    if (!values) return

    const modalOverlay = createElem('div', 'modal-overlay');
    const modal = createElem('div', 'game-modal');

    const modalAlertWrapper = createElem('div', 'game-modal__alert-wrapper');
    const modalAlert = createElem('p', 'game-modal__alert', `Hooray! You found all mines in ${values.curTime} seconds and ${values.turnsCount} moves!`);
    modalAlertWrapper.append(modalAlert);

    const tryAgainButton = createElem('button', 'game-modal__button', 'Play again');
    tryAgainButton.addEventListener('click', closeModal);

    modal.append(modalAlertWrapper, tryAgainButton);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);
}
