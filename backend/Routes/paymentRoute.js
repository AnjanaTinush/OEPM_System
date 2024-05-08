const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');

router.post('/createPayment', async (req, res) => {
    const { cardHolderName, cardNumber, expiryDate, cvv } = req.body;

    if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
        return res.status(400).json({ error: 'Payment failed! Please fill in all fields.' });
    }

    try {
        const newPayment = new Payment({
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv
        });

        const payment = await newPayment.save();
        res.send("Payment received successfully");
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Payment failed!' });
    }
});

module.exports = router;
