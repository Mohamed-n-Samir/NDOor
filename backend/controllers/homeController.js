const express = require("express");
const app = express();


const home = (req, res) => {
	res.status(200).json({ message: "hello world",error: "the best error in the world" });
};

module.exports = { home };