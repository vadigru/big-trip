import API from './api/index.js';
import Provider from "./api/provider.js";
import Store from "./api/store.js";
import FilterController from './controllers/filter-controller.js';
import MenuComponent from './components/menu.js';
import StatisticsComponent from './components/statistics.js';
import TripDaysComponent from './components/trip-days.js';
import TripController from './controllers/trip-controller.js';
import TripMainInfoComponent from './components/trip-main-info.js';
import TripPointsLoadind from './components/trip-points-loading.js';
import PointsModel from './models/points.js';
import {renderElement, RenderPosition, remove} from './utils/render.js';
import {FilterType, MenuItem, SortType, MENU_ITEMS, STORE_NAME} from './const.js';

const headerElement = document.querySelector(`.trip-main`);
const menuElement = document.querySelector(`.trip-controls`);
const eventElement = document.querySelector(`.trip-events`);

const api = new API();
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const pointsModel = new PointsModel();
const menuComponent = new MenuComponent(MENU_ITEMS);
const tripDaysComponent = new TripDaysComponent();
const filterController = new FilterController(menuElement, pointsModel);
const statisticsComponent = new StatisticsComponent(pointsModel);
const tripController = new TripController(tripDaysComponent, pointsModel, apiWithProvider, filterController);
let tripPointsLoading = new TripPointsLoadind();

renderElement(menuElement, menuComponent);
renderElement(eventElement, tripDaysComponent);
renderElement(headerElement, new TripMainInfoComponent(), RenderPosition.AFTERBEGIN);
renderElement(eventElement, statisticsComponent, RenderPosition.BEFOREEND);
renderElement(eventElement, tripPointsLoading);

statisticsComponent.hide();

const newPointElement = document.querySelector(`.trip-main__event-add-btn`);
newPointElement.disabled = true;
newPointElement.addEventListener(`click`, () => {
  if (statisticsComponent) {
    statisticsComponent.hide();
    tripController.show();
  }
  menuComponent.setSelectedItem(MenuItem.TABLE);
  filterController._onFilterChange(FilterType.EVERYTHING);
  tripController._sortPoints(SortType.DEFAULT);
  tripController.createPoint();
});

menuComponent.setChangeHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      menuComponent.setSelectedItem(MenuItem.TABLE);
      statisticsComponent.hide();
      tripController.show();
      if (tripPointsLoading && tripController._noWaypointComponent) {
        remove(tripController._noWaypointComponent);
        renderElement(eventElement, tripPointsLoading);
      }
      break;
    case MenuItem.STATS:
      menuComponent.setSelectedItem(MenuItem.STATS);
      statisticsComponent.show();
      tripController.hide();
      if (tripPointsLoading) {
        remove(tripPointsLoading);
      }
      break;
  }
});

Promise.all([
  apiWithProvider.getPoints(),
  apiWithProvider.getOffers(),
  apiWithProvider.getDestinations()
]).then(([points, offers, destinations]) => {
  pointsModel.setPoints(points);
  pointsModel.setOffers(offers);
  pointsModel.setDestinations(destinations);
  remove(tripPointsLoading);
  tripPointsLoading = null;
  tripController.render();
  filterController.render();
  newPointElement.disabled = false;
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` ⚠️ offline`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` ⚠️ offline`;
});
