const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      retryWrites: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected'.green.bold);
    });

    mongoose.connection.on('error', err => {
      console.error('MongoDB authentication error:'.red.bold);
      console.error(`Details: ${err.message}`.red);
      if (err.name === 'MongoServerError' && err.code === 18) {
        console.error('Invalid username or password'.yellow);
      }
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected'.yellow.bold);
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination'.yellow.bold);
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection failed:'.red.bold);
    if (error.name === 'MongoServerError' && error.code === 18) {
      console.error('Authentication failed - check your credentials'.yellow);
    } else {
      console.error(`Error: ${error.message}`.red);
    }
    process.exit(1);
  }
};

module.exports = connectDB;