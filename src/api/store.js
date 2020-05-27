export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems(key = this._storeKey) {
    try {
      return JSON.parse(this._storage.getItem(key)) || {};
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getItems();
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  setItems(items) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }

  removeItem(key) {
    const store = this.getItems();
    delete store[key];
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(store)
    );
  }

  setOffers(key, offers) {
    this._storage.setItem(key, JSON.stringify(offers));
  }

  setDestinations(key, destinations) {
    this._storage.setItem(key, JSON.stringify(destinations));
  }
}
