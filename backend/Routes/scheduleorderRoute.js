const express = require('express');
const router = express.Router();
const ScheduleOrder = require('../models/scheduleorderModel');

// Route to mark an order as "Done"
router.post("/markOrderAsDone/:orderId", async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Find the order by its ID
        const order = await ScheduleOrder.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Update the order status to "Done"
        order.status = "Done";
        await order.save();

        res.status(200).json({ message: "Order marked as done successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to fetch all orders
router.get("/getallorders", async (req, res) => {
    try {
        const orders = await ScheduleOrder.find(); // Fetch all orders from the database
        res.status(200).json(orders); // Return the orders as JSON response
    } catch (error) {
        res.status(500).json({ error: "Internal server error" }); // Return error if something goes wrong
    }
});

module.exports = router;
