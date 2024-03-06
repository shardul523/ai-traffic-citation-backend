const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

// router.route("/").post(controllers.user.createNewUser);

router
  .route("/me")
  .get(controllers.auth.protect, controllers.user.getCurrentUserDetails);

module.exports = router;
