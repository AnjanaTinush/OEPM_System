const mongoose = require("mongoose")

const machinesSchema = mongoose.Schema({

    name : {
        type : String,
        requre : true
    },
    repairedate : {
        type : String,
        require : true
    },
    quantity :{
        type : String,
        require : true
    },
    Location : {
        type : String,
        require : true
    }
},{
    timestamps : true,
})

const machinesModel = mongoose.model('machines' , machinesSchema)

module.exports = machinesModel