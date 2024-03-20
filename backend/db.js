const mongoose = require("mongoose");

var mongoURL = `mongodb+srv://sithum:sithum1234@cluster0.kcwj3im.mongodb.net/`;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB connection faild");
});

connection.on("connected", () => {
  console.log("Mongo DB connection successful....!");
});

module.exports = mongoose;
