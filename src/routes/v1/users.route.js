const { Router } = require("express");

const userController = require("../../controllers/users.controller");
const router = Router();

// -------- [ADMIN] --------
// GET /api/v1/users/ -> show all users [ADMIN]
router.get("/", userController.index);

// DELETE /api/v1/users/:id/ -> delete user [ADMIN]
router.delete("/:id/", userController.destroy);

// GET /api/v1/users/:id/ -> show one user [ADMIN, Authenticated]
router.get("/:id/", userController.show);

// PUT /api/v1/users/:id/ -> update user [ADMIN, Authenticated]
router.put("/:id/", userController.update);

// -------- [Guest] --------

// POST /api/v1/users/ -> register new user [Guest]
// TODO: need custom middleware to register token
router.post("/", userController.create);

module.exports = router;
