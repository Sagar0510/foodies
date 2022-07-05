const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, "review required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "rate point required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: [true, "review must belong to a user"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "planModel",
    required: [true, "review must belong to a plan"],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email", // only name and email from user
  }).populate("plan"); //everything from plan
  next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;
