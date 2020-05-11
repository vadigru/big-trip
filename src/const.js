export const PointTypeToPretext = {
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

const CITIES = [
  `Amsterdam`,
  `Geneva`,
  `Saint Petersburg`,
  `Atlanta`,
  `Twin Peaks`,
  `Tokyo`
];

const OFFERS = [
  {
    type: `taxi`,
    offers: [
      {
        name: `Open the window`,
        price: 120
      }, {
        name: `Choose the radio station`,
        price: 60
      }
    ]
  },
  {
    type: `bus`,
    offers: [
      {
        name: `Smoke in the bus`,
        price: 120
      }, {
        name: `Sleep all way`,
        price: 0
      }
    ]
  },
  {
    type: `train`,
    offers: [
      {
        name: `Tuk Tuk Tuki tuk`,
        price: 500
      }, {
        name: `Order peppermint tea`,
        price: 20
      }
    ]
  },
  {
    type: `ship`,
    offers: [
      {
        name: `Take a party`,
        price: 200
      }, {
        name: `Choose the radio station`,
        price: 60
      }
    ]
  },
  {
    type: `transport`,
    offers: [
      {
        name: `Upgrade to a business class`,
        price: 120
      }, {
        name: `Choose the radio station`,
        price: 60
      }
    ]
  },
  {
    type: `drive`,
    offers: [
    ]
  },
  {
    type: `flight`,
    offers: [
      {
        name: `Upgrade to a business class`,
        price: 120
      }, {
        name: `Choose seats`,
        price: 100
      }
    ]
  },
  {
    type: `check-in`,
    offers: [
      {
        name: `Choose check-in time`,
        price: 30
      }, {
        name: `Choose room with perfect view`,
        price: 80
      }
    ]
  },
  {
    type: `sightseeing`,
    offers: [
      {
        name: `Hire a guide`,
        price: 50
      }, {
        name: `Drink beer`,
        price: 100
      }
    ]
  },
  {
    type: `restaurant`,
    offers: [
      {
        name: `Add meal`,
        price: 120
      }, {
        name: `Switch to comfort`,
        price: 160
      }
    ]
  }
];

// const OPTIONS = [
//   {
//     name: `Add luggage`,
//     type: `luggage`,
//     price: 30,
//     checked: false,
//   },
//   {
//     name: `Switch to comfort`,
//     type: `comfort`,
//     price: 100,
//     checked: false,
//   },
//   {
//     name: `Add meal`,
//     type: `meal`,
//     price: 15,
//     checked: false,
//   },
//   {
//     name: `Choose seats`,
//     type: `seats`,
//     price: 5,
//     checked: false,
//   },
//   {
//     name: `Trevel by train`,
//     type: `train`,
//     price: 40,
//     checked: false,
//   },
//   {
//     name: `Get escort`,
//     type: `escort`,
//     price: 75,
//     checked: false,
//   },
//   {
//     name: `Hire a guide`,
//     type: `guide`,
//     price: 50,
//     checked: false,
//   },
//   {
//     name: `Sleep all day`,
//     type: `sleep`,
//     price: 0,
//     checked: false,
//   },
// ];

const PHRASES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

export {FILTERS, MENU_ITEMS, TRANSFER_TYPES, ACTIVITY_TYPES, CITIES, OFFERS, PHRASES};
