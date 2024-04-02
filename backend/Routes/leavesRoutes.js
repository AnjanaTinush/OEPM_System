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

//cancell leaves
router.post("/cancelrequest",async (req,res)=>{

    const {requestid }=req.body

    try {
        
        const leaverequest=await Leaves.findOne({_id : requestid})
        leaverequest.status='Dissapproved'
        await leaverequest.save()

        res.send("Leave request dissaproved successfully")

    } catch (error) {
        
        return res.status(400).json({error});
    }
})

//cancell leaves
router.post("/approverequest",async (req,res)=>{

    const {requestid }=req.body

    try {
        
        const leaverequest=await Leaves.findOne({_id : requestid})
        leaverequest.status='Approved'
        await leaverequest.save()

        res.send("Leave request approved successfully")

    } catch (error) {
        
        return res.status(400).json({error});
    }
})

router.post("/getleaverequestedbyuserid", async (req, res) => {
    const { userid } = req.body;
    try {
        const leaves = await Leaves.find({ userid: userid });
        res.json(leaves);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

  

module.exports = router;