const express = require("express")
const router = express.Router();
const attendance = require('../models/arrendancemarkOut_model')

router.post("/mark_out", async (req, res) => {
    const { userid, outtime, date } = req.body; 

    try {
        const newmarkout = new attendance({ 
            userid,
            outtime,
            date,
        });

        const request = await newmarkout.save(); 

        res.status(201).json({ message: "Marked in successfully!" });
    } catch (error) {
        console.error("Error marking in:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/getalllmarkOut",async(req,res)=>{

    try {
        const markOut  = await attendance.find()
        return res.json(markOut);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});

module.exports=router;