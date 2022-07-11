const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { sendMail } = require("../utility/nodemailer");

module.exports.signupUser = async function signupUser(req, res) {
  if (req.body.password != req.body.confirmPassword) {
    return res.json({
      error: "passwords do not match",
    });
  }
  try {
    let user = req.body;
    let data = await userModel.create(user);
    res.json(data);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports.loginUser = async function loginUser(req, res) {
  try {
    let data = req.body;
    let user = await userModel.findOne({ email: data.email });
    if (user) {
      if (user.password == data.password) {
        let uid = user["_id"];
        let JWT = jwt.sign({ payload: uid }, process.env.JWT_KEY);
        res.cookie("login", JWT, {
          // maxAge: 1000 * 60,
          secure: false,
          httpOnly: true,
        });
        return res.json({
          success: "user logged in",
          user: user.email,
        });
      } else {
        return res.json({
          error: "wrong credentials",
        });
      }
    } else {
      return res.json({
        error: "user not found",
      });
    }
  } catch (err) {
    res.json({
      error: error.message,
    });
  }
};

module.exports.logoutUser = function logoutUser(req, res) {
  res.cookie("login", "", { maxAge: 1 });
  return res.json({
    success: "logged out",
  });
};

module.exports.forgotPassword = async function forgotPassword(req, res) {
  let { email } = req.body;
  try {
    let user = await userModel.findOne({ email: email });
    if (user) {
      let resetToken = user.createResetToken();
      let resetLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      //mail this link
      let data = {
        email: user.email,
        resetLink: resetLink,
      };
      sendMail(data);
      await user.save();
      return res.json({
        message: "sent reset password link to email",
        link: resetLink,
      });
    } else {
      return res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports.resetPassword = async function resetPassword(req, res) {
  if (req.body.password != req.body.confirmPassword) {
    return res.json({
      error: "passwords do not match",
    });
  }

  let token = req.params.resetToken;
  let password = req.body.password;

  try {
    let user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.changePassword(password);
      await user.save();
      res.json({
        success: "password updated",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports.checkAuthorization = function checkAuthorization(allowedRoles) {
  return async function (req, res, next) {
    if (req.cookies.login) {
      let payload = jwt.verify(req.cookies.login, process.env.JWT_KEY);
      if (payload) {
        try {
          let user = await userModel.findById(payload.payload);
          req.userId = user._id;
          req.userRole = user.role;
          if (allowedRoles.includes(user.role)) {
            next();
          } else {
            return res.json({
              message: "ACCESS DENIED",
            });
          }
        } catch (error) {
          return res.json(error);
        }
      } else {
        return res.json({
          message: "ACCESS DENIED",
        });
      }
    } else {
      return res.json({
        message: "ACCESS DENIED",
      });
    }
  };
};
