/**
 * Gatus Webhook HTTP Trigger
 * 
 * Receives webhook alerts from Gatus and sends emails via Microsoft Graph API
 * Reuses the same Graph credentials as the contact form
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { sendGatusAlertEmail, GatusWebhookPayload } from '../shared/graphEmail.js';

/**
 * Helper to create JSON responses
 */
function jsonResponse(body: object, status: number = 200): HttpResponseInit {
  return {
    status,
    jsonBody: body,
  };
}

/**
 * Handler for Gatus webhook alerts
 */
async function gatusWebhookHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // Only accept POST requests
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed. Use POST.' }, 405);
  }

  try {
    const payload = await request.json() as GatusWebhookPayload;

    // Validate required fields
    if (!payload.name || !payload.status || !payload.url) {
      return jsonResponse(
        { error: 'Missing required fields: name, status, url' },
        400
      );
    }

    // Send email via Graph API (reuses existing Graph credentials)
    await sendGatusAlertEmail(payload);

    context.log(`Gatus alert processed: ${payload.name} - ${payload.status}`);

    return jsonResponse({ ok: true, message: 'Alert processed' });
  } catch (error) {
    context.error('Error processing Gatus webhook:', error);
    return jsonResponse(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    );
  }
}

// Register the HTTP trigger with Azure Functions v4
app.http('gatusWebhook', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'gatus-webhook',
  handler: gatusWebhookHandler,
});

