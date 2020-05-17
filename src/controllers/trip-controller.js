import TripInfoComponent from '../components/trip-info.js';
import TripCostComponent from '../components/trip-cost.js';
import TripSort from '../components/sort.js';
import TripDayEntryComponent from '../components/trip-day-entry.js';
import PointController from '../controllers/point-controller.js';
import NoWaypointComponent from '../components/trip-day-no-points.js';
import {renderElement, remove, RenderPosition} from '../utils/render.js';
import {Mode, SortType} from '../const.js';
import {EmptyPoint} from '../controllers/point-controller.js';
import {enableComponent, disableComponent, getFullPrice} from '../utils/common.js';

const renderTrip = (points, offers, destinations, container, onDataChange, onViewChange, isDefaultSort = true) => {
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
      const pointController = new PointController(dayListElement, onDataChange, onViewChange, offers, destinations);
      pointController.render(point, Mode.DEFAULT);
      pointControllers.push(pointController);
    });

    renderElement(container.getElement(), day);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container, pointsModel, api) {

    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._showedPointControllers = [];
    this._sortComponent = new TripSort();
    this._tripInfoComponent = null;
    this._tripCostComponent = null;
    this._creatingPoint = null;
    this._noWaypointComponent = null;
    this._isDefaultSort = null;
    this._currentSortType = SortType.DEFAULT;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);

    this._eventElement = document.querySelector(`.trip-events`);
  }


  createPoint() {
    disableComponent(`trip-main__event-add-btn`);

    if (this._creatingPoint) {
      return;
    }

    if (this._noWaypointComponent) {
      remove(this._noWaypointComponent);
    }

    this._creatingPoint = new PointController(
        this._container,
        this._onDataChange,
        this._onViewChange,
        this._pointsModel.getOffers(),
        this._pointsModel.getDestinations()
    );

    this._creatingPoint.render(EmptyPoint, Mode.ADDING);
    this._onViewChange();
  }

  _updatePoints() {
    this._removePoints();
    this._showedPointControllers = renderTrip(
        this._pointsModel.getPoints(),
        this._pointsModel.getOffers(),
        this._pointsModel.getDestinations(),
        this._container,
        this._onDataChange,
        this._onViewChange,
        this._isDefaultSort
    );
  }

  hide() {
    this._container.hide();
    this._sortComponent.hide();
    if (this._noWaypointComponent) {
      remove(this._noWaypointComponent);
      this._noWaypointComponent = null;
    }
  }

  show() {
    this._container.show();
    this._sortComponent.show();
    if (!this._noWaypointComponent && this._pointsModel.getPoints().length === 0) {
      this._noWaypointComponent = new NoWaypointComponent();
      renderElement(this._eventElement, this._noWaypointComponent);
    }
  }

  _renderInfo() {
    const infoElement = document.querySelector(`.trip-info`);
    if (this._tripInfoComponent && this._tripCostComponent) {
      remove(this._tripInfoComponent);
      remove(this._tripCostComponent);
    }
    this._tripInfoComponent = new TripInfoComponent(this._pointsModel.getPoints());
    this._tripCostComponent = new TripCostComponent(this._pointsModel.getPoints());
    renderElement(infoElement, this._tripInfoComponent);
    renderElement(infoElement, this._tripCostComponent);
    getFullPrice(this._pointsModel.getPoints(), this._offersSet);

  }

  render() {
    if (this._pointsModel.getPoints().length === 0) {
      this._noWaypointComponent = new NoWaypointComponent();
      renderElement(this._eventElement, this._noWaypointComponent);
    }

    this._renderInfo();
    renderElement(this._eventElement, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._sortPoints(sortType);
    });

    this._sortPoints(SortType.DEFAULT);
    getFullPrice(this._pointsModel.getPoints(), this._offersSet);
  }

  _onDataChange(pointController, oldPoint, newPoint) {
    if (oldPoint === EmptyPoint) {
      this._creatingPoint = null;
      if (newPoint === null) {
        pointController.destroy();
      } else {
        this._api.createPoint(newPoint)
        .then((pointModel) => {
          this._pointsModel.addPoint(pointModel);
          this._updatePoints();
          this._renderInfo();
          this._onFilterChange();
        }).catch(() => {
          pointController.shake();
        });
      }
    } else if (newPoint === null) {
      this._api.deletePoint(oldPoint.id)
      .then(() => {
        this._pointsModel.removePoint(oldPoint.id);
        this._updatePoints();
        this._renderInfo();
        this._onFilterChange();
      }).catch(() => {
        pointController.shake();
      });
    } else {
      this._api.updatePoint(oldPoint.id, newPoint)
         .then((point) => {
           const isSuccess = this._pointsModel.updatePoint(oldPoint.id, point);
           if (isSuccess) {
             this._updatePoints();
             this._renderInfo();
             this._onFilterChange();
           }
         }).catch(() => {
           pointController.shake();
         });
    }
    enableComponent(`trip-main__event-add-btn`);
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

    this._checkSortType(sortType);
    this._creatingPoint = null;
    this._removePoints();
    this._showedPointControllers = renderTrip(
        sortedPoints,
        this._pointsModel.getOffers(),
        this._pointsModel.getDestinations(),
        this._container,
        this._onDataChange,
        this._onViewChange,
        this._isDefaultSort
    );
    enableComponent(`trip-main__event-add-btn`);
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
    enableComponent(`trip-main__event-add-btn`);
    this._creatingPoint = null;
    this._updatePoints();
    this._sortComponent.setSortType(this._currentSortType);
    this._checkSortType(this._currentSortType);
    this._sortPoints(this._currentSortType);
  }

  _removePoints() {
    this._container.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((pointController) =>
      pointController.destroy()
    );
    this._showedPointControllers = [];
  }
}
