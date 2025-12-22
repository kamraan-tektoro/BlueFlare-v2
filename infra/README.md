# BlueFlare Infra (Terraform)

## What this deploys
- Azure Static Web Apps (Standard) for the Vite/React site
- Azure Function App (Linux Consumption, Node 18) for lead capture
- Storage Account:
  - public blob container `media` for images/videos
  - Table Storage tables: `Leads`, `ContactRateLimits`
  - Azure Files share for Uptime Kuma persistence
- Container Apps environment + apps:
  - Umami analytics (container) + Managed Postgres
  - Uptime Kuma monitoring (container) + persistent volume
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
