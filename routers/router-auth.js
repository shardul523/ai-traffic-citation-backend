const router = require("express").Router();
const controllers = require("../controllers");

router.post("/signup", controllers.auth.signup);

router.post("/login", controllers.auth.login);

module.exports = router;
