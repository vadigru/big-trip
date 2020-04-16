import {createElement} from '../utils.js';

const createTripMainInfo = () => {
  return (
    `<section class="trip-main__trip-info trip-info">
    </section>`
  );
};

export default class TripMainInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripMainInfo();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._lement = null;
  }
}
