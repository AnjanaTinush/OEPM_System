const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sallary_model = new Schema({
  empno: { type: String },
  empname: { type: String },
  department: { type: String },
  amount: { type: Number },
  date: { type: String },
});

const Sallary = mongoose.model("sallary", sallary_model);

exports.default = Sallary;

module.exports = {
  Sallary,
};
