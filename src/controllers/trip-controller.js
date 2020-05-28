import NoWaypointComponent from '../components/trip-day-no-points.js';
import TripInfoComponent from '../components/trip-info.js';
import TripCostComponent from '../components/trip-cost.js';
import TripSortComponent from '../components/trip-sort.js';
import TripDayEntryComponent from '../components/trip-day-entry.js';
import PointController from '../controllers/point-controller.js';
import {EmptyPoint} from '../controllers/point-controller.js';
import {Mode, SortType} from '../const.js';
import {renderElement, remove, RenderPosition} from '../utils/render.js';

const disableComponent = (className) => {
  const componentElement = document.querySelector(`.${className}`);
  if (!componentElement.getAttribute(`disabled`)) {
    componentElement.setAttribute(`disabled`, `disabled`);
  }
};

const enableComponent = (className) => {
  const componentElement = document.querySelector(`.${className}`);
  if (componentElement.getAttribute(`disabled`)) {
    componentElement.removeAttribute(`disabled`);
  }
};

const getFullPrice = (arr) => {
  const totalCostElement = document.querySelector(`.trip-info__cost-value`);
  totalCostElement.textContent = arr.reduce((total, offer) => parseInt(total, 10) + parseInt(offer.price, 10)
                               + offer.offers.reduce((acc, it) => parseInt(acc, 10) + parseInt(it.price, 10), 0), 0);
};

const renderTrip = (points, offers, destinations, container, onDataChange, onViewChange, isDefaultSort = true) => {
  const pointControllers = [];
  const dates = isDefaultSort
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
  constructor(container, pointsModel, api, filterController) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;
    this._newPointControllers = [];
    this._showedPointControllers = [];
    this._sortComponent = new TripSortComponent();
    this._tripInfoComponent = null;
    this._tripCostComponent = null;
    this._creatingPoint = null;
    this._noWaypointComponent = null;
    this._isDefaultSort = null;
    this._filterController = filterController;
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

    this._creatingPoint = new PointController(
        this._container,
        this._onDataChange,
        this._onViewChange,
        this._pointsModel.getOffers(),
        this._pointsModel.getDestinations()
    );

    this._showedPointControllers = [].concat(this._creatingPoint, this._showedPointControllers);
    this._creatingPoint.render(EmptyPoint, Mode.ADDING);

    this._removeNoWaypoint();
    this._sortComponent.show();
  }

  hide() {
    this._container.hide();
    this._sortComponent.hide();
    this._removeNoWaypoint();
  }

  show() {
    this._container.show();
    this._sortComponent.show();
    this._renderNoWaypoint();
  }

  render() {
    this._renderInfo();
    renderElement(this._eventElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._renderNoWaypoint();
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._sortPoints(sortType);
    });
    this._sortPoints(SortType.DEFAULT);
    getFullPrice(this._pointsModel.getPointsAll(), this._offersSet);
  }

  _renderNoWaypoint() {
    if (!this._noWaypointComponent && this._pointsModel.getPointsAll().length === 0) {
      this._noWaypointComponent = new NoWaypointComponent();
      renderElement(this._eventElement, this._noWaypointComponent);
      this._sortComponent.hide();
    }
  }

  _removeNoWaypoint() {
    if (this._noWaypointComponent) {
      remove(this._noWaypointComponent);
      this._noWaypointComponent = null;
    }
  }

  _renderInfo() {
    const infoElement = document.querySelector(`.trip-info`);
    if (this._tripInfoComponent && this._tripCostComponent) {
      remove(this._tripInfoComponent);
      remove(this._tripCostComponent);
    }
    this._tripInfoComponent = new TripInfoComponent(this._pointsModel.getPointsAll());
    this._tripCostComponent = new TripCostComponent(this._pointsModel.getPointsAll());
    renderElement(infoElement, this._tripInfoComponent);
    renderElement(infoElement, this._tripCostComponent);
    getFullPrice(this._pointsModel.getPointsAll(), this._offersSet);
  }

  _sortPoints(sortType) {
    let sortedPoints = [];
    this._isDefaultSort = false;

    const timeDescendingOrder = (a, b) => {
      const aa = a.endDate - a.startDate;
      const bb = b.endDate - b.startDate;
      return bb - aa;
    };

    const priceDescendingOrder = (a, b) => {
      return b.price - a.price;
    };

    const dateAscendingOrder = (a, b) => {
      return a.startDate - b.startDate;
    };

    switch (sortType) {
      case SortType.TIME:
        sortedPoints = this._pointsModel.getPoints().slice().sort(timeDescendingOrder);
        break;
      case SortType.PRICE:
        sortedPoints = this._pointsModel.getPoints().slice().sort(priceDescendingOrder);
        break;
      case SortType.DEFAULT:
        sortedPoints = this._pointsModel.getPoints().slice().sort(dateAscendingOrder);
        this._isDefaultSort = true;
        break;
    }

    this._currentSortType = sortType;
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

  _removePoints() {
    this._container.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((pointController) =>
      pointController.destroy()
    );
    this._showedPointControllers = [];
  }

  _onDataChange(pointController, oldPoint, newPoint) {
    if (oldPoint === EmptyPoint) {
      this._creatingPoint = null;
      if (newPoint === null) {
        pointController.destroy();
        this.render();
      } else {
        this._api.createPoint(newPoint)
        .then((pointModel) => {
          this._pointsModel.addPoint(pointModel);
          this._updatePoints();
          this._renderInfo();
          this._onFilterChange();
          this._filterController.render();
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
        this._filterController.render();
        this.render();
      }).catch(() => {
        pointController.shake();
      });
    } else {
      this._api.updatePoint(oldPoint.id, newPoint)
         .then((point) => {
           const isSuccess = this._pointsModel.updatePoint(oldPoint.id, point);
           if (isSuccess && pointController._submitValue !== `on`) {
             this._updatePoints();
             this._renderInfo();
             this._onFilterChange();
             this._filterController.render();
           }
         }).catch(() => {
           pointController.shake();
         });
    }
    enableComponent(`trip-main__event-add-btn`);
  }

  _onViewChange() {
    if (this._creatingPoint) {
      this._creatingPoint.destroy();
      this._creatingPoint = null;
      enableComponent(`trip-main__event-add-btn`);
    }
    this._showedPointControllers.forEach((point) => point.setDefaultView());
  }

  _onFilterChange() {
    enableComponent(`trip-main__event-add-btn`);
    this._creatingPoint = null;
    this._filterController.render();
    this._updatePoints();
    this._sortComponent.setSortType(this._currentSortType);
    this._checkSortType(this._currentSortType);
    this._sortPoints(this._currentSortType);
  }
}
