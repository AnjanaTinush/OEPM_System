const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const deliveriesSchema = mongoose.Schema(
  {
    trackingCode: {
      type: String,
      unique: true,
      default: uuidv4, // Generates a unique tracking code using UUID v4
    },
    customerName: {
      type: String,
    },
    customerPhone: {
      type: String,
    },
    deliveryAddress: {
      type: String,
    },
    vehicalNumber: {
      type: String,
    },
    driverName: {
      type: String,
    },
    deliveryStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const deliveriesModel = mongoose.model("deliveries", deliveriesSchema);

module.exports = deliveriesModel;
