const express = require("express");
const router = express.Router();
const orderdetailsmodel = require('../models/orderdetailsModel');

// Route for creating a new order
router.post("/neworder", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      streetAddress,
      city,
      district,
      postalCode,
      total,
      cartItems
    } = req.body;

    

    // Map cartItems to orderItems
    const orderItems = cartItems.map(item => ({
      itemName: item.itemName,
      itemid: item._id, 
      userid: 'user123', 
      quantity: item.quantity,
      price: item.price,
      totalprice: item.price * item.quantity,
      imageurl: item.imageurl
    }));

    // Create a new order
    const newOrder = new orderdetailsmodel({
      firstName,
      lastName,
      email,
      contactNumber,
      streetAddress,
      city,
      district,
      postalCode,
      cartItems: orderItems,
      total
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    // Differentiate between validation errors and other errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ success: false, message: 'Validation failed', errors: validationErrors });
    } else {
      console.error('Error during order placement: ', error);
      res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
    }
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
