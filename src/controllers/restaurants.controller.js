const Restaurant = require("../models/Restaurant");

async function index(request, response) {
  const restaurants = await Restaurant.find();
  response.send(restaurants);
}

function show(request, response) {}

async function create(request, response) {
  const { name, logoPath } = request.body;
  // TODO: validate data
  let restaurant = new Restaurant({ name, logoPath });
  restaurant = await restaurant.save();
  response.send({ message: "Created", restaurant });
}

function update(request, response) {}

function destroy(request, response) {}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
