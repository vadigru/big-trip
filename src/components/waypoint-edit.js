import AbstractSmartComponent from './abstract-smart-component.js';
import {TRANSFER_TYPES, ACTIVITY_TYPES, CITIES} from '../const.js';
import {capitalizeFirstLetter} from '../utils/common.js';
import {getRandomOffers, getDescription, getPhotos} from '../mock/waypoints.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';


export default class WaypointEdit extends AbstractSmartComponent {
  constructor(point) {
    super();
    this._point = point;
    this._type = this._point.type;
    this._city = this._point.city;
    this._description = this._point.description;
    this._photos = this._point.photos;
    this._isFavorite = this._point.isFavorite;
    this._offers = this._point.offers;
    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;
    this._clickHandler = null;
    this._saveButtonClickHandler = null;
    this._favoriteClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${TRANSFER_TYPES
                  .map((transfer) => {
                    return (
                      `<div class="event__type-item">
                      <input id="event-type-${transfer}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${capitalizeFirstLetter(transfer)}">
                      <label class="event__type-label  event__type-label--${transfer}" for="event-type-${transfer}-1">${capitalizeFirstLetter(transfer)}</label>
                    </div>`
                    );
                  }
                  ).join(``)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${ACTIVITY_TYPES
                  .map((activity) => {
                    return (
                      `<div class="event__type-item">
                      <input id="event-type-${activity}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${capitalizeFirstLetter(activity)}">
                      <label class="event__type-label  event__type-label--${activity}" for="event-type-${activity}-1">${capitalizeFirstLetter(activity)}</label>
                    </div>`
                    );
                  }
                  ).join(``)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalizeFirstLetter(this._type)} to
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._city}"list="destination-list-1">
            <datalist id="destination-list-1">
            ${CITIES
              .map((it) => {
                return (
                  `<option value="${it}"></option>`
                );
              }).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this._point.startDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this._point.endDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._point.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite && `checked`}>
            <label class="event__favorite-btn" for="event-favorite-1">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers" ${this._offers.length === 0 ? `style ="display: none;"` : ``}>
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${this._offers
                .map((offer) => {
                  return (
                    `<div class="event__offer-selector">
                    <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-${offer.type}-luggage" ${offer.checked && `checked`}>
                    <label class="event__offer-label" for="event-offer-${offer.type}-1">
                      <span class="event__offer-title">${offer.name}</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
                    </label>
                  </div>`
                  );
                })
                .join(``)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">
              ${this._description}
            </p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${this._photos
                .map((photo) => {
                  return (
                    `<img
                      class="event__photo"
                      src="${photo}"
                      alt="Event photo"
                    />`
                  );
                })
                .join(``)}
              </div>
            </div>
          </section>
        </section>
      </form>`
    );
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    const point = this._point;

    this._type = point.type;
    this._city = point.city;
    this._offers = point.offers;
    this._description = point.description;
    this._photos = point.photos;

    this.rerender();
  }

  recoveryListeners() {
    this.setClickHandler(this._clickHandler);
    this.setSaveButtonClickHandler(this._saveButtonClickHandler);
    this.setFavoriteClickHandler(this._favoriteClickHandler);
    this._subscribeOnEvents();
  }

  setClickHandler(handler) {
    this.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
    this._clickHandler = handler;
  }

  setSaveButtonClickHandler(handler) {
    this.getElement()
    .querySelector(`.event__save-btn`)
    .addEventListener(`click`, handler);
    this._saveButtonClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement()
    .querySelector(`.event__favorite-icon`)
    .addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  _applyFlatpickr() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }

    const startDateElement = this.getElement().querySelector(`input[name="event-start-time"]`);
    const endDateElement = this.getElement().querySelector(`input[name="event-end-time"]`);

    const flatpickrOpt = {
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    };

    this._flatpickrStartDate = flatpickr(
        startDateElement,
        Object.assign({}, flatpickrOpt, {defaultDate: this._point.startDate})
    );

    this._flatpickrEndDate = flatpickr(
        endDateElement,
        Object.assign({}, flatpickrOpt, {defaultDate: this._point.endDate})
    );
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          this._type = evt.target.value;
          this._offers = getRandomOffers();
          this.rerender();
        }
      });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._city = evt.target.value;
        this._description = getDescription();
        this._photos = getPhotos();
        this.rerender();
      });
  }
}
