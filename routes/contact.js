const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Configure Zoho transporter
const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.ZOHO_SMTP_PORT) || 465,
  secure: true, // SSL
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD
  }
});

// POST /contact
router.post('/', async (req, res) => {
  const { name, email, service, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email and message' });
  }
  try {
    // Save to DB
    const doc = await Contact.create({ name, email, service, message });
    
    // Send email to admin
    try {
      await transporter.sendMail({
        from: process.env.ZOHO_EMAIL,
        to: process.env.ZOHO_EMAIL,
        subject: `New Contact Form: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submission ID: ${doc._id}</small></p>
        `
      });
      console.log('Email sent successfully to', process.env.ZOHO_EMAIL);
    } catch (emailErr) {
      console.error('Email sending error:', emailErr);
      // Don't fail the API if email fails, but log it
    }
    
    return res.status(201).json({ success: true, id: doc._id, message: 'Form submitted successfully' });
  } catch (err) {
    console.error('Contact save error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
