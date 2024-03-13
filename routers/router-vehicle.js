const router = require("express").Router();
const controllers = require("../controllers");

router.use(controllers.auth.protect);

router.route("/").post(controllers.vehicle.registerNewVehicle);

module.exports = router;
