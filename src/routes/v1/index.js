const { Router } = require("express");

const users = require("./users.route");
const restaurants = require("./restaurants.route");

const router = Router();

// resources goes here
router.use("/users/", users);
router.use("/restaurants/", restaurants);

module.exports = router;
