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
    
 
},{
    // timestamps : true,
})

const targetsModel = mongoose.model('Targets',targetsSchema);

module.exports = targetsModel;