const { Router } = require("express");

const uploadsController = require("../../controllers/v1/uploads.controller");

const $authenticated = require("../../middleware/authenticated");
const $redis = require("../../middleware/redis");

const router = Router();

router.post(
  "/:resource/:target/",
  $authenticated,
  $redis,
  uploadsController.upload
);

router.delete("/:resource/:target/", uploadsController.destroy);

module.exports = router;
