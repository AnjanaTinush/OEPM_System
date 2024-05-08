const express = require('express');
const router = express.Router();
const ScheduleOrder = require('../models/scheduleorderModel');

// Route to mark an order as "Done"
router.post("/markOrderAsDone/:orderId", async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Find the order by its ID
        const order = await ScheduleOrder.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Update the order status to "Done"
        order.status = "Done";
        await order.save();

        res.status(200).json({ message: "Order marked as done successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to fetch all orders
router.get("/getallorders", async (req, res) => {
    try {
        const orders = await ScheduleOrder.find(); // Fetch all orders from the database
        res.status(200).json(orders); // Return the orders as JSON response
    } catch (error) {
        res.status(500).json({ error: "Internal server error" }); // Return error if something goes wrong
    }
});

router.post("/newScheduleOrder", async (req, res) => {
    // Route implementation

  
    const { userid, itemName, price, quantity, date } = req.body;
  
    try {
      const newOrder = new ScheduleOrder({
        userid,
        itemName,
        price,
        quantity,
        date: new Date(date).toISOString().split('T')[0], // Convert to ISO string and extract date part
      });
      
      const result = await newOrder.save();
      res.send("Order requested successfully!");
    } catch (error) {
      return res.status(400).json({ error });
    }
  });
  
  router.post('/getsheduleorderroute', async (req, res) => {
    const { userid } = req.body; // Use req.body.userid instead of req.params.userid
  
    try {
      const orders = await ScheduleOrder.find({ userid });
      return res.status(200).json({ status: "Schedule orders fetched successfully", orders });
    } catch (error) {
      return res.status(400).json({ status: "Error fetching schedule orders", message: error });
    }
  });
  
  
  
module.exports = router;
