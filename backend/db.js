const mongoose = require("mongoose");

var mongoURL = `mongodb+srv://admin:admin123@cluster0.tlf413c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB connection faild");
});

connection.on("connected", () => {
  console.log("Mongo DB connection successful....!");
});

module.exports = mongoose;
