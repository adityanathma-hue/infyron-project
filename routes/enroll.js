const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, phone, qualification, message, courseTitle, courseType, price } = req.body;

  try {
    // Send SMS notification via email-to-SMS gateway (alternative approach)
    // Or send email notification
    const companyMsg = {
      to: 'adityanath.ma@gmail.com',
      from: 'info@infyrontechnology.co.in',
      subject: `🎓 New Enrollment - ${courseTitle}`,
      text: `
NEW COURSE ENROLLMENT!

Course: ${courseTitle}
Type: ${courseType === 'internship' ? 'With Internship' : 'Training Only'}
Price: ${price}

Student Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Qualification: ${qualification}
Message: ${message || 'None'}

Contact student at: ${phone}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2px; border-radius: 12px;">
          <div style="background: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #4F46E5; margin-top: 0;">🎓 New Course Enrollment!</h2>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin: 20px 0; color: white;">
              <h3 style="margin-top: 0; color: white;">Course Details</h3>
              <p style="margin: 8px 0;"><strong>Course:</strong> ${courseTitle}</p>
              <p style="margin: 8px 0;"><strong>Type:</strong> ${courseType === 'internship' ? '🎓 With Internship Program' : '📚 Training Only'}</p>
              <p style="margin: 8px 0;"><strong>Price:</strong> ${price}</p>
            </div>

            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #6366F1; margin-top: 0;">Student Information</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #6366F1;">${email}</a></p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #6366F1; font-size: 18px; font-weight: bold;">${phone}</a></p>
              <p style="margin: 8px 0;"><strong>Qualification:</strong> ${qualification}</p>
              ${message ? `<p style="margin: 8px 0;"><strong>Message:</strong> ${message}</p>` : ''}
            </div>

            <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B;">
              <p style="margin: 0; color: #92400E;">
                <strong>⚡ Action Required:</strong> Contact the student at <strong>${phone}</strong> as soon as possible!
              </p>
            </div>
          </div>
        </div>
      `
    };

    await sgMail.send(companyMsg);

    // Also try to send a second email as a notification
    const alertMsg = {
      to: 'adityanath.ma@gmail.com',
      from: 'info@infyrontechnology.co.in',
      subject: `Alert: ${name} enrolled in ${courseTitle}`,
      text: `New enrollment from ${name} (${phone}) for ${courseTitle}. Type: ${courseType}. Price: ${price}.`
    };

    await sgMail.send(alertMsg);

    res.status(200).json({ message: 'Enrollment submitted successfully!' });
  } catch (error) {
    console.error('Error sending enrollment notification:', error);
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    res.status(500).json({ message: 'Failed to submit enrollment' });
  }
});

module.exports = router;
