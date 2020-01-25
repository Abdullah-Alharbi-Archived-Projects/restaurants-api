const extractJwt = require("../services/extractJwt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function(request, response, next) {
  const redis = request.app.get("redis");
  const token = extractJwt(request);

  if (token) {
    const { id } = jwt.verify(token, config.get("jwtSecretKey"));
    const result = await redis.validate(id, token);

    if (result) {
      return response.status(403).send({ message: "Forbidden" });
    }
  }

  next();
};
