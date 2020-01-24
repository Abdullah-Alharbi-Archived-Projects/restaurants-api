const { ExtractJwt } = require("passport-jwt");

module.exports = request => {
  const authorization = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
  return authorization;
};
