const passport = require("passport");
const $redis = require("./redis");

module.exports = function(request, response, next) {
  return passport.authenticate("jwt", { session: false })(
    request,
    response,
    next
  );
};
