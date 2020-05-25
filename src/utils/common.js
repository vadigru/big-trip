import moment from "moment";

const capitalizeFirstLetter = ([initial, ...rest]) => [initial.toUpperCase(), ...rest].join(``);

const parseTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const parseDate = (date) => {
  return moment(date).format(`DD MMM`);
};

const getFullPrice = (arr) => {
  const totalCostElement = document.querySelector(`.trip-info__cost-value`);
  totalCostElement.textContent = arr.reduce((total, offer) => parseInt(total, 10) + parseInt(offer.price, 10)
                               + offer.offers.reduce((acc, it) => parseInt(acc, 10) + parseInt(it.price, 10), 0), 0);
};

const disableComponent = (className) => {
  const componentElement = document.querySelector(`.${className}`);
  if (!componentElement.getAttribute(`disabled`)) {
    componentElement.setAttribute(`disabled`, `disabled`);
  }
};

const enableComponent = (className) => {
  const componentElement = document.querySelector(`.${className}`);
  if (componentElement.getAttribute(`disabled`)) {
    componentElement.removeAttribute(`disabled`);
  }
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
  getFullPrice,
  disableComponent,
  enableComponent,
  createOffersSet,
  createDestinationsSet,
};
