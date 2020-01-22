const User = require("../models/User");

async function index(request, response) {
  const users = await User.find();
  response.send(users);
}

async function show(request, response) {}

async function create(request, response) {
  const { firstName, lastName, email, password } = request.body;
  let user = new User({ firstName, lastName, email, password });

  await user.encrypt(password);
  user = await user.save();
  user = user.toJSON();

  response.status(201).send({ message: "Created", user });
}

async function update(request, response) {}

async function destroy(request, response) {}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
