const mongoose = require("mongoose");

const targetsSchema = mongoose.Schema({

    
    
    type :{
        type : String,
        require : true,
    },
    
    quantity : {
        type : Number,
        require : true
    },
    date : {
        type : String,
        require : true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
    
 
},{
    timestamps : true,
})

const targetsModel = mongoose.model('Targets',targetsSchema);

module.exports = targetsModel;