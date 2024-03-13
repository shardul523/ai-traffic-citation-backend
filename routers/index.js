const { Router } = require("express");
const userRouter = require("./router-user");
const authRouter = require("./router-auth");
const vehicleRouter = require("./router-vehicle");

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/vehicles", vehicleRouter);

module.exports = router;
