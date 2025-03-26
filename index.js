const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const session = require("express-session");
const orderRoutes = require("./routes/orderRoutes");
const voiceRoutes = require("./routes/voiceRoutes");
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
app.use("/", voiceRoutes);

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
