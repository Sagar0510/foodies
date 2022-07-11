const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailValidator = require("email-validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name required"],
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already registered"],
    validate: [
      function () {
        return emailValidator.validate(this.email);
      },
      "invalid email",
    ],
  },
  password: {
    type: String,
    required: [true, "password required"],
    minLength: [8, "password length smaller than 8"],
  },
  role: {
    type: String,
    enum: ["admin", "user", "owner"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: undefined,
  },
  resetToken: String,
});

userSchema.pre("save", async function () {
  // let salt = await bcrypt.genSalt();
  // let hashedPassword = await bcrypt.hash(this.password, salt);
  // this.password = hashedPassword;
});

userSchema.methods.createResetToken = function () {
  let token = crypto.randomBytes(32).toString("hex");
  this.resetToken = token;
  return token;
};

userSchema.methods.changePassword = function (password) {
  this.password = password;
  this.resetToken = undefined;
};

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
