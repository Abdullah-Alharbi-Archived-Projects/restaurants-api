const uploadService = require("../services/imageUpload");
const { User } = require("../models/User");
const { Image } = require("../models/Image");

async function upload(request, response) {
  if (!request.files)
    return response.status(400).send({ message: "No Files Selected." });

  const [result, paths] = uploadService(request.files);
  if (result) {
    const user = await User.findById(request.user._id);
    paths.forEach(path => {
      const image = new Image({ path });
      user.images.push(image);
    });
    await user.save();
    return response.status(201).send({ message: "Uploaded Successfully." });
  }

  return response
    .status(500)
    .send({ message: "Unable to Upload. Internal Server Error." });
}

module.exports = {
  upload
};
