import AbstractComponent from "./abstract-component.js";

export default class TripPointsLoading extends AbstractComponent {
  getTemplate() {
    return (
      `<p class="trip-events__msg">Loading...</p>`
    );
  }
}
