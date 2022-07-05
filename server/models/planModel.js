const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  name: {
    type: String,
    unique: [true, "plan already exists"],
    required: [true, "plan name required"],
    maxlength: [20, "name exceeds 20 characters"],
  },
  duration: {
    type: Number,
    required: [true, "plan duration required"],
  },
  price: {
    type: Number,
    required: [true, "plan price required"],
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount <= 100;
      },
      "discount % cannot exceed 100",
    ],
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;
