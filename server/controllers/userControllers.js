const express = require("express");
const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  let userId = req.params.userid;
  try {
    let data = await userModel.findById(userId);
    if (data) {
      return res.json(data);
    } else {
      return res.json({
        error: "user not found",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "user not found",
      });
    }
    res.json(error);
  }
};

module.exports.getAllUsers = async function getAllUsers(req, res) {
  try {
    let data = await userModel.find();
    return res.json(data);
  } catch (error) {
    res.json(error);
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let userId = req.params.userid;
    let user = await userModel.findById(userId);
    let dataToBeUpdated = req.body;
    if (user) {
      for (let key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
      }
      let data = await userModel.findByIdAndUpdate(userId, user);
      // await user.save();
      res.json(data);
    } else {
      res.json({
        error: "user not found",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "user not found",
      });
    }
    res.json(err);
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  let userId = req.params.userid;
  try {
    let data = await userModel.findByIdAndDelete(userId);
    if(data){
    return res.json(data);
    }else{
      return res.json({
        error: "user not found",
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.json({
        error: "user not found",
      });
    }
    res.json(error);
  }
};
