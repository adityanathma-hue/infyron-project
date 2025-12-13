require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();

// Check critical environment variables
const requiredEnvVars = ['MONGO_URI', 'SENDGRID_API_KEY', 'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn('⚠️  Warning: Missing environment variables:', missingVars.join(', '));
  console.warn('Some features may not work correctly');
}

// Connect to DB
connectDB().catch(err => {
  console.error('Database connection failed:', err.message);
  console.error('Server will continue running but database operations will fail');
});

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get('/', (req, res) => {
  res.send('Infyron Technologies Backend is Running');
});

// Contact route
const contactRoute = require('../routes/contact');
app.use('/contact', contactRoute);

// Enrollment route
const enrollRoute = require('../routes/enroll');
app.use('/api/enroll', enrollRoute);

// Payment route
const paymentRoute = require('../routes/payment');
app.use('/api/payment', paymentRoute);

// Start server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB: ${process.env.MONGO_URI ? 'Configured' : 'NOT CONFIGURED'}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
