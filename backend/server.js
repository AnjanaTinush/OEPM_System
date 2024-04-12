const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const dbcongfig = require("./db");

const usersRoutes = require("./Routes/usersRoute");
const tunnelRoutes = require("./Routes/tunnelRoute");
const driverRoute = require("./Routes/driverRoute");
const deliveriesRoute = require("./Routes/deliveriesRoute");
const leavesRoutes = require("./Routes/leavesRoutes");
const customerOrderRoute = require("./Routes/customerOrderRoute");
const shoppingCartRoute = require("./Routes/shoppingCartRoute");

app.use(cors()); // Add this line to enable CORS
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/tunnel", tunnelRoutes);
app.use("/api/customeritems", customerOrderRoute);
app.use("/api/shoppingCart", shoppingCartRoute);
app.use("/api/drivers", driverRoute);
app.use("/api/deliveries", deliveriesRoute);

const port = process.env.PORT || 5000;
app.use("/api/leaves", leavesRoutes);

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log(`Node server started using nodemon`));
