import TripInfoComponent from '../components/trip-info.js';
import TripCostComponent from '../components/trip-cost.js';
import SortComponent from '../components/sorting.js';
import TripDayEntryComponent from '../components/trip-day-entry.js';
import PointController from '../controllers/point-controller.js';
import NoWaypointComponent from '../components/trip-day-no-points.js';
import {renderElement, RenderPosition} from '../utils/render.js';
import {SortType} from '../components/sorting.js';

const renderTrip = (points, dates, container, onDataChange, onViewChange, isDefaultSort = true) => {
  const pointControllers = [];
  dates = isDefaultSort
    ? dates
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
      pointController.render(point);
      pointControllers.push(pointController);
    });

    renderElement(container.getElement(), day);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._points = [];
    this._showedPointControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(points) {
    const tripUniqDates = [...new Set(points.map((it) => new Date(it.startDate).toDateString()))];

    const eventElement = document.querySelector(`.trip-events`);
    const infoElement = document.querySelector(`.trip-info`);

    if (points.length === 0) {
      renderElement(eventElement, new NoWaypointComponent());
      return;
    }

    renderElement(infoElement, new TripInfoComponent(points, tripUniqDates));
    renderElement(infoElement, new TripCostComponent(points));

    if (this._points.length === 0) {
      this._points = points;
    }
    renderElement(eventElement, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._showedPointControllers = renderTrip(points, tripUniqDates, this._container, this._onDataChange, this._onViewChange);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedPoints = [];
      let isDefaultSort = false;

      switch (sortType) {
        case SortType.TIME:
          sortedPoints = points.slice().sort((a, b) => {
            const aa = a.endDate - a.startDate;
            const bb = b.endDate - b.startDate;
            return bb - aa;
          });
          break;
        case SortType.PRICE:
          sortedPoints = points.slice().sort((a, b) => b.price - a.price);
          break;
        case SortType.DEFAULT:
          sortedPoints = points.slice();
          isDefaultSort = true;
          break;
      }

      this._container.getElement().innerHTML = ``;
      this._showedPointControllers = renderTrip(sortedPoints, tripUniqDates, this._container, this._onDataChange, this._onViewChange, isDefaultSort);
    });
  }

  _onDataChange(pointController, oldPoint, newPoint) {
    const index = this._points.findIndex((it) => it === oldPoint);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index),
        newPoint, this._points.slice(index + 1));
    pointController.render(this._points[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }
}
