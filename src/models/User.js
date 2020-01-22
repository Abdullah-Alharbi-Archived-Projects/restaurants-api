const { Schema, model } = require("mongoose");
const { compare, hash, genSalt } = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String
  }
});

userSchema.methods = {
  compare: async function(password) {
    const result = await compare(password, this.password);
    return result;
  },
  encrypt: async function(password) {
    const salt = await genSalt(10);
    const encryptedPassword = await hash(password, salt);
    this.password = encryptedPassword;
    return encryptedPassword;
  },
  toJSON: function() {
    const user = this.toObject();
    delete user.password;
    return user;
  }
};

const User = model("User", userSchema);

module.exports = User;
