import TripInfoComponent from '../components/trip-info.js';
import TripCostComponent from '../components/trip-cost.js';
import SortComponent from '../components/sorting.js';
import TripDayEntryComponent from '../components/trip-day-entry.js';
import WaypointComponent from '../components/waypoint.js';
import WaypointEditComponent from '../components/waypoint-edit.js';
import NoWaypointComponent from '../components/trip-day-no-points.js';
import {renderElement, replaceElement, RenderPosition} from '../utils/render.js';
import {SortType} from '../components/sorting.js';

const renderTrip = (points, container, dates, isDefaultSort = true) => {
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
      const waypointComponent = new WaypointComponent(point);
      const waypointEditComponent = new WaypointEditComponent(point);

      const replaceWaypointToWaypointEdit = () => {
        replaceElement(waypointEditComponent, waypointComponent);
      };

      const replaceWaypointEditToWaypoint = () => {
        replaceElement(waypointComponent, waypointEditComponent);
      };

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
        if (isEscKey) {
          replaceWaypointEditToWaypoint();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      waypointComponent.setClickHandler(() => {
        replaceWaypointToWaypointEdit();
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      waypointEditComponent.setClickHandler(() => {
        replaceWaypointEditToWaypoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      waypointEditComponent.setClickSaveButtonHandler((evt)=> {
        evt.preventDefault();
        replaceWaypointEditToWaypoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      renderElement(dayListElement, waypointComponent);
    });

    renderElement(container.getElement(), day);
  });
};

const renderSortedTrip = (points, container, dates, sortType) => {
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

  renderTrip(sortedPoints, container, dates, isDefaultSort);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
  }

  render(points) {
    const eventElement = document.querySelector(`.trip-events`);

    if (points.length === 0) {
      renderElement(eventElement, new NoWaypointComponent());
      return;
    }

    const tripUniqDates = [...new Set(points.map((it) => new Date(it.startDate).toDateString()))];
    const infoElement = document.querySelector(`.trip-info`);
    renderElement(infoElement, new TripInfoComponent(points, tripUniqDates));
    renderElement(infoElement, new TripCostComponent(points));
    renderElement(eventElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    renderTrip(points, this._container, tripUniqDates);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._container.getElement().innerHTML = ``;
      renderSortedTrip(points, this._container, tripUniqDates, sortType);
    });
  }
}
