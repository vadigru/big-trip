import TripMainInfoComponent from './components/trip-main-info.js';
import MenuComponent from './components/menu.js';
import TripDaysComponent from './components/trip-days.js';
import TripController from './controllers/trip-controller.js';
import PointsModel from './models/points.js';
import FilterController from './controllers/filter-controller.js';
import {generateWaypoints} from './mock/waypoints.js';
import {renderElement, RenderPosition} from './utils/render.js';
import {MENU_ITEMS, FilterType} from './const.js';
import {disableComponent} from './utils/common.js';

const WAYPOINTS_COUNT = 10;
const waypoints = generateWaypoints(WAYPOINTS_COUNT);
const headerElement = document.querySelector(`.trip-main`);
const menuElement = document.querySelector(`.trip-controls`);
const eventElement = document.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
const tripDaysComponent = new TripDaysComponent();
const filterController = new FilterController(menuElement, pointsModel);
const tripController = new TripController(tripDaysComponent, pointsModel);

renderElement(menuElement, new MenuComponent(MENU_ITEMS));
renderElement(eventElement, tripDaysComponent);
renderElement(headerElement, new TripMainInfoComponent(), RenderPosition.AFTERBEGIN);

pointsModel.setPoints(waypoints);
tripController.render();
filterController.render();

const newPointElement = document.querySelector(`.trip-main__event-add-btn`);
newPointElement.addEventListener(`click`, () => {
  disableComponent(`trip-main__event-add-btn`);
  filterController._onFilterChange(FilterType.EVERYTHING);
  tripController.createPoint();
});
