// npm packages
require("dotenv").config();
const express = require("express");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConnection");

// global variables
const PORT = process.env.PORT | 8000;

// MiddleWares
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//cors control
app.use(cors());
// db connection
connectDB();
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// server
mongoose.connection.once("open", () => {
	console.log("Connected to mongodb");
	app.listen(PORT, () => {
		console.log("this server is listening to port " + PORT);
	});
});
