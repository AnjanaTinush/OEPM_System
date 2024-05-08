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

//approve leaves
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

// Get counts of different statuses
router.get("/statuscounts", async (req, res) => {
    try {
        const pendingCount = await Leaves.countDocuments({ status: 'Pending' });
        const approvedCount = await Leaves.countDocuments({ status: 'Approved' });
        const disapprovedCount = await Leaves.countDocuments({ status: 'Dissapproved' });

        const totalCount = pendingCount + approvedCount + disapprovedCount;

        const pendingPercentage = (pendingCount / totalCount) * 100;
        const approvedPercentage = (approvedCount / totalCount) * 100;
        const disapprovedPercentage = (disapprovedCount / totalCount) * 100;

        res.json({
            pending: {
                count: pendingCount,
                percentage: pendingPercentage.toFixed(2),
            },
            approved: {
                count: approvedCount,
                percentage: approvedPercentage.toFixed(2),
            },
            disapproved: {
                count: disapprovedCount,
                percentage: disapprovedPercentage.toFixed(2),
            },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Backend API - Get counts of pending and approved requests for a specific user
router.get("/leaverequestcounts/:userid", async (req, res) => {
    const { userid } = req.params;

    try {
        const pendingCount = await Leaves.countDocuments({ userid, status: 'Pending' });
        const approvedCount = await Leaves.countDocuments({ userid, status: 'Approved' });
        const dissapprovedCount = await Leaves.countDocuments({ userid, status: 'Dissapproved' });


        res.json({
            userid,
            pending: pendingCount,
            approved: approvedCount,
            dissapproved:dissapprovedCount
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


  

module.exports = router;