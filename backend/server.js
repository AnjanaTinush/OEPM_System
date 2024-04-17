const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config({ path: "./.env" });

const con = require("./db.js");

const leavesRoutes = require("./Routes/leavesRoutes");

const usersRoutes = require("./Routes/usersRoute");

app.use(cors()); // Add this line to enable CORS
app.use(express.json());

// app.use("/api/users", usersRoutes);

app.use(require("./Routes/financialRoute.js"));

app.use("/api/leaves", leavesRoutes);
//app.use("/api/leaves" , leavesRoutes);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
