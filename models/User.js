const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  aadhaar: {
    type: String,
    required: [true, "A user must have an Aadhar Id"],
    unique: [true, "Aadhar already in use!"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: [true, "Email already in use!"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (pass) {
        return this.password === pass;
      },
      message: "The two passwords do not match!",
    },
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt
    .hash(this.password, 12)
    .then((pass) => {
      this.password = pass;
      next();
    })
    .catch((err) => next(err));

  this.confirmPassword = undefined;
});

module.exports = model("User", userSchema);
