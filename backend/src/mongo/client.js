const mongoose = require('mongoose');

require("dotenv").config('../.env');

mongoose.connection.on('connected', () => {
  console.log(new Date().toLocaleString('fr-FR'), '- Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(new Date().toLocaleString('fr-FR'), '- Error connecting to MongoDB', err);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log(new Date().toLocaleString('fr-FR'), '- Disconnected from MongoDB');
});

mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose;
