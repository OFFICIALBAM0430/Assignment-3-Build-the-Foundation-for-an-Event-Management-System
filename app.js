require("dotenv").config();
const express = require("express");
const eventHorizonDB = require("./src/config/db");
const morgan = require("morgan");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");


const app = express();

const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Welcome to EventHorizon");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

eventHorizonDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});