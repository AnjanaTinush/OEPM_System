const express = require('express');
const router = express.Router();
const orderdetailsmodel = require('../models/orderdetailsModel');

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

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
