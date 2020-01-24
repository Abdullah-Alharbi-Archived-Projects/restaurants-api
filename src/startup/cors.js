const cors = require("cors");

module.exports = function(app) {
  // TODO: add white list

  app.use(cors());
};
