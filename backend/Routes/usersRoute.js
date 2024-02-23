const express = require("express")
const router = express.Router();
const Users = require("../models/usersModel")

router.post("/register" , async(req,res)=>{

    const newuser = new Users({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,

    })

    try {
        const user = await newuser.save();
        res.send("User Register Successfully!");

    } catch (error) {
        return res.status(400).json({error});
    }
})

module.exports=router;