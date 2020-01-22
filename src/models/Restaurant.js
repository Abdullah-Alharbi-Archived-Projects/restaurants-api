const { Schema, model } = require("mongoose");
const { menuItemSchema: MenuItem } = require("./MenuItem");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logoPath: {
    type: String,
    default: "",
    trim: true
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image"
    }
  ],
  menu: [MenuItem]
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
