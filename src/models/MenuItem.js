const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = { menuItemSchema };
