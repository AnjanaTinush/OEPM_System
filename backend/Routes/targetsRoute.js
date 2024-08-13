const express = require("express");
const router = express.Router();
const Target = require("../models/targetsModel");
const Items = require('../models/itemsModel');

router.post("/ta_target", async (req, res) => {
  const newTarget = new Target({
    type: req.body.type,
    quantity: req.body.quantity,
    date: req.body.date,
    status: 'Pending',
  });

  try {
    await newTarget.save();
    res.send("Target registered successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getalltargets", async (req, res) => {
  try {
    const targets = await Target.find();
    res.status(200).json(targets);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Target.findByIdAndDelete(id);
    return res.status(200).json({ status: "Target deleted" });
  } catch (error) {
    return res.status(400).json({ status: "Error with delete target", message: error });
  }
});

router.put('/updatetarget/:id', async (req, res) => {
  const targetId = req.params.id;
  const { type, quantity, date } = req.body;
  const updateTarget = {
    type,
    quantity,
    date
  };

  try {
    await Target.findByIdAndUpdate(targetId, updateTarget);
    return res.status(200).json({ status: "Target updated" });
  } catch (error) {
    return res.status(400).json({ status: "Error with update target", message: error });
  }
});

router.post('/cancelrequest', async (req, res) => {
  const { requestId } = req.body;

  try {
    const target = await Target.findById(requestId);
    target.status = 'Rejected';
    await target.save();
    res.send({ message: 'Target request canceled successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/approverequest', async (req, res) => {
  const { requestId } = req.body;

  try {
    const target = await Target.findById(requestId);
    target.status = 'Approved';
    await target.save();
    res.send({ message: 'Target request approved successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/getleaverequestedbytargetId", async (req, res) => {
  const { _id } = req.body;
  try {
    const target = await Target.find({ _id });
    res.json(target);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/getallitems", async (req, res) => {
  try {
    const items = await Items.find();
    return res.json(items);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.route('/gettarget/:id').get(async (req, res) => {
  const targetId = req.params.id;

  try {
    const target = await Target.findById(targetId);
    return res.status(200).json({ status: "Target is fetched", target });
  } catch (error) {
    return res.status(400).json({ status: "Error with fetching Target", message: error });
  }
});


module.exports = router;
