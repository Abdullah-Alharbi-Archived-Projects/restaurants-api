const uploadService = require("../services/imageUpload");
const deleteService = require("../services/imageDelete");
const { Image } = require("../models/Image");
const Restaurant = require("../models/Restaurant");

async function upload(request, response) {
  if (!request.files)
    return response.status(400).send({ message: "No Files Selected." });

  const { resource, target } = request.params;

  let images = request.files["images[]"];

  if (!images)
    return response.status(400).send({ message: "No Files Selected." });

  if (typeof images === "object") images = [images];

  switch (resource) {
    case "restaurants":
      const restaurant = await Restaurant.findById(target);

      if (restaurant) {
        const [result, paths] = uploadService(images);
        if (result) {
          paths.forEach(path => {
            const image = new Image(path);
            restaurant.images.push(image);
          });

          const updatedRestaurant = await restaurant.save();
          return response.send({
            message: "Uploaded Successfully",
            updatedRestaurant
          });
        }

        return response.status(400).send({ message: "Bad Request." });
      }

      return response.status(404).send({ message: `Restaurant Not Found.` });

    default:
      return response
        .status(404)
        .send({ message: `Resource: ${resource} Not Found.` });
  }
}

async function destroy(request, response) {
  const { resource, target } = request.params;

  const { items } = request.body;

  if (!items)
    return response.status(400).send({ message: "items is required." });

  switch (resource) {
    case "restaurants":
      const restaurant = await Restaurant.findById(target);

      if (restaurant) {
        items.forEach(async item => {
          const image = await restaurant.images.id(item);

          if (image) {
            await deleteService(await image.remove());
          }
        });
        await restaurant.save();
        return response.send({ message: "Images Deleted!" });
      }

      return response.status(404).send({ message: "Restaurant Not Found." });

    default:
      return response
        .status(404)
        .send({ message: `Resource: ${resource} Not Found.` });
  }
}

module.exports = {
  upload,
  destroy
};
