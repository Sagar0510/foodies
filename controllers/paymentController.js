const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const userModel = require("../models/userModel");
const planModel = require("../models/planModel");

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.userId;
    let planId = req.params.planid;
    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: planId,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          name: plan.name,
          description: plan.duration,
          amount: plan.price,
          currency: "inr",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/profile/${userId}`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile/${userId}`,
    });
    res.json({
      status: "success",
      session,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
