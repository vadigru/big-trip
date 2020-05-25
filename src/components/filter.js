import AbstractComponent from './abstract-component.js';

const FILTER_ID_PREFIX = `filter_`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return (
      `<form class="trip-filters" action="#" method="get">
      ${this._filters
        .map((filter) => {
          return (
            `<div class="trip-filters__filter">
            <input
              id="filter-${filter.name}"
              class="trip-filters__filter-input  visually-hidden"
              type="radio"
              name="trip-filter"
              value="${filter.name}"
              ${filter.checked && `checked`}
              ${filter.disabled && `disabled`}>
            <label
              class="trip-filters__filter-label"
              for="filter-${filter.name}">
              ${filter.name}
            </label>
            </div>`
          );
        }
        ).join(``)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
