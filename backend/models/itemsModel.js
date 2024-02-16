const mongoose = require("mongoose")

const itemsSchema = mongoose.Schema({

    name :{
        type : String,
        require : true,
    },
    price :{
          type : Number,
          require : true,
    },
    quentity : {
        type : Number,
        require : true
    },

    imageurl : [],
},{
    timestamps : true,
})

const itemsModel = mongoose.model('items',itemsSchema)

module.exports = itemsModel