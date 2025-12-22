/**
 * Azure Table Storage utilities for rate limiting and lead storage
 */

import { TableClient } from '@azure/data-tables';
import { ContactPayload } from './validate.js';
import * as crypto from 'crypto';

// Environment variables with defaults
const RATE_TABLE_NAME = process.env.RATE_TABLE_NAME || 'ContactRateLimits';
const LEADS_TABLE_NAME = process.env.LEADS_TABLE_NAME || 'Leads';
const DAILY_CONTACT_LIMIT = parseInt(process.env.DAILY_CONTACT_LIMIT || '5', 10);

// Table clients (lazy initialized)
let rateTableClient: TableClient | null = null;
let leadsTableClient: TableClient | null = null;

/**
 * Gets the connection string from environment
 */
function getConnectionString(): string {
  // AzureWebJobsStorage is the standard connection string for Functions
  return process.env.AzureWebJobsStorage || 'UseDevelopmentStorage=true';
}

/**
 * Initializes table clients and ensures tables exist
 */
async function ensureTableClients(): Promise<{ rateTable: TableClient; leadsTable: TableClient }> {
  const connectionString = getConnectionString();

  if (!rateTableClient) {
    rateTableClient = TableClient.fromConnectionString(connectionString, RATE_TABLE_NAME);
    try {
      await rateTableClient.createTable();
    } catch (error: unknown) {
      // Table already exists - ignore
      if ((error as { statusCode?: number }).statusCode !== 409) {
        throw error;
      }
    }
  }

  if (!leadsTableClient) {
    leadsTableClient = TableClient.fromConnectionString(connectionString, LEADS_TABLE_NAME);
    try {
      await leadsTableClient.createTable();
    } catch (error: unknown) {
      // Table already exists - ignore
      if ((error as { statusCode?: number }).statusCode !== 409) {
        throw error;
      }
    }
  }

  return { rateTable: rateTableClient, leadsTable: leadsTableClient };
}

/**
 * Gets the current day key in America/Chicago timezone
 * Format: YYYY-MM-DD
 */
function getChicagoDayKey(): string {
  const now = new Date();
  // Format date in Chicago timezone
  const chicagoDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  
  return chicagoDate; // Returns YYYY-MM-DD format
}

/**
 * Creates a hash of the user agent for rate limiting
 */
function hashUserAgent(userAgent: string): string {
  return crypto.createHash('sha256').update(userAgent || 'unknown').digest('hex').substring(0, 16);
}

/**
 * Generates a UUID v4
 */
function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Checks if IP has exceeded rate limit for the current day
 * Returns true if rate limited, false if OK to proceed
 */
export async function checkRateLimit(ip: string, userAgent: string): Promise<boolean> {
  const { rateTable } = await ensureTableClients();
  
  const dayKey = getChicagoDayKey();
  const uaHash = hashUserAgent(userAgent);
  const partitionKey = 'contact';
  const rowKey = `${ip}_${uaHash}_${dayKey}`;

  try {
    // Try to get existing entity
    const entity = await rateTable.getEntity(partitionKey, rowKey);
    const count = (entity.count as number) || 0;
    
    if (count >= DAILY_CONTACT_LIMIT) {
      return true; // Rate limited
    }

    // Increment counter
    await rateTable.updateEntity(
      {
        partitionKey,
        rowKey,
        count: count + 1,
        lastRequest: new Date().toISOString(),
      },
      'Merge'
    );

    return false; // Not rate limited
  } catch (error: unknown) {
    // Entity doesn't exist - create it
    if ((error as { statusCode?: number }).statusCode === 404) {
      await rateTable.createEntity({
        partitionKey,
        rowKey,
        ip,
        uaHash,
        dayKey,
        count: 1,
        createdAt: new Date().toISOString(),
        lastRequest: new Date().toISOString(),
      });
      return false; // Not rate limited
    }
    throw error;
  }
}

/**
 * Stores a lead in the Leads table
 */
export async function storeLead(
  payload: ContactPayload,
  ipAddress: string
): Promise<string> {
  const { leadsTable } = await ensureTableClients();
  
  const rowKey = generateUUID();
  const submittedAt = new Date().toISOString();

  await leadsTable.createEntity({
    partitionKey: 'lead',
    rowKey,
    submittedAt,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone || '',
    message: payload.message,
    pageUrl: payload.pageUrl || '',
    userAgent: payload.userAgent || '',
    ipAddress,
  });

  return rowKey;
}

