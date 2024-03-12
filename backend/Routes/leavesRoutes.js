const express = require("express");
const router = express.Router();
const Leaves = require('../models/leavesModel');

router.post("/leaverequest", async (req, res) => {
    const { userid, formdate, todate, description } = req.body; 

    try {
        const newrequest = new Leaves({ 
            userid,
            formdate,
            todate,
            description 
        });

        const request = await newrequest.save(); 

        res.send("Requested Successfully!");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
