const express = require("express");
const { checkAuthorization } = require("../controllers/authControllers");
const { createSession } = require("../controllers/paymentController");
const paymentRouter = express.Router();

paymentRouter
  .route("/create_session/:planid")
  .post(checkAuthorization(["admin", "user"]), createSession);
// paymentRouter.get("/create_session", function (req, res) {
//   res.sendFile("D:/Web Dev/Food App/server/test.html");
// });
module.exports = paymentRouter;
