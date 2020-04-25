import AbstractComponent from './abstract-component.js';

export default class TripMainInfo extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="trip-main__trip-info trip-info">
      </section>`
    );
  }
}
