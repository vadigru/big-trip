import {createElement} from '../utils.js';

const getWaypointsCost = (arr) => arr.reduce((acc, it) => acc + it.price, 0);

const getOffersCost = (arr) => {
  let sum = 0;
  arr.forEach((item) => {
    sum += item.offers.reduce((acc, it) => it.checked ? acc + it.price : acc, 0);
  });
  return sum;
};

export const createTripCost = (arr) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getWaypointsCost(arr)
        + getOffersCost(arr)}</span>
    </p>`
  );
};

export default class TripCost {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createTripCost(this._point);
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
