/**
 * Microsoft Graph email helper using client credentials flow
 */

import { ContactPayload } from './validate.js';

// Environment variables for Graph API
const GRAPH_TENANT_ID = process.env.GRAPH_TENANT_ID;
const GRAPH_CLIENT_ID = process.env.GRAPH_CLIENT_ID;
const GRAPH_CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET;
const GRAPH_FROM_USER = process.env.GRAPH_FROM_USER;
const GRAPH_TO_EMAIL = process.env.GRAPH_TO_EMAIL;
const CONTACT_SUBJECT_PREFIX = process.env.CONTACT_SUBJECT_PREFIX || '[BlueFlare Contact]';
const EMAIL_MODE = process.env.EMAIL_MODE;

// Token cache
let cachedToken: { accessToken: string; expiresAt: number } | null = null;

/**
 * Checks if email is enabled via configuration
 */
export function isEmailEnabled(): boolean {
  if (EMAIL_MODE === 'none') {
    return false;
  }
  return !!(GRAPH_TENANT_ID && GRAPH_CLIENT_ID && GRAPH_CLIENT_SECRET && GRAPH_FROM_USER && GRAPH_TO_EMAIL);
}

/**
 * Gets an access token using client credentials flow
 */
async function getAccessToken(): Promise<string> {
  // Check cache
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.accessToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${GRAPH_TENANT_ID}/oauth2/v2.0/token`;
  
  const body = new URLSearchParams({
    client_id: GRAPH_CLIENT_ID!,
    client_secret: GRAPH_CLIENT_SECRET!,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
  }

  const data = await response.json() as { access_token: string; expires_in: number };
  
  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in * 1000),
  };

  return cachedToken.accessToken;
}

/**
 * Formats the email body from contact payload
 */
function formatEmailBody(payload: ContactPayload, ipAddress: string, leadId: string): string {
  const lines = [
    `<h2>New Contact Form Submission</h2>`,
    `<p><strong>Lead ID:</strong> ${leadId}</p>`,
    `<hr>`,
    `<p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>`,
    `<p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>`,
  ];

  if (payload.phone) {
    lines.push(`<p><strong>Phone:</strong> ${payload.phone}</p>`);
  }

  lines.push(
    `<hr>`,
    `<p><strong>Message:</strong></p>`,
    `<p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>`,
    `<hr>`,
    `<p style="color: #666; font-size: 12px;"><strong>Page URL:</strong> ${payload.pageUrl || 'N/A'}</p>`,
    `<p style="color: #666; font-size: 12px;"><strong>IP Address:</strong> ${ipAddress}</p>`,
    `<p style="color: #666; font-size: 12px;"><strong>User Agent:</strong> ${payload.userAgent || 'N/A'}</p>`,
  );

  return lines.join('\n');
}

/**
 * Escapes HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends notification email via Microsoft Graph
 */
export async function sendNotificationEmail(
  payload: ContactPayload,
  ipAddress: string,
  leadId: string
): Promise<void> {
  if (!isEmailEnabled()) {
    console.log('Email is disabled - skipping notification');
    return;
  }

  const accessToken = await getAccessToken();
  
  const subject = `${CONTACT_SUBJECT_PREFIX} ${payload.firstName} ${payload.lastName}`;
  const htmlBody = formatEmailBody(payload, ipAddress, leadId);

  // Graph API sendMail endpoint
  const sendMailUrl = `https://graph.microsoft.com/v1.0/users/${GRAPH_FROM_USER}/sendMail`;

  const mailPayload = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: htmlBody,
      },
      toRecipients: [
        {
          emailAddress: {
            address: GRAPH_TO_EMAIL,
          },
        },
      ],
      replyTo: [
        {
          emailAddress: {
            address: payload.email,
            name: `${payload.firstName} ${payload.lastName}`,
          },
        },
      ],
    },
    saveToSentItems: true,
  };

  const response = await fetch(sendMailUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mailPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send email: ${response.status} ${errorText}`);
  }
}

