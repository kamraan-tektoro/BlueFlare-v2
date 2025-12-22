/**
 * Validation utilities for contact form submissions
 */

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  pageUrl?: string;
  userAgent?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// Basic email regex - matches the frontend validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the contact form payload
 */
export function validateContactPayload(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const payload = body as Record<string, unknown>;

  // firstName: required
  if (!payload.firstName || typeof payload.firstName !== 'string' || !payload.firstName.trim()) {
    return { valid: false, error: 'First name is required' };
  }

  // lastName: required
  if (!payload.lastName || typeof payload.lastName !== 'string' || !payload.lastName.trim()) {
    return { valid: false, error: 'Last name is required' };
  }

  // email: required + basic regex
  if (!payload.email || typeof payload.email !== 'string' || !payload.email.trim()) {
    return { valid: false, error: 'Email is required' };
  }
  if (!EMAIL_REGEX.test(payload.email.trim())) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  // message: required
  if (!payload.message || typeof payload.message !== 'string' || !payload.message.trim()) {
    return { valid: false, error: 'Message is required' };
  }

  // phone: optional, max 40 chars
  if (payload.phone !== undefined && payload.phone !== null) {
    if (typeof payload.phone !== 'string') {
      return { valid: false, error: 'Phone must be a string' };
    }
    if (payload.phone.length > 40) {
      return { valid: false, error: 'Phone number is too long (max 40 characters)' };
    }
  }

  return { valid: true };
}

/**
 * Sanitizes and extracts contact payload from request body
 */
export function extractContactPayload(body: Record<string, unknown>): ContactPayload {
  return {
    firstName: String(body.firstName || '').trim(),
    lastName: String(body.lastName || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    phone: body.phone ? String(body.phone).trim() : undefined,
    message: String(body.message || '').trim(),
    pageUrl: body.pageUrl ? String(body.pageUrl).trim() : undefined,
    userAgent: body.userAgent ? String(body.userAgent).trim() : undefined,
  };
}

