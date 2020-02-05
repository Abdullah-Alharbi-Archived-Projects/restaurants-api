const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  name: {
    type: String
  },
  path: {
    type: String,
    required: true
  }
});

const Image = model("Image", imageSchema);

module.exports = { Image, imageSchema };
