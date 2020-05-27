import {FilterType} from "../const.js";

const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      points = points.sort((a, b) => a.startDate - b.startDate);
      break;
    case FilterType.FUTURE:
      points = points
      .filter((point) => point.endDate > new Date())
      .sort((a, b) => a.startDate - b.startDate);
      break;
    case FilterType.PAST:
      points = points
      .filter((point) => point.endDate < new Date())
      .sort((a, b) => a.startDate - b.startDate);
      break;
  }

  return points;
};

export {getPointsByFilter};
