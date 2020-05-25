const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newDay = document.createElement(`div`);
  newDay.innerHTML = template;

  return newDay.firstChild;
};

const renderElement = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const replaceElement = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {
  RenderPosition,
  createElement,
  renderElement,
  replaceElement,
  remove,
};
