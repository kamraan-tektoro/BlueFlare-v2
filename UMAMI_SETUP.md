# Umami Analytics Setup Guide

## ✅ What's Already Done

- ✅ Umami Container App deployed
- ✅ PostgreSQL database configured
- ✅ Tracking code added to ContactForm (for custom events)
- ✅ Umami script tag added to `index.html`

## 🔧 What You Need to Do

### Step 1: Access Umami Dashboard

1. **Get Umami URL:**
   ```bash
   cd infra
   terraform output umami_url
   ```
   
   **Your URL:** `https://bf-prod-umami.proudflower-bb06b15b.centralus.azurecontainerapps.io`

2. **Open in browser** and log in:
   - Default username: Check Terraform variables (usually `admin` or `umamiadmin`)
   - Default password: Check Terraform variables or Umami container logs

### Step 2: Create Website in Umami

1. **Log into Umami dashboard**
2. **Click "Add Website"** (or "Settings" → "Websites" → "Add Website")
3. **Fill in details:**
   - **Name:** `BlueFlare Website` (or any name)
   - **Domain:** `www.goblueflare.com` (or `goblueflare.com` or `*` for all domains)
   - **Enable tracking:** ✅ (checked)
4. **Click "Save"**
5. **Copy the Website ID** (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 3: Update Website ID in Code

**Option A: Environment Variable (Recommended for Production)**

1. **Add to Azure Static Web App settings:**
   - Azure Portal → Static Web App → Settings → Configuration
   - Add: `VITE_UMAMI_WEBSITE_ID` = `your-website-id-here`

2. **Update `index.html` to use env var:**
   ```html
   <script 
     async 
     defer 
     data-website-id="%VITE_UMAMI_WEBSITE_ID%" 
     src="https://bf-prod-umami.proudflower-bb06b15b.centralus.azurecontainerapps.io/script.js"
   ></script>
   ```

**Option B: Direct in HTML (Quick Test)**

1. **Edit `index.html`:**
   ```html
   <script 
     async 
     defer 
     data-website-id="YOUR_WEBSITE_ID_HERE" 
     src="https://bf-prod-umami.proudflower-bb06b15b.centralus.azurecontainerapps.io/script.js"
   ></script>
   ```
   
2. **Replace `YOUR_WEBSITE_ID_HERE`** with your actual Website ID from Step 2

### Step 4: Deploy and Test

1. **Deploy website:**
   ```bash
   git add index.html
   git commit -m "Add Umami tracking script"
   git push origin main
   ```

2. **Test tracking:**
   - Visit your website
   - Check Umami dashboard → Should see page views
   - Submit contact form → Should see custom event `contact_submit`

---

## 📊 What Gets Tracked

### Automatic Tracking (via Umami script)
- ✅ Page views
- ✅ Page URLs
- ✅ Referrers
- ✅ Browser/Device info
- ✅ Country/Location
- ✅ Session duration

### Custom Events (already coded)
- ✅ `contact_submit` - When contact form is submitted

---

## 🔍 Verify It's Working

### Method 1: Check Browser Console

1. Open your website
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Look for: `[umami]` messages (should show tracking)

### Method 2: Check Network Tab

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Filter by: `script.js` or `collect`
4. Should see requests to Umami URL

### Method 3: Check Umami Dashboard

1. Log into Umami
2. Go to your website dashboard
3. Should see real-time visitors and page views

---

## 🛠️ Troubleshooting

### Script Not Loading?

1. **Check Umami URL is correct:**
   ```bash
   terraform output umami_url
   ```

2. **Check Umami is running:**
   - Azure Portal → Container App → `bf-prod-umami`
   - Check logs for errors

3. **Check CORS:**
   - Umami should allow your domain
   - Check Umami settings → Websites → Your website → Domain settings

### No Data Showing?

1. **Wait a few minutes** - Data may take time to appear
2. **Check Website ID** is correct in script tag
3. **Check domain** matches in Umami settings
4. **Check browser console** for errors

### Custom Events Not Working?

The `contact_submit` event is already coded in `components/ContactForm.tsx`:
```typescript
window.umami?.track('contact_submit');
```

This will work automatically once Umami script is loaded.

---

## 📝 Current Configuration

**Umami URL:** `https://bf-prod-umami.proudflower-bb06b15b.centralus.azurecontainerapps.io`  
**Script Location:** `index.html` (in `<head>` section)  
**Custom Events:** Contact form submissions

---

## 🚀 Next Steps

1. ✅ Access Umami dashboard
2. ✅ Create website and get Website ID
3. ✅ Update `index.html` with Website ID
4. ✅ Deploy website
5. ✅ Verify tracking works

---

## 📚 Umami Documentation

- **Official Docs:** https://umami.is/docs
- **Script Installation:** https://umami.is/docs/install-script
- **Custom Events:** https://umami.is/docs/track-events

