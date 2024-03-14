const mongoose = require("mongoose")

const leaverequestSchema = mongoose.Schema({

    userid : {
        type :String,
        require : true,
    },

    fromdate : {
        type : String,
        require : true
    },

    todate : {
        type : String,
        require : true
    },
    desription : {
        type : String,
        require : true
    },
    status : {
        type : String,
        require : true,
        default : "Pending"
    }
},{
    timestamps :true
})

const leavesModel = mongoose.model('leaves request' , leaverequestSchema)

module.exports=leavesModel
