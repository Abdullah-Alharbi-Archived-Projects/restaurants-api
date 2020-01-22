const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "No Description"
  }
});

const MenuItemModel = model("MenuItem", menuItemSchema);

module.exports = { menuItemSchema, MenuItemModel };
