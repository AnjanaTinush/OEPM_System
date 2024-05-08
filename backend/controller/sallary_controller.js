const model = require("../models/Financial model.js/sallaryModel");

async function create_sallary(req, res) {
  let { empno, empname, department, amount, date } = req.body;

  try {
    const Create = await new model.Sallary({
      empno,
      empname,
      department,
      amount,
      date,
    }).save();

    return res.json(Create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating  Sallary ${err}` });
  }
  
}

async function get_Sallary(req, res) {
  let data = await model.Sallary.find({});
  return res.json(data);
}

module.exports = {
  create_sallary,
  get_Sallary,
};
