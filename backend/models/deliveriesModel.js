const mongoose = require("mongoose");

const deliveriesSchema = mongoose.Schema(
  {
    cname: {
      type: String,
      require: true,
    },

    cphone: {
      type: String,
      require: true,
    },

    caddress: {
      type: String,
      require: true,
    },

    dname: {
      type: String,
      require: true,
    },

    dvehicalnum: {
      type: String,
      require: true,
    },

    status: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const deliveriesModel = mongoose.model("deliveries", deliveriesSchema);

module.exports = deliveriesModel;
