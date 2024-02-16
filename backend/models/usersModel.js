const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({

    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    role :{
        type : String,
        default : 'user'
    },

    imageurl :[],
},{
    timestamps : true,
})

const userModel = mongoose.model("users",usersSchema)

module.exports =userModel