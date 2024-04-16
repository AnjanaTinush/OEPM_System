const express = require("express");
const router = express.Router();
const drivers = require("../models/driversModel");

router.post("/j_drivers", async (req, res) => {
  const newdriver = new drivers({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    vehicalnum: req.body.vehicalnum,
    availability: req.body.availability,
  });

  try {
    const driver = await newdriver.save();
    res.send("Driver registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});
//get drivers
router.get("/getalldrivers", async (req, res) => {
  try {
    const Drivers = await drivers.find();
    return res.send(Drivers);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//get one driver
router.route("/getdriver/:id").get(async (req, res) => {
  const driverid = req.params.id;

  try {
    const user = await drivers.findById(driverid);
    return res.status(200).json({ status: "Driver is fatched", user });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Error with fatch Driver", message: error });
  }
});

//update driver
router.route("/updatedriver/:id").put(async (req, res) => {
  const driverid = req.params.id;
  const { name, email, phone, vehicalnum, availability } = req.body;

  const updatedriver = {
    name,
    email,
    phone,
    vehicalnum,
    availability,
  };

  try {
    await drivers.findByIdAndUpdate(driverid, updatedriver);
    return res.status(200).json({ status: "Driver updated" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Error with update driver", massage: error });
  }
});

//delete driver
router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  try {
    await drivers.findByIdAndDelete(id);
    return res.status(200).json({ status: "Driver deleted" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Error with delete driver", message: error });
  }
});

module.exports = router;
