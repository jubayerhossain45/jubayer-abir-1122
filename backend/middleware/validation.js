/**
 * Input Validation Middleware
 * Validates and sanitizes contact form data
 */

/**
 * Sanitize string — removes potentially dangerous characters
 */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .slice(0, 1000); // Limit length
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Contact form validation middleware
 */
export function validateContactForm(req, res, next) {
  const { name, email, subject, message } = req.body;

  const errors = {};

  // Validate name
  const cleanName = sanitize(name);
  if (!cleanName || cleanName.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (cleanName.length > 100) {
    errors.name = 'Name must not exceed 100 characters';
  }

  // Validate email
  const cleanEmail = sanitize(email);
  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    errors.email = 'Please provide a valid email address';
  }

  // Validate subject
  const cleanSubject = sanitize(subject);
  if (!cleanSubject || cleanSubject.length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (cleanSubject.length > 200) {
    errors.subject = 'Subject must not exceed 200 characters';
  }

  // Validate message
  const cleanMessage = sanitize(message);
  if (!cleanMessage || cleanMessage.length < 20) {
    errors.message = 'Message must be at least 20 characters';
  } else if (cleanMessage.length > 5000) {
    errors.message = 'Message must not exceed 5000 characters';
  }

  // Return errors if any
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Attach sanitized data to request
  req.body = {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
  };

  next();
}
