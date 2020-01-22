const { Schema, model } = require("mongoose");
const { menuItemSchema: MenuItem } = require("./MenuItem");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  logoPath: {
    type: String
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
