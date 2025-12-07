const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email and message' });
  }
  try {
    const doc = await Contact.create({ name, email, message });
    return res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error('Contact save error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
