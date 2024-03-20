const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
<<<<<<< Updated upstream
const app = express();
require("dotenv").config({ path: "./.env" });
const dbconfig = require("./db");
=======
<<<<<<< HEAD
const app = express();
require("dotenv").config({ path: "./.env" });
const dbconfig = require("./db");
=======
const app =express(); 


const dbconfig = require('./db');

const usersRoutes = require("./Routes/usersRoute")
const leavesRoutes = require("./Routes/leavesRoutes")
>>>>>>> f5f19ff435f0c6dc2e0b2b9450024ff81e5eb930
>>>>>>> Stashed changes

const usersRoutes = require("./Routes/usersRoute");

app.use(cors()); // Add this line to enable CORS
app.use(express.json());

app.use("/api/users", usersRoutes);
<<<<<<< Updated upstream
app.use(require("./Routes/financialRoute.js"));

const port = process.env.PORT || 5000;
=======
<<<<<<< HEAD
app.use(require("./Routes/financialRoute.js"));

const port = process.env.PORT || 5000;
=======
app.use("/api/leaves",leavesRoutes);
//app.use("/api/leaves" , leavesRoutes);

const port =process.env.PORT || 5000;
>>>>>>> f5f19ff435f0c6dc2e0b2b9450024ff81e5eb930
>>>>>>> Stashed changes

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
