const mongoose = require("mongoose");

const attendanceOutSchema = mongoose.Schema(
  {
    userid:{
      type: String,
      require: true,
  },

    date: {
      type: String,
      require: true,
    },

    time: {
      type: String,
      require: true,
    },

  },
  {
    timestamps: true,
  }
);

const attendanceOutsModel = mongoose.model("AttandanceMark_Out", attendanceOutSchema);

module.exports = attendanceOutsModel;
