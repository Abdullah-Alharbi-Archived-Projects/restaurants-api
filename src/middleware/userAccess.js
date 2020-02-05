module.exports = function(accessLevel = "admin") {
  return function(request, response, next) {
    const user = request.user;

    if (user.role === accessLevel) return next();

    return response.stats(402).send({ message: "Forbidden." });
  };
};
