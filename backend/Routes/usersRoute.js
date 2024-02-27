const express = require("express")
const router = express.Router();
const Users = require("../models/usersModel")

//sign up
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

//get all users
router.get("/getallusers",async(req,res)=>{

    try {
        const users = await Users.find()
        return res.json(users);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});

//update user
router.route('/updateuser/:id').put(async(req,res)=>{

    const userid = req.params.id;
    const{name,email,role,imageurl} = req.body;

    const updateuser={
        name,
        email,
        role,
        imageurl
    };

    try {
        await Users.findByIdAndUpdate(userid,updateuser);
        return res.status(200).json({status : "User updated"});
    } catch (error) {

        return res.status(400).json({status : "Error with update user",massage : error})
        
    }
})


//delete user
router.route('/delete/:id').delete(async(req,res)=>{

    const id = req.params.id;

    try {
        await Users.findByIdAndDelete(id);
        return res.status(200).json({status : "User deleted"});
    } catch (error) {
        return res.status(400).json({status : "Error with delete user", massage : error})
    }

})


module.exports=router;