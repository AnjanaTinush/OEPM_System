const express = require('express');
const router = express.Router();
const orderdetailsmodel = require('../models/orderdetailsModel');
const deliveriesModel = require('../models/deliveriesModel');

// POST request to create shipping details
router.post('/create', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      district,
      postalCode,
    } = req.body;

    // Create a new order with shipping details
    const order = new orderdetailsmodel({
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      district,
      postalCode,
    });

    

    // Save both the order and the delivery details
    const savedOrder = await order.save();
    

    // Respond with the saved order and delivery details
    res.status(201).json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
