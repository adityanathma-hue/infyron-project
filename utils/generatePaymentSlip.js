const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generatePaymentSlip(payment, outputPath, acknowledgments = []) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // Add watermark logo (if exists)
      const logoPath = path.join(__dirname, '../frontend/public/assets/Gemini_Generated_Image_qovcidqovcidqovc.png');
      if (fs.existsSync(logoPath)) {
        // Add faded background logo
        doc.save();
        doc.opacity(0.1);
        doc.image(logoPath, 150, 250, { width: 300 });
        doc.restore();
      }

      // Header with company details
      doc.fontSize(24).fillColor('#6366F1').text('INFYRON TECHNOLOGIES', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('#000000').text('Empowering Careers Through Technology', { align: 'center' });
      doc.moveDown(0.2);
      doc.fontSize(9).fillColor('#666666')
        .text('Email: info@infyrontechnology.co.in | Phone: +91 XXXXXXXXXX', { align: 'center' });
      
      // Draw line separator
      doc.moveDown(1);
      doc.strokeColor('#6366F1').lineWidth(2).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1);

      // Payment Receipt Title
      doc.fontSize(18).fillColor('#6366F1').text('PAYMENT RECEIPT', { align: 'center', underline: true });
      doc.moveDown(1.5);

      // Receipt Details Box
      const startY = doc.y;
      doc.roundedRect(50, startY, 495, 100, 5).stroke('#CCCCCC');
      
      doc.fontSize(10).fillColor('#000000');
      doc.text(`Receipt No: ${payment.receiptNumber}`, 70, startY + 15);
      doc.text(`Date: ${new Date(payment.paidAt).toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      })}`, 350, startY + 15);
      
      doc.text(`Order ID: ${payment.orderId}`, 70, startY + 35);
      doc.text(`Payment ID: ${payment.paymentId}`, 70, startY + 55);
      doc.text(`Status: PAID`, 350, startY + 55, { continued: true })
        .fillColor('#10B981').text(' ✓', { continued: false });

      doc.moveDown(7);

      // Customer Details Section
      doc.fillColor('#6366F1').fontSize(12).text('CUSTOMER DETAILS', { underline: true });
      doc.moveDown(0.5);
      
      doc.fillColor('#000000').fontSize(10);
      doc.text(`Name: ${payment.customerName}`);
      doc.text(`Email: ${payment.customerEmail}`);
      doc.text(`Phone: ${payment.customerPhone}`);
      doc.moveDown(1);

      // Course Details Section
      doc.fillColor('#6366F1').fontSize(12).text('COURSE DETAILS', { underline: true });
      doc.moveDown(0.5);
      
      doc.fillColor('#000000').fontSize(10);
      doc.text(`Course Name: ${payment.courseTitle}`);
      doc.text(`Program Type: ${payment.courseType === 'internship' ? 'With Internship' : 'Training Only'}`);
      doc.moveDown(1.5);

      // Payment Breakdown Table
      const tableTop = doc.y;
      doc.fillColor('#F3F4F6').rect(50, tableTop, 495, 25).fill();
      doc.fillColor('#000000').fontSize(11).font('Helvetica-Bold')
        .text('Description', 70, tableTop + 8)
        .text('Amount (₹)', 430, tableTop + 8);
      
      doc.font('Helvetica');
      let currentY = tableTop + 35;

      // Base Amount
      doc.fontSize(10).text('Course Fee (Base Amount)', 70, currentY);
      doc.text(payment.baseAmount.toLocaleString('en-IN'), 430, currentY);
      currentY += 25;

      // GST
      doc.text('GST @ 9%', 70, currentY);
      doc.text(payment.gstAmount.toLocaleString('en-IN'), 430, currentY);
      currentY += 25;

      // SGST
      doc.text('SGST @ 9%', 70, currentY);
      doc.text(payment.sgstAmount.toLocaleString('en-IN'), 430, currentY);
      currentY += 30;

      // Total line
      doc.strokeColor('#6366F1').lineWidth(1).moveTo(50, currentY).lineTo(545, currentY).stroke();
      currentY += 10;

      // Total Amount
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#6366F1');
      doc.text('TOTAL AMOUNT PAID', 70, currentY);
      doc.text('₹ ' + payment.amount.toLocaleString('en-IN'), 430, currentY);
      
      currentY += 35;
      doc.strokeColor('#CCCCCC').lineWidth(1).moveTo(50, currentY).lineTo(545, currentY).stroke();

      // Acknowledgments Section
      if (acknowledgments && acknowledgments.length > 0) {
        doc.moveDown(2);
        doc.fontSize(11).fillColor('#6366F1').font('Helvetica-Bold');
        doc.text('IMPORTANT ACKNOWLEDGMENTS', 50);
        doc.moveDown(0.5);
        
        doc.fontSize(9).fillColor('#000000').font('Helvetica');
        acknowledgments.forEach((ack, index) => {
          doc.text(`${index + 1}. ${ack}`, 70, doc.y, { width: 475 });
          doc.moveDown(0.3);
        });
      }

      // Footer Section
      doc.moveDown(2);
      doc.fontSize(9).fillColor('#666666').font('Helvetica');
      doc.text('This is a computer-generated receipt and does not require a physical signature.', { align: 'center' });
      doc.moveDown(0.5);
      doc.text('For any queries, please contact us at info@infyrontechnology.co.in', { align: 'center' });
      
      // Thank you note
      doc.moveDown(2);
      doc.fontSize(14).fillColor('#6366F1').font('Helvetica-Bold');
      doc.text('Thank you for choosing Infyron Technologies!', { align: 'center' });

      // Add page border
      doc.save();
      doc.strokeColor('#6366F1').lineWidth(3)
        .rect(40, 40, 515, 752).stroke();
      doc.restore();

      doc.end();

      stream.on('finish', () => {
        resolve(outputPath);
      });

      stream.on('error', (error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { generatePaymentSlip };
