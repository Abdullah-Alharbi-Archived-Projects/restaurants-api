const extractJwt = require("../services/extractJwt");

module.exports = async function(request, response, next) {
  const redis = request.app.get("redis");
  const user = request.user;
  const token = extractJwt(request);

  const result = await redis.validate(user._id, token);
  if (result) {
    request.redis = redis;
    return next();
  }

  response.status(401).send({ message: "Unauthorized" });
};
