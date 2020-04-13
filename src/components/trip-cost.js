const getWaypointsCost = (arr) => arr.reduce((acc, it) => acc + it.price, 0);

const getOffersCost = (arr) => {
  let result = 0;
  arr
  .forEach((item) => {
    for (const offer of item.offers) {
      if (offer.checked) {
        result += offer.price;
      }
    }
  });
  return result;
};

export const createTripCost = (waypoints) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getWaypointsCost(waypoints)
        + getOffersCost(waypoints)}</span>
    </p>`
  );
};
