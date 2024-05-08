const mongoose = require('mongoose');

const ScheduleOrderSchema =  mongoose.Schema({

    userid:{

        type:String,
        require :true,

    },

    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {  
        type: String, 
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
});

const scheduleorder = mongoose.model('scheduleorder', ScheduleOrderSchema);

module.exports = scheduleorder;
