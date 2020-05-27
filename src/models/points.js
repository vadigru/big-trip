import {getPointsByFilter} from '../utils/filter.js';
import {createOffersSet, createDestinationsSet} from '../utils/common.js';
import {FilterType} from "../const.js";

export default class Points {
  constructor() {
    this._points = [];
    this._offersSet = {};
    this._destinationsSet = {};
    this._activeFilterType = FilterType.EVERYTHING;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getPoints(filterType = this._activeFilterType) {
    return getPointsByFilter(this._points, filterType);
  }

  getPointsAll() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  getOffers() {
    return this._offersSet;
  }

  setOffers(offers) {
    this._offersSet = createOffersSet(offers);
  }

  getDestinations() {
    return this._destinationsSet;
  }

  setDestinations(destinations) {
    this._destinationsSet = createDestinationsSet(destinations);
  }

  addPoint(point) {
    this._points = [point, ...this._points];
    this._callHandlers(this._dataChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._points = [
      ...this._points.slice(0, index),
      point,
      ...this._points.slice(index + 1)
    ];
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
