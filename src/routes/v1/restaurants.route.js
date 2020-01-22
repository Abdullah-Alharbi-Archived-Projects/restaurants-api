const { Router } = require("express");
const menuRouter = require("./menuItem.route");

const restaurantsController = require("../../controllers/restaurants.controller");
const router = Router();

// GET /api/v1/restaurants/ -> show all restaurants
router.get("/", restaurantsController.index);

// GET /api/v1/restaurants/:id -> show one restaurant
router.get("/:id/", restaurantsController.show);

// POST /api/v1/restaurants/ -> create new restaurant
router.post("/", restaurantsController.create);

// PUT /api/v1/restaurants/ -> update restaurant
router.put("/:id/", restaurantsController.update);

// DELETE /api/v1/restaurants/ -> delete one restaurant
router.delete("/:id/", restaurantsController.destroy);

// Menu router

// param method allows you to execute a callback if a certain param is present in the route
router.param("id", (request, response, next) => {
  request.app.set("restaurant_id", request.params.id);
  next();
});

router.use("/:id/menu/", menuRouter);

module.exports = router;
