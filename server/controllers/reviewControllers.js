const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    let reviews = await reviewModel.find();
    if (reviews) {
      return res.json(reviews);
    } else {
      return res.json({
        message: "reviews not found",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
module.exports.top3reviews = async function top3reviews(req, res) {
  try {
    let reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (reviews) {
      return res.json(reviews);
    } else {
      return res.json({
        message: "reviews not found",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  let planId = req.params.planid;
  try {
    let reviews = await reviewModel.find();
    reviews = reviews.filter((review) => review.plan._id == planId);
    if (reviews.length) {
      return res.json(reviews);
    } else {
      return res.json({
        message: "reviews not found",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "reviews not found",
      });
    }
    res.json({
      error: error.message,
    });
  }
};
module.exports.createReview = async function createReview(req, res) {
  try {
    let planId = req.params.planid;
    let plan = await planModel.findById(planId);
    let totalPoints = plan.rating * plan.reviewsCount + req.body.rating;

    plan.reviewsCount += 1;
    plan.rating = totalPoints / plan.reviewsCount;
    await plan.save();

    let review = await reviewModel.create(req.body);
    return res.json(review);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "plan not found",
      });
    }
    res.json({ error: error.message });
  }
};
module.exports.updateReview = async function updateReview(req, res) {
  try {
    let reviewId = req.params.reviewid;
    let review = await reviewModel.findById(reviewId);

    if (review) {
      let plan = await planModel.findById(review.plan._id);
      if (plan) {
        let update = req.body;
        for (let key in update) {
          if (key == "rating") {
            let totalPoints = plan.rating * plan.reviewsCount;
            totalPoints -= review.rating;
            totalPoints += update[key];
            plan.rating = totalPoints / plan.reviewsCount;
          }
          review[key] = update[key];
        }
        await plan.save();
        await review.save();
        res.json(review);
      } else {
        return res.json({
          message: "plan for the review no longer exists",
        });
      }
    } else {
      return res.json({
        message: "review not found",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "review not found",
      });
    }
    res.json({ error: error.message });
  }
};
module.exports.deleteReview = async function deleteReview(req, res) {
  let reviewId = req.params.reviewid;
  try {
    let review = await reviewModel.findByIdAndDelete(reviewId);
    if (review) {
      let plan = await planModel.findById(review.plan._id);
      if (plan) {
        let totalPoints = plan.rating * plan.reviewsCount;
        totalPoints -= review.rating;
        plan.reviewsCount -= 1;
        plan.rating = totalPoints / plan.reviewsCount;
        await plan.save();
        return res.json(review);
      } else {
        return res.json({
          message: "plan for the review no longer exists",
        });
      }
    } else {
      return res.json({
        message: "review does not exist",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "review not found",
      });
    }
    res.json({ error: error.message });
  }
};
