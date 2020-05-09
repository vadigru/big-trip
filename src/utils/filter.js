import {FilterType} from "../const.js";

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points.sort((a, b) => a.startDate - b.startDate);
    case FilterType.FUTURE:
      return points
      .filter((point) => point.endDate > new Date())
      .sort((a, b) => a.startDate - b.startDate);
    case FilterType.PAST:
      return points
      .filter((point) => point.endDate < new Date())
      .sort((a, b) => a.startDate - b.startDate);
  }

  return points;
};
