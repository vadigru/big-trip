export const createTripInfo = (waypoint, date) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${waypoint.length > 2
      ? waypoint[0].city + `&nbsp;&mdash;&nbsp;` + ` ... ` + `&nbsp;&mdash;&nbsp;` + waypoint[waypoint.length - 1].city
      : waypoint[0].city + `&nbsp;&mdash;&nbsp;` + waypoint[waypoint.length - 1].city}</h1>
      <p class="trip-info__dates">
      ${new Date(date[0]).toLocaleString(`en-US`, {
      month: `short`,
      day: `numeric`
    }) + `&nbsp;&mdash;&nbsp;`
    + new Date(date[date.length - 1]).toLocaleString(`en-US`, {
      month: `short`,
      day: `numeric`
    })}</p>
    </div>`
  );
};
