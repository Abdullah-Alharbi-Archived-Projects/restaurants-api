const { Router } = require("express");

const uploadsController = require("../../controllers/uploads.controller");
const router = Router();

router.post("/", uploadsController.upload);

module.exports = router;
