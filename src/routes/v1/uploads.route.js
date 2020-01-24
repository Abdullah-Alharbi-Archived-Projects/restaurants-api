const { Router } = require("express");

const uploadsController = require("../../controllers/uploads.controller");

const $authenticated = require("../../middleware/authenticated");
const $redis = require("../../middleware/redis");

const router = Router();

router.post("/", $authenticated, $redis, uploadsController.upload);

module.exports = router;
