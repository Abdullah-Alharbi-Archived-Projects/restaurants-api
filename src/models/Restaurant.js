const { Schema, model } = require("mongoose");
const { menuItemSchema: MenuItem } = require("./MenuItem");
const { imageSchema: Image } = require("./Image");
const { commentsSchema: Comment } = require("./Comment");

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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  logoPath: Image,
  menu: [MenuItem],
  comments: [Comment],
  images: [Image]
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
