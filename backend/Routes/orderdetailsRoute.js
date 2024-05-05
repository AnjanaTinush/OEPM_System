const express = require("express");
const router = express.Router();
const orderdetailsmodel = require('../models/orderdetailsModel');

// Route for creating a new order
router.post("/neworder", async (req, res) => {
  const neworder = new orderdetailsmodel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    district: req.body.district,
    postalCode: req.body.postalCode,
    itemName: req.body.itemName,
    itemid: req.body.itemid,
    userid: req.body.userid,
    quantity: req.body.quantity,
    price: req.body.price,
    totalprice: req.body.totalprice,
    imageurl: req.body.imageurl
  });
  

  try {
    await neworder.save();
    res.send("Order registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});




//get deliveries
router.get("/getalldeliveries", async (req, res) => {
  try {
    const allDeliveries = await orderdetailsmodel.find();
    return res.send(allDeliveries);
  } catch (error) {
    return res.status(400).json({ error });
  }
});




module.exports = router;
