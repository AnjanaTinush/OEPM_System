const mongoose = require("mongoose");

const driverfeedbackSchema = mongoose.Schema(
  {
    fdrname: {
      type: String,
      require: true,
    },

    fcusname: {
      type: String,
      require: true,
    },

    frating: {
      type: String,
      require: true,
    },

    fcomment: {
      type: String,
      require: true,
    },

  },
  {
    timestamps: true,
  }
);

const driverfeedbackModel = mongoose.model("driverfeedbac   k", driverfeedbackSchema);

module.exports = driverfeedbackModel;
