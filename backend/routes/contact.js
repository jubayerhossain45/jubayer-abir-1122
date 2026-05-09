/**
 * Contact Routes
 * POST /api/contact — Send email via Nodemailer
 */

import express from 'express';
import rateLimit from 'express-rate-limit';
import { sendContactEmail } from '../controllers/contactController.js';
import { validateContactForm } from '../middleware/validation.js';

const router = express.Router();

// Strict rate limiter for contact form (5 per hour)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: 'Too many contact form submissions. Please wait before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
});

// POST /api/contact
router.post('/', contactLimiter, validateContactForm, sendContactEmail);

export default router;
