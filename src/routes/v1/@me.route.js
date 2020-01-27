const { Router } = require("express");

const meController = require("../../controllers/@me.controller");

const $authenticated = require("../../middleware/authenticated");
const $redis = require("../../middleware/redis");

const router = Router();

router.get("/", $authenticated, $redis, meController.index);

module.exports = router;
