const express = require("express");
const router = express.Router();
const drivers = require("../models/driversModel");

router.post("/j_drivers", async (req, res) => {
  const newdriver = new drivers({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    vehicalnum: req.body.vehicalnum,
  });

  try {
    const driver = await newdriver.save();
    res.send("Driver registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getalldrivers", async(req, res) => {

    try {
      const Drivers = await drivers.find()
      return res.send(Drivers);
    } catch (error) {
      return res.status(400).json({ error });
    }
    
    });
    


    router.route('/delete/:id').delete(async(req, res)=>{
    
      const id = req.params.id;
    
      try {
        await drivers.findByIdAndDelete(id);
        return res.status(200).json({status: "Driver deleted"});
      } catch (error) {
        return res.status(400).json({status:"Error with delete driver", message: error})
      }
    
    });

module.exports = router;