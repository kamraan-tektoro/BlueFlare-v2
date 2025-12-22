# Where Are Leads Stored?

## Storage Location

**Leads are stored in Azure Table Storage, NOT PostgreSQL!**

- **Storage Account:** `bfprodtsc6g9`
- **Table Name:** `Leads`
- **Resource Group:** `blueflare-website-prod-rg`
- **Location:** Azure Table Storage (NoSQL)

---

## Lead Data Structure

Each lead is stored as a table entity with:

| Field | Type | Description |
|-------|------|-------------|
| `PartitionKey` | String | Always `"lead"` |
| `RowKey` | String | Unique UUID (e.g., `"a1b2c3d4-e5f6-7890-abcd-ef1234567890"`) |
| `submittedAt` | String | ISO timestamp (e.g., `"2025-12-22T18:30:00.000Z"`) |
| `firstName` | String | Contact's first name |
| `lastName` | String | Contact's last name |
| `email` | String | Contact's email address |
| `phone` | String | Contact's phone number (optional) |
| `message` | String | Contact's message |
| `pageUrl` | String | URL where form was submitted |
| `userAgent` | String | Browser user agent |
| `ipAddress` | String | Client IP address |

---

## How to View Leads

### Method 1: Azure Portal (Easiest)

1. **Go to Azure Portal:** https://portal.azure.com
2. **Search for:** `bfprodtsc6g9` (storage account name)
3. **Click on:** Storage Account → `bfprodtsc6g9`
4. **In left sidebar:** Click **"Storage browser"** (or **"Tables"**)
5. **Click on:** `Leads` table
6. **View leads:** You'll see all lead entries with their data

**Visual Path:**
```
Azure Portal → Storage Account (bfprodtsc6g9) → Storage browser → Tables → Leads
```

### Method 2: Azure Storage Explorer (Desktop App)

1. **Download:** https://azure.microsoft.com/features/storage-explorer/
2. **Connect to Azure:**
   - Sign in with your Azure account
   - Navigate to: **Storage Accounts** → `bfprodtsc9` → **Tables** → `Leads`
3. **View/Export:** Right-click table → **Query Entities** or **Export**

### Method 3: Azure CLI

```bash
# List all entities in Leads table
az storage entity query \
  --account-name bfprodtsc6g9 \
  --table-name Leads \
  --output table

# Query specific leads (e.g., by email)
az storage entity query \
  --account-name bfprodtsc6g9 \
  --table-name Leads \
  --filter "email eq 'user@example.com'" \
  --output table

# Get connection string (needed for some tools)
az storage account show-connection-string \
  --name bfprodtsc6g9 \
  --resource-group blueflare-website-prod-rg \
  --query connectionString \
  --output tsv
```

### Method 4: Python Script

```python
from azure.data.tables import TableClient
from azure.core.credentials import AzureNamedKeyCredential
import os

# Get connection string from Azure Portal or environment
connection_string = "DefaultEndpointsProtocol=https;AccountName=bfprodtsc6g9;AccountKey=YOUR_KEY;EndpointSuffix=core.windows.net"

# Connect to table
table_client = TableClient.from_connection_string(
    connection_string, 
    table_name="Leads"
)

# Query all leads
entities = table_client.query_entities(query_filter="PartitionKey eq 'lead'")

for entity in entities:
    print(f"Lead ID: {entity['RowKey']}")
    print(f"Name: {entity['firstName']} {entity['lastName']}")
    print(f"Email: {entity['email']}")
    print(f"Submitted: {entity['submittedAt']}")
    print(f"Message: {entity['message'][:100]}...")
    print("-" * 50)
```

### Method 5: Node.js Script

```javascript
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const connectionString = "DefaultEndpointsProtocol=https;AccountName=bfprodtsc6g9;AccountKey=YOUR_KEY;EndpointSuffix=core.windows.net";

const tableClient = TableClient.fromConnectionString(
  connectionString,
  "Leads"
);

// Query all leads
async function getLeads() {
  const entities = tableClient.listEntities();
  
  for await (const entity of entities) {
    console.log(`Lead ID: ${entity.rowKey}`);
    console.log(`Name: ${entity.firstName} ${entity.lastName}`);
    console.log(`Email: ${entity.email}`);
    console.log(`Submitted: ${entity.submittedAt}`);
    console.log(`Message: ${entity.message?.substring(0, 100)}...`);
    console.log("-".repeat(50));
  }
}

getLeads().catch(console.error);
```

---

## Get Storage Account Connection String

To use tools or scripts, you need the connection string:

**Azure Portal:**
1. Storage Account → `bfprodtsc6g9`
2. **Access keys** (left sidebar)
3. Click **"Show"** next to `key1` or `key2`
4. Copy **"Connection string"**

**Azure CLI:**
```bash
az storage account show-connection-string \
  --name bfprodtsc6g9 \
  --resource-group blueflare-website-prod-rg \
  --query connectionString \
  --output tsv
```

---

## Export Leads to CSV

### Using Azure Storage Explorer

1. Open Azure Storage Explorer
2. Navigate to: Storage Account → Tables → Leads
3. Right-click → **Export** → Choose CSV format
4. Save file

### Using Python

```python
import csv
from azure.data.tables import TableClient

connection_string = "YOUR_CONNECTION_STRING"
table_client = TableClient.from_connection_string(connection_string, "Leads")

# Query all leads
entities = table_client.query_entities(query_filter="PartitionKey eq 'lead'")

# Write to CSV
with open('leads.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['RowKey', 'submittedAt', 'firstName', 'lastName', 'email', 'phone', 'message', 'pageUrl', 'ipAddress']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    
    for entity in entities:
        writer.writerow({
            'RowKey': entity['RowKey'],
            'submittedAt': entity['submittedAt'],
            'firstName': entity['firstName'],
            'lastName': entity['lastName'],
            'email': entity['email'],
            'phone': entity.get('phone', ''),
            'message': entity['message'],
            'pageUrl': entity.get('pageUrl', ''),
            'ipAddress': entity['ipAddress']
        })

print("Leads exported to leads.csv")
```

---

## Rate Limiting Table

There's also a `ContactRateLimits` table that tracks:
- IP addresses
- Daily submission counts
- Rate limiting data

**Table Name:** `ContactRateLimits`  
**Purpose:** Prevents spam (5 submissions per IP per day)

---

## Important Notes

### Why Table Storage?

- ✅ **Fast writes** - Optimized for high-throughput writes
- ✅ **Cost-effective** - Very cheap for storing structured data
- ✅ **Scalable** - Handles millions of entities
- ✅ **No SQL needed** - Simple key-value storage
- ✅ **Integrated** - Works seamlessly with Azure Functions

### Not PostgreSQL

- ❌ Leads are **NOT** in PostgreSQL
- ✅ PostgreSQL is only used for **Umami analytics** (website analytics)
- ✅ Leads are in **Azure Table Storage**

---

## Quick Reference

| Item | Value |
|------|-------|
| **Storage Type** | Azure Table Storage |
| **Storage Account** | `bfprodtsc6g9` |
| **Table Name** | `Leads` |
| **Partition Key** | `lead` |
| **Row Key** | UUID (unique per lead) |
| **Resource Group** | `blueflare-website-prod-rg` |

---

## Troubleshooting

### Can't See Table in Portal?

1. **Check Storage Account:** Make sure you're looking at `bfprodtsc6g9`
2. **Check Resource Group:** Should be `blueflare-website-prod-rg`
3. **Table Name:** Case-sensitive, must be exactly `Leads`
4. **Wait:** Tables are created automatically on first lead submission

### No Leads Showing?

1. **Check if form is working:** Test form submission
2. **Check Function App logs:** Azure Portal → Function App → Logs
3. **Verify table exists:** Azure Portal → Storage Account → Tables

### Need to Query Specific Leads?

Use Azure Storage Explorer or Azure CLI with filters:
```bash
# Leads from specific email
az storage entity query \
  --account-name bfprodtsc6g9 \
  --table-name Leads \
  --filter "email eq 'user@example.com'"

# Leads from today
az storage entity query \
  --account-name bfprodtsc6g9 \
  --table-name Leads \
  --filter "submittedAt ge '2025-12-22T00:00:00Z'"
```

