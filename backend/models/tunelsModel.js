const mongoose = require("mongoose")

const tunnelSchema = mongoose.Schema({

    temperature :{
        type : Number,
        require :true
    },

    humidity : {
        type :Number,
        require:true 
    },
    capacity : {
        type : Number,
        require: true
    },
    currentCapacity : {
        type : Number,
        require: true
    },
    plantType : {
        type: String,
        require :true
    },
    wateringTimesPerDay : {
        type : Number,
        require :true
    },
    fertizingTimesPerWeek : {
        type : Number,
        require :true
    }
},{    
    timestamps : true,
})

const tunnelModel = mongoose.model('Tunnels',tunnelSchema)

module.exports=tunnelModel;