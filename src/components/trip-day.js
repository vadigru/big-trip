import {createElement} from '../utils.js';

export const createTripDay = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class TripDay {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDay();
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