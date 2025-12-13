const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generatePaymentSlip(payment, outputPath, acknowledgments = []) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // Add watermark company logo in background (use logo.svg or fallback to company logo PNG, NOT CEO photo)
      const companyLogoPath = path.join(__dirname, '../frontend/public/assets/logo.svg');
      
      // If SVG not available, use the company logo PNG (Gemini image is company logo, not CEO photo)
      const companyLogoPngPath = path.join(__dirname, '../frontend/public/assets/Gemini_Generated_Image_qovcidqovcidqovc.png');
      
      if (fs.existsSync(companyLogoPngPath)) {
        // Add faded background company logo watermark
        doc.save();
        doc.opacity(0.06);
        doc.image(companyLogoPngPath, 170, 320, { width: 250 });
        doc.restore();
      }

      // Colorful Header Background
      doc.save();
      doc.linearGradient(40, 40, 555, 120)
         .stop(0, '#6366F1')
         .stop(1, '#8B5CF6');
      doc.rect(40, 40, 515, 80).fill();
      doc.restore();

      // Company Logo in Header (left side - use company logo only)
      if (fs.existsSync(companyLogoPngPath)) {
        doc.image(companyLogoPngPath, 55, 50, { width: 60, height: 60 });
      }

      // Company Details in Header (right side with white text)
      doc.fontSize(20).fillColor('#FFFFFF').font('Helvetica-Bold')
         .text('INFYRON TECHNOLOGY PVT. LTD.', 130, 48, { width: 400 });
      
      doc.fontSize(7).fillColor('#FFFFFF').font('Helvetica');
      doc.text('Address: Bhubaneswar, Odisha, India', 130, 72, { width: 400 });
      doc.text('Email: info@infyrontechnology.co.in', 130, 83, { width: 400 });
      doc.text('Phone: +91 8637271743', 130, 94, { width: 400 });
      doc.text('Website: www.infyrontechnology.co.in', 130, 105, { width: 400 });
      
      doc.moveDown(3);

      // Payment Receipt Title
      doc.fontSize(16).fillColor('#6366F1').font('Helvetica-Bold')
         .text('PAYMENT RECEIPT', { align: 'center', underline: true });
      doc.moveDown(0.8);

      // Receipt Details Box - Compact
      const startY = doc.y;
      doc.save();
      doc.fillColor('#F0F9FF').rect(50, startY, 495, 70).fill();
      doc.strokeColor('#6366F1').lineWidth(1).rect(50, startY, 495, 70).stroke();
      doc.restore();
      
      doc.fontSize(9).fillColor('#000000').font('Helvetica-Bold');
      doc.text(`Receipt #: ${payment.receiptNumber}`, 60, startY + 10);
      doc.text(`Date: ${new Date(payment.paidAt).toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      })}`, 350, startY + 10);
      
      doc.font('Helvetica').fontSize(8);
      doc.text(`Order ID: ${payment.orderId}`, 60, startY + 30, { width: 250 });
      doc.text(`Payment ID: ${payment.paymentId}`, 60, startY + 45, { width: 250 });
      doc.fontSize(9).fillColor('#10B981').font('Helvetica-Bold');
      doc.text('STATUS: PAID ✓', 350, startY + 50);

      doc.moveDown(5);

      // Two Column Layout for Customer & Course Details
      const detailsY = doc.y;
      
      // Customer Details (Left Column)
      doc.fillColor('#6366F1').fontSize(10).font('Helvetica-Bold')
         .text('CUSTOMER DETAILS', 50, detailsY);
      
      doc.fillColor('#000000').fontSize(8).font('Helvetica');
      doc.text(`Name: ${payment.customerName}`, 50, detailsY + 18);
      doc.text(`Email: ${payment.customerEmail}`, 50, detailsY + 32);
      doc.text(`Phone: ${payment.customerPhone}`, 50, detailsY + 46);

      // Course Details (Right Column)
      doc.fillColor('#6366F1').fontSize(10).font('Helvetica-Bold')
         .text('COURSE DETAILS', 310, detailsY);
      
      doc.fillColor('#000000').fontSize(8).font('Helvetica');
      doc.text(`Course: ${payment.courseTitle}`, 310, detailsY + 18, { width: 235 });
      doc.text(`Type: ${payment.courseType === 'internship' ? 'With Internship' : 'Training Only'}`, 310, detailsY + 32);

      doc.moveDown(4);

      // Payment Breakdown Table - Compact & Colorful
      const tableTop = doc.y;
      
      // Table Header
      doc.save();
      doc.linearGradient(50, tableTop, 545, tableTop + 20)
         .stop(0, '#6366F1')
         .stop(1, '#8B5CF6');
      doc.rect(50, tableTop, 495, 20).fill();
      doc.restore();
      
      doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica-Bold')
        .text('Description', 60, tableTop + 6)
        .text('Amount (₹)', 460, tableTop + 6);
      
      doc.font('Helvetica');
      let currentY = tableTop + 28;

      // Base Amount
      doc.fillColor('#000000').fontSize(9);
      doc.text('Course Fee (Base Amount)', 60, currentY);
      doc.text(payment.baseAmount.toLocaleString('en-IN'), 460, currentY);
      currentY += 18;

      // GST
      doc.text('GST @ 9%', 60, currentY);
      doc.text(payment.gstAmount.toLocaleString('en-IN'), 460, currentY);
      currentY += 18;

      // SGST
      doc.text('SGST @ 9%', 60, currentY);
      doc.text(payment.sgstAmount.toLocaleString('en-IN'), 460, currentY);
      currentY += 22;

      // Total line with gradient background
      doc.save();
      doc.fillColor('#10B981').rect(50, currentY, 495, 25).fill();
      doc.restore();

      // Total Amount
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#FFFFFF');
      doc.text('TOTAL AMOUNT PAID', 60, currentY + 6);
      doc.text('₹ ' + payment.amount.toLocaleString('en-IN'), 460, currentY + 6);
      
      currentY += 30;

      // Acknowledgments Section
      if (acknowledgments && acknowledgments.length > 0) {
        const ackStartY = doc.y;
        doc.fontSize(11).fillColor('#6366F1').font('Helvetica-Bold');
        doc.text('IMPORTANT ACKNOWLEDGMENTS', 50);
        doc.moveDown(0.3);
        
        doc.fontSize(8).fillColor('#000000').font('Helvetica');
        acknowledgments.forEach((ack, index) => {
          doc.text(`${index + 1}. ${ack}`, 60, doc.y, { width: 485 });
          doc.moveDown(0.2);
        });
      }

      // Digital Signature and Stamp Section
      doc.moveDown(0.8);
      const signatureY = doc.y;

      // Genuine Digital Stamp (left side - official round stamp)
      doc.save();
      doc.translate(120, signatureY + 35);
      
      // Outer red circle (bold)
      doc.circle(0, 0, 40).lineWidth(4).strokeColor('#B91C1C').stroke();
      
      // Middle circle
      doc.circle(0, 0, 36).lineWidth(1).strokeColor('#DC2626').stroke();
      
      // Inner blue circle
      doc.circle(0, 0, 32).lineWidth(2).strokeColor('#1E40AF').stroke();
      
      // Company name curved at top
      doc.fontSize(6).fillColor('#B91C1C').font('Helvetica-Bold');
      doc.text('INFYRON TECHNOLOGY', -32, -22, { width: 64, align: 'center' });
      
      // PVT. LTD. curved at bottom
      doc.fontSize(5.5).fillColor('#B91C1C').font('Helvetica-Bold');
      doc.text('PVT. LTD.', -28, 16, { width: 56, align: 'center' });
      
      // Center - Govt of India style emblem
      doc.fontSize(10).fillColor('#1E40AF').font('Helvetica-Bold');
      doc.text('✓', -4, -8);
      
      doc.fontSize(5).fillColor('#1E40AF').font('Helvetica-Bold');
      doc.text('AUTHORIZED', -18, -2, { width: 36, align: 'center' });
      doc.text('SIGNATORY', -18, 5, { width: 36, align: 'center' });
      
      doc.restore();

      // CEO Digital Signature with Stamp (right side)
      doc.fontSize(8).fillColor('#374151').font('Helvetica');
      doc.text('For INFYRON TECHNOLOGY PVT. LTD.', 360, signatureY);
      
      // Handwritten style signature
      doc.fontSize(20).fillColor('#1F2937').font('Helvetica-BoldOblique');
      doc.text('Authorized Signature', 360, signatureY + 18);
      
      // Small digital stamp overlay on signature
      doc.save();
      doc.translate(480, signatureY + 30);
      doc.circle(0, 0, 15).lineWidth(2).strokeColor('#B91C1C').opacity(0.7).stroke();
      doc.fontSize(4).fillColor('#B91C1C').font('Helvetica-Bold');
      doc.text('CEO', -6, -3);
      doc.restore();
      
      doc.fontSize(7).fillColor('#6B7280').font('Helvetica');
      doc.text('Chief Executive Officer', 360, signatureY + 42);
      doc.text('Date: ' + new Date(payment.paidAt).toLocaleDateString('en-IN'), 360, signatureY + 52);

      // Footer Section
      doc.moveDown(0.8);
      doc.fontSize(7).fillColor('#6B7280').font('Helvetica-Oblique');
      doc.text('This is a computer-generated receipt. Digital signature is valid without physical stamp.', 50, 755, { 
        align: 'center',
        width: 495
      });
      
      // Simple thank you note
      doc.fontSize(11).fillColor('#10B981').font('Helvetica-Bold');
      doc.text('Thank You for Choosing Infyron Technology!', 50, 770, { align: 'center', width: 495 });

      // Simple border
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
