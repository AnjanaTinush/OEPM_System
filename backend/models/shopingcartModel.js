const mongoose = require("mongoose");

const shoppingcartSchema = mongoose.Schema({
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

const shoppingcartmodel = mongoose.model('shoppingCart', shoppingcartSchema);

module.exports = shoppingcartmodel;
