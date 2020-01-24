const { Router } = require("express");

const users = require("./users.route");
const restaurants = require("./restaurants.route");
const auth = require("./auth.route");
const uploads = require("./uploads.route");

const router = Router();

// resources goes here
router.use("/users/", users);
router.use("/restaurants/", restaurants);
router.use("/auth/", auth);
router.use("/uploads/", uploads);

module.exports = router;
