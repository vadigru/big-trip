import AbstractComponent from './abstract-component.js';

export default class TripDays extends AbstractComponent {
  getTemplate() {
    return (
      `<ul class="trip-days"></ul>`
    );
  }
}
