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
      driverName: availableDriver.name, 
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

   //get one delivery
   router.route("/getdelivery/:name").get(async (req, res) => {
    const deliveryName = req.params.name; // Corrected to req.params.name
  
    try {
      const delivery = await deliveriesModel.findOne({ driverName: deliveryName }); // Find by driverName
      if (!delivery) {
        return res.status(404).json({ status: "Delivery not found" });
      }
      return res.status(200).json({ status: "Delivery is fetched", delivery });
    } catch (error) {
      return res.status(400).json({ status: "Error with fetching Delivery", message: error });
    }
  });

  // Update delivery status
  router.put("/updatedeliverystatus/:name", async (req, res) => {
    const deliveryName = req.params.name; // Corrected to req.params.name
    const { deliveryStatus } = req.body; // Corrected to match the frontend

    try {
        // Find the delivery by name and update its status
        const updatedDelivery = await deliveriesModel.findOneAndUpdate(
            { driverName: deliveryName },
            { deliveryStatus: deliveryStatus }, // Corrected to match the frontend
            { new: true }
        );

        if (!updatedDelivery) {
            return res.status(404).json({ error: "Delivery not found" });
        }

        return res.status(200).json({ message: "Delivery status updated successfully", updatedDelivery });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

  

  
  module.exports = router;
  