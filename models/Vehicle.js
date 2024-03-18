const { Schema, model } = require("mongoose");

const vehicleSchema = Schema({
  registrationNo: {
    type: String,
    required: [true, "A vehicle must have a registration number"],
    unique: [true, "Vehicle number already in use"],
  },
  vehicleType: {
    type: String,
    enums: ["two-wheeler", "four-wheeler"],
    required: [true, "A vehicle must have a type"],
  },
  owner: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

module.exports = model("Vehicle", vehicleSchema);
