const express = require("express");
const authRouter = express.Router();
const {
  signupUser,
  loginUser,
  checkAuthorization,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers.js");
const userModel = require("../models/userModel");

authRouter.route("/signup").post(signupUser);
authRouter.route("/login").post(loginUser);
authRouter
  .route("/logout")
  .get(checkAuthorization(["admin", "user"]), logoutUser);

authRouter.route("/forgotpassword").post(forgotPassword);
authRouter.route("/resetpassword/:resetToken").post(resetPassword);

module.exports = authRouter;
