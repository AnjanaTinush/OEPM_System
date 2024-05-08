// routes/shippingDetails.js

const express = require('express');
const router = express.Router();
const ShippingDetails = require('../models/orderdetailsModel');

// Create Shipping Details
router.post('/shippingDetails', async (req, res) => {
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


    

    // Assuming cartItems is an array of items to be saved in the order details
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
    const shippingDetails = new ShippingDetails(req.body);
    await shippingDetails.save();
    res.status(201).send(shippingDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
