import AbstractComponent from './abstract-component.js';
import {parseDate} from '../utils/common.js';

const getTripCities = (pointsArr, citiesArr, startDatesArr, endDatesArr) => {
  let str = ``;
  if (citiesArr.length <= 2) {
    str = `${startDatesArr[0].city} &nbsp;&mdash;&nbsp; ${startDatesArr[startDatesArr.length - 1].city}`;
  }
  if (citiesArr.length === 3) {
    str = `${startDatesArr[0].city} &nbsp;&mdash;&nbsp; ${startDatesArr[1].city} &nbsp;&mdash;&nbsp; ${startDatesArr[startDatesArr.length - 1].city}`;
  }
  if (citiesArr.length > 3) {
    str = `${startDatesArr[0].city} &nbsp;&mdash;&nbsp; ... &nbsp;&mdash;&nbsp; ${endDatesArr[endDatesArr.length - 1].city}`;
  }
  return str;
}

export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
    this._startDates = this._points.slice().sort((a, b) => a.startDate - b.startDate);
    this._endDates = this._points.slice().sort((a, b) => a.endDate - b.endDate);
    this._cities = [...new Set(points.map((it) => it.city))];
  }

  getTemplate() {
    return (
      `${this._points.length === 0 ? `<div class="trip-info__main">
        <h1 class="trip-info__title"></h1>
        <p class="trip-info__dates"></p>
      </div>` :
        `<div class="trip-info__main">
        <h1 class="trip-info__title">
        ${getTripCities(this._points, this._cities, this._startDates, this._endDates)}
        </h1>

        <p class="trip-info__dates">
          ${parseDate(new Date(this._points[0].startDate))}
          &nbsp;&mdash;&nbsp;
          ${parseDate(new Date(this._endDates[this._endDates.length - 1].endDate))}
        </p>
      </div>`
      }`
    );
  }

}
