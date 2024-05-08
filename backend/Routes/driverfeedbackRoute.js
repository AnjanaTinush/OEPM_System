const express = require("express");
const router = express.Router();
const driverfeedbackModel = require("../models/driverfeedbackModel");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, 
  secure: false, 
  auth: {
    user: 'janithbin@gmail.com', 
    pass: 'cxlq xsvw xeix bpqd' 
  }
});



// Send email notification function
const sendEmailNotification = (feedback) => {
  const mailOptions = {
    from: 'janithbin@gmail.com',
    to: 'janithwijethunga5@gmail.com',
    subject: 'New feedback added',
    text: `New feedback added for driver ${feedback.fdrname}.\nRating: ${feedback.frating}\nComment: ${feedback.fcomment}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};



// New feedback
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
    sendEmailNotification(newFeedback); // Pass newFeedback object here
    res.send("Feedback submitted successfully");
    
  } catch (error) {
    return res.status(400).json({ error });
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
