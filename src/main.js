import {createInfo} from './components/info.js';
import {createTripInfo} from './components/trip-info.js';
import {createTripCost} from './components/trip-cost.js';
import {createMenu} from './components/menu.js';
import {createFilter} from './components/filter.js';
import {createSorting} from './components/sorting.js';
import {createWaypoint} from './components/waypoint.js';
import {createTripDays} from './components/trip-days.js';
import {createTripDayEvents} from './components/trip-day-events.js';
import {render} from './utils.js';

const DAYS_COUNT = 3;

const headerElement = document.querySelector(`.trip-main`);
render(headerElement, createInfo(), `afterbegin`);

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createTripInfo());
render(tripInfo, createTripCost());

const menu = document.querySelector(`.trip-controls`);
render(menu, createMenu());
render(menu, createFilter());

const tripContent = document.querySelector(`.trip-events`);
render(tripContent, createSorting());
render(tripContent, createWaypoint());
render(tripContent, createTripDays());

const tripDays = document.querySelector(`.trip-days`);
for (let i = 0; i < DAYS_COUNT; i++) {
  render(tripDays, createTripDayEvents());
}
