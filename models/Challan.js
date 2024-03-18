const { Schema, model } = require("mongoose");

const challanSchema = Schema(
  {
    vehicle: {
      type: Schema.ObjectId,
      ref: "Vehicle",
      required: [true, "A challan must be specified for the challan"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      required: [true, "A challan must have a specified amount to be paid"],
    },
    violations: {
      type: [String],
    },
    violationsImages: [String],
  },
  { timestamps: true }
);

module.exports = model("Challan", challanSchema);
