const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// categories => field => ['type', 'color']
const categories_model = new Schema({
  type: { type: String, default: "Anonymous" },
  color: { type: String, default: "#FCBE44" },
});

// transactions  => field => ['name', 'type', 'amount', 'date']
const income_model = new Schema({
  name: { type: String },
  type: { type: String, default: "Anonymous" },
  amount: { type: Number },
  date: { type: String },
});

const Income = mongoose.model("income", income_model);
const Categories = mongoose.model("categories", categories_model);

exports.default = Income;
exports.default = Categories;

module.exports = {
  Categories,
  Income,
};
