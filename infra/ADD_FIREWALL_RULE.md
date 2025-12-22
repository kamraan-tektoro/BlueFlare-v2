# Add Railway App to PostgreSQL Firewall

## Railway App Details

- **URL:** https://drizzle-gateway-production-2856.up.railway.app/
- **Resolved IP:** `66.33.22.221` (may change - Railway uses dynamic IPs)

---

## Method 1: Azure Portal (UI) - Step by Step

### Step 1: Navigate to PostgreSQL Server

1. Go to **Azure Portal**: https://portal.azure.com
2. In the search bar, type: `blueflare-website-prod-pg`
3. Click on your PostgreSQL Flexible Server: **`blueflare-website-prod-pg-tsc6g9`**

### Step 2: Open Firewall Rules

1. In the left sidebar, under **Settings**, click **"Networking"**
2. You'll see the **Firewall rules** section

### Step 3: Add Firewall Rule

1. Click **"+ Add firewall rule"** button (top of the page)
2. Fill in the form:
   - **Rule name:** `Railway-Drizzle-Gateway` (or any descriptive name)
   - **Start IP address:** `66.33.22.221`
   - **End IP address:** `66.33.22.221`
3. Click **"Save"** (bottom of the form)

### Step 4: Verify

1. You should see the new rule in the firewall rules list
2. Status should show as active/enabled

**Visual Guide:**
```
Azure Portal → PostgreSQL Server → Networking → Firewall rules
→ [+ Add firewall rule]
  Rule name: Railway-Drizzle-Gateway
  Start IP: 66.33.22.221
  End IP: 66.33.22.221
→ [Save]
```

---

## Method 2: Azure CLI (Quick)

```bash
# Add firewall rule for Railway app
az postgres flexible-server firewall-rule create \
  --resource-group blueflare-website-prod-rg \
  --name blueflare-website-prod-pg-tsc6g9 \
  --rule-name "Railway-Drizzle-Gateway" \
  --start-ip-address "66.33.22.221" \
  --end-ip-address "66.33.22.221"
```

**Verify it was added:**
```bash
az postgres flexible-server firewall-rule list \
  --resource-group blueflare-website-prod-rg \
  --name blueflare-website-prod-pg-tsc6g9 \
  --query "[?name=='Railway-Drizzle-Gateway']"
```

---

## Method 3: Terraform (Permanent)

Add to `infra/main.tf`:

```hcl
# Firewall rule for Railway Drizzle Gateway
resource "azurerm_postgresql_flexible_server_firewall_rule" "railway_drizzle" {
  name             = "Railway-Drizzle-Gateway"
  server_id        = azurerm_postgresql_flexible_server.pg.id
  start_ip_address = "66.33.22.221"
  end_ip_address   = "66.33.22.221"
}
```

Then run:
```bash
cd infra
terraform plan  # Review changes
terraform apply # Apply changes
```

---

## Important Notes

### ⚠️ Railway Dynamic IPs

**Railway apps can have dynamic IP addresses!** The IP `66.33.22.221` may change if:
- The Railway app restarts
- Railway redeploys the app
- Railway changes infrastructure

### Solutions for Dynamic IPs:

#### Option A: Allow Railway IP Range (if available)
Check Railway documentation for their IP ranges and allow the entire range.

#### Option B: Use Private Networking (Recommended for Production)
- Set up Azure Private Link
- Connect Railway via VPN/Private Endpoint
- No firewall rules needed

#### Option C: Update Firewall Rule Periodically
- Monitor Railway app IP changes
- Update firewall rule when IP changes
- Use Railway webhooks/API to automate

#### Option D: Allow All Azure Services (Less Secure)
```bash
# Allow all Azure services (0.0.0.0 - 0.0.0.0)
az postgres flexible-server firewall-rule create \
  --resource-group blueflare-website-prod-rg \
  --name blueflare-website-prod-pg-tsc6g9 \
  --rule-name "AllowAzureServices" \
  --start-ip-address "0.0.0.0" \
  --end-ip-address "0.0.0.0"
```

**⚠️ Warning:** This allows ALL Azure services, which is less secure.

---

## Test Connection from Railway

After adding the firewall rule, test the connection:

```bash
# From Railway app or Railway CLI
PGPASSWORD='@Postgres2025!' psql \
  -h blueflare-website-prod-pg-tsc6g9.postgres.database.azure.com \
  -p 5432 \
  -U umamiadmin \
  -d umami \
  -c "SELECT version();"
```

---

## Current Firewall Rules

To see all current firewall rules:

**Azure Portal:**
- PostgreSQL Server → Networking → Firewall rules

**Azure CLI:**
```bash
az postgres flexible-server firewall-rule list \
  --resource-group blueflare-website-prod-rg \
  --name blueflare-website-prod-pg-tsc6g9 \
  --output table
```

---

## Troubleshooting

### Connection Still Fails?

1. **Verify IP hasn't changed:**
   ```bash
   nslookup drizzle-gateway-production-2856.up.railway.app
   ```

2. **Check firewall rule exists:**
   - Azure Portal → Networking → Firewall rules
   - Look for "Railway-Drizzle-Gateway"

3. **Test from Railway:**
   - Check Railway app logs for connection errors
   - Verify Railway app has network access

4. **Check Railway IP:**
   - Railway dashboard → Your app → Settings → Network
   - May show current outbound IP

---

## Quick Reference

**PostgreSQL Server:** `blueflare-website-prod-pg-tsc6g9`  
**Resource Group:** `blueflare-website-prod-rg`  
**Railway IP:** `66.33.22.221` (check periodically - may change)  
**Railway URL:** https://drizzle-gateway-production-2856.up.railway.app/

