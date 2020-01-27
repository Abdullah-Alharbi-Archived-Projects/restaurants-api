const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

const Image = model("Image", imageSchema);

module.exports = { Image, imageSchema };
