const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  path: {
    type: String,
    required: true
  }
  // TODO: add user BackRef
});

const Image = model("Image", imageSchema);

module.exports = Image;
