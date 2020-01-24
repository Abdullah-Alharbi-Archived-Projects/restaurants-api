const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  path: {
    type: String
  }
});

const Image = model("Image", imageSchema);

module.exports = { Image, imageSchema };
