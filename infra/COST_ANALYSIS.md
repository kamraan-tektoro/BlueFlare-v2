# Infrastructure Deployment Analysis & Cost Estimate (v2)

> **Updated**: December 2024  
> **Changes**: Replaced Container Apps-based Uptime Kuma with VM deployment for SQLite WAL compatibility

---

## 📦 Resources to be Deployed

### 1. **Core Infrastructure**
- **Resource Group** (`blueflare-website-prod-rg`)
  - Free (organizational container)

### 2. **Static Web App** (Standard Tier)
- **Name**: `blueflare-website-prod`
- **Tier**: Standard
- **Purpose**: Hosts the React/Vite frontend
- **Features**: 
  - Custom domains
  - SSL certificates
  - Staging environments
  - Authentication/authorization

### 3. **Azure Function App** (Linux Consumption Plan)
- **Name**: `blueflare-website-leads-prod`
- **Plan**: Consumption (Y1) - Pay-per-execution
- **Runtime**: Node.js 20
- **Purpose**: 
  - Lead capture API endpoint (`/api/contact`)
  - Rate limiting (5 submissions/IP/day)
  - Stores leads in Table Storage
  - Sends emails via Microsoft Graph API

### 4. **Storage Account** (Standard LRS)
- **Name**: `bfprod{random6chars}`
- **Tier**: Standard
- **Replication**: LRS (Locally Redundant Storage)
- **Components**:
  - **Blob Container** (`media`): Public read access for images/videos
  - **Table Storage**:
    - `Leads` table (contact form submissions)
    - `ContactRateLimits` table (IP-based rate limiting)
  - Function App runtime storage

### 5. **Application Insights**
- **Name**: `blueflare-website-prod-ai`
- **Purpose**: Monitoring and telemetry for Function App
- **Type**: Web application

### 6. **Log Analytics Workspace**
- **Name**: `blueflare-website-prod-law`
- **SKU**: PerGB2018 (pay-per-GB ingested)
- **Retention**: 30 days
- **Purpose**: Required by Container Apps Environment

### 7. **PostgreSQL Flexible Server**
- **Name**: `blueflare-website-prod-pg-{random6chars}`
- **SKU**: `B_Standard_B1ms` (Burstable, 1 vCore, 2GB RAM)
- **Storage**: 32GB
- **Version**: PostgreSQL 16
- **Backup Retention**: 7 days
- **Network**: Public access enabled
- **Extensions**: `pgcrypto` enabled (required for Umami)
- **Purpose**: Database for Umami analytics

### 8. **Container Apps Environment**
- **Name**: `blueflare-website-prod-cae`
- **Purpose**: Hosts Umami container
- **Features**: 
  - Integrated with Log Analytics

### 9. **Container App - Umami Analytics**
- **Name**: `bf-prod-umami`
- **Image**: `ghcr.io/umami-software/umami:postgresql-latest`
- **Resources**: 
  - CPU: 0.5 vCPU
  - Memory: 1Gi
  - Replicas: 1 (min/max)
- **Purpose**: Web analytics platform

### 10. **Uptime Kuma VM** (NEW - Replaced Container App)
- **Name**: `bf-prod-uptimekuma-vm`
- **Size**: `Standard_B1ms` (Burstable, 1 vCPU, 2GB RAM)
- **OS**: Ubuntu 22.04 LTS
- **Disk**: 30GB Standard LRS managed disk
- **Purpose**: Uptime monitoring and status page
- **Why VM?**: SQLite WAL mode incompatible with Azure Files (Container Apps)

### 11. **Uptime Kuma Networking** (NEW)
- **Virtual Network**: `bf-prod-kuma-vnet` (10.0.0.0/16)
- **Subnet**: `kuma-subnet` (10.0.1.0/24)
- **Network Security Group**: `bf-prod-kuma-nsg`
  - SSH (22): Restricted to allowed IP
  - Kuma (3001): Restricted to allowed IP (or public if `uptimekuma_allow_public=true`)
- **Public IP**: Static, Standard SKU

---

## 💰 Monthly Cost Estimate (USD)

### Fixed Monthly Costs

| Resource | Configuration | Previous Cost | New Cost |
|----------|--------------|---------------|----------|
| **Static Web App (Standard)** | Standard tier | $9.00 | **$9.00** |
| **PostgreSQL Flexible Server** | B_Standard_B1ms, 32GB | $12.00 | **~$12.00** |
| **Container Apps Environment** | Base environment | $0.00 | **$0.00** |
| **Container App - Umami** | 0.5 vCPU, 1Gi RAM, 1 replica | $15.00 | **~$15.00** |
| ~~Container App - Uptime Kuma~~ | ~~0.5 vCPU, 1Gi RAM~~ | ~~$15.00~~ | ~~REMOVED~~ |
| **VM - Uptime Kuma** | Standard_B1ms, 30GB disk | N/A | **~$15.00** |
| **Public IP (Static)** | Standard SKU | N/A | **~$3.00** |
| **Storage Account** | Standard LRS, ~10GB | $1.00 | **~$0.50** |
| **Application Insights** | First 5GB free/month | $0.00 | **$0.00** |
| **Log Analytics** | First 5GB free/month | $0.00 | **$0.00** |
| **Function App** | Consumption plan | $0.00-5.00 | **~$0.00-5.00** |

### Variable/Usage-Based Costs

| Resource | Usage Estimate | Estimated Monthly Cost |
|----------|---------------|------------------------|
| **Function App Executions** | ~1,000 executions/month | **$0.00 - $0.20** |
| **Function App Execution Time** | ~100,000 GB-seconds/month | **$0.00 - $0.16** |
| **Storage - Blob Storage** | ~10GB media files | **~$0.20** |
| **Storage - Table Storage** | ~1M transactions/month | **~$0.05** |
| **Log Analytics Data Ingestion** | ~1GB/month | **$0.00** (within free tier) |
| **Application Insights** | ~1GB/month | **$0.00** (within free tier) |
| **Data Transfer** | ~50GB outbound/month | **~$4.50** |

---

## 📊 Cost Comparison: Container App vs VM for Uptime Kuma

| Aspect | Container App (OLD) | VM (NEW) |
|--------|---------------------|----------|
| **Monthly Cost** | ~$15-17 | ~$18-20 |
| **Includes** | Compute only | Compute + Public IP + Storage |
| **Storage** | Azure Files share (+$2/mo) | Local disk (included in $15) |
| **SQLite Compatibility** | ❌ WAL mode fails | ✅ Full compatibility |
| **Management** | Azure-managed | Self-managed (Docker) |
| **Scaling** | Automatic | Manual |
| **SSH Access** | No | Yes |

**Net cost change**: ~**+$1-3/month** but with **working Uptime Kuma** 🎉

---

## 💵 Total Estimated Monthly Cost

### Summary Table

| Category | Monthly Cost | % of Total |
|----------|--------------|------------|
| **VM (Uptime Kuma)** | $18.00 | 28% |
| **Container App (Umami)** | $15.00 | 23% |
| **PostgreSQL** | $12.00 | 19% |
| **Static Web App** | $9.00 | 14% |
| **Data Transfer** | $4.50 | 7% |
| **Function App** | $0.00-5.00 | 0-8% |
| **Storage** | $0.75 | 1% |
| **Monitoring/Logging** | $0.00 | 0% |

### **Total Estimated Monthly Cost: ~$60 - $70 USD**

**Breakdown:**
- **Fixed costs**: ~$54.50/month
- **Variable costs**: ~$5 - $15/month (depends on usage)

**Compared to previous estimate**: Similar (~$60-75) but now with a **working** Uptime Kuma!

---

## 🎯 Cost Breakdown by Component

```
┌─────────────────────────────────────────────────────────────────┐
│                    MONTHLY COST BREAKDOWN                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Uptime Kuma VM  ████████████████████████████  $18.00 (28%)     │
│  Umami (CAE)     ███████████████████████       $15.00 (23%)     │
│  PostgreSQL      ████████████████              $12.00 (19%)     │
│  Static Web App  ████████████                  $9.00  (14%)     │
│  Data Transfer   ██████                        $4.50  (7%)      │
│  Function App    ████                          $2.50  (4%)      │
│  Storage         ██                            $0.75  (1%)      │
│  Monitoring      █                             $0.00  (0%)      │
│                                                                  │
│  TOTAL: ~$62-65/month                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📈 Cost Optimization Recommendations

### 1. **Uptime Kuma VM** ($18/month)
- **Current**: Standard_B1ms (1 vCPU, 2GB RAM)
- **Options**:
  - Use `Standard_B1s` ($8/month) - 1 vCPU, 1GB RAM (tight but works)
  - Use spot instances for non-critical monitoring
  - **Potential savings**: $5-10/month

### 2. **Umami Container App** ($15/month)
- **Current**: 0.5 vCPU, 1Gi RAM, always-on
- **Options**:
  - Reduce to 0.25 vCPU if traffic is low
  - Consider scale-to-zero if acceptable
  - **Potential savings**: $5-7/month

### 3. **PostgreSQL** ($12/month)
- **Current**: B_Standard_B1ms (burstable)
- **Status**: Already on smallest recommended tier ✅
- **Note**: Could use Azure Database for PostgreSQL - Flexible Server with free tier (preview)

### 4. **Static Web App** ($9/month)
- **Current**: Standard tier
- **Status**: Required for production features ✅
- **Free tier alternative**: No custom domains, limited features

### 5. **Function App** ($0-5/month)
- **Current**: Consumption plan
- **Status**: Already optimized ✅

---

## 🆚 Architecture Change Summary

### Previous Architecture (Container Apps)
```
┌─────────────────────────────────────────────┐
│            Container Apps Environment        │
│  ┌─────────────────┐  ┌─────────────────┐   │
│  │     Umami       │  │   Uptime Kuma   │   │
│  │  (0.5 CPU/1Gi)  │  │  (0.5 CPU/1Gi)  │   │
│  └────────┬────────┘  └────────┬────────┘   │
│           │                    │             │
│           │           ┌───────▼────────┐    │
│           │           │  Azure Files   │    │ ❌ SQLite WAL FAILS
│           │           │    (10GB)      │    │
│           │           └────────────────┘    │
└───────────┼─────────────────────────────────┘
            │
     ┌──────▼──────┐
     │  PostgreSQL │
     │  (Umami DB) │
     └─────────────┘
```

### New Architecture (VM for Uptime Kuma)
```
┌─────────────────────────────────────────────┐
│            Container Apps Environment        │
│  ┌─────────────────────────────────────┐    │
│  │              Umami                   │    │
│  │          (0.5 CPU/1Gi)               │    │
│  └─────────────────┬───────────────────┘    │
└────────────────────┼────────────────────────┘
                     │
              ┌──────▼──────┐
              │  PostgreSQL │
              │  (Umami DB) │
              └─────────────┘

┌─────────────────────────────────────────────┐
│           Virtual Machine (B1ms)             │
│  ┌─────────────────────────────────────┐    │
│  │         Uptime Kuma (Docker)         │    │
│  │         louislam/uptime-kuma         │    │
│  └─────────────────┬───────────────────┘    │
│                    │                         │
│           ┌───────▼────────┐                │
│           │  Local Disk    │                │ ✅ SQLite WAL WORKS!
│           │    (30GB)      │                │
│           └────────────────┘                │
│                                              │
│  VNet: 10.0.0.0/16 │ NSG: SSH+3001 filtered │
└─────────────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **First Month Free Credits**: Azure often provides $200 free credits for new subscriptions
2. **Free Tier Benefits**:
   - First 5GB of Log Analytics ingestion free
   - First 5GB of Application Insights free
   - Function App: 1M free executions + 400K GB-seconds/month
3. **VM Management**:
   - Uptime Kuma VM requires manual updates (`docker pull` + restart)
   - Consider setting up automated Docker updates via cron
4. **Security**:
   - VM is protected by NSG (SSH + 3001 restricted to your IP by default)
   - Set `uptimekuma_allow_public = true` only if needed
5. **Cost Monitoring**: Set up Azure Cost Alerts to track spending

---

## 🔒 Security Considerations

| Resource | Security Status | Recommendation |
|----------|----------------|----------------|
| **PostgreSQL** | ⚠️ Public access enabled | Restrict to Container Apps subnet |
| **Uptime Kuma VM** | ✅ NSG-protected | Keep SSH restricted to your IP |
| **Storage Account** | ✅ Public blob for media | Appropriate for public assets |
| **Function App** | ✅ CORS restricted | Good security practice |
| **Static Web App** | ✅ HTTPS enforced | Good security practice |

---

## 📅 12-Month Cost Projection

| Scenario | Monthly | Annual |
|----------|---------|--------|
| **Low usage** | $55 | $660 |
| **Normal usage** | $65 | $780 |
| **High usage** | $85 | $1,020 |

*Assumes stable traffic. Costs may increase with traffic growth.*

---

*Cost estimates based on Azure pricing as of December 2024. Actual costs may vary based on region (Central US), usage patterns, and Azure pricing updates.*


