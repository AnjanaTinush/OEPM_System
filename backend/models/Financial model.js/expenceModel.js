const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//expence category model
const expencecategories_model = new Schema({
  type: { type: String, default: "Anonymous" },
  color: { type: String, default: "#FCBE44" },
});

//expence model
const expence_model = new Schema({
  name: { type: String },
  type: { type: String, default: "Anonymous" },
  amount: { type: Number },
  date: { type: String },
});

const Expence = mongoose.model("exence", expence_model);
const ExpenceCategories = mongoose.model(
  "expencecategories",
  expencecategories_model
);

exports.default = Expence;
exports.default = ExpenceCategories;

module.exports = {
  Expence,
  ExpenceCategories,
};
