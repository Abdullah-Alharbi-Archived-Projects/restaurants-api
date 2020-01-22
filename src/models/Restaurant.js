const { Schema, model } = require("mongoose");

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
      ref: "Images"
    }
  ],
  menu: [
    {
      type: Schema.Types.ObjectId,
      ref: "MenuItems"
    }
  ]
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
