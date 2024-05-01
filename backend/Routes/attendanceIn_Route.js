const express = require("express");
const router = express.Router();
const attendance = require('../models/attendantmarkin_model');

router.post("/mark_in", async (req, res) => {
    const { userid, intime, date } = req.body; 

    try {
        const newmarkin = new attendance({ 
            userid,
            intime,
            date,
        });

        const request = await newmarkin.save(); 

        res.status(201).json({ message: "Marked in successfully!" });
    } catch (error) {
        console.error("Error marking in:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/getalllmarkIn",async(req,res)=>{

    try {
        const markIn  = await attendance.find()
        return res.json(markIn);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});

module.exports = router;
