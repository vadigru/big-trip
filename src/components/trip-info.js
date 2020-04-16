import {createElement} from '../utils.js';

const createTripInfo = (point, date) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${point.length > 2
      ? point[0].city + `&nbsp;&mdash;&nbsp;` + ` ... ` + `&nbsp;&mdash;&nbsp;` + point[point.length - 1].city
      : point[0].city + `&nbsp;&mdash;&nbsp;` + point[point.length - 1].city}</h1>
      <p class="trip-info__dates">
      ${new Date(date[0]).toLocaleString(`en-US`, {
      month: `short`,
      day: `numeric`
    }) + `&nbsp;&mdash;&nbsp;`
    + new Date(date[date.length - 1]).toLocaleString(`en-US`, {
      month: `short`,
      day: `numeric`
    })}</p>
    </div>`
  );
};

export default class TripInfo {
  constructor(point, date) {
    this._point = point;
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createTripInfo(this._point, this._date);
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
