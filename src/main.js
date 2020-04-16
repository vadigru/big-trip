import FilterComponent from './components/filter.js';
import MenuComponent from './components/menu.js';
import SortElement from './components/sorting.js';
import TripCostComponent from './components/trip-cost.js';
import TripDayComponent from './components/trip-day.js';
import TripDayEntryComponent from './components/trip-day-entry.js';
import TripInfoComponent from './components/trip-info.js';
import TripMainInfoComponent from './components/trip-main-info.js';
import WaypointComponent from './components/waypoint.js';
import WaypointEditComponent from './components/waypoint-edit.js';
import {generateWaypoints} from './mock/waypoints.js';
import {render, RenderPosition} from './utils.js';

const WAYPOINTS_COUNT = 20;
const waypoints = generateWaypoints(WAYPOINTS_COUNT);
const tripUniqDates = [...new Set(waypoints.map((it) => new Date(it.startDate).toDateString()))];

const renderDayEntry = (point, tripDayList) => {
  const waypointComponent = new WaypointComponent(point);
  const waypointEditComponent = new WaypointEditComponent(point);

  const replaceWaypointToWaypointEdit = () => {
    tripDayList.replaceChild(
        waypointEditComponent.getElement(),
        waypointComponent.getElement()
    );
  };

  const replaceWaypointEditToWaypoint = () => {
    tripDayList.replaceChild(
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

  render(
      tripDayList,
      waypointComponent.getElement(),
      RenderPosition.BEFOREEND
  );

  waypointComponent
  .getElement()
  .querySelector(`.event__rollup-btn`)
  .addEventListener(`click`, () => {
    replaceWaypointToWaypointEdit(tripDayList);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  waypointEditComponent
  .getElement()
  .addEventListener(`submit`, (evt)=> {
    evt.preventDefault();
    replaceWaypointEditToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const renderDay = (points, dates) => {
  dates.
  forEach((date, dateIndex) => {
    const day = new TripDayEntryComponent(date, dateIndex + 1).getElement();
    const tripDayList = day.querySelector(`.trip-events__list`);
    points
    .filter((point) => new Date(point.startDate).toDateString() === date)
    .forEach((point) => {
      renderDayEntry(point, tripDayList, day);
    });
    const tripDays = document.querySelector(`.trip-days`);
    render(tripDays, day, RenderPosition.BEFOREEND);
  }
  );
};

const renderTripInfo = (points, dates) => {
  const headerElement = document.querySelector(`.trip-main`);
  render(headerElement, new TripMainInfoComponent().getElement(), RenderPosition.AFTERBEGIN);

  const tripInfo = document.querySelector(`.trip-info`);
  render(tripInfo, new TripInfoComponent(points, dates).getElement(), RenderPosition.BEFOREEND);
  render(tripInfo, new TripCostComponent(points).getElement(), RenderPosition.BEFOREEND);
};

const menu = document.querySelector(`.trip-controls`);
const tripContent = document.querySelector(`.trip-events`);
render(menu, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(menu, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(tripContent, new TripDayComponent().getElement(), RenderPosition.BEFOREEND);
render(tripContent, new SortElement().getElement(), RenderPosition.AFTERBEGIN);

renderTripInfo(waypoints, tripUniqDates);
renderDay(waypoints, tripUniqDates);
