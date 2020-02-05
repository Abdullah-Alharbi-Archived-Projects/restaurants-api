const { Comment } = require("../../models/Comment");
const Restaurant = require("../../models/Restaurant");
const _ = require("lodash");

async function index(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  // need middleware to check for this
  if (!restaurant)
    return response.status(404).send({ message: "Restaurant Not Found." });

  const comments = restaurant.comments;

  response.send(comments);
}

async function show(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  if (!restaurant)
    return response.status(404).send({ message: "Restaurant Not Found." });

  const { comment: id } = request.params;
  const comment = restaurant.comments.id(id);

  if (!comment)
    return response.status(404).send({ message: "Comment Not Found." });

  response.send(comment);
}

async function create(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  if (!restaurant)
    return response.status(404).send({ message: "Restaurant Not Found." });

  const comments = restaurant.comments;

  // TODO: need to validate comment body
  const { description } = request.body;

  const comment = new Comment({ description });
  comment.user = request.user._id;
  comments.push(comment);

  await restaurant.save();

  response.send({ message: "Created", comment });
}

async function update(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  if (!restaurant)
    return response.status(404).send({ message: "Restaurant Not Found." });

  const comments = restaurant.comments;
  const { comment: id } = request.params;

  const comment = comments.id(id);

  if (!comment)
    return response.status(404).send({ message: "Comment Not Found." });

  const data = _.pick(request.body, ["description"]);
  const keys = _.keys(data);
  keys.forEach(key => (comment[key] = data[key]));

  await restaurant.save();
  response.send(comment);
}

async function destroy(request, response) {
  const restaurant_id = request.app.get("restaurant_id");

  const restaurant = await Restaurant.findById(restaurant_id);

  if (!restaurant)
    return response.status(404).send({ message: "Restaurant Not Found." });

  const comments = restaurant.comments;
  const { comment: id } = request.params;

  const comment = comments.id(id);

  if (!comment)
    return response.status(404).send({ message: "Comment Not Found." });

  comment.remove();

  await restaurant.save();

  response.send({ message: "Deleted", comment });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
