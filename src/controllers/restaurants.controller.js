const Restaurant = require("../models/Restaurant");
const uploadService = require("../services/imageUpload");
const { User } = require("../models/User");
const { Image } = require("../models/Image");
const _ = require("lodash");

async function index(request, response) {
  const restaurants = await Restaurant.find().populate("user");
  response.send(restaurants);
}

async function show(request, response) {
  const { id } = request.params;
  const restaurant = await Restaurant.findById(id);

  if (restaurant) return response.send(restaurant);

  return response.status(404).send({ message: "Restaurant Not Found" });
}

async function create(request, response) {
  const { name, address } = request.body;
  // TODO: validate data

  let restaurant = new Restaurant({ name, address });
  if (request.files) {
    const { logoPath } = request.files;
    let [result, paths] = uploadService([logoPath]);
    if (result) restaurant.logoPath = new Image({ path: paths[0] });

    const files = _.omit(request.files, ["logoPath"]);
    [result, paths] = uploadService(files);

    if (result) {
      const user = await User.findById(request.user._id);
      paths.forEach(path => {
        const image = new Image({ path });
        user.images.push(image);
        restaurant.images.push(image);
      });
      await user.save();
    }
  }
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

  if (restaurant) return response.send({ message: "Updated", restaurant });

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
