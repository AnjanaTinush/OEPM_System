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
    plantType : {
        type: String,
        require :true
    },
    wataringTimesPerDay : {
        type : Number,
        require :true
    }
},{    
    timestamps : true,
})

const tunnelModel = mongoose.model('Tunels',tunnelSchema)

module.exports=tunnelModel;