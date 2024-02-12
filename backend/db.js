const mongoose=require("mongoose");
 
var mongoURL=`mongodb+srv://anjana2:anjana@cluster0.rg6ebmf.mongodb.net/OEPM_System`;

mongoose.connect(mongoURL,{useUnifiedTopology : true,useNewUrlParser:true});

var connection=mongoose.connection;

connection.on('error',()=>{
    console.log('Mongo DB connection faild')
})

connection.on('connected',()=>{
    console.log('Mongo DB connection successful')
})

module.exports=mongoose;