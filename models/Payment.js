const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String },
  amount: { type: Number, required: true }, // Total amount including GST/SGST
  baseAmount: { type: Number, required: true }, // Base course amount
  gstAmount: { type: Number, required: true }, // GST 9%
  sgstAmount: { type: Number, required: true }, // SGST 9%
  currency: { type: String, default: 'INR' },
  status: { type: String, required: true }, // created, paid, failed
  courseTitle: { type: String, required: true },
  courseType: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  receiptNumber: { type: String, unique: true, sparse: true }, // Generated after successful payment
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date }
});

module.exports = mongoose.model('Payment', PaymentSchema);
