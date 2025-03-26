require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const session = require("express-session");
const orderRoutes = require("./routes/orderRoutes");
const config = require("./config/serverConfig");

const app = express();

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

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
