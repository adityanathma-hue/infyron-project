const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const Contact = require('../models/Contact');

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST /contact
router.post('/', async (req, res) => {
  const { name, email, service, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email and message' });
  }
  try {
    // Save to DB
    const doc = await Contact.create({ name, email, service, message });
    
    // Send email via SendGrid
    try {
      await sgMail.send({
        to: process.env.ZOHO_EMAIL || 'info@infyrontechnology.co.in',
        from: 'noreply@infyrontechnology.co.in',
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
      console.log('Email sent successfully via SendGrid to', process.env.ZOHO_EMAIL || 'info@infyrontechnology.co.in');
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
