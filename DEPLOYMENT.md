# Deployment Guide - BlueFlare Website

## Current Deployment Setup

### ✅ Azure Functions (Deployed via GitHub Actions)

**Workflow:** `.github/workflows/deploy-functions.yml`

**What it does:**
- Automatically deploys when `api/**` files change on `main` branch
- Builds TypeScript code
- Deploys to Azure Function App: `blueflare-leads-prod`

**GitHub Secrets Required:**
1. `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`
   - **How to get it:**
     - Go to Azure Portal
     - Navigate to: Function App → `blueflare-website-leads-prod`
     - Click **"Get publish profile"** (top menu)
     - Copy the entire XML content
   - **Add to GitHub:**
     - Repository → Settings → Secrets and variables → Actions
     - Click "New repository secret"
     - Name: `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`
     - Value: (paste the XML content)

### ⚠️ Static Web App (NOT Automatically Deployed)

**Current Status:**
- Static Web App is **created by Terraform** (`azurerm_static_web_app.swa`)
- But **NOT automatically deployed** via GitHub Actions
- Comment in code says: "Repo linkage is typically done via Portal/GitHub Actions after creation"

**Two Options for Static Web App Deployment:**

#### Option A: Manual Deployment (Current)
1. Build locally: `pnpm build`
2. Deploy manually via Azure Portal or Azure CLI

#### Option B: Automatic Deployment via GitHub Actions (Recommended)

**To set up automatic deployment:**

1. **Link GitHub repo to Static Web App:**
   - Azure Portal → Static Web App → `blueflare-website-prod`
   - Go to **"Deployment"** → **"Manage deployment token"**
   - Copy the deployment token
   - Go to **"Deployment"** → **"GitHub"** → **"Connect GitHub"**
   - Authorize Azure to access your GitHub repo
   - Select repository: `TekToro-IIoT/BlueFlare-Energy-Solutions-Website`
   - Select branch: `main`
   - Set build details:
     - **App location:** `/` (root)
     - **Api location:** (leave empty - functions deploy separately)
     - **Output location:** `dist` (Vite build output)

2. **OR create a GitHub Actions workflow** (see below)

## Recommended: Add GitHub Actions Workflow for Static Web App

Create `.github/workflows/deploy-static-web-app.yml`:

```yaml
name: Deploy Static Web App

on:
  push:
    branches:
      - main
    paths:
      - 'components/**'
      - 'src/**'
      - 'public/**'
      - '*.tsx'
      - '*.ts'
      - '*.json'
      - 'vite.config.ts'
      - 'package.json'
      - 'pnpm-lock.yaml'
  workflow_dispatch:

env:
  NODE_VERSION: '20.x'
  APP_LOCATION: '/'
  OUTPUT_LOCATION: 'dist'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    name: Build and Deploy
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          submodules: true
          lfs: false

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          VITE_LEAD_CAPTURE_URL: ${{ secrets.VITE_LEAD_CAPTURE_URL }}

      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: ${{ env.APP_LOCATION }}
          output_location: ${{ env.OUTPUT_LOCATION }}
```

**GitHub Secrets Required:**
1. `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - **How to get it:**
     - Azure Portal → Static Web App → `blueflare-website-prod`
     - Go to **"Deployment"** → **"Manage deployment token"**
     - Copy the token
   - **Add to GitHub:**
     - Repository → Settings → Secrets and variables → Actions
     - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
     - Value: (paste the token)

2. `VITE_LEAD_CAPTURE_URL` (optional, for build-time env vars)
   - Value: `https://blueflare-website-leads-prod.azurewebsites.net/api/contact`

## Summary: What You Need in GitHub

### Required Secrets (for Functions):
- ✅ `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` - Function App publish profile (XML)

### Required Secrets (for Static Web App - if adding auto-deploy):
- ⚠️ `AZURE_STATIC_WEB_APPS_API_TOKEN` - Static Web App deployment token
- ⚠️ `VITE_LEAD_CAPTURE_URL` - Function endpoint URL (optional, for build)

### Current Workflows:
- ✅ `.github/workflows/deploy-functions.yml` - Deploys Functions automatically
- ❌ **Missing:** Static Web App deployment workflow (needs to be created)

## Deployment Flow

**Current:**
1. **Functions:** Push to `main` → GitHub Actions → Auto-deploys ✅
2. **Website:** Manual deployment ❌

**Recommended:**
1. **Functions:** Push to `main` → GitHub Actions → Auto-deploys ✅
2. **Website:** Push to `main` → GitHub Actions → Auto-deploys ✅ (needs workflow)

## Next Steps

1. **Add Static Web App deployment token to GitHub Secrets**
2. **Create the workflow file** (`.github/workflows/deploy-static-web-app.yml`)
3. **Push to GitHub** - Static Web App will auto-deploy on changes

