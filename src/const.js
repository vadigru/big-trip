export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

export const ACTIVITY_TYPES = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

export const DESTINATION_UKNOWN = `We know nothing about this place.
  Please select a destination from the dropdown list.`;

export const FILTERS = [
  {
    name: `everything`,
    checked: true,
  },
  {
    name: `future`,
    checked: false,
  },
  {
    name: `past`,
    checked: false,
  },
];

export const MENU_ITEMS = [
  {
    name: `table`,
    selected: true,
  },
  {
    name: `stats`,
    selected: false,
  },
];

export const TRANSFER_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

export const URL = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`
};
