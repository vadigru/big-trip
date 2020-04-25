import AbstractComponent from './abstract-component.js';
import {capitalizeFirstLetter} from '../utils/common.js';

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this.menuItems = menuItems;
  }

  getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${this.menuItems
            .map((menuItem) => {
              return (
                `<a
                class="trip-tabs__btn  ${menuItem.checked && `trip-tabs__btn--active`}"
                href="#">
                ${capitalizeFirstLetter(menuItem.name)}
                </a>
                `);
            }).join(``)
      }
      </nav>`
    );
  }
}
