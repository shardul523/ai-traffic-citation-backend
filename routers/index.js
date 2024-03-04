const { Router } = require("express");
const userRouter = require("./router-user");

const router = Router();

router.use("/users", userRouter);

module.exports = router;
