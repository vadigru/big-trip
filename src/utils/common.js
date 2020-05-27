import moment from "moment";

const capitalizeFirstLetter = ([initial, ...rest]) => [initial.toUpperCase(), ...rest].join(``);

const parseTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const parseDate = (date) => {
  return moment(date).format(`DD MMM`);
};

const createOffersSet = (data) => {
  return data.reduce((acc, item) => {
    if (acc[item.type] === undefined) {
      acc[item.type] = [];
    }
    acc[item.type] = item.offers;
    return acc;
  }, {});
};

const createDestinationsSet = (data) => {
  return data.reduce((acc, item) => {
    if (acc[item.name] === undefined) {
      acc[item.name] = [];
    }
    acc[item.name] = item;
    return acc;
  }, {});
};

export {
  capitalizeFirstLetter,
  parseTime,
  parseDate,
  createOffersSet,
  createDestinationsSet,
};
