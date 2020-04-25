import TripMainInfoComponent from './components/trip-main-info.js';
import FilterComponent from './components/filter.js';
import MenuComponent from './components/menu.js';
import TripDaysComponent from './components/trip-days.js';
import TripController from './controllers/trip-controller.js';
import {generateWaypoints} from './mock/waypoints.js';
import {renderElement, RenderPosition} from './utils/render.js';
import {MENU_ITEMS} from './const.js';
import {FILTERS} from './const.js';

const WAYPOINTS_COUNT = 20;

const headerElement = document.querySelector(`.trip-main`);
const menuElement = document.querySelector(`.trip-controls`);
const eventElement = document.querySelector(`.trip-events`);
const tripDaysComponent = new TripDaysComponent();
const tripController = new TripController(tripDaysComponent);

renderElement(menuElement, new MenuComponent(MENU_ITEMS));
renderElement(menuElement, new FilterComponent(FILTERS));
renderElement(eventElement, tripDaysComponent);
renderElement(headerElement, new TripMainInfoComponent(), RenderPosition.AFTERBEGIN);

tripController.render(generateWaypoints(WAYPOINTS_COUNT));
