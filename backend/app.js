const express = require("express");
const cors = require("cors");
const axios = require("axios");
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

module.exports = app;