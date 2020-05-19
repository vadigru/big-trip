const PointTypeToPretext = {
  "taxi": `to`,
  "bus": `to`,
  "train": `to`,
  "ship": `to`,
  "transport": `to`,
  "drive": `to`,
  "flight": `to`,
  "check-in": `in`,
  "sightseeing": `in`,
  "restaurant": `in`
};

export const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
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

export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};

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

const ACTIVITY_TYPES = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

export {PointTypeToPretext, FILTERS, MENU_ITEMS, TRANSFER_TYPES, ACTIVITY_TYPES};
