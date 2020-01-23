const { Schema, model } = require("mongoose");
const { compare, hash, genSalt } = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

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
    lowercase: true,
    unique: true
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
  generate: function() {
    const payload = {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };

    const token = jwt.sign(payload, config.get("jwtSecretKey"), {
      expiresIn: "1d" // 1d = one day
    });

    return token;
  },
  toJSON: function() {
    const user = this.toObject();
    delete user.password;
    return user;
  }
};

function validate(user) {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .lowercase(),
    lastName: Joi.string()
      .required()
      .lowercase(),
    email: Joi.string()
      .email()
      .required()
      .lowercase(),
    password: Joi.string()
      .required()
      .min(6)
      .max(25)
  });

  return schema.validate(user, { stripUnknown: true });
}

const User = model("User", userSchema);

module.exports = { User, validate };
