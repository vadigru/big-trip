import FilterComponent from './components/filter.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sorting.js';
import TripCostComponent from './components/trip-cost.js';
import TripDayComponent from './components/trip-day.js';
import TripDayEntryComponent from './components/trip-day-entry.js';
import TripInfoComponent from './components/trip-info.js';
import TripMainInfoComponent from './components/trip-main-info.js';
import WaypointComponent from './components/waypoint.js';
import WaypointEditComponent from './components/waypoint-edit.js';
import NoWaypointComponent from './components/trip-day-no-points.js';
import {generateWaypoints} from './mock/waypoints.js';
import {render, RenderPosition} from './utils.js';

const WAYPOINTS_COUNT = 20;

const renderTripInfo = (points, dates) => {
  const headerElement = document.querySelector(`.trip-main`);
  render(headerElement, new TripMainInfoComponent().getElement(), RenderPosition.AFTERBEGIN);

  const infoElement = document.querySelector(`.trip-info`);
  render(infoElement, new TripInfoComponent(points, dates).getElement());
  render(infoElement, new TripCostComponent(points).getElement());
};

const renderDayEntry = (point, dayListElement) => {
  const waypointComponent = new WaypointComponent(point);
  const waypointEditComponent = new WaypointEditComponent(point);

  const replaceWaypointToWaypointEdit = () => {
    dayListElement.replaceChild(
        waypointEditComponent.getElement(),
        waypointComponent.getElement()
    );
  };

  const replaceWaypointEditToWaypoint = () => {
    dayListElement.replaceChild(
        waypointComponent.getElement(),
        waypointEditComponent.getElement()
    );
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceWaypointEditToWaypoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  render(dayListElement, waypointComponent.getElement());

  waypointComponent
  .getElement()
  .querySelector(`.event__rollup-btn`)
  .addEventListener(`click`, () => {
    replaceWaypointToWaypointEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  waypointEditComponent
  .getElement()
  .querySelector(`.event__rollup-btn`)
  .addEventListener(`click`, () => {
    replaceWaypointEditToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  waypointEditComponent
  .getElement()
  .addEventListener(`submit`, (evt)=> {
    evt.preventDefault();
    replaceWaypointEditToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const renderDay = (points) => {
  if (points.length === 0) {
    render(eventElement, new NoWaypointComponent().getElement());
  } else {
    const tripUniqDates = [...new Set(points.map((it) => new Date(it.startDate).toDateString()))];
    renderTripInfo(points, tripUniqDates);
    tripUniqDates.
    forEach((date, dateIndex) => {
      const day = new TripDayEntryComponent(date, dateIndex + 1).getElement();
      const dayListElement = day.querySelector(`.trip-events__list`);
      points
      .filter((point) => new Date(point.startDate).toDateString() === date)
      .forEach((point) => {
        renderDayEntry(point, dayListElement, day);
      });
      const dayElement = document.querySelector(`.trip-days`);
      render(dayElement, day);
    }
    );
  }
};

const menuElement = document.querySelector(`.trip-controls`);
const eventElement = document.querySelector(`.trip-events`);
render(menuElement, new MenuComponent().getElement());
render(menuElement, new FilterComponent().getElement());
render(eventElement, new TripDayComponent().getElement());
render(eventElement, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);


renderDay(generateWaypoints(WAYPOINTS_COUNT));
