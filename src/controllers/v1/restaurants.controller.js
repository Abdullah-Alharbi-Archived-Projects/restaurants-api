const Restaurant = require("../../models/Restaurant");

async function index(request, response) {
  const restaurants = await Restaurant.find().populate("user");

  response.send(restaurants);
}

async function show(request, response) {
  const { id } = request.params;
  const restaurant = await Restaurant.findById(id).populate("user");

  if (restaurant) return response.send(restaurant);

  return response.status(404).send({ message: "Restaurant Not Found" });
}

async function create(request, response) {
  const { name, address } = request.body;
  // TODO: validate data

  let restaurant = new Restaurant({ name, address });
  restaurant.user = request.user._id;
  restaurant = (await restaurant.save()).populate("user");
  response.status(201).send({ message: "Created", restaurant });
}

async function update(request, response) {
  const { id } = request.params;
  const { name, address } = request.body;
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    { name, address },
    { new: true, omitUndefined: true }
  );

  if (restaurant) {
    await restaurant.save();
    return response.send({ message: "Updated", restaurant });
  }

  return response.status(404).send({ message: "Restaurant Not Found" });
}

async function destroy(request, response) {
  const { id } = request.params;
  const restaurant = await Restaurant.findByIdAndDelete(id);

  if (restaurant) return response.send({ message: "Deleted", restaurant });

  return response.status(404).send({ message: "Restaurant Not Found" });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
