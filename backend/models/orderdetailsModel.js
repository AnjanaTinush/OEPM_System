// models/ShippingDetails.js

const mongoose = require('mongoose');

const shippingDetailsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contactNumber: String,
  streetAddress: String,
  city: String,
  district: String,
  postalCode: String,
});

const ShippingDetails = mongoose.model('ShippingDetails', shippingDetailsSchema);

module.exports = ShippingDetails;
