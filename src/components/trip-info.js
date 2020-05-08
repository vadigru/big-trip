import AbstractComponent from './abstract-component.js';
import {parseDate} from '../utils/common.js';

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
      `<div class="trip-info__main">
        <h1 class="trip-info__title">
        ${this._cities.length > 3
        ? `${this._startDates[0].city} &nbsp;&mdash;&nbsp; ... &nbsp;&mdash;&nbsp; ${this._endDates[this._endDates.length - 1].city}`
        : `${this._startDates[0].city} &nbsp;&mdash;&nbsp; ${this._startDates[1].city} &nbsp;&mdash;&nbsp; ${this._cities[this._cities.length - 1]}`}
        </h1>

        <p class="trip-info__dates">
          ${parseDate(new Date(this._points[0].startDate))}
          &nbsp;&mdash;&nbsp;
          ${parseDate(new Date(this._endDates[this._endDates.length - 1].endDate))}
        </p>
      </div>`
    );
  }
}
