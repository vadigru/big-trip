import {getRandomArrayItem, getRandomIntegerNumber, shuffleArray} from '../utils/common.js';
import {transferTypes, activityTypes, cities, options, phrases} from '../const.js';

const OFFER_COUNT = 10;

const getRandomDescription = (arr) =>
  shuffleArray(arr)
    .slice(0, getRandomIntegerNumber(1, phrases.length))
    .join(` `);

const getRandomPhoto = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getRandomDate = () => {
  const START_HOUR = 8;
  const END_HOUR = 23;
  const START_MINUTE = 1;
  const END_MINUTE = 59;
  const MIN_TRIP_DAYS = 2;
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

const generateWaypoint = () => {
  const MIN_PRICE = 50;
  const MAX_PRICE = 100;
  const start = getRandomDate();
  const end = getRandomDate();
  return {
    type: getRandomArrayItem(transferTypes.concat(activityTypes)),
    city: getRandomArrayItem(cities),
    startDate: Math.min(start, end),
    endDate: Math.max(start, end),
    price: getRandomIntegerNumber(MIN_PRICE, MAX_PRICE),
    offers: shuffleArray(options).slice(0, getRandomIntegerNumber(0, OFFER_COUNT)),
    description: getRandomDescription(phrases),
    photos: Array(5)
      .fill(``)
      .map(getRandomPhoto),
  };
};

const generateWaypoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateWaypoint)
  .sort((a, b) => a.startDate - b.startDate);
};

export {generateWaypoint, generateWaypoints};

