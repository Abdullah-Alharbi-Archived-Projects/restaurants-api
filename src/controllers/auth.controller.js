const { User } = require("../models/User");
const Joi = require("@hapi/joi");

function validate(user) {
  const schema = Joi.object({
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

async function authenticate(request, response) {
  const { email, password } = request.body;
  const { error } = validate({ email, password });

  if (error)
    return response
      .status(401)
      .send({ message: "Bad Request", details: error.details });

  const user = await User.findOne({ email });

  if (!user)
    return response
      .status(401)
      .send({ message: "the email or password is uncorrect." });

  const result = await user.compare(password);

  if (!result)
    return response
      .status(401)
      .send({ message: "the email or password is uncorrect." });

  // user data is correct generate token

  const token = user.generate();

  // save token in redis
  const redis = request.app.get("redis");

  await redis.set(user._id, token);

  return response.send({ message: "Generated Successfully", token });
}

async function logout(request, response) {
  const user = request.user;
  const reply = await request.redis.del(user._id);

  if (reply) {
    return response.send({ message: "Signed out Successfully." });
  }

  response.status(401).send({ message: "Unauthorized." });
}

module.exports = { authenticate, logout };
