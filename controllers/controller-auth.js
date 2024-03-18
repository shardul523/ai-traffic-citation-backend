const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { catchAsync, AppError, filterObj } = require("../utils");

const SECRET_KEY = process.env.JWT_SECRET;

const signToken = (payload) =>
  jwt.sign(payload, SECRET_KEY, { expiresIn: "30m" });

const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

const createAndSignToken = (user, res) => {
  const token = signToken({ id: user.id });

  res.cookie("jwt", token, { maxAge: 30 * 60 * 1000, httpOnly: true });

  res.status(200).json({
    status: "success",
    data: { token },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError("Please provide email and password to login", 400)
    );

  // Check if user with the given credentials exist
  const user = await User.findOne({ email });

  if (!user || !(await user.checkPassword(password)))
    return next(new AppError("Invalid credentials", 402));

  createAndSignToken(user, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  const allowedFields = [
    "name",
    "email",
    "password",
    "aadhaar",
    "confirmPassword",
  ];
  const userDetails = filterObj(req.body, allowedFields);

  const newUser = await User.create(userDetails);

  createAndSignToken(newUser, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.header("Authorization") &&
    req.header("Authorization").startsWith("Bearer")
  )
    token = req.header("Authorization").split(" ")[1];
  else
    return next(
      new AppError("You are not authenticated to access this route", 402)
    );

  const { id } = verifyToken(token);

  const user = await User.findById(id);

  if (!user) return next(new AppError("No such user exists", 400));

  req.user = user;

  next();
});

exports.isAuthorized =
  (...authorizedRoles) =>
  (req, res, next) => {
    if (authorizedRoles.find(req.user.role)) next();
    else next(new AppError("You are not authorized to access this route", 402));
  };
