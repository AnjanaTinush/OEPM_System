const express = require("express");
const router = express.Router();
const tunnel = require("../models/tunelsModel");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Your SMTP host
  port: 587, // Your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'tunnelmanage@gmail.com', // Your email address
    pass: 'gitm czlm lchp geno' // Your email password or app-specific password
  }
});


router.post("/t_register", async (req, res) => {
  const newtunnel = new tunnel({
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    capacity: req.body.capacity,
    plantType: req.body.plantType,
  });

  try {
    const tunnel = await newtunnel.save();
    res.send("Tunnel registerd Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


router.get("/getalltunnels", async(req, res) => {

try {
  const tunnels = await tunnel.find()
  res.send(tunnels)
} catch (error) {
  return res.status(400).json({ error });
}

});

router.route('/delete/:id').delete(async(req, res)=>{

  const id = req.params.id;

  try {
    await tunnel.findByIdAndDelete(id);
    return res.status(200).json({status: "Tunnel deleted"});
  } catch (error) {
    return res.status(400).json({status:"Error with delete tunnel", message: error})
  }

});

router.route('/updatetunnel/:id').put(async(req,res)=>{

  const tunnelid = req.params.id;
  const{temperature,humidity,capacity,plantType} = req.body;

  const updatetunnel={
    temperature,
    humidity,
    capacity,
    plantType
  };

  try {
      await tunnel.findByIdAndUpdate(tunnelid,updatetunnel);
      return res.status(200).json({status : "Tunnel updated"});
  } catch (error) {

      return res.status(400).json({status : "Error with update tunnel",massage : error})
      
  }
});

router.route('/gettunnel/:id').post(async(req,res) => {

  const tunnelid = req.params.id;

  try {
    const Tunnel = await tunnel.findById(tunnelid);
    return res.status(200).json({status : "Tunnel is fetched",Tunnel});
  } catch (error) {
    return res.status(400).json({status : "Error with fetch tunnel", message : error});
  }
});

router.get("/getpresentcapacities", async (req, res) => {
  try {
    const currentCapacity = await tunnel.aggregate([
      {
        $group: {
          _id: "$plantType",
          totalCapacity: { $sum: "$currentCapacity" }
        }
      }
    ]);

    const presentCapacities = {};
    currentCapacity.forEach(currentCapacity => {
      presentCapacities[currentCapacity._id] = currentCapacity.totalCapacity;
    });

    res.json(presentCapacities);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getplanttypecounts", async (req, res) => {
  try {
    const counts = await tunnel.aggregate([
      {
        $group: {
          _id: "$plantType",
          count: { $sum: 1 } // Count occurrences of each plant type
        }
      }
    ]);

    const plantTypeCounts = {};
    counts.forEach(item => {
      plantTypeCounts[item._id] = item.count;
    });

    res.json(plantTypeCounts);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Add a route to update the current capacity of a tunnel
router.put("/updatecurrentcapacity/:id", async (req, res) => {
  const { id } = req.params;
  const { currentCapacity } = req.body;

  try {
    const existingTunnel = await tunnel.findById(id);
    if (!existingTunnel) {
      return res.status(404).json({ message: "Tunnel not found" });
    }

    const newCapacity = parseInt(currentCapacity);
    if (isNaN(newCapacity) || newCapacity < 0) {
      return res.status(400).json({ message: "Invalid current capacity value" });
    }

    const emailContent = `
    Dear Machinery Manager,
    
    Plant Type: ${existingTunnel.plantType}
    Temperature: ${existingTunnel.temperature}°C
    Humidity: ${existingTunnel.humidity}%
    Maximum Capacity: ${existingTunnel.capacity}
    Current Capacity: ${newCapacity}
    -------------------------------------
    The capacity of tunnel ${existingTunnel.plantType} has been updated.
  `;

    // Send email notification to user
    const mailOptions = {
      from: 'tunnelmanage@gmail.com', // Sender's email address
      to: 'sulanapeiris@gmail.com', // Recipient's email address
      subject: 'Tunnel Capacity Update', // Email subject
      text: emailContent // Email content
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    if (newCapacity > existingTunnel.capacity) {
      return res.status(400).json({ message: "Current capacity exceeds maximum capacity" });
    }

    // Update current capacity and save the tunnel
    existingTunnel.currentCapacity = newCapacity;
    await existingTunnel.save();

    return res.status(200).json({ message: "Current capacity updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating current capacity", error });
  }
});

module.exports = router;
