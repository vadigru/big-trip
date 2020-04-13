import {createFilter} from './components/filter.js';
import {createMenu} from './components/menu.js';
import {createSorting} from './components/sorting.js';
import {createTripCost} from './components/trip-cost.js';
import {createTripDay} from './components/trip-day.js';
import {createTripDayEntry} from './components/trip-day-entry.js';
import {createTripInfo} from './components/trip-info.js';
import {createTripMainInfo} from './components/trip-main-info.js';
import {createWaypoint} from './components/waypoint.js';
import {createWaypointEdit} from './components/waypoint-edit.js';
import {generateWaypoints} from './mock/waypoints.js';
import {createDay, render} from './utils.js';

const WAYPOINTS_COUNT = 20;

const waypoints = generateWaypoints(WAYPOINTS_COUNT);
const tripUniqDates = [...new Set(waypoints.map((it) => new Date(it.startDate).toDateString()))];

const headerElement = document.querySelector(`.trip-main`);
render(headerElement, createTripMainInfo(), `afterbegin`);

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createTripInfo(waypoints, tripUniqDates));
render(tripInfo, createTripCost(waypoints));

const menu = document.querySelector(`.trip-controls`);
render(menu, createMenu());
render(menu, createFilter());

const tripContent = document.querySelector(`.trip-events`);
render(tripContent, createSorting());
render(tripContent, createTripDay());

const tripDays = document.querySelector(`.trip-days`);

tripUniqDates.
  forEach((date, dateIndex) => {
    const day = createDay(createTripDayEntry(date, dateIndex + 1));
    const tripDayList = day.querySelector(`.trip-events__list`);
    waypoints
    .filter((waypoint) => new Date(waypoint.startDate).toDateString() === date)
    .forEach((waypoint, waypointIndex) => {
      render(tripDayList, waypointIndex === 0 && dateIndex === 0
        ? createWaypointEdit(waypoint) : createWaypoint(waypoint));
    });
    render(tripDays, day.parentElement.innerHTML);
  }
  );
