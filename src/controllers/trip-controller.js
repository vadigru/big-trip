import TripCostComponent from '../components/trip-cost.js';
import TripDaysComponent from '../components/trip-days.js';
import TripDayEntryComponent from '../components/trip-day-entry.js';
import TripInfoComponent from '../components/trip-info.js';
import TripMainInfoComponent from '../components/trip-main-info.js';
import SortComponent from '../components/sorting.js';
import WaypointComponent from '../components/waypoint.js';
import WaypointEditComponent from '../components/waypoint-edit.js';
import NoWaypointComponent from '../components/trip-day-no-points.js';
import {renderElement, replaceElement, RenderPosition} from '../utils/render.js';

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noWaypointComponent = new NoWaypointComponent();
    this._sortComponent = new SortComponent();
    this._tripDayComponent = new TripDaysComponent();
  }

  render(points) {
    const eventElement = document.querySelector(`.trip-events`);
    renderElement(eventElement, this._tripDayComponent);
    renderElement(eventElement, this._sortComponent, RenderPosition.AFTERBEGIN);

    if (points.length === 0) {
      renderElement(eventElement, this._noWaypointComponent);
    } else {
      const tripUniqDates = [...new Set(points.map((it) => new Date(it.startDate).toDateString()))];

      const headerElement = document.querySelector(`.trip-main`);
      renderElement(headerElement, new TripMainInfoComponent(), RenderPosition.AFTERBEGIN);

      const infoElement = document.querySelector(`.trip-info`);
      renderElement(infoElement, new TripInfoComponent(points, tripUniqDates));
      renderElement(infoElement, new TripCostComponent(points));

      tripUniqDates.
      forEach((date, dateIndex) => {
        const day = new TripDayEntryComponent(date, dateIndex + 1);
        const dayElement = document.querySelector(`.trip-days`);
        const dayListElement = day.getElement().querySelector(`.trip-events__list`);

        points
        .filter((point) => new Date(point.startDate).toDateString() === date)
        .forEach((point) => {
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

        renderElement(dayElement, day);
      }
      );
    }
  }
}
