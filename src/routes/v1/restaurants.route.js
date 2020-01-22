const { Router } = require("express");

const menuItemController = require("../../controllers/restaurants.controller");
const router = Router();

// GET /api/v1/restaurants/ -> show all restaurants
router.get("/", menuItemController.index);

// GET /api/v1/restaurants/:id -> show one restaurant
router.get("/:id/", menuItemController.show);

// POST /api/v1/restaurants/ -> create new restaurant
router.post("/", menuItemController.create);

// PUT /api/v1/restaurants/ -> update restaurant
router.put("/:id/", menuItemController.update);

// DELETE /api/v1/restaurants/ -> delete one restaurant
router.delete("/:id/", menuItemController.destroy);

module.exports = router;
