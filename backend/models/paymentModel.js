const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    cardHolderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String, // Changed from Number to String to preserve leading zeros
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String, // Changed from Number to String
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
