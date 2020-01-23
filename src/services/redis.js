const redisLogger = require("debug")("app:redis");
const { createClient } = require("redis");

class Redis {
  constructor() {
    this._client = createClient();
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this._client.set(key, value, (error, reply) => {
        if (error) return reject(error);

        this._logger(`[NEW_KEY] ${key}`);
        this._logger(`[VALUE] ${value}`);

        resolve(reply);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this._client.get(key, (error, reply) => {
        if (error) return reject(error);

        this._logger(`[GET_KEY] ${key}`);
        this._logger(`[VALUE] ${reply}`);

        resolve(reply);
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this._client.del(key, (error, number) => {
        if (error) return reject(error);

        this._logger(`[DELETE_KEYS] ${key}`);
        resolve(number);
      });
    });
  }

  quit() {
    return new Promise((resolve, reject) => {
      try {
        this._client.quit();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  on(name, callback) {
    this._client.on(name, callback);
  }

  _logger(string) {
    redisLogger(string);
  }

  removeAllListeners() {
    return new Promise((resolve, reject) => {
      const listeners = ["ready", "error", "reconnecting", "end"];
      listeners.forEach(listener => this._client.removeAllListeners(listener));

      resolve(true);
    });
  }
}

module.exports = Redis;
