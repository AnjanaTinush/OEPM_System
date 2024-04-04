const express = require("express");
const router = express.Router();
const tunnel = require("../models/tunelsModel");

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

module.exports = router;
