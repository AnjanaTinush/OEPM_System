const express = require('express');
const router = express.Router();
const ScheduleOrder = require('../models/scheduleorderModel');

router.post("/newScheduleOrder",async (req,res)=>{

    const {userid,itemName,price,quantity,date}=req.body;
   
    try{
        const neworder=new ScheduleOrder({
            userid,
            itemName,
            price,
            quantity,
            date            

        });
        const result=await neworder.save() 

        res.send("Order requested successfully!");
    }catch(error){

        return res.status(400).json({error});
    }
})


module.exports = router;
