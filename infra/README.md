# BlueFlare Infra (Terraform)

## What this deploys
- Azure Static Web Apps (Standard) for the Vite/React site
- Azure Function App (Linux Consumption, Node 20) for lead capture
- Storage Account:
  - public blob container `media` for images/videos
  - Table Storage tables: `Leads`, `ContactRateLimits`
- PostgreSQL Flexible Server with databases:
  - `umami` - Umami analytics database
- Container Apps environment + apps:
  - Umami analytics (container)
  - Gatus status monitoring (container) - MIT License
- Log Analytics + App Insights

## Deploy
1) Set variables
- Set `site_origin` to your SWA domain (after creation, you can update this)
- Set Graph secrets if you want email from the Function
- Set Postgres password

2) Run
```bash
terraform init
terraform apply
```

## Full Deployment Workflow

The infrastructure and application are deployed separately:

### 1. Terraform provisions infrastructure
```bash
cd infra
terraform init
terraform apply
```

This creates:
- Function App (`blueflare-leads-prod`)
- Storage Account with Tables (`Leads`, `ContactRateLimits`)
- App Settings for Graph email configuration

### 2. Function code is deployed via GitHub Actions

The workflow at `.github/workflows/deploy-functions.yml` triggers on push to `main` when `api/**` files change.

**Setup steps:**
1. Download the publish profile from Azure Portal:
   - Navigate to Function App → **Get publish profile**
2. Add it as a GitHub secret:
   - Repository → Settings → Secrets → Actions
   - Name: `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`
   - Value: (paste the XML content)
3. Push changes to `main` or manually trigger the workflow

### 3. Configure Static Web App

Set the `VITE_LEAD_CAPTURE_URL` environment variable in Azure Static Web Apps:

1. Azure Portal → Static Web App → Settings → Configuration
2. Add application setting:
   - Name: `VITE_LEAD_CAPTURE_URL`
   - Value: `https://blueflare-leads-prod.azurewebsites.net/api/contact`

### 4. Post-deployment verification

After deployment, verify the function is working:

```bash
# Test the endpoint
curl -X POST https://blueflare-leads-prod.azurewebsites.net/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message"}'
```

Expected response: `{"ok":true}`

### Restart after app settings changes

If you update Function App settings (e.g., Graph credentials) via Terraform or Azure Portal, restart the Function App:

```bash
az functionapp restart --name blueflare-leads-prod --resource-group blueflare-prod-rg
```

## Gatus Status Monitoring

Gatus is a lightweight, open-source status monitoring tool deployed as a Container App.
- **License**: MIT (free for commercial use)
- **Repository**: https://github.com/TwiN/gatus

### Accessing Gatus

After deployment, get the Gatus dashboard URL:

```bash
terraform output gatus_url
```

### Gatus Configuration

The following variables can be set in `terraform.tfvars`:

| Variable | Description | Default |
|----------|-------------|---------|
| `gatus_image` | Docker image to use | `twinproduction/gatus:latest` |
| `gatus_title` | Dashboard title | `BlueFlare Status` |
| `gatus_alert_failure_threshold` | Failures before alert | `3` |
| `gatus_alert_success_threshold` | Successes before resolve | `2` |

### Setting Up Alerting

Gatus supports multiple alerting providers. Configure one or more in `terraform.tfvars`:

#### Microsoft Graph API (Recommended - Reuses Existing Credentials)

If you already have Microsoft Graph credentials configured for the Function App, Gatus will **automatically** use them for email alerts via a webhook endpoint. No additional configuration needed!

**Requirements:**
- `graph_tenant_id`, `graph_client_id`, and `graph_client_secret` must be set in `terraform.tfvars`
- The Function App will automatically expose a webhook endpoint at `/api/gatus-webhook`
- Gatus will send alerts to this endpoint, which forwards them via Graph API

**Benefits:**
- ✅ Reuses existing Graph API credentials (no new secrets)
- ✅ Same email infrastructure as contact form
- ✅ No SMTP configuration needed
- ✅ Works with Microsoft 365 / Azure AD

**To enable:**
Just ensure your Graph credentials are set in `terraform.tfvars` (they already are if contact form emails work):
```hcl
graph_tenant_id     = "your-tenant-id"
graph_client_id     = "your-client-id"
graph_client_secret = "your-client-secret"
graph_from_user     = "info@blueflare.com"
graph_to_email      = "alerts@blueflare.com"  # Where to send Gatus alerts
```

Then run `terraform apply` - Gatus will automatically configure the webhook!

#### Slack Alerts

1. Create a Slack webhook:
   - Go to https://api.slack.com/apps
   - Create a new app or use existing
   - Go to "Incoming Webhooks" → Enable → Add New Webhook
   - Copy the webhook URL

2. Add to `terraform.tfvars`:
   ```hcl
   gatus_slack_webhook_url = "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
   ```

3. Apply changes:
   ```bash
   terraform apply
   ```

#### Discord Alerts

1. Create a Discord webhook:
   - Go to your Discord channel → Settings → Integrations → Webhooks
   - Create a new webhook
   - Copy the webhook URL

2. Add to `terraform.tfvars`:
   ```hcl
   gatus_discord_webhook_url = "https://discord.com/api/webhooks/YOUR/WEBHOOK/URL"
   ```

3. Apply changes:
   ```bash
   terraform apply
   ```

#### Email Alerts

1. Configure SMTP settings in `terraform.tfvars`:
   ```hcl
   gatus_email_from = "alerts@blueflare.com"
   gatus_email_to = "ops@blueflare.com"
   gatus_email_smtp_host = "smtp.gmail.com"
   gatus_email_smtp_port = 587
   gatus_email_smtp_username = "your-email@gmail.com"
   gatus_email_smtp_password = "your-app-password"
   ```

   **Note**: For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

2. Apply changes:
   ```bash
   terraform apply
   ```

#### Alert Behavior

- **Failure Threshold**: Alerts are sent after this many consecutive failures (default: 3)
- **Success Threshold**: Alerts are resolved after this many consecutive successes (default: 2)
- **Send on Resolved**: When enabled, you'll receive a notification when the issue is resolved

All monitored endpoints automatically use the configured alerting providers.

### Monitored Endpoints

Gatus is configured to monitor:

1. **BlueFlare Website** - Main website availability
2. **Lead Capture API** - Contact form API endpoint
3. **Umami Analytics** - Analytics service

### Customizing Endpoints

To add or modify monitored endpoints, edit `gatus.tf` and update the config in the init container. Then run:

```bash
terraform apply
```

### Viewing Logs

```bash
az containerapp logs show \
  --name bf-prod-gatus \
  --resource-group blueflare-website-prod-rg \
  --tail 50
```

### Storage

Gatus uses in-memory storage for simplicity. Historical data resets on container restart, but this is typically fine for status monitoring as it rebuilds quickly.

## Outputs Reference

| Output | Description |
|--------|-------------|
| `gatus_url` | HTTPS URL to access Gatus status dashboard |
| `umami_url` | HTTPS URL for Umami analytics |
| `postgres_fqdn` | PostgreSQL server FQDN |
