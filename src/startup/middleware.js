const { json } = require("express");
const helmet = require("helmet");
const compression = require("compression");
const passport = require("passport");

module.exports = function(app) {
  app.use(json());
  app.use(helmet());
  app.use(compression()); // compress all responses

  app.use(passport.initialize());
  // TODO: need global catch middleware
};
