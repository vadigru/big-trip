import {createElement} from "../utils.js";
import {filters} from '../const.js';

const creatFilterMarkup = () => {
  return filters
    .map((it) => {
      return (
        `<div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">${it}</label>
        </div>`
      );
    }
    ).join(``);
};

const createFilter = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${creatFilterMarkup()}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilter();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

