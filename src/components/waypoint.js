import {parseTime, capitalizeFirstLetter, createElement} from "../utils";

const getDateDiff = (startDate, endDate) => {
  let days = Math.floor(((endDate - startDate) / 86400000));
  let hours = endDate - startDate > 0 ? 0 : 24;
  hours += Math.floor(((endDate - startDate) % 86400000) / 3600000);
  let minutes = endDate - startDate > 0 ? 0 : 60;
  minutes += Math.round((((endDate - startDate) % 86400000) % 3600000) / 60000);

  const addZero = (value) => value < 10 ? `0${value}` : `${value}`;

  const daysOutput = parseInt(days, 10) !== 0 ? `${addZero(days)}D ` : ``;
  const hoursOutput = parseInt(hours, 10) !== 0 ? `${addZero(hours)}H ` : ``;
  const minutesOutput = parseInt(minutes, 10) !== 0 ? `${addZero(minutes)}M ` : ``;

  return daysOutput + hoursOutput + minutesOutput;
};

const tripOffersMarkup = (offers) => {
  return offers
    .filter((offer) => offer.checked)
    .slice(0, 3)
    .map((offer) => {
      const {name, price} = offer;
      return (
        `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </li>`
      );
    }
    ).join(``);
};

const createWaypoint = ({type, city, startDate, endDate, price, offers}) => {
  const dateDiff = getDateDiff(startDate, endDate);
  const timezoneCorrection = new Date().getTimezoneOffset() * 60 * 1000;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(type)} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${new Date(startDate - timezoneCorrection).toISOString().slice(0, 16)}">${parseTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${new Date(endDate - timezoneCorrection).toISOString().slice(0, 16)}">${parseTime(endDate)}</time>
          </p>
          <p class="event__duration">${dateDiff}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${tripOffersMarkup(offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Waypoint {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createWaypoint(this._point);
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
