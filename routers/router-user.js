const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

// router.route("/").post(controllers.user.createNewUser);
router.use(controllers.auth.protect);

router.route("/me").get(controllers.user.getCurrentUserDetails);

module.exports = router;
