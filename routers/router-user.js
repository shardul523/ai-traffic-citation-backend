const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

router
  .route("/me")
  .get(controllers.auth.protect, controllers.user.getCurrentUserDetails);

router
  .route("/")
  .post(
    controllers.auth.protect,
    controllers.auth.isAuthorized("admin", "officer"),
    controllers.user.createNewUser
  );

module.exports = router;
