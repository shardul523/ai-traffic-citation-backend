const router = require("express").Router();
const controller = require("../controllers");

router.route("/").post(controller.challan.generateChallan);

module.exports = router;
