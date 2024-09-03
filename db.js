// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
     await mongoose.connect('mongodb://localhost:27017', {
     });
    //  await mongoose.connect('mongodb://172.16.68.236:27071/ ', {});

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

