const express = require("express");
const router = express.Router();
const Leaves = require('../models/leavesModel');

router.post("/leaverequest", async (req, res) => {
    const { userid, fromdate, todate, desription } = req.body; 

    try {
        const newrequest = new Leaves({ 
            userid,
            fromdate,
            todate,
            desription 
        });

        const request = await newrequest.save(); 

        res.send("Requested Successfully!");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

//get all leaves
router.get("/getallleaves",async(req,res)=>{

    try {
        const leaves = await Leaves.find()
        return res.json(leaves);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});


module.exports = router;
