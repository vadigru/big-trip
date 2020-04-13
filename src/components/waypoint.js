import {parseTime} from "../utils";

const getDateDiff = (startDate, endDate) => {
  const firstDate = parseTime(startDate);
  const secondDate = parseTime(endDate);
  const getDate = (string) => new Date(0, 0, 0, string.split(`:`)[0], string.split(`:`)[1]);
  const different = (getDate(secondDate) - getDate(firstDate));
  let differentRes;
  let hours;
  let minuts;

  if (different > 0) {
    differentRes = different;
    hours = Math.floor((differentRes % 86400000) / 3600000);
    minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
  } else {
    differentRes = Math.abs((getDate(firstDate) - getDate(secondDate)));
    hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
    minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
  }

  let result = hours + `H ` + minuts + `M`;
  return result;
};

const tripOffersMarkup = (offers) => {
  return offers
    .filter((offer) => offer.checked)
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

export const createWaypoint = ({type, city, startDate, endDate, price, offers}) => {
  const dateDiff = getDateDiff(startDate, endDate);
  const timezoneCorrection = new Date().getTimezoneOffset() * 60 * 1000;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${new Date(startDate - timezoneCorrection).toISOString().slice(1, 16)}">${parseTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${new Date(endDate - timezoneCorrection).toISOString().slice(1, 16)}">${parseTime(endDate)}</time>
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
