const mongoose = require('mongoose');

// MongoDB URI
const uri = 'mongodb://localhost:27017/books';

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
