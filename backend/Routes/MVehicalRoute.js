const express = require("express");
const router = express.Router();
const MVehicalModel = require('../models/MVehicalModel');
const Target = require('../models/targetsModel');
const nodemailer = require('nodemailer');


router.post("/sendEmail", async (req, res) => {
  const { selectedTargetType, selectedVehicle, capacityPercentage } = req.body;

  try {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'piyumalipalihawadana@gmail.com',
        pass: 'umkq cmft mtpv emns',
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'piyumalipalihawadana@gmail.com',
      to: 'induwarapalihe@gmail.com',
      subject: "Capacity Calculation Results",
      html: `
        <p>Selected Target Type: ${selectedTargetType}</p>
        <p>Selected Vehicle: ${selectedVehicle}</p>
        <p>Capacity Percentage: ${capacityPercentage}%</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});


router.get("/approvedTargets", async (req, res) => {
  try {
    const approvedTargets = await Target.find({ status: "Approved" }, { type: 1, quantity: 1, _id: 0 });
    res.status(200).json(approvedTargets);
  } catch (error) {
    console.error("Error fetching approved targets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/getalltargets", async (req, res) => {
  try {
    const targets = await Target.find();
    res.status(200).json(targets);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});










// Endpoint to fetch target quantity and type

// router.get("/targetInfo", async (req, res) => {
//   try {
//       // Query the latest approved target (you may need to adjust the query based on your specific requirements)
//       const latestApprovedTarget = await Target.findOne({ status: "Approved" });

//       if (!latestApprovedTarget) {
//           return res.status(404).json({ message: "No approved targets found" });
//       }

//       // Extract relevant information (quantity and type) from the latest approved target
//       const targetInfo = {
//           type: latestApprovedTarget.type,
//           quantity: latestApprovedTarget.quantity
//       };

//       // Return the extracted target information
//       return res.status(200).json(targetInfo);
//   } catch (error) {
//     console.error("Error fetching target information:", error);
//     return res.status(500).json({ message: "Internal server error" });
      
//   }
// });



module.exports = router;
