const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

module.exports = app;