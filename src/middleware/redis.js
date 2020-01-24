const extractJwt = require("../services/extractJwt");

module.exports = async function(request, response, next) {
  const user = request.user;
  const redis = request.app.get("redis");

  const reply = await redis.get(user._id);

  const token = extractJwt(request);
  if (reply === token) {
    request.redis = redis;
    return next();
  }

  response.status(401).send({ message: "Unauthorized" });
};
