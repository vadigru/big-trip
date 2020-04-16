import {createElement} from "../utils.js";

const tripDayNoPoint = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return tripDayNoPoint();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
