/**
 * Contact Form HTTP Trigger
 * 
 * Handles POST requests from the frontend contact form.
 * 
 * Features:
 * - CORS preflight handling
 * - Input validation
 * - Rate limiting (5 per IP per day, Chicago timezone)
 * - Lead storage in Azure Table
 * - Email notification via Microsoft Graph
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { validateContactPayload, extractContactPayload } from '../shared/validate.js';
import { checkRateLimit, storeLead } from '../shared/table.js';
import { sendNotificationEmail, isEmailEnabled } from '../shared/graphEmail.js';

// CORS origin - defaults to * for local dev
const CORS_ALLOW_ORIGIN = process.env.CORS_ALLOW_ORIGIN || '*';

/**
 * Gets the allowed origin for CORS based on request
 */
function getAllowedOrigin(request: HttpRequest): string {
  const requestOrigin = request.headers.get('origin');
  const allowedOrigin = CORS_ALLOW_ORIGIN;
  
  // If configured to allow all, return the request origin or *
  if (allowedOrigin === '*' || allowedOrigin === '') {
    return requestOrigin || '*';
  }
  
  // If request origin matches allowed origin, return it
  if (requestOrigin && (allowedOrigin.includes(requestOrigin) || requestOrigin.includes(allowedOrigin))) {
    return requestOrigin;
  }
  
  // Otherwise return configured origin
  return allowedOrigin;
}

/**
 * Creates CORS headers for responses
 */
function getCorsHeaders(request: HttpRequest): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': getAllowedOrigin(request),
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'false',
  };
}

/**
 * Creates a JSON response with CORS headers
 */
function jsonResponse(body: unknown, status: number = 200, request: HttpRequest): HttpResponseInit {
  return {
    status,
    headers: {
      ...getCorsHeaders(request),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}

/**
 * Extracts client IP from request headers
 */
function getClientIp(request: HttpRequest): string {
  // Azure Functions behind proxies/load balancers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  // Azure Functions specific header
  const clientIp = request.headers.get('x-client-ip');
  if (clientIp) {
    return clientIp;
  }

  // Fallback
  return 'unknown';
}

/**
 * Main contact form handler
 */
async function contactHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Contact form request: ${request.method} from ${getClientIp(request)}`);

  // Handle OPTIONS preflight
  if (request.method === 'OPTIONS') {
    return {
      status: 204,
      headers: getCorsHeaders(request),
    };
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, request);
  }

  try {
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400, request);
    }

    // Validate payload
    const validation = validateContactPayload(body);
    if (!validation.valid) {
      context.log(`Validation failed: ${validation.error}`);
      return jsonResponse({ error: validation.error }, 400, request);
    }

    // Extract and sanitize payload
    const payload = extractContactPayload(body as Record<string, unknown>);
    const clientIp = getClientIp(request);

    // Check rate limit
    try {
      const isRateLimited = await checkRateLimit(clientIp, payload.userAgent || '');
      if (isRateLimited) {
        context.log(`Rate limited: IP=${clientIp}`);
        return jsonResponse({ error: 'Too many requests. Please try again tomorrow.' }, 429, request);
      }
    } catch (error) {
      context.error('Rate limit check failed:', error);
      // Don't block submission if rate limiting fails - just log and continue
    }

    // Store lead
    let leadId: string;
    try {
      leadId = await storeLead(payload, clientIp);
      context.log(`Lead stored: ${leadId}`);
    } catch (error) {
      context.error('Failed to store lead:', error);
      return jsonResponse({ error: 'Failed to process submission' }, 500, request);
    }

    // Send email notification (non-blocking - don't fail request if email fails)
    if (isEmailEnabled()) {
      try {
        await sendNotificationEmail(payload, clientIp, leadId);
        context.log('Email notification sent');
      } catch (error) {
        context.error('Failed to send email notification:', error);
        // Don't fail the request - lead is already stored
      }
    } else {
      context.log('Email notifications disabled');
    }

    // Success
    return jsonResponse({ ok: true }, 200, request);

  } catch (error) {
    context.error('Unexpected error:', error);
    return jsonResponse({ error: 'Internal server error' }, 500, request);
  }
}

// Register the HTTP trigger with Azure Functions v4
app.http('contact', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'contact',
  handler: contactHandler,
});

