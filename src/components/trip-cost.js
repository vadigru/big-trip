import AbstractComponent from './abstract-component.js';

const getWaypointsCost = (arr) => arr.reduce((acc, it) => acc + it.price, 0);

const getOffersCost = (arr) => {
  let sum = 0;
  arr.forEach((item) => {
    sum += item.offers.reduce((acc, it) => it.checked ? acc + it.price : acc, 0);
  });
  return sum;
};

export default class TripCost extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return (
      `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getWaypointsCost(this._points)
          + getOffersCost(this._points)}</span>
      </p>`
    );
  }
}
