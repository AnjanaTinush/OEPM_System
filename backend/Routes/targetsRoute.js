const express = require("express");
const router = express.Router();
const target = require("../models/targetsModel");


router.post("/ta_target", async (req, res) => {
  const newtarget = new target({
    type: req.body.type,
    quantity: req.body.quantity,
    date: req.body.date,
    
  });

  try {
    const target = await newtarget.save();
    res.send("Target registerd Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getalltargets", async(req, res) => {

  try {
    const targets = await target.find()
    res.send(targets)
  } catch (error) {
    return res.status(400).json({ error });
  }
  
  });
  
  router.route('/delete/:id').delete(async(req, res)=>{
  
    const id = req.params.id;
  
    try {
      await target.findByIdAndDelete(id);
      return res.status(200).json({status: "Target deleted"});
    } catch (error) {
      return res.status(400).json({status:"Error with delete tatget", message: error})
    }
  
  });

  router.route('/updatetarget/:id').put(async(req,res)=>{

    const targetid = req.params.id;
    const{type,quantity,date} = req.body;
  
    const updatetarget={
      type,
      quantity,
      date
    };
  
    try {
        await target.findByIdAndUpdate(targetid,updatetarget);
        return res.status(200).json({status : "Target updated"});
    } catch (error) {
  
        return res.status(400).json({status : "Error with update target",massage : error})
        
    }
  });

  router.route('/gettarget/:id').post(async(req,res) => {

    const targetid = req.params.id;
  
    try {
      const Target = await target.findById(targetid);
      return res.status(200).json({status : "Target is fetched",Target});
    } catch (error) {
      return res.status(400).json({status : "Error with fetch Target", message : error});
    }
  });

module.exports = router;