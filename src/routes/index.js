const { Router } = require("express");

const v1 = require("./v1/");
const v2 = require("./v2/");

const router = Router();

// versions goes here
router.use("/v1/", v1);

// google map api + admin api
router.use("/v2/", v2);

module.exports = router;
