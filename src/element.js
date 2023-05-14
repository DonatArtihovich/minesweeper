export default function createElem(name, className, content) {
    const elem = document.createElement(name);
    elem.classList.add(className);
    if (content) elem.textContent = content;

    return elem
}