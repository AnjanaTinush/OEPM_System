const mongoose = require("mongoose");

const orderdetailsSchema = mongoose.Schema({
    
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
    phoneNumber: {
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
    
}, {
    timestamps: true
});

const orderdetailsmodel = mongoose.model('orderdetails', orderdetailsSchema);

module.exports = orderdetailsmodel;
