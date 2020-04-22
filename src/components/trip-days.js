import AbstractComponent from './abstract-component.js';

export default class TripDay extends AbstractComponent {
  getTemplate() {
    return (
      `<ul class="trip-days">
      </ul>`
    );
  }
}
