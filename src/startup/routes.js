const api = require("../routes/index");

module.exports = function(app) {
  app.use("/api/", api);

  // prevent GET /favicon.ico
  // send 204 No Content
  app.get("/favicon.ico", (request, response) => response.status(204));
};
