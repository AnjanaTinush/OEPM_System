const mongoose = require("mongoose")

const machinesSchema = mongoose.Schema({

    name : {
        type : String,
        requre : true
    },
    parts: {
        type: [String], // Define name as an array of strings
        required: true // Corrected typo: "required" instead of "require"
    },
    cost: {
        type: [Number], // Define name as an array of numbers
        required: true
    },
    discription : {
        type : String,
        requre : true
    },
    location: {
        type: String,
        required: true
    },
    lastRepairDate : {
        type : Date,
        require : true
    },
    repairTimePeriod :{
        type : Number,
        require : true
    },
    VehicalNO :{
        type : Number,
        require : true
    },
    Capacity :{
        type : Number,
        require : true
    },
    
},{
    timestamps : true,
})

const MVehicalModel = mongoose.model('vehical' , machinesSchema)

module.exports = MVehicalModel