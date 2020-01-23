const { Redis } = require("../services/");

module.exports = function(app) {
  const client = new Redis();

  client.on("ready", () => client._logger("Connected to redis successfully."));
  client.on("error", error => client._logger("Unable to connect.", error));
  client.on("reconnecting", () =>
    client._logger("Reconnecting to redis again...")
  );
  client.on("end", () => client._logger("Redis Connection Closed."));

  app.set("redis", client);
};
