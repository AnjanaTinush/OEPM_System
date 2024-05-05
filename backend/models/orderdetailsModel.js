const mongoose = require("mongoose");

const orderdetailsSchema = mongoose.Schema({
    firstName: {
        type: String,           
        requred: true,
    },
    lastName: {
        type: String,
        requred: true,
    },
    email: {
        type: String,
        requred: true,
    },
    contactNumber: {
        type: Number,
        requred: true,
    },
    streetAddress: {
        type: String,
        requred: true,
    },
    city: {
        type: String,
        requred: true,
    },
    district: {
        type: String,
        requred: true,
    },
    postalCode: {
        type: String,
        requred: true,
    },
    itemName: {
        type: String,
        requred: true,
    },
    itemid: {
        type: String,
        requred: true,
    },
    userid: {
        type: String,
        requred: true,
    },
    quantity: {
        type: Number,
        requred: true,
    },
    price: {
        type: Number,
        requred: true,
    },
    totalprice: {
        type: Number, 
        requred: true,
    },
    imageurl: []
}, {
    timestamps: true
});

const orderdetailsmodel = mongoose.model('orderdetails', orderdetailsSchema);

module.exports = orderdetailsmodel;
