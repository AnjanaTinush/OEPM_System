const mongoose = require("mongoose");

const driverfeedbackSchema = mongoose.Schema(
  {
    fdrname: {
      type: String,
      required: true,
    },

    frating: {
      type: String,
      required: true,
    },

    fcomment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const driverfeedbackModel = mongoose.model("driverfeedback", driverfeedbackSchema);
module.exports = driverfeedbackModel;
