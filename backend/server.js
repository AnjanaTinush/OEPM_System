const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const dbconfig = require("./db");;

const usersRoutes = require("./Routes/usersRoute");
const tunnelRoutes = require("./Routes/tunnelRoute");
const driverRoute = require("./Routes/driverRoute");
const deliveriesRoute = require("./Routes/deliveriesRoute");
const leavesRoutes = require("./Routes/leavesRoutes");
const customerOrderRoute = require("./Routes/customerOrderRoute");
const shoppingCartRoute = require("./Routes/shoppingCartRoute");

const inventoryRoutes = require("./Routes/InventoryRoute")
const targetRoutes = require("./Routes/targetsRoute")
const machinesRoute = require("./Routes/machineRoute");
const attendanceInRoute=require("./Routes/attendanceIn_Route.js")
const attendanceOutRoute=require("./Routes/attendanceOut_Route.js")
const forgotpasswordRoute=require("./Routes/forgotpasswordRout.js")
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // Add this line to enable CORS
app.use(express.json());
app.use(bodyParser.json());
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
app.use("/api/deliveries", deliveriesRoute);
app.use("/api/machines", machinesRoute);

app.use("/api/leaves", leavesRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/target", targetRoutes)


app.use(require("./Routes/financialRoute.js"));
app.use("/api/leaves", leavesRoutes);
app.use("/api/attendanceIn",attendanceInRoute);
app.use("/api/attendanceOut",attendanceOutRoute);
app.use("/api/resetpassword", forgotpasswordRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/orderDetails", orderDetailsRoute); 
app.use("/api/ScheduleOrder", ScheduleOrderRoute)


const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);



