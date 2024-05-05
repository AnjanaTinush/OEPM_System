const express = require("express");
const router = express.Router();
const deliveriesModel = require("../models/deliveriesModel");
const driversModel = require("../models/driversModel");

router.post("/newdelivery", async (req, res) => {
  try {
    // Retrieve an available driver from the drivers collection
    const availableDriver = await driversModel.findOne({ availability: "Available" });

    if (!availableDriver) {
      return res.status(404).json({ error: "No available drivers found" });
    }

    const newDelivery = new deliveriesModel({
      orderID: req.body.orderID,
      trackingCode: req.body.trackingCode,
      customerName: req.body.customerName,
      customerPhone: req.body.customerPhone,
      deliveryAddress: req.body.deliveryAddress,
      vehicalNumber: availableDriver.vehicalnum,
      driverName: availableDriver.name, // Assign the name of the available driver
      deliveryStatus: req.body.deliveryStatus
    });

    // Save the new delivery
    await newDelivery.save();
    
    // Update the driver's availability status to "Unavailable" after assigning them to a delivery
    availableDriver.availability = "Unavailable";
    await availableDriver.save();

    res.send("Delivery registered successfully");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//get deliveries
router.get("/getalldeliveries", async (req, res) => {
    try {
      const allDeliveries = await deliveriesModel.find();
      return res.send(allDeliveries);
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

module.exports = router;
