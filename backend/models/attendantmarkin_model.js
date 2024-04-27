const mongoose = require("mongoose");

const attendanceinSchema = mongoose.Schema(
  {
    userid:{
        type: String,
        require: true,
    },
    
    time: {
      type: String,
      require: true,
    },

    date: {
      type: String,
      require: true,
    },

  },
  {
    timestamps: true,
  }
);

const attendanceinsModel = mongoose.model("AttandanceMark_In", attendanceinSchema);

module.exports = attendanceinsModel;
