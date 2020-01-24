const uploadService = require("../services/imageUpload");

function upload(request, response) {
  if (!request.files)
    return response.status(400).send({ message: "No Files Selected." });

  const result = uploadService(request.files);
  if (result)
    return response.status(201).send({ message: "Uploaded Successfully." });

  return response
    .status(500)
    .send({ message: "Unable to Upload. Internal Server Error." });
}

module.exports = {
  upload
};
