export default function createElem(name, className, content) {
  const elem = document.createElement(name);
  elem.className = (className);
  if (content) elem.textContent = content;

  return elem;
}
