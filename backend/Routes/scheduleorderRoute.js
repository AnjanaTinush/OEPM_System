const express = require('express');
const router = express.Router();
const ScheduleOrder = require('../models/scheduleorderModel');

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
