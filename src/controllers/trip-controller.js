import TripInfoComponent from '../components/trip-info.js';
import TripCostComponent from '../components/trip-cost.js';
import TripSort from '../components/sort.js';
import TripDayEntryComponent from '../components/trip-day-entry.js';
import PointController from '../controllers/point-controller.js';
import NoWaypointComponent from '../components/trip-day-no-points.js';
import {renderElement, remove, RenderPosition} from '../utils/render.js';
import {Mode, SortType} from '../const.js';
import {EmptyPoint} from '../mock/waypoints.js';
import {enableComponent, getFullPrice} from '../utils/common.js';

const renderTrip = (points, container, onDataChange, onViewChange, isDefaultSort = true) => {
  const pointControllers = [];
  let dates = isDefaultSort
    ? [...new Set(points.map((it) => new Date(it.startDate).toDateString()))]
    : [``];

  dates.
  forEach((date, dateIndex) => {
    const day = isDefaultSort
      ? new TripDayEntryComponent(date, dateIndex + 1)
      : new TripDayEntryComponent();

    points
    .filter((point) => {
      return isDefaultSort
        ? new Date(point.startDate).toDateString() === date
        : point;
    })
    .forEach((point) => {
      const dayListElement = day.getElement().querySelector(`.trip-events__list`);
      const pointController = new PointController(dayListElement, onDataChange, onViewChange);
      pointController.render(point, Mode.DEFAULT);
      pointControllers.push(pointController);
    });

    renderElement(container.getElement(), day);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._sortComponent = new TripSort();
    this._showedPointControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    this._noWaypointComponent = null;
    this._creatingPoint = null;
    this._isDefaultSort = true;
    this._currentSortType = SortType.DEFAULT;
    this._eventElement = document.querySelector(`.trip-events`);
  }


  createPoint() {
    if (this._creatingPoint) {
      return;
    }
    this._creatingPoint = new PointController(
        this._container.getElement(),
        this._onDataChange,
        this._onViewChange
    );

    this._sortComponent.show();
    this._creatingPoint.render(EmptyPoint, Mode.ADDING);
    if (this._noWaypointComponent) {
      remove(this._noWaypointComponent);
      this._noWaypointComponent = null;
    }

    this._onViewChange();
  }

  _updatePoints() {
    this._removePoints();
    this._showedPointControllers = renderTrip(
        this._pointsModel.getPoints(),
        this._container,
        this._onDataChange,
        this._onViewChange,
        this._isDefaultSort
    );
  }

  hide() {
    this._container.hide();
    if (this._noWaypointComponent) {
      this._noWaypointComponent.hide();
    }
    if (this._sortPoints) {
      this._sortComponent.hide();
    }
  }

  show() {
    this._container.show();
  }

  toggle() {
    if (this._pointsModel.getPoints().length === 0) {
      if (!this._noWaypointComponent) {
        this._noWaypointComponent = new NoWaypointComponent();
        renderElement(this._eventElement, this._noWaypointComponent);
      } else {
        if (this._noWaypointComponent) {
          remove(this._noWaypointComponent);
          this._noWaypointComponent = null;

        } else {
          this._sortComponent.show();
        }
      }
      this._sortComponent.hide();
    }
    enableComponent(`trip-main__event-add-btn`);
    const infoElement = document.querySelector(`.trip-info`);
    infoElement.textContent = ``;

    this.render();
    this._sortPoints(this._currentSortType);
    getFullPrice(this._pointsModel.getPoints());
  }

  render() {
    this._showedPointControllers = renderTrip(
        this._pointsModel.getPoints(),
        this._container,
        this._onDataChange,
        this._onViewChange,
        this._isDefaultSort
    );

    const infoElement = document.querySelector(`.trip-info`);

    renderElement(infoElement, new TripInfoComponent(this._pointsModel.getPoints()));
    renderElement(infoElement, new TripCostComponent(this._pointsModel.getPoints()));
    renderElement(this._eventElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._sortPoints(sortType);
    });
    this._sortPoints(this._currentSortType);
    this._checkSortType(this._currentSortType);
    getFullPrice(this._pointsModel.getPoints());
  }

  _onDataChange(pointController, oldPoint, newPoint) {
    if (oldPoint === EmptyPoint) {
      this._creatingPoint = null;
      if (newPoint === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newPoint);
        this._showedPointControllers = [pointController, ...this._showedPointControllers];
        this._removePoints();

        this._showedPointControllers = renderTrip(
            this._pointsModel.getPoints(),
            this._container,
            this._onDataChange,
            this._onViewChange,
            this._isDefaultSort
        );
      }
    } else if (newPoint === null) {
      this._pointsModel.removePoint(oldPoint.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldPoint.id, newPoint);

      if (isSuccess) {
        pointController.render(newPoint, Mode.DEFAULT);
      }
    }


    this.toggle();
  }

  _sortPoints(sortType) {
    let sortedPoints = [];
    switch (sortType) {
      case SortType.TIME:
        sortedPoints = this._pointsModel.getPoints().slice().sort((a, b) => {
          const aa = a.endDate - a.startDate;
          const bb = b.endDate - b.startDate;
          return bb - aa;
        });
        this._isDefaultSort = false;
        this._currentSortType = sortType;
        break;
      case SortType.PRICE:
        sortedPoints = this._pointsModel.getPoints().slice().sort((a, b) => b.price - a.price);
        this._isDefaultSort = false;
        this._currentSortType = sortType;
        break;
      case SortType.DEFAULT:
        sortedPoints = this._pointsModel.getPoints().slice().sort((a, b) => a.startDate - b.startDate);
        this._isDefaultSort = true;
        this._currentSortType = sortType;
        break;
    }
    enableComponent(`trip-main__event-add-btn`);
    this._removePoints();
    this._creatingPoint = null;
    this._showedPointControllers = renderTrip(
        sortedPoints,
        this._container,
        this._onDataChange,
        this._onViewChange,
        this._isDefaultSort
    );
  }

  _checkSortType(sortType) {
    const sortElement = document.querySelector(`input[data-sort-type=${sortType}]`);
    if (sortElement) {
      sortElement.checked = true;
    }

  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._isDefaultSort = true;
    this._sortComponent.setSortType(SortType.DEFAULT);
    this._creatingPoint = null;
    this._checkSortType(SortType.DEFAULT);
    this._updatePoints();
  }

  _removePoints() {
    this._container.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((pointController) =>
      pointController.destroy()
    );
    this._showedPointControllers = [];
  }
}
