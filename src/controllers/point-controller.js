import WaypointComponent from '../components/waypoint.js';
import WaypointEditComponent from '../components/waypoint-edit.js';
import {renderElement, replaceElement} from '../utils/render.js';
import {Mode} from '../const.js';

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._waypointComponent = null;
    this._waypointEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point) {
    const oldWaypointComponent = this._waypointComponent;
    const oldWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new WaypointComponent(point);
    this._waypointEditComponent = new WaypointEditComponent(point);

    this._waypointComponent.setClickHandler(() => {
      this._replaceWaypointToWaypointEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._waypointEditComponent.setClickHandler(() => {
      this._replaceWaypointEditToWaypoint();
    });

    this._waypointEditComponent.setSaveButtonClickHandler((evt)=> {
      evt.preventDefault();
      this._replaceWaypointEditToWaypoint();
    });

    this._waypointEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    if (oldWaypointComponent && oldWaypointEditComponent) {
      replaceElement(this._waypointComponent, oldWaypointComponent);
      replaceElement(this._waypointEditComponent, oldWaypointEditComponent);
    } else {
      renderElement(this._container, this._waypointComponent);
    }
  }

  _replaceWaypointToWaypointEdit() {
    this._onViewChange();
    replaceElement(this._waypointEditComponent, this._waypointComponent);
    this._mode = Mode.EDIT;
  }

  _replaceWaypointEditToWaypoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._waypointEditComponent.reset();
    replaceElement(this._waypointComponent, this._waypointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceWaypointEditToWaypoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceWaypointEditToWaypoint();
    }
  }
}
