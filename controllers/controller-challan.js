const { Challan, Vehicle, User } = require("../models");
const { catchAsync, getViolationFine } = require("../utils");

exports.generateChallan = catchAsync(async (req, res, next) => {
  const { regNo, violations, vehicleType } = req.body;
  let totalAmount = 0,
    vehicle;

  violations.forEach((violation) => {
    totalAmount += getViolationFine(violation);
  });

  vehicle = await Vehicle.findOne({ registrationNo: regNo });
  if (!vehicle) {
    vehicle = await Vehicle.create({ registrationNo: regNo, vehicleType });
  }

  const newChallan = await Challan.create({
    vehicle: vehicle._id,
    pait: false,
    amount: totalAmount,
    violations,
  });

  return res.status(201).json({
    status: "success",
    data: {
      challan: newChallan,
    },
  });
});
