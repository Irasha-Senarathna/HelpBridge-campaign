const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10 // Maximum number of sockets in the connection pool
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected'.green.bold);
    });

    mongoose.connection.on('error', err => {
      console.error(`MongoDB connection error: ${err.message}`.red.bold);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected'.yellow.bold);
    });

    // Close the Mongoose connection when the Node process ends
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination'.yellow.bold);
      process.exit(0);
    });

  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;