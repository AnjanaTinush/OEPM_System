const mongoose = require("mongoose")

const leaverequestSchema = mongoose.Schema({

    userid : {
        type :String,
        require : true,
    },

    formdate : {
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

const leavesMosdel = mongoose.model('leave_request' , leaverequestSchema)

module.exports=leavesMosdel