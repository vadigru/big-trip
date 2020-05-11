import AbstractComponent from './abstract-component.js';
import {capitalizeFirstLetter} from '../utils/common.js';

const SELECTED_ITEM_CLASS = `trip-tabs__btn--active`;

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
  }

  getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${this._menuItems
            .map((menuItem) => {
              return (
                `<a
                class="trip-tabs__btn  ${menuItem.selected && `trip-tabs__btn--active`}"
                href="#" id="${menuItem.name}">
                ${capitalizeFirstLetter(menuItem.name)}
                </a>
                `);
            }).join(``)
      }
      </nav>`
    );
  }

  setSelectedItem(selectedItem) {
    this.getElement()
      .querySelectorAll(`.trip-tabs__btn`)
      .forEach((item) => {
        if (item.id === selectedItem) {
          item.classList.add(SELECTED_ITEM_CLASS);
        } else {
          item.classList.remove(SELECTED_ITEM_CLASS);
        }
      });
  }

  setChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      const menuItem = evt.target.id;
      handler(menuItem);
    });
  }
}
