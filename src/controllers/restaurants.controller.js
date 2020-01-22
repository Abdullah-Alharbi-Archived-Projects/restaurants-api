const Restaurant = require("../models/Restaurant");

async function index(request, response) {
  const restaurants = await Restaurant.find();
  response.send(restaurants);
}

async function show(request, response) {
  const { id } = request.params;
  const restaurant = await Restaurant.findById(id);

  if (restaurant) response.send(restaurant);
  else response.status(404).send({ message: "Restaurant Not Found" });
}

async function create(request, response) {
  const { name, logoPath } = request.body;
  // TODO: validate data
  let restaurant = new Restaurant({ name, logoPath });
  restaurant = await restaurant.save();
  response.status(201).send({ message: "Created", restaurant });
}

async function update(request, response) {
  const { id } = request.params;
  const { name, logoPath = "" } = request.body;
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    { name, logoPath },
    { new: true }
  );

  if (restaurant) return response.send({ message: "Updated", restaurant });

  return response.status(404).send({ message: "Restaurant Not Found" });
}

function destroy(request, response) {}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
