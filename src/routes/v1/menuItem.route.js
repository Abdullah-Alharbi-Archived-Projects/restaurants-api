const { Router } = require("express");

const menuItemsController = require("../../controllers/menuItems.controller");

const $authenticated = require("../../middleware/authenticated");
const $redis = require("../../middleware/redis");

const router = Router();

// GET /api/v1/restaurants/:id/menu/ -> show restaurant menu
router.get("/", menuItemsController.index);

// GET /api/v1/restaurants/:id/menu/:item/ -> show item from menu
router.get("/:item/", menuItemsController.show);

// POST /api/v1/restaurants/:id/menu/ -> add new item inside menu
router.post("/", $authenticated, $redis, menuItemsController.create);

// PUT /api/v1/restaurants/:id/menu/:item/ -> update item
router.put("/:item/", $authenticated, $redis, menuItemsController.update);

// DELETE /api/v1/restaurants/:id/menu/:item/ -> delete item
router.delete("/:item/", $authenticated, $redis, menuItemsController.destroy);

module.exports = router;
