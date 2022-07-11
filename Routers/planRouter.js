const express = require("express");
const { checkAuthorization } = require("../controllers/authControllers");
const {
  getAllPlans,
  getPlan,
  top3plans,
  createPlan,
  updatePlan,
  deletePlan,
} = require("../controllers/planControllers");
const planRouter = express.Router();

planRouter.route("/").post(checkAuthorization(["admin"]), createPlan);
planRouter.route("/allPlans").get(getAllPlans);
planRouter.route("/top3plans").get(top3plans);
planRouter
  .route("/plan/:planid")
  .get(getPlan)
  .put(checkAuthorization(["admin"]), updatePlan)
  .delete(checkAuthorization(["admin"]), deletePlan);

module.exports = planRouter;
