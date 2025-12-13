const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }
    // Modern mongoose versions don't require these options; they are unsupported
    // and cause an error. Pass the connection string only.
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Don't exit, let the server run and retry connection
    console.error('Server will continue but database operations may fail');
    throw err;
  }
};

module.exports = connectDB;
