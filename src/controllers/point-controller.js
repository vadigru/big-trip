import WaypointComponent from '../components/waypoint.js';
import WaypointEditComponent from '../components/waypoint-edit.js';
import Point from "../models/point.js";
import {renderElement, replaceElement, remove, RenderPosition} from '../utils/render.js';
import {Mode} from '../const.js';
import moment from 'moment';
import {encode} from 'he';

const SHAKE_ANIMATION_TIMEOUT = 10000;

export const EmptyPoint = {
  type: `taxi`,
  city: ``,
  startDate: Date.now(),
  endDate: Date.now(),
  price: 0,
  offers: [],
  description: ``,
  photos: [],
  isFavorite: false,
  isNew: true
};

const parseFormData = (formData, destination, id) => {
  const city = document.querySelector(`input[name="event-destination"]`).value;
  const checkedOffers = [
    ...document.querySelectorAll(`.event__offer-checkbox:checked + label[for^="event"]`)
  ];

  return new Point({
    "id": id,
    "type": formData.get(`event-type`),
    "date_from": moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf(),
    "date_to": moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf(),
    "base_price": parseInt(encode(formData.get(`event-price`)), 10),
    "offers": checkedOffers.map((offer) => ({
      "title": offer.querySelector(`.event__offer-title`).textContent,
      "price": Number(offer.querySelector(`.event__offer-price`).textContent)
    })),
    "destination": {
      "description": destination[city].description,
      "name": destination[city].name,
      "pictures": destination[city].pictures
    },
    "is_favorite": formData.get(`event-favorite`) === `on`
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, offers, destinations) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._offersSet = offers;
    this._destinationsSet = destinations;
    this._waypointComponent = null;
    this._waypointEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    const oldWaypointComponent = this._waypointComponent;
    const oldWaypointEditComponent = this._waypointEditComponent;
    this._mode = mode;

    this._waypointComponent = new WaypointComponent(point);
    this._waypointEditComponent = new WaypointEditComponent(point, this._offersSet, this._destinationsSet);

    this._waypointComponent.setClickHandler(() => {
      this._replaceWaypointToWaypointEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._waypointEditComponent.setClickHandler(() => {
      this._replaceWaypointEditToWaypoint();
    });

    this._waypointEditComponent.setSaveButtonClickHandler((evt)=> {
      evt.preventDefault();
      const formData = this._waypointEditComponent.getData();
      const data = parseFormData(formData, this._destinationsSet, point.id);
      this._waypointEditComponent.disableForm();
      this._waypointEditComponent.setData({
        saveButtonText: `Saving...`,
      });

      this._onDataChange(this, point, data);
      this._waypointEditComponent.activateForm();
    });

    this._waypointEditComponent.setDeleteButtonClickHandler(() => {
      this._waypointEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, point, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldWaypointEditComponent && oldWaypointComponent) {
          replaceElement(this._waypointComponent, oldWaypointComponent);
          replaceElement(this._waypointEditComponent, oldWaypointEditComponent);
          this._replaceWaypointEditToWaypoint();
        } else {
          renderElement(
              this._container,
              this._waypointComponent
          );
        }
        break;
      case Mode.ADDING:
        if (oldWaypointEditComponent && oldWaypointComponent) {
          remove(oldWaypointComponent);
          remove(oldWaypointEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderElement(
            this._container.getElement(),
            this._waypointEditComponent,
            RenderPosition.AFTERBEGIN
        );
        break;
    }
  }

  shake() {
    this._waypointEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._waypointComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._waypointEditComponent.getElement().style.animation = ``;
      this._waypointComponent.getElement().style.animation = ``;

      this._waypointEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);


  }

  _replaceWaypointToWaypointEdit() {
    this._onViewChange();
    replaceElement(this._waypointEditComponent, this._waypointComponent);
    this._mode = Mode.EDIT;
  }

  _replaceWaypointEditToWaypoint() {
    this._waypointEditComponent.reset();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replaceElement(this._waypointComponent, this._waypointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceWaypointEditToWaypoint();
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceWaypointEditToWaypoint();
    }
  }

  destroy() {
    remove(this._waypointEditComponent);
    remove(this._waypointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
