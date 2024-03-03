const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app =express();


const dbcongfig = require('./db')

const usersRoutes = require("./Routes/usersRoute")
const driverRoute = require("./Routes/driverRoute")

app.use(cors()); // Add this line to enable CORS
app.use(express.json())

app.use("/api/users", usersRoutes);
app.use("/api/drivers", driverRoute);


const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port,()=>console.log(`Node server started using nodemon`));


