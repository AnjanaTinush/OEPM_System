const express = require("express");
const router = express.Router();
const drivers = require("../models/driversModel");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'janithbin@gmail.com',
    pass: 'rpwz gpjd bxzz weua'
  }
});

// Send email notification function
const sendEmailNotification = (driver) => {
  const mailOptions = {
    from: 'janithbin@gmail.com',
    to: 'janithwijethunga5@gmail.com',
    subject: 'New driver added',
    text: `Dear Janith,

A new driver has been added to the FileSystem.

Driver Details:
- Name: ${driver.name}
- Email: ${driver.email}
- Phone Number: ${driver.phone}
- Vehicle Number: ${driver.vehicalnum}
- Availability: ${driver.availability}

Thank you.

Best regards` // Email content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Add a new driver
router.post("/j_drivers", async (req, res) => {
  const { name, email, phone, vehicalnum, availability } = req.body;
  const newDriver = new drivers({
    name,
    email,
    phone,
    vehicalnum,
    availability,
  });

  try {
    const driver = await newDriver.save();
    sendEmailNotification(driver);
    res.send("Driver registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Retrieve all drivers
router.get("/getalldrivers", async (req, res) => {
  try {
    const allDrivers = await drivers.find();
    return res.send(allDrivers);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Retrieve a specific driver
router.get("/getdriver/:id", async (req, res) => {
  const driverId = req.params.id;

  try {
    const driver = await drivers.findById(driverId);
    return res.status(200).json({ status: "Driver fetched", driver });
  } catch (error) {
    return res.status(400).json({ status: "Error fetching driver", message: error });
  }
});

// Update a driver
router.put("/updatedriver/:id", async (req, res) => {
  const driverId = req.params.id;
  const { name, email, phone, vehicalnum, availability } = req.body;

  const updatedDriver = {
    name,
    email,
    phone,
    vehicalnum,
    availability,
  };

  try {
    await drivers.findByIdAndUpdate(driverId, updatedDriver);
    return res.status(200).json({ status: "Driver updated" });
  } catch (error) {
    return res.status(400).json({ status: "Error updating driver", message: error });
  }
});

// Delete a driver
router.delete("/delete/:id", async (req, res) => {
  const driverId = req.params.id;

  try {
    await drivers.findByIdAndDelete(driverId);
    return res.status(200).json({ status: "Driver deleted" });
  } catch (error) {
    return res.status(400).json({ status: "Error deleting driver", message: error });
  }
});

// Driver login
router.post("/dlogin", async (req, res) => {
  const { drivercode } = req.body;
  
  try {
    const driver = await drivers.findOne({ vehicalnum: drivercode });
    if (driver) {
      const temp = {
        name : driver.name,
        _id :  driver._id,
        email : driver.email,
        phone : driver.phone,
        vehicalnum : driver.vehicalnum,
        availability : driver.availability,
      }
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
