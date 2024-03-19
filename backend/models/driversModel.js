const mongoose = require("mongoose");

const driversSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
      require: true,
    },

    vehicalnum: {
      type: String,
      require: true,
    },

    availability: {
      type: String,
      require: true,
    }

  },
  {
    timestamps: true,
  }
);

const driverModel = mongoose.model("drivers", driversSchema);

module.exports = driverModel;
