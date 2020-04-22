import AbstractComponent from './abstract-component.js';

export default class TripInfo extends AbstractComponent {
  constructor(point, date) {
    super();
    this._point = point;
    this._date = date;
  }

  getTemplate() {
    return (
      `<div class="trip-info__main">
        <h1 class="trip-info__title">
        ${this._point.length > 2
        ? this._point[0].city + `&nbsp;&mdash;&nbsp;` + ` ... ` + `&nbsp;&mdash;&nbsp;` + this._point[this._point.length - 1].city
        : this._point[0].city + `&nbsp;&mdash;&nbsp;` + this._point[this._point.length - 1].city}</h1>
        <p class="trip-info__dates">
        ${new Date(this._date[0]).toLocaleString(`en-US`, {
        month: `short`,
        day: `numeric`
      }) + `&nbsp;&mdash;&nbsp;`
      + new Date(this._date[this._date.length - 1]).toLocaleString(`en-US`, {
        month: `short`,
        day: `numeric`
      })}</p>
      </div>`
    );
  }
}
