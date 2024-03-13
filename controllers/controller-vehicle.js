const { Vehicle } = require("../models");
const { catchAsync } = require("../utils");

exports.registerNewVehicle = catchAsync(async (req, res) => {
  const { registrationNo, vehicleType, model } = req.body;

  const userId = req.user.id;

  const newVehicle = await Vehicle.create({
    registrationNo,
    vehicleType,
    model,
    owner: userId,
  });

  res.status(201).json({
    status: "success",
    data: {
      vehicle: newVehicle,
    },
  });
});
