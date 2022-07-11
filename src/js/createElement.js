const createElement = ({
  tag,
  classList,
  text,
  parent,
  id,
  child,
  src,
  href,
  type
}) => {
  const element = document.createElement(tag);
  if (id) {
    element.id = id;
  }
  if (classList.length) {
    classList.map((className) => {
      element.classList.add(className);
    });
  }
  if (text) {
    element.textContent = text;
  }
  if (parent) {
    parent.append(element);
  }
  if (child) {
    element.append(child);
  }
  if (src) {
    element.setAttribute("src", src);
  }
  if (href) {
    element.setAttribute("href", href);
  }
  if (type) {
    element.setAttribute("type", type);
  }

  return element;
};

export default createElement;
