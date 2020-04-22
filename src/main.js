import FilterComponent from './components/filter.js';
import MenuComponent from './components/menu.js';
import TripDaysComponent from './components/trip-days.js';
import TripController from './controllers/trip-controller.js';
import {generateWaypoints} from './mock/waypoints.js';
import {renderElement} from './utils/render.js';
import {menuItems} from './const.js';
import {filters} from './const.js';

const WAYPOINTS_COUNT = 20;

const menuElement = document.querySelector(`.trip-controls`);
renderElement(menuElement, new MenuComponent(menuItems));
renderElement(menuElement, new FilterComponent(filters));

const tripComponet = new TripDaysComponent();
const tripController = new TripController(tripComponet);

tripController.render(generateWaypoints(WAYPOINTS_COUNT));
