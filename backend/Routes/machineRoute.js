const express = require("express");
const router = express.Router();
const machine = require('../models/machinesModel');

//add machine
router.post("/add", async (req, res) => {
    const { name, cost, parts, discription,location,lastRepairDate,repairTimePeriod,vehicleNo,
        capacity } = req.body;

// Check if cost is a number
if (isNaN(cost)) {
    return res.status(400).json({ error: "Cost must be a number" });
}

    try {
        const newMachine = new machine({
            name: name,
            cost: cost,
            parts: parts,
            discription: discription,
            location: location,
            repairTimePeriod:repairTimePeriod,
            lastRepairDate:lastRepairDate,
            ...(location === "Vehicle" && { vehicleNo, capacity })

        });

        const savedMachine = await newMachine.save();
        res.send("Machine added successfully");
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Get all machines
router.get("/getallmachines", async (req, res) => {
    try {
        const machines = await machine.find();
        return res.json(machines);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Get a single machine
router.get("/getmachine/:id", async (req, res) => {
    const mid = req.params.id;

    try {
        const machineItem = await machine.findById(mid);
        return res.status(200).json({ status: "Machine fetched successfully", machine: machineItem });
    } catch (error) {
        return res.status(400).json({ status: "Error fetching machine", message: error.message });
    }
});

// Delete machine
router.delete("/deletemachine/:id", async (req, res) => {
    try {
        await machine.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Machine deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Update machine
router.put('/updateMachine/:id', async (req, res) => {
    const machineId = req.params.id;
    const { name, cost, parts, discription,location,lastRepairDate,repairTimePeriod } = req.body;

    const updateMachine = {
        name,
        cost,
        parts,
        discription,
        location,
        lastRepairDate,
        repairTimePeriod,
    };

    try {
        await machine.findByIdAndUpdate(machineId, updateMachine);
        return res.status(200).json({ status: "Machine updated successfully" });
    } catch (error) {
        return res.status(400).json({ status: "Error updating machine", message: error.message });
    }
});

// Get machine by location
// router.get("/getmachinebylocation/:location", async (req, res) => {
//     const location = req.params.location;

//     try {
//         const machine = await machine.find({ location: location });
//         return res.status(200).json(machine);
//     } catch (error) {
//         return res.status(400).json({ status: "Error fetching machines by location", message: error.message });
//     }
// });


module.exports = router;
