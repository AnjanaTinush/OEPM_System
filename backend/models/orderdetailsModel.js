const mongoose = require("mongoose");

const orderdetailsSchema = mongoose.Schema({
    orderID: {
        type: String,
        
    },
    firstName: {
        type: String,           
        
    },
    lastName: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    contactNumber: {
        type: Number,
        
    },
    streetAddress: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    district: {
        type: String,
        
    },
    postalCode: {
        type: String,
        
    },
    itemName: {
        type: String,
        
    },
    itemid: {
        type: String,
        
    },
    userid: {
        type: String,
        
    },
    quantity: {
        type: Number,
       
    },
    price: {
        type: Number,
       
    },
    totalprice: {
        type: Number, 
        
    },
    imageurl: []
}, {
    timestamps: true
});

const orderdetailsmodel = mongoose.model('orderdetails', orderdetailsSchema);

module.exports = orderdetailsmodel;
