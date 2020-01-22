const Restaurant = require("../models/Restaurant");

async function index(request, response) {
  const restaurant_id = request.app.get("restaurant_id");
  const { menu } = await Restaurant.findById(restaurant_id);

  response.send(menu);
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
