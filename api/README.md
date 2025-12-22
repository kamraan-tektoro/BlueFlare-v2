# BlueFlare API (Azure Functions)

Azure Functions backend for the BlueFlare contact form. Built with Node.js 18, TypeScript, and Azure Functions v4.

## Features

- **HTTP Trigger** at `/api/contact` for form submissions
- **CORS** handling with configurable origins
- **Validation** for required fields
- **Rate Limiting** (5 requests per IP per day, America/Chicago timezone)
- **Lead Storage** in Azure Table Storage
- **Email Notifications** via Microsoft Graph API

## Prerequisites

- Node.js 18+
- Azure Functions Core Tools v4 (`npm install -g azure-functions-core-tools@4`)
- Azurite (for local Table Storage emulation) or Azure Storage connection

## Local Development

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Configure Local Settings

Copy the sample and fill in your values:

```bash
# local.settings.json is gitignored - create it manually
```

**Sample `local.settings.json`:**

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "CORS_ALLOW_ORIGIN": "*",
    "RATE_TABLE_NAME": "ContactRateLimits",
    "LEADS_TABLE_NAME": "Leads",
    "DAILY_CONTACT_LIMIT": "5",
    "EMAIL_MODE": "none",
    "GRAPH_TENANT_ID": "",
    "GRAPH_CLIENT_ID": "",
    "GRAPH_CLIENT_SECRET": "",
    "GRAPH_FROM_USER": "noreply@yourdomain.com",
    "GRAPH_TO_EMAIL": "leads@yourdomain.com",
    "CONTACT_SUBJECT_PREFIX": "[BlueFlare Contact]"
  },
  "Host": {
    "CORS": "*",
    "CORSCredentials": false
  }
}
```

### 3. Start Local Storage Emulator

If using Azurite for local development:

```bash
# Install Azurite globally
npm install -g azurite

# Start Azurite (in a separate terminal)
azurite --silent --location /tmp/azurite --debug /tmp/azurite/debug.log
```

Or use the Docker version:

```bash
docker run -p 10000:10000 -p 10001:10001 -p 10002:10002 mcr.microsoft.com/azure-storage/azurite
```

### 4. Build & Run

```bash
# Build TypeScript
npm run build

# Start the Functions host
npm start
# or
func start
```

The function will be available at: `http://localhost:7071/api/contact`

## Testing with curl

### Successful Submission

```bash
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1-555-123-4567",
    "message": "Hello, I am interested in your services.",
    "pageUrl": "https://example.com/contact",
    "userAgent": "curl/test"
  }'
```

Expected response: `{"ok":true}`

### Validation Error (missing email)

```bash
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "message": "Test message"
  }'
```

Expected response: `{"error":"Email is required"}` (HTTP 400)

### CORS Preflight

```bash
curl -X OPTIONS http://localhost:7071/api/contact \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CORS_ALLOW_ORIGIN` | Allowed CORS origin | `*` |
| `RATE_TABLE_NAME` | Table name for rate limits | `ContactRateLimits` |
| `LEADS_TABLE_NAME` | Table name for leads | `Leads` |
| `DAILY_CONTACT_LIMIT` | Max submissions per IP per day | `5` |
| `EMAIL_MODE` | Set to `none` to disable emails | - |
| `GRAPH_TENANT_ID` | Azure AD tenant ID for Graph API | - |
| `GRAPH_CLIENT_ID` | App registration client ID | - |
| `GRAPH_CLIENT_SECRET` | App registration client secret | - |
| `GRAPH_FROM_USER` | Sender mailbox UPN | - |
| `GRAPH_TO_EMAIL` | Recipient email address | - |
| `CONTACT_SUBJECT_PREFIX` | Email subject prefix | `[BlueFlare Contact]` |

## Project Structure

```
api/
├── host.json              # Azure Functions host configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── local.settings.json    # Local dev settings (gitignored)
└── src/
    ├── functions/
    │   └── contact.ts     # HTTP trigger for contact form
    └── shared/
        ├── validate.ts    # Input validation
        ├── table.ts       # Azure Table Storage operations
        └── graphEmail.ts  # Microsoft Graph email helper
```

## Deployment

The API is deployed automatically via GitHub Actions when changes are pushed to `main`.

See the workflow at `.github/workflows/deploy-functions.yml`.

### Manual Deployment

```bash
# Build
npm run build

# Deploy using Azure Functions Core Tools
func azure functionapp publish blueflare-leads-prod
```

