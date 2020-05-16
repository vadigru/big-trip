import AbstractSmartComponent from './abstract-smart-component.js';
import {TRANSFER_TYPES, ACTIVITY_TYPES, PointTypeToPretext} from '../const.js';
import {capitalizeFirstLetter} from '../utils/common.js';

// import {getOffers, getDescription, getPhotos} from '../mock/waypoints.js';
import flatpickr from 'flatpickr';
// import moment from 'moment';
import {encode} from 'he';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

export default class WaypointEdit extends AbstractSmartComponent {

  constructor(point, offers, destinations) {
    super();
    this._point = point;
    this._type = point.type;
    this._city = encode(this._point.city);
    this._startDate = this._point.startDate;
    this._endDate = this._point.endDate;
    this._pointPrice = encode(this._point.price.toString());
    this._offers = this._point.offers;
    this._offersSet = offers;
    this._destination = this._point.description;
    this._destinationsSet = destinations;
    this._description = this._point.description;
    this._photos = this._point.photos;
    this._isFavorite = this._point.isFavorite;
    this._id = this._point.id;
    this._isNew = this._point.isNew;
    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;
    this._clickHandler = null;
    this._saveButtonClickHandler = null;
    this._deleteButtonClickHandler = null;
    this._smartPrice = null;
    this._smartCity = null;
    this._subscribeOnEvents();
    this._applyFlatpickr();
    this._validate();
  }

  getTemplate() {
    return (
      `<li class="trip-events__item">
        <form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${this._id}">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._id}" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>
                  ${TRANSFER_TYPES
                    .map((transfer) => {
                      return (
                        `<div class="event__type-item">
                        <input id="event-type-${transfer}-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${transfer}" ${this._type === transfer && `checked`}>
                        <label class="event__type-label  event__type-label--${transfer}" for="event-type-${transfer}-${this._id}">${capitalizeFirstLetter(transfer)}</label>
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
                        <input id="event-type-${activity}-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${activity}" ${this._type === activity && `checked`}>
                        <label class="event__type-label  event__type-label--${activity}" for="event-type-${activity}-${this._id}">${capitalizeFirstLetter(activity)}</label>
                      </div>`
                      );
                    }
                    ).join(``)}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${this._id}">
                ${capitalizeFirstLetter(this._type)} ${PointTypeToPretext[this._type]}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${this._id}" type="text" name="event-destination" value="${this._smartCity ? this._smartCity : this._city}" list="destination-list-${this._id}" required>
              <datalist id="destination-list-${this._id}">
              ${Object.keys(this._destinationsSet)
                .map((it) => {
                  return (
                    `<option value="${it}"></option>`
                  );
                }).join(``)}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${this._id}">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-${this._id}" type="text" name="event-start-time" value="${this._startDate}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-${this._id}">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-${this._id}" type="text" name="event-end-time" value="${this._endDate}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${this._id}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${this._id}" type="text" name="event-price" value="${this._smartPrice ? this._smartPrice : this._pointPrice}" pattern="[0-9]+" required>
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">
              ${this._isNew ? `Cancel` : `Delete`}
            </button>
                ${!this._isNew ? `<input id="event-favorite-${this._id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite && `checked`}>
                <label class="event__favorite-btn" for="event-favorite-${this._id}">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </label>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>` : ``}

          </header>
          <section class="event__details  ${this._offersSet[this._type].length === 0 && this._description === `` ? `visually-hidden` : ``}">
            <section class="event__section  event__section--offers ${this._offersSet[this._type].length === 0 ? `visually-hidden` : ``}">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              ${this._isNew ? `<div class="event__available-offers">

              ${this._offersSet[this._type]
                .map((offer, i) => {
                  return (
                    `<div class="event__offer-selector">
                    <input class="event__offer-checkbox visually-hidden" id="event-offer-${this._type}${i}-${this._id}" type="checkbox" name="event-offer-${this._type}${i}">
                    <label class="event__offer-label" for="event-offer-${this._type}${i}-${this._id}">
                      <span class="event__offer-title">${offer.title}</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
                    </label>
                  </div>`
                  );
                })
                .join(``)}
            </div>` : `<div class="event__available-offers">

              ${this._offersSet[this._type]
                .map((offer, i) => {
                  const isOfferChecked = () => this._offers.some((currentOffer) => currentOffer.title === offer.title) ? `checked` : ``;
                  return (
                    `<div class="event__offer-selector">
                    <input class="event__offer-checkbox visually-hidden" id="event-offer-${this._type}${i}-${this._id}" type="checkbox" name="event-offer-${this._type}${i}" ${isOfferChecked()}>
                    <label class="event__offer-label" for="event-offer-${this._type}${i}-${this._id}">
                      <span class="event__offer-title">${offer.title}</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
                    </label>
                  </div>`
                  );
                })
                .join(``)}
            </div>`}

            </section>

            <section class="event__section  event__section--destination" ${this._description === `` ? `style="display: none;"` : ``}>
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
                        src="${photo.src}"
                        alt="Event photo"
                      />`
                    );
                  })
                  .join(``)}
                </div>
              </div>
            </section>
          </section>
        </form>
      </li>`
    );
  }


  rerender() {
    super.rerender();
    this._applyFlatpickr();
    this._validate();
  }

  reset() {
    const point = this._point;
    this._type = point.type;
    this._city = point.city;
    this._startDate = point.startDate;
    this._endDate = point.endDate;
    this._pointPrice = point.price;
    this._favorite = !!point.isFavorite;
    this._offers = point.offers;
    this._description = point.description;
    this._photos = point.photos;

    this.rerender();
  }

  recoveryListeners() {
    this.setClickHandler(this._clickHandler);
    this.setSaveButtonClickHandler(this._saveButtonClickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  setSaveButtonClickHandler(handler) {
    this.getElement().addEventListener(`submit`, (evt) => {
      this._validate();
      handler(evt);
    });
    this._saveButtonClickHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement()
    .querySelector(`.event__reset-btn`)
    .addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  setClickHandler(handler) {
    if (!this._point.isNew) {
      this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
      this._clickHandler = handler;
    }
  }

  getData() {
    const form = this.getElement().querySelector(`form`);
    const formData = new FormData(form);

    return formData;
  }


  _validate(name, value) {
    const submitButton = this._element.querySelector(`.event__save-btn`);
    const cityValue = (name === `event-destination`)
      ? value : (this._city);
    const priceValue = (name === `event-price`)
      ? value : (this._smartPrice || this._pointPrice);
    const isValidCity = Object.keys(this._destinationsSet).includes(cityValue);
    const isValidPrice = !isNaN(parseInt((priceValue), 10));
    const isEmpty = (this._smartPrice === ``);
    submitButton.disabled = !(isValidCity && isValidPrice && !isEmpty);
  }

  _applyFlatpickr() {
    const startDateElement = this.getElement().querySelector(`input[name="event-start-time"]`);
    const endDateElement = this.getElement().querySelector(`input[name="event-end-time"]`);
    const flatpickrOpt = {
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    };
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }
    this._flatpickrStartDate = flatpickr(
        startDateElement,
        Object.assign({}, flatpickrOpt, {defaultDate: this._startDate || `today`})
    );
    this._flatpickrEndDate = flatpickr(
        endDateElement,
        Object.assign({}, flatpickrOpt, {defaultDate: this._endDate || `today`, minDate: this._startDate})
    );
  }

  removeElement() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }
    super.removeElement();
  }

  _subscribeOnEvents() {
    const element = this.getElement();


    element.querySelector(`.event__type-list`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._type = evt.target.value;
        this.rerender();
      }
    });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._smartCity = encode(evt.target.value);
        if (this._smartCity === ``) {
          this._description = ``;
          this._photos = [];
        }
        if (this._smartCity !== ``) {
          if (Object.keys(this._destinationsSet).includes(this._smartCity)) {
            this._description = this._destinationsSet[this._smartCity].description;
            this._photos = this._destinationsSet[this._smartCity].pictures;
          } else {
            this._description = `We know nothing about this place. Please select a destination from the dropdown list.`;
            this._photos = [];
          }
        }
        this._city = this._smartCity;
        this._validate(evt.target.name, this._smartCity);
        this.rerender();
      });

    element.querySelector(`input[name="event-start-time"]`)
    .addEventListener(`change`, (evt) => {
      this._startDate = evt.target.value;
      this._endDate = this._startDate;
      this.rerender();
    });

    element.querySelector(`input[name="event-end-time"]`)
      .addEventListener(`change`, (evt) => {
        this._endDate = evt.target.value;
        this.rerender();
      });

    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, (evt) => {
        this._smartPrice = encode(evt.target.value);
        this._validate(evt.target.name, this._smartPrice);
      });

    element.querySelector(`.event__input--price`)
    .addEventListener(`input`, (evt) => {
      const outputElement = element.querySelector(`.event__input--price`);
      this._smartPrice = encode(evt.target.value);
      if (!this._smartPrice.match(/[^0-9]/g)) {
        return;
      }
      outputElement.value = this._smartPrice.replace((/[^0-9]/g), ``);
    });

    if (!this._isNew) {
      element.querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;
        this.rerender();
      });
    }
  }
}
