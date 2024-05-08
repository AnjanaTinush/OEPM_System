const express = require("express");
const router = express.Router();
const driverfeedbackModel = require("../models/driverfeedbackModel");

// New feedback
router.post("/newfeedback", async (req, res) => {
  const { fdrname, frating, fcomment } = req.body;

  const newFeedback = new driverfeedbackModel({
    fdrname: fdrname,
    frating: frating,
    fcomment: fcomment,
  });

  try {
    await newFeedback.save();
    res.send("Feedback submitted successfully");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//get feedbacks
router.get("/getallfeedbacks", async (req, res) => {
    try {
      const feedbacks = await driverfeedbackModel.find();
      return res.send(feedbacks);
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

module.exports = router;
