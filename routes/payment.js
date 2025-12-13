const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');
const { generatePaymentSlip } = require('../utils/generatePaymentSlip');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, baseAmount, gstAmount, sgstAmount, courseTitle, courseType, customerName, customerEmail, customerPhone } = req.body;

    // Validate input
    if (!amount || amount < 100) {
      return res.status(400).json({ message: 'Invalid amount. Minimum ₹100 required.' });
    }

    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ message: 'Customer details are required.' });
    }

    if (!courseTitle || !courseType) {
      return res.status(400).json({ message: 'Course details are required.' });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // Save payment record in database with tax breakdown
    const payment = new Payment({
      orderId: order.id,
      amount: amount,
      baseAmount: baseAmount,
      gstAmount: gstAmount,
      sgstAmount: sgstAmount,
      status: 'created',
      courseTitle,
      courseType,
      customerName,
      customerEmail,
      customerPhone
    });

    await payment.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create payment order', error: error.message });
  }
});

// Verify Payment
router.post('/verify', async (req, res) => {
  try {
    const { orderId, paymentId, signature, courseTitle, courseType, customerName, customerEmail, customerPhone } = req.body;

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Generate unique receipt number
    const receiptNumber = `INFY${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Update payment record
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      {
        paymentId,
        status: 'paid',
        paidAt: new Date(),
        receiptNumber
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    // Generate payment slip PDF
    const pdfDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    
    const pdfPath = path.join(pdfDir, `payment_slip_${receiptNumber}.pdf`);
    await generatePaymentSlip(payment, pdfPath);

    // Read PDF as base64 for email attachment
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfBase64 = pdfBuffer.toString('base64');

    // Send confirmation email to admin
    try {
      const adminMsg = {
        to: 'adityanath.ma@gmail.com',
        from: 'info@infyrontechnology.co.in',
        subject: `💰 Payment Received - ${courseTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">💰 Payment Received!</h1>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
              <h2 style="color: #6366F1; margin-top: 0;">Course Purchase Details</h2>
              
              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>Course:</strong> ${courseTitle}</p>
                <p style="margin: 8px 0;"><strong>Type:</strong> ${courseType === 'internship' ? '🎓 With Internship' : '📚 Training Only'}</p>
                <p style="margin: 8px 0;"><strong>Base Amount:</strong> ₹${payment.baseAmount.toLocaleString('en-IN')}</p>
                <p style="margin: 8px 0;"><strong>GST (9%):</strong> ₹${payment.gstAmount.toLocaleString('en-IN')}</p>
                <p style="margin: 8px 0;"><strong>SGST (9%):</strong> ₹${payment.sgstAmount.toLocaleString('en-IN')}</p>
                <p style="margin: 8px 0; font-size: 18px;"><strong>Total Amount:</strong> ₹${payment.amount.toLocaleString('en-IN')}</p>
              </div>

              <div style="background: #EEF2FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #6366F1; margin-top: 0;">Customer Details</h3>
                <p style="margin: 8px 0;"><strong>Name:</strong> ${customerName}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${customerEmail}</p>
                <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${customerPhone}" style="color: #6366F1;">${customerPhone}</a></p>
              </div>

              <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B;">
                <p style="margin: 0; color: #92400E;">
                  <strong>Receipt No:</strong> ${receiptNumber}<br>
                  <strong>Payment ID:</strong> ${paymentId}<br>
                  <strong>Order ID:</strong> ${orderId}
                </p>
              </div>

              <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                <p style="color: #6B7280; font-size: 14px; margin: 0;">
                  ⚡ Action Required: Contact the customer at <strong>${customerPhone}</strong> to confirm enrollment.
                </p>
              </div>
            </div>
          </div>
        `,
        attachments: [
          {
            content: pdfBase64,
            filename: `Payment_Receipt_${receiptNumber}.pdf`,
            type: 'application/pdf',
            disposition: 'attachment'
          }
        ]
      };

      await sgMail.send(adminMsg);
    } catch (emailError) {
      console.error('Failed to send admin email:', emailError);
    }

    // Send confirmation email to customer with payment slip
    try {
      const customerMsg = {
        to: customerEmail,
        from: 'info@infyrontechnology.co.in',
        subject: `✅ Payment Successful - ${courseTitle} | Receipt #${receiptNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">✅ Payment Successful!</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px;">Receipt #${receiptNumber}</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #374151;">Dear ${customerName},</p>
              
              <p style="font-size: 16px; color: #374151;">
                Thank you for enrolling in <strong>${courseTitle}</strong>! Your payment has been successfully processed.
              </p>

              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #6366F1; margin-top: 0;">Payment Summary</h3>
                <p style="margin: 8px 0;"><strong>Course:</strong> ${courseTitle}</p>
                <p style="margin: 8px 0;"><strong>Type:</strong> ${courseType === 'internship' ? '🎓 With Internship Program' : '📚 Training Only'}</p>
                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 15px 0;">
                <p style="margin: 8px 0;"><strong>Base Amount:</strong> ₹${payment.baseAmount.toLocaleString('en-IN')}</p>
                <p style="margin: 8px 0;"><strong>GST (9%):</strong> ₹${payment.gstAmount.toLocaleString('en-IN')}</p>
                <p style="margin: 8px 0;"><strong>SGST (9%):</strong> ₹${payment.sgstAmount.toLocaleString('en-IN')}</p>
                <hr style="border: none; border-top: 2px solid #6366F1; margin: 15px 0;">
                <p style="margin: 8px 0; font-size: 18px; color: #6366F1;"><strong>Total Paid:</strong> ₹${payment.amount.toLocaleString('en-IN')}</p>
              </div>

              <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
                <p style="margin: 0; color: #92400E; font-size: 14px;">
                  <strong>📄 Payment Receipt:</strong><br>
                  Your official payment receipt is attached to this email.
                </p>
              </div>

              <div style="background: #DBEAFE; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #1E40AF; font-size: 14px;">
                  <strong>🎓 What's Next?</strong><br>
                  Our team will contact you within 24 hours at <strong>${customerPhone}</strong> to provide:
                </p>
                <ul style="color: #1E40AF; font-size: 14px; margin: 10px 0;">
                  <li>Course start date and schedule</li>
                  <li>Access to learning materials</li>
                  <li>Batch details and mentor information</li>
                </ul>
              </div>

              <p style="font-size: 14px; color: #6B7280;">
                If you have any questions, feel free to contact us:<br>
                📞 Phone: <a href="tel:+918637271743" style="color: #6366F1; text-decoration: none;">+91 8637271743</a><br>
                📧 Email: <a href="mailto:info@infyrontechnology.co.in" style="color: #6366F1; text-decoration: none;">info@infyrontechnology.co.in</a><br>
                🌐 Website: <a href="https://infyrontechnology.co.in" style="color: #6366F1; text-decoration: none;">www.infyrontechnology.co.in</a>
              </p>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center;">
                <p style="font-size: 16px; color: #374151; margin-bottom: 10px;">
                  <strong>Welcome to Infyron Technologies!</strong>
                </p>
                <p style="font-size: 14px; color: #6B7280;">
                  Empowering Careers Through Technology
                </p>
              </div>
            </div>
          </div>
        `,
        attachments: [
          {
            content: pdfBase64,
            filename: `Payment_Receipt_${receiptNumber}.pdf`,
            type: 'application/pdf',
            disposition: 'attachment'
          }
        ]
      };

      await sgMail.send(customerMsg);
    } catch (emailError) {
      console.error('Failed to send customer email:', emailError);
    }

    // Clean up temporary PDF file
    try {
      fs.unlinkSync(pdfPath);
    } catch (cleanupError) {
      console.error('Failed to delete temp PDF:', cleanupError);
    }

    res.json({ message: 'Payment verified successfully', payment });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Failed to verify payment', error: error.message });
  }
});

module.exports = router;
