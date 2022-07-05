const dotenv = require("dotenv").config({ path: "config/config.env" });
const express = require("express");
const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
const planRouter = require("./Routers/planRouter");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/database");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/plans", planRouter);

connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
