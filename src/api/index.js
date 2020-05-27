import Point from '../models/point.js';
import {URL} from '../const';

const AccessData = {
  END_POINT: `https://11.ecmascript.pages.academy/big-trip`,
  AUTHORIZATION: `Basic &&jUjUEfK7%kl3Eddj=`
};

const HttpCode = {
  SUCCESS: 200,
  REDIRECTION: 300
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= HttpCode.SUCCESS && response.status < HttpCode.REDIRECTION) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor() {
    this._endPoint = AccessData.END_POINT;
    this._authorization = AccessData.AUTHORIZATION;
  }

  getPoints() {
    return this._load({url: URL.POINTS})
      .then((response) => response.json())
      .then(Point.parsePoints);
  }

  getOffers() {
    return this._load({url: URL.OFFERS})
    .then((response) => response.json());
  }

  getDestinations() {
    return this._load({url: URL.DESTINATIONS})
    .then((response) => response.json());
  }

  updatePoint(id, data) {
    return this._load({
      url: `${URL.POINTS}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  createPoint(point) {
    return this._load({
      url: URL.POINTS,
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  deletePoint(id) {
    return this._load({url: `${URL.POINTS}/${id}`, method: Method.DELETE});
  }

  sync(data) {
    return this._load({
      url: `${URL.POINTS}/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
