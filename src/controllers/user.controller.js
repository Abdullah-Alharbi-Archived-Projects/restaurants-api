const User = require("../models/User");

async function index(request, response) {
  const users = await User.find();
  response.send(users);
}

async function show(request, response) {}

async function create(request, response) {}

async function update(request, response) {}

async function destroy(request, response) {}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
