// orderDetailsRoute.js

const express = require('express');
const router = express.Router();
const orderdetailsmodel = require('../models/orderdetailsModel');

// Route for creating a new order
router.post('/orderDetails', async (req, res) => {
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
      itemid: item._id, // or however you identify items
      userid: 'user123', // example user ID, you should replace this with the actual user ID
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
    console.error('Error during order placement: ', error);
    res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
  }
});

module.exports = router;
