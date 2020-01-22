const { Router } = require("express");

const { authenticate, logout } = require("../../controllers/auth.controller");

const router = Router();

router.post("/", authenticate);

router.post("/logout", logout);

module.exports = router;
