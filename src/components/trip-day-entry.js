import AbstractComponent from './abstract-component.js';

export default class TripCost extends AbstractComponent {
  constructor(date, dateIndex) {
    super();
    this._date = date;
    this._dateIndex = dateIndex;
  }

  getTemplate() {
    return (
      `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">
              ${this._dateIndex}
            </span>
            <time
              class="day__date"
              datetime="${this._date}">
              ${new Date(this._date).toLocaleString(`en-US`, {
        month: `short`,
        day: `numeric`
      })}
            </timeclass="day__date">
          </div>

          <ul class="trip-events__list">
          </ul>
        </li>`
    );
  }
}
