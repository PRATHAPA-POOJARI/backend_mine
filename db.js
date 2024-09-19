// // db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//      await mongoose.connect('mongodb://localhost:27017/test1', {
//      });
//   //  await mongoose.connect('mongodb://172.16.68.236:27071/ ', {});

//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;

// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection URI from environment variable
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
