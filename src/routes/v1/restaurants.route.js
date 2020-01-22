const { Router } = require("express");

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

module.exports = router;
