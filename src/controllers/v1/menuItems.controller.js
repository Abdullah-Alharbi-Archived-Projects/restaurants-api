const Restaurant = require("../../models/Restaurant");
const { MenuItemModel: MenuItem } = require("../../models/MenuItem");
const uploadService = require("../../services/imageUpload");
const { User } = require("../../models/User");
const { Image } = require("../../models/Image");
const _ = require("lodash");

async function index(request, response) {
  const restaurant_id = request.app.get("restaurant_id");
  const restaurant = await Restaurant.findById(restaurant_id);

  if (restaurant) return response.send(restaurant.menu);

  return response.status(404).send({ message: "Restaurant Not Found." });
}

async function show(request, response) {
  const { item: id } = request.params;
  const restaurant_id = request.app.get("restaurant_id");
  const restaurant = await Restaurant.findById(restaurant_id);

  if (restaurant) {
    const item = restaurant.menu.id(id);

    if (item) return response.send(item);

    return response.status(404).send({ message: "Item Not Found." });
  }

  return response.status(404).send({ message: "Restaurant Not Found." });
}

async function create(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  if (restaurant) {
    const { title, description } = request.body;
    let item = new MenuItem({ title, description });

    if (request.files) {
      const [result, paths] = uploadService(request.files);

      if (result) {
        paths.forEach(path => {
          const image = new Image({ path });
          item.images.push(image);
        });
      }
    }

    restaurant.menu.push(item);
    const { menu } = await restaurant.save();

    item = menu[menu.length - 1];
    return response.status(201).send({ message: "Created", item });
  }

  return response.status(404).send({ message: "Restaurant Not Found" });
}

async function update(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  if (restaurant) {
    const { item: id } = request.params;
    const data = _.pick(request.body, ["title", "description"]);

    const item = restaurant.menu.id(id);

    if (item) {
      const keys = _.keys(data);
      keys.forEach(key => (item[key] = data[key]));
      await restaurant.save();
      return response.send(item);
    }

    return response.status(404).send({ message: "Item Not Found." });
  }

  return response.status(404).send({ message: "Restaurant Not Found" });
}

async function destroy(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  if (restaurant) {
    const { item: id } = request.params;

    const item = restaurant.menu.id(id);

    if (item) {
      item.remove();
      await restaurant.save();
      return response.send({ message: "Deleted", item });
    }

    return response.status(404).send({ message: "Item Not Found." });
  }
  return response.status(404).send({ message: "Restaurant Not Found" });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
