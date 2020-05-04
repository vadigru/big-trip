import moment from "moment";

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (arr) => {
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
  return moment(date).format(`HH:MM`);
};

export const parseDate = (date) => {
  return moment(date).format(`MMM DD`);
};
