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
        date
      });
      const result = await newOrder.save();
      res.send("Order requested successfully!");
    } catch (error) {
      return res.status(400).json({ error });
    }
  });
  


module.exports = router;
