const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, phone, qualification, message, courseTitle, courseType, price } = req.body;

  try {
    // Email to company
    const companyMsg = {
      to: 'adityanath.ma@gmail.com',
      from: 'info@infyrontechnology.co.in',
      subject: `New Course Enrollment - ${courseTitle}`,
      text: `
New Course Enrollment Request

Course Details:
- Course: ${courseTitle}
- Type: ${courseType === 'internship' ? 'With Internship Program' : 'Training Only'}
- Price: ${price}

Student Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Qualification: ${qualification}
- Message: ${message || 'N/A'}

Please follow up with the student as soon as possible.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New Course Enrollment Request</h2>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #6366F1; margin-top: 0;">Course Details</h3>
            <p><strong>Course:</strong> ${courseTitle}</p>
            <p><strong>Type:</strong> ${courseType === 'internship' ? '🎓 With Internship Program' : '📚 Training Only'}</p>
            <p><strong>Price:</strong> ${price}</p>
          </div>

          <div style="background: #EEF2FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #6366F1; margin-top: 0;">Student Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Qualification:</strong> ${qualification}</p>
            <p><strong>Additional Message:</strong> ${message || 'N/A'}</p>
          </div>

          <p style="color: #6B7280; font-size: 14px;">
            Please follow up with the student as soon as possible.
          </p>
        </div>
      `
    };

    await sgMail.send(companyMsg);

    res.status(200).json({ message: 'Enrollment submitted successfully!' });
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    res.status(500).json({ message: 'Failed to submit enrollment' });
  }
});

module.exports = router;
