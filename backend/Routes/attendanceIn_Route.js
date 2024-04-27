const express = require("express");
const router = express.Router();
const attendance = require('../models/attendantmarkin_model');

router.post("/mark_in", async (req, res) => {
    const { userid, time, date } = req.body; 

    try {
        const newmarkin = new attendance({ 
            userid,
            time,
            date,
        });

        const request = await newmarkin.save(); 

        res.status(201).json({ message: "Marked in successfully!" });
    } catch (error) {
        console.error("Error marking in:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
