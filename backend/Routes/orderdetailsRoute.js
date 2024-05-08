// routes/shippingDetails.js

const express = require('express');
const router = express.Router();
const ShippingDetails = require('../models/orderdetailsModel');

// Create Shipping Details
router.post('/shippingDetails', async (req, res) => {
  try {
    const shippingDetails = new ShippingDetails(req.body);
    await shippingDetails.save();
    res.status(201).send(shippingDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
