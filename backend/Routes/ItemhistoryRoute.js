const express = require("express");
const router = express.Router();
const History = require("../models/itemhistory");

// Route to add history data
router.post("/addhistory", async (req, res) => {
  try {
    const { actionType, changedItem } = req.body;
    const newHistory = new History({
      actionType,
      changedItem
    });
    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all history data
router.get("/getallhistory", async (req, res) => {
  try {
    const allHistory = await History.find();
    res.status(200).json(allHistory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
