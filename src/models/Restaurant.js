const { Schema, model } = require("mongoose");
const { menuItemSchema: MenuItem } = require("./MenuItem");
const { imageSchema: Image } = require("./Image");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    city: {
      type: String,
      trim: true
    },
    street: {
      type: String,
      trim: true
    }
  },
  menu: [MenuItem],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  logoPath: Image,
  images: [Image]
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
