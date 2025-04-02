const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const session = require("express-session");
const orderRoutes = require("./routes/orderRoutes");
const voiceRoutes = require("./routes/voiceRoutes");
const config = require("./config/serverConfig");

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Initialize Socket.io
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

global.io = io;

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  
    // Example: Sending a welcome message to the connected client
    socket.emit("message", "Welcome to the WebSocket Server!");
  
    // Example: Handling incoming messages from clients
    socket.on("sendMessage", (data) => {
      console.log("Message received:", data);
      io.emit("message", data); // Broadcast to all clients
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
});

//Mongodb connection
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "my_secret_key",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Routes
app.use("/", orderRoutes);
app.use("/", voiceRoutes);


server.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));

module.exports = { app, server};
