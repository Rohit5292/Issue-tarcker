const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/projects')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const db = mongoose.connection;
module.exports = db;
