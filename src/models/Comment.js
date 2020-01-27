const { Schema, model } = require("mongoose");

const commentsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Comment = model("Comment", commentsSchema);

module.exports = {
  commentsSchema,
  Comment
};
