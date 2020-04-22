const filters = [
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

const menuItems = [
  {
    name: `table`,
    checked: true,
  },
  {
    name: `stats`,
    checked: false,
  },
];
const transferTypes = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const activityTypes = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`,
  `Tokyo`,
  `Twin Peaks`,
  `Atlanta`,
];

const options = [
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 30,
    checked: Math.random() > 0.5,
  },
  {
    name: `Switch to comfort`,
    type: `comfort`,
    price: 100,
    checked: Math.random() > 0.5,
  },
  {
    name: `Add meal`,
    type: `meal`,
    price: 15,
    checked: Math.random() > 0.5,
  },
  {
    name: `Choose seats`,
    type: `seats`,
    price: 5,
    checked: Math.random() > 0.5,
  },
  {
    name: `Trevel by train`,
    type: `train`,
    price: 40,
    checked: Math.random() > 0.5,
  },
  {
    name: `Get escort`,
    type: `escort`,
    price: 75,
    checked: Math.random() > 0.5,
  },
  {
    name: `Hire a guide`,
    type: `guide`,
    price: 50,
    checked: Math.random() > 0.5,
  },
  {
    name: `Sleep all day`,
    type: `sleep`,
    price: 0,
    checked: Math.random() > 0.5,
  },
];

const phrases = [
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

export {filters, menuItems, transferTypes, activityTypes, cities, options, phrases};
