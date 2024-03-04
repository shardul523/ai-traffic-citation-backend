const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

router.route("/").post(controllers.user.createNewUser);

module.exports = router;
