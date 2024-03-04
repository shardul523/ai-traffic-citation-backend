const { User } = require("../models");
const { catchAsync, filterObj } = require("../utils");

exports.createNewUser = catchAsync(async (req, res) => {
  const allowedFields = [
    "name",
    "email",
    "password",
    "aadhaar",
    "confirmPassword",
  ];
  const userDetails = filterObj(req.body, allowedFields);

  const user = await User.create(userDetails);

  res.status(201).json({
    status: "success",
    data: {
      message: "User created",
      user,
    },
  });
});