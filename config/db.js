const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Modern mongoose versions don't require these options; they are unsupported
    // and cause an error. Pass the connection string only.
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
