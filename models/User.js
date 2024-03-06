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
    minLength: 12,
    maxLength: 12,
    match: /^\d+$/,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: [true, "Email already in use!"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: 6,
    maxLength: 14,
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
  role: {
    type: String,
    default: "user",
    enums: ["user", "officer", "admin"],
  },
});

userSchema.methods.checkPassword = async function (candidatePassword) {
  const isCorrect = await bcrypt.compare(candidatePassword, this.password);
  return isCorrect;
};

userSchema.index({ email: 1 });

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
