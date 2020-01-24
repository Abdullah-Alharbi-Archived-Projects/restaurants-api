const { ExtractJwt } = require("passport-jwt");

module.exports = async function(request, response, next) {
  const user = request.user;
  const redis = request.app.get("redis");

  const reply = await redis.get(user._id);

  const authorization = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

  if (reply === authorization) {
    request.redis = redis;
    return next();
  }

  response.status(401).send({ message: "Unauthorized" });
};
