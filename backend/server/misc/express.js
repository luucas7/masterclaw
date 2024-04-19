const express = require("express");
const cors = require("cors");
require("dotenv").config('../../.env');



const app = express();

app.use(cors({
    origin: [process.env.CLIENT_HOST]
  }));
  
  app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


app.use('/images/cards', express.static('public/cards'));

module.exports = app;