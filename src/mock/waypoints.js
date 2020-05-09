import {getRandomArrayItems, getRandomIntegerNumber, shuffleArray} from '../utils/common.js';
import {TRANSFER_TYPES, ACTIVITY_TYPES, CITIES, OPTIONS, PHRASES} from '../const.js';

const OFFER_COUNT = 10;
const getRandomOffers = () => shuffleArray(getRandomChecked(OPTIONS)).slice(0, getRandomIntegerNumber(0, OFFER_COUNT));
const getDescription = () => getRandomDescription(PHRASES);
const getPhotos = () => Array(5).fill(``).map(getRandomPhoto);

const getRandomDescription = (arr) =>
  shuffleArray(arr)
    .slice(0, getRandomIntegerNumber(1, PHRASES.length))
    .join(` `);

const getRandomPhoto = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getRandomDate = () => {
  const START_HOUR = 8;
  const END_HOUR = 23;
  const START_MINUTE = 1;
  const END_MINUTE = 59;
  const MIN_TRIP_DAYS = -5;
  const MAX_TRIP_DURATION = 20;
  const MAX_TRIP_DAYS = getRandomIntegerNumber(0, MAX_TRIP_DURATION);
  const hours = START_HOUR + Math.random() * (END_HOUR - START_HOUR) | 0;
  const minutes = START_MINUTE + Math.random() * (END_MINUTE - START_MINUTE) | 0;

  const date = new Date();
  date.setDate(date.getDate() + getRandomIntegerNumber(MIN_TRIP_DAYS, MAX_TRIP_DAYS));
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};

const getRandomChecked = (arr) => {
  arr
  .forEach((item) => {
    item.checked = Math.random() > 0.5;
  });
  return arr;
};

const generateWaypoint = () => {
  const MIN_PRICE = 50;
  const MAX_PRICE = 100;
  const start = getRandomDate();
  const end = getRandomDate();
  return {
    id: String(Date.now() + Math.random()),
    type: getRandomArrayItems(TRANSFER_TYPES.concat(ACTIVITY_TYPES)),
    city: getRandomArrayItems(CITIES),
    startDate: Math.min(start, end),
    endDate: Math.max(start, end),
    price: getRandomIntegerNumber(MIN_PRICE, MAX_PRICE),
    offers: getRandomOffers(),
    description: getDescription(),
    photos: getPhotos(),
    isFavorite: Math.random() < 0.5,
  };
};

const generateWaypoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateWaypoint)
  .sort((a, b) => a.startDate - b.startDate);
};

const EmptyPoint = {
  id: String(Date.now() + Math.random()),
  type: `taxi`,
  city: ``,
  startDate: Date.now(),
  endDate: Date.now(),
  price: 0,
  offers: [],
  description: ``,
  photos: [],
  isFavorite: false,
  isNew: true
};

export {generateWaypoint, generateWaypoints, getRandomOffers, getDescription, getPhotos, EmptyPoint};

