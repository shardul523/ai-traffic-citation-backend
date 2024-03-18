exports.catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

exports.filterObj = function (obj, allowed) {
  const filteredObj = {};

  allowed.forEach((field) => (filteredObj[field] = obj[field]));

  return filteredObj;
};

exports.AppError = require("./AppError");

exports.getViolationFine = (violation) => {
  switch (violation) {
    case "No helmet":
      return 500;
    case "No driving license":
      return 1500;
    case "No insurance papers":
      return 900;
    case "Rash Driving":
      return 5000;
    default:
      return 0;
  }
};
