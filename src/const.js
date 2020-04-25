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
    checked: true,
  },
  {
    name: `stats`,
    checked: false,
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
  `Chamonix`,
  `Saint Petersburg`,
  `Tokyo`,
  `Twin Peaks`,
  `Atlanta`,
];

const OPTIONS = [
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 30,
    checked: false,
  },
  {
    name: `Switch to comfort`,
    type: `comfort`,
    price: 100,
    checked: false,
  },
  {
    name: `Add meal`,
    type: `meal`,
    price: 15,
    checked: false,
  },
  {
    name: `Choose seats`,
    type: `seats`,
    price: 5,
    checked: false,
  },
  {
    name: `Trevel by train`,
    type: `train`,
    price: 40,
    checked: false,
  },
  {
    name: `Get escort`,
    type: `escort`,
    price: 75,
    checked: false,
  },
  {
    name: `Hire a guide`,
    type: `guide`,
    price: 50,
    checked: false,
  },
  {
    name: `Sleep all day`,
    type: `sleep`,
    price: 0,
    checked: false,
  },
];

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

export {FILTERS, MENU_ITEMS, TRANSFER_TYPES, ACTIVITY_TYPES, CITIES, OPTIONS, PHRASES};
