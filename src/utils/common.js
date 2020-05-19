import moment from "moment";

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItems = (arr) => {
  const randomIndex = getRandomIntegerNumber(0, arr.length);
  return arr[randomIndex];
};

export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const capitalizeFirstLetter = ([initial, ...rest]) => [initial.toUpperCase(), ...rest].join(``);

export const parseTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const parseDate = (date) => {
  return moment(date).format(`DD MMM`);
};

const getWaypointsCost = (arr) => arr.reduce((acc, it) => parseInt(acc, 10) + parseInt(it.price, 10), 0);

const getOffersCost = (arr) => {
  let sum = 0;
  arr.forEach((offer) => {
    sum += offer.offers.reduce((acc, it) => parseInt(acc, 10) + parseInt(it.price, 10), 0);
  });
  return sum;
};

export const getFullPrice = (arr) => {
  const totalCostElement = document.querySelector(`.trip-info__cost-value`);
  totalCostElement.textContent = getWaypointsCost(arr) + getOffersCost(arr);
};

export const disableComponent = (className) => {
  const component = document.querySelector(`.${className}`);
  if (!component.getAttribute(`disabled`)) {
    component.setAttribute(`disabled`, `disabled`);
  }
};

export const enableComponent = (className) => {
  const component = document.querySelector(`.${className}`);
  if (component.getAttribute(`disabled`)) {
    component.removeAttribute(`disabled`);
  }
};


export const createOffersSet = (data) => {
  return data.reduce((acc, item) => {
    if (acc[item.type] === undefined) {
      acc[item.type] = [];
    }
    acc[item.type] = item.offers;
    return acc;
  }, {});
};

export const createDestinationsSet = (data) => {
  return data.reduce((acc, item) => {
    if (acc[item.name] === undefined) {
      acc[item.name] = [];
    }
    acc[item.name] = item;
    return acc;
  }, {});
};
