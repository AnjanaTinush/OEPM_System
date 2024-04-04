const express = require("express")
const router = express.Router();
const Items = require('../models/itemsModel')


//get all items
router.get("/getallitems",async(req,res)=>{

    try {
        const item = await Items.find()
        return res.json(item);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});



module.exports=router;
