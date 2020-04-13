export const createTripDayEntry = (date, dateIndex) => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dateIndex}</span>
          <time class="day__date" datetime="${date}">${new Date(date).toLocaleString(`en-US`, {
      month: `short`,
      day: `numeric`
    })}</time>
        </div>

        <ul class="trip-events__list">

        </ul>
      </li>`
  );
};
