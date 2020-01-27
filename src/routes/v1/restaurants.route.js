const { Router } = require("express");
const menuRouter = require("./menuItem.route");
const commentsRouter = require("./comments.route");

const restaurantsController = require("../../controllers/restaurants.controller");

const $authenticated = require("../../middleware/authenticated");
const $redis = require("../../middleware/redis");

const router = Router();

// GET /api/v1/restaurants/ -> show all restaurants
router.get("/", restaurantsController.index);

// GET /api/v1/restaurants/:id -> show one restaurant
router.get("/:id/", restaurantsController.show);

// POST /api/v1/restaurants/ -> create new restaurant
router.post("/", $authenticated, $redis, restaurantsController.create);

// PUT /api/v1/restaurants/ -> update restaurant
router.put("/:id/", $authenticated, $redis, restaurantsController.update);

// DELETE /api/v1/restaurants/ -> delete one restaurant
router.delete("/:id/", $authenticated, $redis, restaurantsController.destroy);

// Menu router

// param method allows you to execute a callback if a certain param is present in the route
router.param("id", (request, response, next) => {
  request.app.set("restaurant_id", request.params.id);
  next();
});

router.use("/:id/menu/", menuRouter);

router.use("/:id/comments/", commentsRouter);

module.exports = router;
