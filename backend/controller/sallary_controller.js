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

async function delete_Sallary(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body not found" });
  }

  try {
    await model.Sallary.deleteOne(req.body);
    return res.json("Record Deleted...!");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while deleting Transaction Record" });
  }
}

async function edit_Sallary(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Post HTTP Data not provided" });
  }

  const _id = req.params._id;
  const {  empno,
    empname,
    department,
    amount,
    date, } = req.body.recordId.data;

  try {
    const updatedIncome = await model.Sallary.findByIdAndUpdate(
      _id,
      {  empno,
        empname,
        department,
        amount,
        date, },
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Sallary not found" });
    }

    return res.json(updatedIncome);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while updating Product: ${err}` });
  }
}

module.exports = {
  create_sallary,
  get_Sallary,
  delete_Sallary,
  edit_Sallary
};
