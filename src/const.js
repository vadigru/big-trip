const MenuItem = {
  TABLE: `table`,
  STATS: `stats`,
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const ACTIVITY_TYPES = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const DESTINATION_UKNOWN = `We know nothing about this place.
  Please select a destination from the dropdown list.`;

const FILTERS = [
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

const MENU_ITEMS = [
  {
    name: `table`,
    selected: true,
  },
  {
    name: `stats`,
    selected: false,
  },
];

const TRANSFER_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const URL = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};

export {
  MenuItem,
  Mode,
  FilterType,
  SortType,
  ACTIVITY_TYPES,
  DESTINATION_UKNOWN,
  FILTERS,
  MENU_ITEMS,
  TRANSFER_TYPES,
  URL,
};
