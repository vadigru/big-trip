import {createElement} from '../utils.js';

const createTripDayEntry = (date, dateIndex) => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dateIndex}</span>
          <time class="day__date" datetime="${date}">${new Date(date).toLocaleString(`en-US`, {
      month: `short`,
      day: `numeric`
    })}</time>
        </div>

        <ul class="trip-events__list">

        </ul>
      </li>`
  );
};

export default class TripCost {
  constructor(date, dateIndex) {
    this._date = date;
    this._dateIndex = dateIndex;
    this._element = null;
  }

  getTemplate() {
    return createTripDayEntry(this._date, this._dateIndex);
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
