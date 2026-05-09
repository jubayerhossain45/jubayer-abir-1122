/**
 * Contact Controller
 * Handles email sending via Nodemailer + Gmail SMTP
 */

import nodemailer from 'nodemailer';
import ContactMessage from '../models/Contact.js';

/**
 * Create Nodemailer transporter
 * Uses Gmail App Password for secure authentication
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (not your actual password)
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Send contact form email
 * @route POST /api/contact
 */
export async function sendContactEmail(req, res) {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = createTransporter();

    // Verify transporter connection
    await transporter.verify();

    // Email to portfolio owner (jubayer123abir@gmail.com)
    const ownerMailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: 'jubayer123abir@gmail.com',
      replyTo: email,
      subject: `📬 New Message: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; background: #0a0a0f; color: #e2e8f0; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #0a0a0f; }
            .header { background: linear-gradient(135deg, #7c3aed, #3b82f6); padding: 32px; text-align: center; border-radius: 16px 16px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 700; }
            .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
            .body { background: #0f0f1a; padding: 32px; border-left: 1px solid rgba(255,255,255,0.06); border-right: 1px solid rgba(255,255,255,0.06); }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #7c3aed; margin-bottom: 6px; }
            .value { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px 16px; font-size: 15px; color: #e2e8f0; line-height: 1.6; }
            .message-value { white-space: pre-wrap; }
            .footer { background: #0a0a0f; padding: 20px 32px; text-align: center; border-radius: 0 0 16px 16px; border: 1px solid rgba(255,255,255,0.06); border-top: none; }
            .footer p { color: #4a5568; font-size: 12px; margin: 0; }
            .badge { display: inline-block; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Portfolio Message</h1>
              <p>Someone reached out through your portfolio website</p>
            </div>
            <div class="body">
              <div style="text-align:center; margin-bottom: 24px;">
                <span class="badge">✓ Verified Submission</span>
              </div>
              <div class="field">
                <div class="label">👤 From</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">📌 Subject</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">💬 Message</div>
                <div class="value message-value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div style="margin-top: 24px; padding: 16px; background: rgba(124, 58, 237, 0.08); border-radius: 10px; border: 1px solid rgba(124, 58, 237, 0.15);">
                <p style="margin: 0; font-size: 13px; color: #a78bfa;">
                  💡 <strong>Quick reply:</strong> Click Reply to respond directly to ${name} at ${email}
                </p>
              </div>
            </div>
            <div class="footer">
              <p>Sent from your portfolio at jubayerhossain.dev • ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BST)</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Auto-reply to the sender
    const senderMailOptions = {
      from: `"Jubayer Hossain" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Message Received — I'll Get Back to You Soon!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; background: #0a0a0f; color: #e2e8f0; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #7c3aed, #3b82f6); padding: 40px 32px; text-align: center; border-radius: 16px 16px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
            .body { background: #0f0f1a; padding: 36px 32px; border: 1px solid rgba(255,255,255,0.06); border-top: none; }
            .cta { display: inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px; margin-top: 20px; }
            .footer { background: #0a0a0f; padding: 20px 32px; text-align: center; border-radius: 0 0 16px 16px; border: 1px solid rgba(255,255,255,0.06); border-top: none; }
            .footer p { color: #4a5568; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
              <h1>Message Received!</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 16px;">Hi ${name}, I'll be in touch soon.</p>
            </div>
            <div class="body">
              <p style="color: #94a3b8; font-size: 16px; line-height: 1.7; margin-top: 0;">
                Thank you for reaching out! I've received your message and will review it shortly.
              </p>
              <p style="color: #94a3b8; font-size: 16px; line-height: 1.7;">
                I typically respond within <strong style="color: #a78bfa;">24 hours</strong> on business days.
                If your inquiry is urgent, feel free to reply to this email.
              </p>
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 8px; font-size: 13px; color: #7c3aed; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary</p>
                <p style="margin: 0; color: #cbd5e1; font-size: 15px;"><strong>Subject:</strong> ${subject}</p>
              </div>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
                In the meantime, feel free to check out my latest projects on GitHub or connect with me on LinkedIn.
              </p>
              <div style="text-align: center; margin-top: 28px;">
                <a href="https://jubayerhossain.dev" class="cta">Visit My Portfolio</a>
              </div>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Jubayer Hossain • Full Stack Developer</p>
              <p style="margin: 4px 0 0;">jubayer123abir@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    // Save to MongoDB if connected
    if (ContactMessage) {
      try {
        const contactDoc = new ContactMessage({ name, email, subject, message });
        await contactDoc.save();
      } catch (dbErr) {
        console.warn('Could not save to database:', dbErr.message);
      }
    }

    console.log(`✅ Contact form email sent from ${email}`);

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! I\'ll get back to you within 24 hours.',
    });

  } catch (error) {
    console.error('❌ Email send error:', error);

    // Specific error messages
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please contact me directly at jubayer123abir@gmail.com',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again or contact me directly.',
    });
  }
}
