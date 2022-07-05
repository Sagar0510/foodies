const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  name: {
    type: String,
    unique: [true, "plan already exists"],
    required: [true, "please provide plan name"],
    maxlength: [20, "name should not exceed 20 characters"],
  },
  duration: {
    type: Number,
    required: [true, "please provide plan duration"],
  },
  price: {
    type: Number,
    required: [true, "please provide plan price"],
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount <= 100;
      },
      "discount cannot exceed 100%",
    ],
  },
});

const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;
