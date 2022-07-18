if (process.env.NODE_ENV !== "PRODUCTION") {
  const dotenv = require("dotenv").config({ path: "config/config.env" });
}
const express = require("express");
const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");
const paymentRouter = require("./Routers/paymentRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDatabase = require("./config/database");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("public/build"));
app.get("/", function test(req, res) {
  res.json({
    success: "working",
  });
});
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/plans", planRouter);
app.use("/reviews", reviewRouter);
app.use("/payment", paymentRouter);

connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
