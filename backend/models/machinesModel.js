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
    }
    // repairedate : {
    //     type : String,
    //     require : true
    // },
    // quantity :{
    //     type : String,
    //     require : true
    // },
    // Location : {
    //     type : String,
    //     require : true
    // }
},{
    timestamps : true,
})

const machinesModel = mongoose.model('machine' , machinesSchema)

module.exports = machinesModel