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
    // Location : {
    //     type : String,
    //     require : true
    vehicleNo: {
    type: String, 
    required: false // Not necessarily required for all locations
  },
  capacity: {
    type: Number, 
    required: false // Not necessarily required for all locations
  }

},{
    timestamps : true,
})

const machinesModel = mongoose.model('machine' , machinesSchema)

module.exports = machinesModel