const { User } = require("../models/User");
const Restaurant = require("../models/Restaurant");

async function index(request, response) {
  const user = await User.findById(request.user._id);

  const restaurants = await Restaurant.find().where("user", user);

  response.send({ ...user.toJSON(), restaurants });
}

module.exports = {
  index
};
