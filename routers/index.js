const { Router } = require("express");
const userRouter = require("./router-user");
const authRouter = require("./router-auth");
const challansRouter = require("./router-challans");

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/challans", challansRouter);

module.exports = router;
