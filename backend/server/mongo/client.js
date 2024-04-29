const mongoose = require('mongoose');

require("dotenv").config('../.env');

mongoose.connection.on('connected', () => {
  console.log(new Date().toLocaleString(process.env.LOCALE), '- Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(new Date().toLocaleString(process.env.LOCALE), '- Error connecting to MongoDB', err);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log(new Date().toLocaleString(process.env.LOCALE), '- Disconnected from MongoDB');
});

mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose;
