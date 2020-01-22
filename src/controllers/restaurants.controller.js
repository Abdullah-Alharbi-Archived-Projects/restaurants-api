const Restaurant = require("../models/Restaurant");

async function index(request, response) {
  const restaurants = await Restaurant.find();
  response.send(restaurants);
}

function show(request, response) {}

function create(request, response) {}

function update(request, response) {}

function destroy(request, response) {}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
