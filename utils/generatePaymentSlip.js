const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generatePaymentSlip(payment, outputPath, acknowledgments = []) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // Add watermark company logo in background (not CEO photo)
      const logoPath = path.join(__dirname, '../frontend/public/assets/logo.svg');
      const pngLogoPath = path.join(__dirname, '../frontend/public/assets/Gemini_Generated_Image_qovcidqovcidqovc.png');
      
      if (fs.existsSync(pngLogoPath)) {
        // Add faded background company logo
        doc.save();
        doc.opacity(0.08);
        doc.image(pngLogoPath, 150, 300, { width: 300 });
        doc.restore();
      }

      // Colorful Header Background
      doc.save();
      doc.linearGradient(40, 40, 555, 120)
         .stop(0, '#6366F1')
         .stop(1, '#8B5CF6');
      doc.rect(40, 40, 515, 80).fill();
      doc.restore();

      // Company Logo in Header (left side)
      if (fs.existsSync(pngLogoPath)) {
        doc.image(pngLogoPath, 55, 50, { width: 60, height: 60 });
      }

      // Company Details in Header (right side with white text)
      doc.fontSize(22).fillColor('#FFFFFF').font('Helvetica-Bold')
         .text('INFYRON TECHNOLOGY PVT. LTD.', 130, 52, { width: 400 });
      
      doc.fontSize(8).fillColor('#FFFFFF').font('Helvetica');
      doc.text('📧 info@infyrontechnology.co.in', 130, 78, { width: 400 });
      doc.text('📞 +91 8637271743', 130, 90, { width: 400 });
      doc.text('🌐 www.infyrontechnology.co.in', 130, 102, { width: 400 });
      
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
      doc.moveDown(1);
      const signatureY = doc.y;

      // Digital Stamp (left side - circular stamp design)
      doc.save();
      doc.translate(100, signatureY + 30);
      
      // Outer circle - red
      doc.circle(0, 0, 35).lineWidth(3).strokeColor('#DC2626').stroke();
      
      // Inner circle - blue
      doc.circle(0, 0, 30).lineWidth(1.5).strokeColor('#6366F1').stroke();
      
      // Company name in arc (top)
      doc.fontSize(7).fillColor('#DC2626').font('Helvetica-Bold');
      doc.text('INFYRON TECHNOLOGY', -30, -25, { width: 60, align: 'center' });
      
      // PVT. LTD. (bottom)
      doc.fontSize(6).fillColor('#DC2626');
      doc.text('PVT. LTD.', -25, 15, { width: 50, align: 'center' });
      
      // Center star/seal
      doc.fontSize(14).fillColor('#6366F1');
      doc.text('★', -5, -5);
      
      doc.restore();

      // Digital Signature (right side)
      doc.fontSize(9).fillColor('#000000').font('Helvetica');
      doc.text('Authorized Signatory', 380, signatureY, { align: 'left' });
      
      // CEO signature line (handwritten style text)
      doc.fontSize(16).fillColor('#1F2937').font('Helvetica-Oblique');
      doc.text('CEO Signature', 380, signatureY + 15);
      
      doc.fontSize(8).fillColor('#6B7280').font('Helvetica');
      doc.text('Chief Executive Officer', 380, signatureY + 35);
      doc.text('Infyron Technology Pvt. Ltd.', 380, signatureY + 45);

      // Footer Section
      doc.moveDown(1);
      doc.fontSize(8).fillColor('#6B7280').font('Helvetica-Oblique');
      doc.text('This is a digitally generated receipt and does not require a physical signature.', 50, 750, { 
        align: 'center',
        width: 495
      });
      
      // Thank you note with gradient background
      doc.save();
      doc.linearGradient(180, 710, 415, 730)
         .stop(0, '#10B981')
         .stop(1, '#059669');
      doc.roundedRect(180, 710, 235, 25, 5).fill();
      doc.restore();
      
      doc.fontSize(12).fillColor('#FFFFFF').font('Helvetica-Bold');
      doc.text('Thank You for Choosing Us!', 180, 716, { width: 235, align: 'center' });

      // Add colorful page border
      doc.save();
      doc.strokeColor('#6366F1').lineWidth(4)
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
