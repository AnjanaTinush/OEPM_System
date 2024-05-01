const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3002",
  },
});

const dbcongfig = require("./db");

const usersRoutes = require("./Routes/usersRoute");
const tunnelRoutes = require("./Routes/tunnelRoute");
const driverRoute = require("./Routes/driverRoute");
const deliveriesRoute = require("./Routes/deliveriesRoute");
const leavesRoutes = require("./Routes/leavesRoutes");
const customerOrderRoute = require("./Routes/customerOrderRoute");
const shoppingCartRoute = require("./Routes/shoppingCartRoute");

const inventoryRoutes = require("./Routes/InventoryRoute");
const targetRoutes = require("./Routes/targetsRoute");
const machinesRoute = require("./Routes/machineRoute");

app.use(cors()); // Add this line to enable CORS
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", usersRoutes);
app.use("/api/tunnel", tunnelRoutes);
app.use("/api/customeritems", customerOrderRoute);
app.use("/api/shoppingCart", shoppingCartRoute);
app.use("/api/drivers", driverRoute);
app.use("/api/deliveries", deliveriesRoute);
app.use("/api/machines", machinesRoute);

app.use("/api/leaves", leavesRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/target", targetRoutes);

app.use(require("./Routes/financialRoute.js"));
app.use("/api/leaves", leavesRoutes);

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
