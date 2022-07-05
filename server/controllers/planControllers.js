const express = require("express");
const planModel = require("../models/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let allPlans = await planModel.find();
    return res.json(allPlans);
  } catch (error) {
    res.json(error);
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  let planId = req.params.planid;
  try {
    let plan = await planModel.findById(planId);
    if (plan) {
      return res.json(plan);
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "plan not found",
      });
    }
    res.json(error);
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  let plan = req.body;
  try {
    let data = await planModel.create(plan);
    return res.json(data);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "user not found",
      });
    }
    res.json(error);
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  let planId = req.params.planid;
  let update = req.body;
  try {
    let plan = await planModel.findById(planId);
    if (plan) {
      for (let key in update) {
        plan[key] = update[key];
      }
      await plan.save();
      res.json(plan);
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "plan not found",
      });
    }
    res.json(error);
  }
};
module.exports.deletePlan = async function deletePlan(req, res) {
  let planId = req.params.planid;
  try {
    let plan = await planModel.findByIdAndDelete(planId);
    if (plan) {
      res.json(plan);
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "plan not found",
      });
    }
    res.json(error);
  }
};
