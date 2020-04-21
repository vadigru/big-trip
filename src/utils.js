export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const capitalizeFirstLetter = ([initial, ...rest]) => [initial.toUpperCase(), ...rest].join(``);

const castTimeFormat = (value) => value < 10 ? `0${value}` : String(value);

export const parseTime = (date) => {
  date = new Date(date);
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const parseDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.getDate() + `/` + (date.getMonth() + 1) + `/` + date.getFullYear().toString().slice(2);
};

export const createElement = (template) => {
  const newDay = document.createElement(`civ`);
  newDay.innerHTML = template;

  return newDay.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
