const { Router } = require("express");

const {
  authenticate,
  logout
} = require("../../controllers/v1/auth.controller");
const $authenticated = require("../../middleware/authenticated");
const $redis = require("../../middleware/redis");

const router = Router();

router.post("/", authenticate);

router.delete("/", $authenticated, $redis, logout);

module.exports = router;
