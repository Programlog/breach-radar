import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

/**
 * Validates email format and checks if domain has MX record
 */
export async function validateEmail(email: string): Promise<boolean> {
  try {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Extract domain
    const domain = email.split('@')[1];
    if (!domain) {
      return false;
    }

    // Check MX record exists
    try {
      const mxRecords = await resolveMx(domain);
      return mxRecords && mxRecords.length > 0;
    } catch (error) {
      return false;
    }
  } catch (error) {
    console.error('Email validation error:', error);
    return false;
  }
}

/**
 * Sanitizes email address
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Rate limiting helper for specific endpoints
 */
export function createRateLimit(windowMs: number, max: number) {
  return {
    windowMs,
    max,
    message: {
      error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  };
} 