exports.catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

exports.filterObj = function (obj, allowed) {
  const filteredObj = {};

  allowed.forEach((field) => (filteredObj[field] = obj[field]));

  return filteredObj;
};

exports.AppError = require("./AppError");
