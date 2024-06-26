const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');



const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


const app = express();


const io = require("socket.io")(8081, {
  cors: {
    origin: "http://localhost:3002",
  },
});



const dbconfig = require("./db");;


const usersRoutes = require("./Routes/usersRoute");
const tunnelRoutes = require("./Routes/tunnelRoute");
const driverRoute = require("./Routes/driverRoute");
const deliveriesRoute = require("./Routes/deliveriesRoute");
const leavesRoutes = require("./Routes/leavesRoutes");
const customerOrderRoute = require("./Routes/customerOrderRoute");
const shoppingCartRoute = require("./Routes/shoppingCartRoute");





const driverfeedbackRoute = require("./Routes/driverfeedbackRoute");
const itemhistoryRoutes = require("./Routes/ItemhistoryRoute")
const inventoryRoutes = require("./Routes/InventoryRoute")
const targetRoutes = require("./Routes/targetsRoute")

const machinesRoute = require("./Routes/machineRoute");
const MVehicalRoute = require("./Routes/MVehicalRoute")
const attendanceInRoute=require("./Routes/attendanceIn_Route.js")
const attendanceOutRoute=require("./Routes/attendanceOut_Route.js")
const forgotpasswordRoute=require("./Routes/forgotpasswordRout.js")
const paymentRoute = require("./Routes/paymentRoute");
const orderDetailsRoute = require("./Routes/orderdetailsRoute"); 
const ScheduleOrderRoute = require("./Routes/scheduleorderRoute");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use(cors()); // Add this line to enable CORS
app.use(express.json());
app.use(bodyParser.json());




app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/tunnel", tunnelRoutes);
app.use("/api/customeritems", customerOrderRoute);
app.use("/api/shoppingCart", shoppingCartRoute);
app.use("/api/drivers", driverRoute);
app.use("/api/deliveries", deliveriesRoute);
app.use("/api/machines", machinesRoute);
app.use("/api/driverfeedback", driverfeedbackRoute);

app.use("/api/machines", machinesRoute);
app.use("/api/MVehical", MVehicalRoute);


app.use("/api/leaves", leavesRoutes);
app.use("/api/inventory", inventoryRoutes);



app.use(require("./Routes/financialRoute.js"));
app.use("/api/target", targetRoutes)
app.use("/api/inventory", itemhistoryRoutes);

app.use(require("./Routes/financialRoute.js"));
app.use("/api/leaves", leavesRoutes);
app.use("/api/attendanceIn",attendanceInRoute);
app.use("/api/attendanceOut",attendanceOutRoute);
app.use("/api/resetpassword", forgotpasswordRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/orderDetails", orderDetailsRoute); 
app.use("/api/ScheduleOrder", ScheduleOrderRoute)

const port = process.env.PORT || 5000;

let users = [];
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("addUser", (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit("getUsers", users);
    }
  });

  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, message, conversationId }) => {
      const receiver = users.find((user) => user.userId === receiverId);
      const sender = users.find((user) => user.userId === senderId);
      const user = await Users.findById(senderId);
      console.log("sender :>> ", sender, receiver);
      if (receiver) {
        io.to(receiver.socketId)
          .to(sender.socketId)
          .emit("getMessage", {
            senderId,
            message,
            conversationId,
            receiverId,
            user: { id: user._id, fullName: user.fullName, email: user.email },
          });
      } else {
        io.to(sender.socketId).emit("getMessage", {
          senderId,
          message,
          conversationId,
          receiverId,
          user: { id: user._id, fullName: user.fullName, email: user.email },
        });
      }
    }
  );

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
  // io.emit('getUsers', socket.userId);
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
