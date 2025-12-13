require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
