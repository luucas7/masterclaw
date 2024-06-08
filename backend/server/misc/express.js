const express = require("express");
const cors = require("cors");
require("dotenv").config('../../.env');
var path = require('path');

const app = express();

app.use(cors({
    origin: [process.env.CLIENT_HOST]
  }));
  
  app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const dir = path.join(__dirname, '../../public');
app.use(express.static(dir));

var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
});

app.use(limiter);

module.exports = app;