const { Schema, model } = require("mongoose");
const { menuItemSchema: MenuItem } = require("./MenuItem");
const { imageSchema: Image } = require("./Image");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logoPath: Image,
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image"
    }
  ],
  menu: [MenuItem],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
