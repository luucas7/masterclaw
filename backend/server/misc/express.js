const express = require("express");
const cors = require("cors");
require("dotenv").config('../../.env');
var path = require('path');
const morgan = require('morgan');

const app = express();

app.use(cors({
    origin: [process.env.CLIENT_HOST]
  }));
  
  app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

const dir = path.join(__dirname, '../../public');
app.use(express.static(dir));

module.exports = app;