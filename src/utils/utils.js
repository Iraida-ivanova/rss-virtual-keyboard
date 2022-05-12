export const createDomNode = (elem, ...classes) => {
  const node = document.createElement(elem);
  node.classList.add(...classes);
  return node;
};
