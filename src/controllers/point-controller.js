import WaypointComponent from '../components/waypoint.js';
import WaypointEditComponent from '../components/waypoint-edit.js';
import {renderElement, replaceElement, remove, RenderPosition} from '../utils/render.js';
import {Mode} from '../const.js';
import {EmptyPoint} from "../mock/waypoints.js";

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

  render(point, mode) {
    const oldWaypointComponent = this._waypointComponent;
    const oldWaypointEditComponent = this._waypointEditComponent;
    this._mode = mode;

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
      const data = this._waypointEditComponent.getData();
      this._onDataChange(this, point, data);
    });

    this._waypointEditComponent.setDeleteButtonClickHandler(() => {
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
            this._container,
            this._waypointEditComponent,
            RenderPosition.AFTERBEGIN
        );
        break;
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
