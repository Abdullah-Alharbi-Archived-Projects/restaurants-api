const Restaurant = require("../models/Restaurant");
const { MenuItemModel: MenuItem } = require("../models/MenuItem");

async function index(request, response) {
  const restaurant_id = request.app.get("restaurant_id");
  const { menu } = await Restaurant.findById(restaurant_id);

  response.send(menu);
}

async function show(request, response) {
  const { item: id } = request.params;
  const restaurant_id = request.app.get("restaurant_id");
  const { menu } = await Restaurant.findById(restaurant_id);

  const item = menu.id(id);

  if (item) return response.send(item);

  return response.status(404).send({ message: "Item Not Found." });
}

async function create(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  if (restaurant) {
    const { title, description } = request.body;
    let item = new MenuItem({ title, description });
    restaurant.menu.push(item);
    const { menu } = await restaurant.save();

    item = menu[menu.length - 1];
    return response.send({ message: "Created", item });
  }

  return response.send({ message: "Restaurant Not Found" });
}

async function update(request, response) {}

async function destroy(request, response) {}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
