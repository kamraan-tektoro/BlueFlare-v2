# Terraform Setup Guide - After Reset

## Step-by-Step Setup Instructions

### 1. Deploy Infrastructure with Terraform

```bash
cd infra
terraform init
terraform apply
```

This creates:
- Resource Group
- Static Web App
- Function App
- Storage Account
- PostgreSQL Server
- Container Apps (Umami, Gatus)
- All supporting resources

### 2. Get Function App URL

After `terraform apply` completes, get the Function App URL:

```bash
terraform output lead_capture_endpoint
```

**Example output:**
```
lead_capture_endpoint = "https://blueflare-website-leads-prod.azurewebsites.net/api/contact"
```

### 3. Configure VITE_LEAD_CAPTURE_URL

**VITE_LEAD_CAPTURE_URL is NOT set by Terraform** - it must be configured manually in Azure Static Web Apps.

#### Option A: Azure Portal (Recommended)

1. Go to Azure Portal
2. Navigate to: **Static Web App** → `blueflare-website-prod`
3. Go to **Settings** → **Configuration**
4. Click **"Application settings"** tab
5. Click **"+ Add"**
6. Add new setting:
   - **Name:** `VITE_LEAD_CAPTURE_URL`
   - **Value:** `https://blueflare-website-leads-prod.azurewebsites.net/api/contact`
     (Use the value from `terraform output lead_capture_endpoint`)
7. Click **"OK"** then **"Save"**

#### Option B: Azure CLI

```bash
# Get the Function App URL from Terraform
FUNCTION_URL=$(terraform output -raw lead_capture_endpoint)

# Set the environment variable in Static Web App
az staticwebapp appsettings set \
  --name blueflare-website-prod \
  --resource-group blueflare-website-prod-rg \
  --setting-names VITE_LEAD_CAPTURE_URL="$FUNCTION_URL"
```

#### Option C: GitHub Actions (Build-time)

If using GitHub Actions workflow, add to GitHub Secrets:
- **Secret name:** `VITE_LEAD_CAPTURE_URL`
- **Value:** `https://blueflare-website-leads-prod.azurewebsites.net/api/contact`

---

## 4. Enable Microsoft Graph API

### Step 1: Create Azure AD App Registration

1. Go to Azure Portal → **Azure Active Directory** → **App registrations**
2. Click **"+ New registration"**
3. Fill in:
   - **Name:** `BlueFlare-Website-GraphAPI`
   - **Supported account types:** Single tenant
   - Click **"Register"**

### Step 2: Create Client Secret

1. In your App Registration → **Certificates & secrets**
2. Click **"+ New client secret"**
3. Fill in:
   - **Description:** `Graph API Secret`
   - **Expires:** Choose expiration (recommend 24 months)
4. Click **"Add"**
5. **IMPORTANT:** Copy the **Value** immediately (you won't see it again!)
   - This is your `graph_client_secret`

### Step 3: Grant API Permissions

1. In App Registration → **API permissions**
2. Click **"+ Add a permission"**
3. Select **Microsoft Graph**
4. Select **Application permissions** (not Delegated)
5. Add these permissions:
   - `Mail.Send` (under Mail)
6. Click **"Add permissions"**
7. Click **"Grant admin consent"** (important!)

### Step 4: Configure Mailbox Permissions

The app needs permission to send emails from a specific mailbox:

1. Go to **Exchange Admin Center** (if using Microsoft 365)
   - Or use PowerShell: `Connect-ExchangeOnline`
2. Run:
   ```powershell
   # Grant the app permission to send as the mailbox
   Add-MailboxPermission -Identity "services@tektoro.com" `
     -User "YOUR_APP_CLIENT_ID" `
     -AccessRights FullAccess `
     -InheritanceType All
   ```
   
   **OR** use Azure AD:
   - Go to **Azure AD** → **Users** → Find the mailbox user
   - **Manage** → **Mail** → Grant app permissions

### Step 5: Add Credentials to Terraform

Edit `infra/terraform.tfvars`:

```hcl
# ----------------------------------------
# Microsoft Graph Email
# ----------------------------------------
graph_tenant_id     = "YOUR_TENANT_ID"           # From Azure AD Overview page
graph_client_id     = "YOUR_CLIENT_ID"           # From App Registration Overview
graph_client_secret = "YOUR_CLIENT_SECRET_VALUE"  # From Step 2 (the secret value)
graph_from_user     = "services@tektoro.com"      # Mailbox to send FROM
graph_to_email      = "k@tektoro.com"            # Email to send TO
```

**How to find Tenant ID:**
- Azure Portal → Azure Active Directory → **Overview** → **Tenant ID**

**How to find Client ID:**
- Azure Portal → App Registration → Your app → **Overview** → **Application (client) ID**

### Step 6: Apply Terraform Changes

```bash
cd infra
terraform apply
```

This will:
- Set Graph credentials as Function App environment variables
- Configure Gatus webhook to use Graph API (if credentials are set)

### Step 7: Restart Function App

After applying Terraform, restart the Function App:

```bash
az functionapp restart \
  --name blueflare-website-leads-prod \
  --resource-group blueflare-website-prod-rg
```

---

## 5. Verify Everything Works

### Test Contact Form

1. Visit your Static Web App URL:
   ```bash
   terraform output static_web_app_url
   ```
2. Go to the Contact page
3. Submit the form
4. Check that:
   - Form submits successfully
   - Email is received at `graph_to_email`
   - Lead is stored in Azure Table Storage

### Test Gatus Alerting

1. Get Gatus URL:
   ```bash
   terraform output gatus_url
   ```
2. Visit the Gatus dashboard
3. Wait for alerts (or manually break an endpoint)
4. Check that email alerts are sent via Graph API

### Check Function App Logs

```bash
az functionapp logs tail \
  --name blueflare-website-leads-prod \
  --resource-group blueflare-website-prod-rg
```

Look for:
- ✅ "Email sent successfully" messages
- ❌ Any Graph API authentication errors

---

## Quick Reference: All Required Values

### Terraform Variables (`terraform.tfvars`)

```hcl
# Graph API (Required for email)
graph_tenant_id     = "<from Azure AD Overview>"
graph_client_id     = "<from App Registration Overview>"
graph_client_secret = "<from App Registration Secrets>"
graph_from_user     = "services@tektoro.com"
graph_to_email      = "k@tektoro.com"
```

### Azure Static Web App Configuration

**Setting Name:** `VITE_LEAD_CAPTURE_URL`  
**Value:** `https://blueflare-website-leads-prod.azurewebsites.net/api/contact`

(Get exact URL from: `terraform output lead_capture_endpoint`)

---

## Troubleshooting

### Contact Form Not Working

1. **Check VITE_LEAD_CAPTURE_URL is set:**
   ```bash
   az staticwebapp appsettings list \
     --name blueflare-website-prod \
     --resource-group blueflare-website-prod-rg
   ```

2. **Verify Function App is running:**
   ```bash
   curl https://blueflare-website-leads-prod.azurewebsites.net/api/contact
   ```

### Graph API Not Working

1. **Check Function App environment variables:**
   ```bash
   az functionapp config appsettings list \
     --name blueflare-website-leads-prod \
     --resource-group blueflare-website-prod-rg \
     --query "[?name=='GRAPH_TENANT_ID' || name=='GRAPH_CLIENT_ID']"
   ```

2. **Check Function App logs for errors:**
   ```bash
   az functionapp logs tail \
     --name blueflare-website-leads-prod \
     --resource-group blueflare-website-prod-rg
   ```

3. **Common issues:**
   - ❌ Missing "Grant admin consent" on API permissions
   - ❌ Wrong tenant ID or client ID
   - ❌ Client secret expired or incorrect
   - ❌ App doesn't have permission to send from mailbox

### Gatus Alerts Not Working

1. **Check if webhook is configured:**
   - Visit Gatus dashboard → Check config
   - Should show webhook URL: `https://.../api/gatus-webhook`

2. **Test webhook manually:**
   ```bash
   curl -X POST https://blueflare-website-leads-prod.azurewebsites.net/api/gatus-webhook \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","status":"UNHEALTHY","url":"https://example.com","group":"Test","timestamp":"2024-01-01T00:00:00Z","conditionResults":[]}'
   ```

3. **Check Function App logs** for webhook processing

---

## Summary Checklist

After Terraform reset, ensure:

- [ ] Terraform applied successfully
- [ ] `VITE_LEAD_CAPTURE_URL` set in Static Web App (Azure Portal)
- [ ] Graph API App Registration created
- [ ] Graph API permissions granted (Mail.Send)
- [ ] Admin consent granted
- [ ] Graph credentials added to `terraform.tfvars`
- [ ] Terraform applied again (to set Graph env vars)
- [ ] Function App restarted
- [ ] Contact form tested
- [ ] Email received successfully
- [ ] Gatus alerts working (if configured)

