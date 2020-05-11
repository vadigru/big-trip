import TripMainInfoComponent from './components/trip-main-info.js';
import MenuComponent from './components/menu.js';
import TripDaysComponent from './components/trip-days.js';
import StatsComponent from './components/stats.js';
import TripController from './controllers/trip-controller.js';
import FilterController from './controllers/filter-controller.js';
import PointsModel from './models/points.js';
import {generateWaypoints} from './mock/waypoints.js';
import {renderElement, RenderPosition} from './utils/render.js';
import {disableComponent} from './utils/common.js';
import {MenuItem, MENU_ITEMS, FilterType} from './const.js';

const WAYPOINTS_COUNT = 20;
const waypoints = generateWaypoints(WAYPOINTS_COUNT);

const headerElement = document.querySelector(`.trip-main`);
const menuElement = document.querySelector(`.trip-controls`);
const eventElement = document.querySelector(`.trip-events`);
const siteMainElement = document.querySelector(`.page-body__page-main`);

const pointsModel = new PointsModel();
const menuComponent = new MenuComponent(MENU_ITEMS);
const tripDaysComponent = new TripDaysComponent();
const filterController = new FilterController(menuElement, pointsModel);
const tripController = new TripController(tripDaysComponent, pointsModel);
const statsComponent = new StatsComponent(waypoints);

renderElement(menuElement, menuComponent);
renderElement(eventElement, tripDaysComponent);
renderElement(headerElement, new TripMainInfoComponent(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, statsComponent);

pointsModel.setPoints(waypoints);
tripController.render();
filterController.render();
statsComponent.hide();

const newPointElement = document.querySelector(`.trip-main__event-add-btn`);
newPointElement.addEventListener(`click`, () => {
  if (statsComponent) {
    menuComponent.setSelectedItem(MenuItem.TABLE);
    statsComponent.hide();
    tripController.show();
  }
  disableComponent(`trip-main__event-add-btn`);
  filterController._onFilterChange(FilterType.EVERYTHING);
  tripController.createPoint();
});

renderElement(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
statsComponent.hide();

menuComponent.setChangeHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      menuComponent.setSelectedItem(MenuItem.TABLE);
      statsComponent.hide();
      tripController.show();
      break;
    case MenuItem.STATS:
      menuComponent.setSelectedItem(MenuItem.STATS);
      statsComponent.show();
      tripController.hide();
      break;
  }

});
