// checkoutRoute.js

const express = require("express");
const router = express.Router();
const Checkout = require("../models/orderModel");

// Handle checkout request
router.post("/", async (req, res) => {
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

        const newCheckout = new Checkout({
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
        });

        const checkout = await newCheckout.save();

        res.status(201).json({ message: "Checkout successful", checkout });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
