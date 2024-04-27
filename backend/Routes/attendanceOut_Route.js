const express = require("express")
const router = express.Router();
const attendance = require('../models/arrendancemarkOut_model')

router.post("/mark_out", async (req, res) => {
    const { userid, time, date } = req.body; 

    try {
        const newmarkout = new attendance({ 
            userid,
            time,
            date,
        });

        const request = await newmarkout.save(); 

        res.status(201).json({ message: "Marked in successfully!" });
    } catch (error) {
        console.error("Error marking in:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports=router;