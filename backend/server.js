const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const dbconfig = require('./db');

const usersRoutes = require("./Routes/usersRoute");
const tunnelRoutes = require("./Routes/tunnelRoute");
const driverRoute = require("./Routes/driverRoute");
const leavesRoutes = require("./Routes/leavesRoutes");
const customerOrderRoute = require("./Routes/customerOrderRoute");
const shoppingCartRoute = require("./Routes/shoppingCartRoute");
const paymentRoute = require("./Routes/paymentRoute");
const orderDetailsRoute = require("./Routes/orderdetailsRoute"); 
const ScheduleOrderRoute = require("./Routes/scheduleorderRoute");


app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/tunnel", tunnelRoutes);
app.use("/api/customeritems", customerOrderRoute);
app.use("/api/shoppingCart", shoppingCartRoute);
app.use("/api/drivers", driverRoute);
app.use("/api/leaves", leavesRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/orderDetails", orderDetailsRoute); 
app.use("/api/ScheduleOrder", ScheduleOrderRoute)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server started using nodemon`));
