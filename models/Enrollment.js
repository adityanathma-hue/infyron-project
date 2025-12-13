const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  message: { type: String },
  courseTitle: { type: String, required: true },
  courseType: { type: String, required: true },
  price: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
