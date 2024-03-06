const { Router } = require("express");
const userRouter = require("./router-user");
const authRouter = require("./router-auth");

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

module.exports = router;
