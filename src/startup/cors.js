const cors = require("cors");

module.exports = function(app) {
  const whiteList = ["http://localhost"];

  const corsOptions = {
    origin: function(origin, callback) {
      if (whiteList.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      callback(new Error("Not Allowed By CORS."));
    }
  };

  app.use(cors(corsOptions));
};
