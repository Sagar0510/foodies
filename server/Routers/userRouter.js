const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers.js");

const { checkAuthorization } = require("../controllers/authControllers");

userRouter.route("/").get(checkAuthorization(["admin"]), getAllUsers);
userRouter
  .route("/profile/:userid")
  .get(checkAuthorization(["admin", "user"]), getUser);

userRouter
  .route("/:userid")
  .put(checkAuthorization(["admin", "user"]), updateUser)
  .delete(checkAuthorization(["admin", "user"]), deleteUser);

module.exports = userRouter;
