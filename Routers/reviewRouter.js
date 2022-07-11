const express = require("express");
const {
  getAllReviews,
  top3reviews,
  getPlanReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");

const reviewRouter = express.Router();
reviewRouter.route("/all").get(getAllReviews);
reviewRouter.route("/top").get(top3reviews);
reviewRouter.route("/review/:reviewid").put(updateReview).delete(deleteReview);
reviewRouter.route("/:planid").get(getPlanReviews).post(createReview);

module.exports = reviewRouter;
