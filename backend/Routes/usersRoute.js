const express = require("express");
const router = express.Router();
const Users = require("../models/usersModel");

//sign up
router.post("/register", async (req, res) => {
  const newuser = new Users({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    imageurl:req.body.imageurl,
    
  });

  try {
    const userExsist = await Users.findOne({ email: req.body.email });
    if (userExsist) {
      return res
        .status(200)
        .json({ massage: "This email already ", sussess: false });
    }
    const user = await newuser.save();
    res.send({ massage: "User Registered Successfully!", success: true });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email, password });

    if (user) {
      // Creating a simplified user object to send in the response
      const temp = {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        password: user.password,
        imageurl: user.imageurl,
        _id: user._id,
        userId: user._id,
        email: user.email,
        id: user._id,
      };

      return res
        .status(200)
        .json({ success: true, user: temp, message: "User login successful" });
    } else {
      // If no user is found with the provided credentials
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    // If an error occurs during the database query
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
});

//get all users
router.get("/getallusers", async (req, res) => {
  try {
    const users = await Users.find();
    return res.json(users);
  } catch (error) {
    return res.status(400).json({ massage: error });
  }
});

//getuser
router.route("/getuser/:id").post(async (req, res) => {
  const userid = req.params.id;

  try {
    const user = await Users.findById(userid);
    return res.status(200).json({ status: "Employee is fatched", user });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Error with fatch employee", message: error });
  }
});

//update user
router.route("/updateuser/:id").put(async (req, res) => {
  const userid = req.params.id;
  const { fullName, email, phone, role, imageurl, password } = req.body;

  const updateuser = {
    fullName,
    email,
    phone,
    role,
    imageurl,
    password,
  };

  try {
    await Users.findByIdAndUpdate(userid, updateuser);
    return res.status(200).json({ status: "User updated" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Error with update user", massage: error });
  }
});

//delete user
router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  try {
    await Users.findByIdAndDelete(id);
    return res.status(200).json({ status: "User deleted" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Error with delete user", massage: error });
  }
});

module.exports = router;
