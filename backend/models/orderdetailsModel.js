const mongoose = require("mongoose");

const orderdetailsSchema = mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,           
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number, 
        required: true
    },
    imageurl: []
}, {
    timestamps: true
});

const orderdetailsmodel = mongoose.model('orderdetails', orderdetailsSchema);

module.exports = orderdetailsmodel;
