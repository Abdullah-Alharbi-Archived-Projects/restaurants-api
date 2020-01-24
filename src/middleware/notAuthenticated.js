const extractJwt = require("../services/extractJwt");

module.exports = function(request, response, next) {
  const token = extractJwt(request);

  if (token) {
    return response.status(403).send({ message: "Forbidden" });
  }

  next();
};
