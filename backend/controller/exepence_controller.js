const model = require("../models/Financial model.js/expenceModel");

const typeColors = {
  tunnel_Construction: "#F73905",
  Crop_and_Fertilizers: "#14F705",
  Employee_Salaries: "#0CE2E9",
  Repairs: "#0F33E7",
  Other: "#B90FE7",
};

async function create_expence(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, type, date, amount } = req.body;

  let category = await model.ExpenceCategories.findOne({ type });
  if (!category) {
    try {
      // Get the color based on the type
      const color = typeColors[type];

      // Create the category with the specified color
      category = await new model.ExpenceCategories({ type, color }).save();
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Error while creating category: ${err}` });
    }
  }

  try {
    const create = await new model.Expence({
      name,
      type,
      date,
      amount,
    }).save();

    return res.json(create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating product ${err}` });
  }
}

async function create_expenceCategories(req, res) {
  let { type, color } = req.body;

  try {
    const Create = await new model.ExpenceCategories({
      type,
      color,
    }).save();

    return res.json(Create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating product categories ${err}` });
  }
}

async function get_expenceCategories(req, res) {
  let data = await model.ExpenceCategories.find({});

  let filter = await data.map((v) =>
    Object.assign(
      {},
      {
        type: v.type,
        name: v.name,
        date: v.date,
        color: v.color,
        amount: v.amount,
      }
    )
  );
  return res.json(filter);
}

//get income
async function get_expence(req, res) {
  let data = await model.Expence.find({});
  return res.json(data);
}

//delete income
async function delete_expence(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body not found" });
  }

  try {
    await model.Expence.deleteOne(req.body);
    return res.json("Record Deleted...!");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while deleting Transaction Record" });
  }
}
//get labelsPacking
async function get_ExpenceLabels(req, res) {
  model.Expence.aggregate([
    {
      $lookup: {
        from: "expencecategories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            date: v.date,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup Collection Error");
    });
}

//edit product
async function edit_expence(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Post HTTP Data not provided" });
  }

  const _id = req.params._id;
  const { name, type, date, amount } = req.body.recordId.data;

  try {
    const updatedIncome = await model.Expence.findByIdAndUpdate(
      _id,
      { type, date, amount, name },
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(updatedIncome);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while updating Product: ${err}` });
  }
}

module.exports = {
  create_expence,
  create_expenceCategories,
  get_expence,
  get_expenceCategories,
  get_ExpenceLabels,
  edit_expence,
  delete_expence,
};
