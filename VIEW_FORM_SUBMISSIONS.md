# Viewing Contact Form Submissions

## Two Places to View Form Data

### 1. Umami Analytics (Events & Properties)
**Purpose:** Analytics and insights (metadata only, no PII)  
**Location:** Umami Dashboard → Events → `contact_submit`

### 2. Azure Table Storage (Full Submissions)
**Purpose:** Complete form data including names, emails, messages  
**Location:** Azure Portal → Storage Account → Tables → `Leads`

---

## 📊 Umami: What Properties Are Tracked

Each `contact_submit` event includes **full form data**:

| Property | Description | Example |
|----------|-------------|---------|
| `firstName` | Full first name | `"John"` |
| `lastName` | Full last name | `"Doe"` |
| `email` | Email address | `"john.doe@example.com"` |
| `phone` | Phone number (if provided) | `"+1-555-123-4567"` or `""` |
| `message` | Complete message content | `"I'm interested in..."` |
| `messageLength` | Length of message in characters | `150` |
| `hasPhone` | Whether phone number was provided | `true` or `false` |
| `pageUrl` | Page where form was submitted | `/contact` |
| `timestamp` | ISO timestamp of submission | `"2025-12-22T18:30:00.000Z"` |

### ⚠️ Privacy Note

**You are now tracking PII (Personally Identifiable Information):**
- ✅ Full names
- ✅ Email addresses
- ✅ Phone numbers
- ✅ Message content

**Important Considerations:**
- Ensure compliance with GDPR, CCPA, and other privacy regulations
- Consider adding privacy policy notice about data collection
- Umami data is stored in your PostgreSQL database (you control it)
- Consider who has access to Umami dashboard

---

## 🔍 How to View in Umami

### Step 1: Access Umami Dashboard

1. Go to: `https://bf-prod-umami.proudflower-bb06b15b.centralus.azurecontainerapps.io`
2. Log in with your admin credentials

### Step 2: View Events

1. **Go to your website dashboard**
2. **Click "Events"** tab (or "Custom Events")
3. **Click on `contact_submit`** event
4. **See:**
   - Total count of submissions
   - Timeline/graph of submissions
   - Properties breakdown:
     - Average message length
     - Percentage with phone numbers
     - Most common first name initials
     - Submissions by page

### Step 3: View Event Details

1. **Click on a specific event** in the timeline
2. **See all properties** for that submission:
   ```
   firstName: John
   lastName: Doe
   email: john.doe@example.com
   phone: +1-555-123-4567
   message: I'm interested in your energy solutions...
   messageLength: 150
   hasPhone: true
   pageUrl: /contact
   timestamp: 2025-12-22T18:30:00.000Z
   ```

---

## 📋 Azure Table Storage: Full Form Submissions

For complete form data (names, emails, messages), check Azure Table Storage:

### Method 1: Azure Portal (Easiest)

1. **Go to Azure Portal:** https://portal.azure.com
2. **Search:** `bfprodtsc6g9` (storage account)
3. **Click:** Storage Account → `bfprodtsc6g9`
4. **Left sidebar:** Storage browser → Tables → `Leads`
5. **View all submissions** with complete data:
   - First Name
   - Last Name
   - Email
   - Phone
   - Message (full content)
   - Timestamp
   - IP Address
   - Page URL

### Method 2: Azure CLI

```bash
# View all leads
az storage entity query \
  --account-name bfprodtsc6g9 \
  --table-name Leads \
  --connection-string "$(az storage account show-connection-string --name bfprodtsc6g9 --resource-group blueflare-website-prod-rg --query connectionString -o tsv)" \
  --output table

# View recent leads (last 10)
az storage entity query \
  --account-name bfprodtsc6g9 \
  --table-name Leads \
  --connection-string "$(az storage account show-connection-string --name bfprodtsc6g9 --resource-group blueflare-website-prod-rg --query connectionString -o tsv)" \
  --num-results 10 \
  --output table
```

### Method 3: Export to CSV

See `infra/LEADS_STORAGE.md` for Python script to export all leads to CSV.

---

## 🎯 What to Use When

### Use Umami When You Want:
- ✅ **Analytics:** How many submissions? When? Trends?
- ✅ **Segmentation:** Which pages get most submissions?
- ✅ **Metadata:** Average message length, phone number usage
- ✅ **Quick insights:** Real-time dashboard

### Use Azure Table Storage When You Want:
- ✅ **Full data:** Complete form submissions
- ✅ **Contact details:** Names, emails, phone numbers
- ✅ **Message content:** What users actually wrote
- ✅ **Export/backup:** Download all submissions

---

## 📈 Example: Analyzing Form Submissions

### In Umami:
```
Event: contact_submit
Properties (per submission):
  - firstName: John
  - lastName: Doe
  - email: john.doe@example.com
  - phone: +1-555-123-4567
  - message: I'm interested in your energy solutions...
  - messageLength: 150
  - hasPhone: true
  - pageUrl: /contact
  - timestamp: 2025-12-22T18:30:00.000Z
```

### In Azure Table Storage:
```
RowKey: a1b2c3d4-e5f6-7890-abcd-ef1234567890
firstName: John
lastName: Doe
email: john.doe@example.com
phone: +1-555-123-4567
message: "I'm interested in your energy solutions..."
submittedAt: 2025-12-22T18:30:00.000Z
```

---

## 🔐 Privacy & Compliance

### What's Tracked in Umami:
- ✅ Full names (firstName, lastName)
- ✅ Email addresses
- ✅ Phone numbers
- ✅ Complete message content
- ✅ Page URLs and timestamps
- ✅ Additional metadata (messageLength, hasPhone)

### ⚠️ Privacy & Compliance:
- 🔒 Data stored in your PostgreSQL database (you control access)
- 🔒 Only accessible via Umami dashboard (protect login credentials)
- ⚠️ Consider GDPR/privacy policy requirements
- ⚠️ Ensure secure access to Umami dashboard

### Where Full Data Lives:
- 🔒 **Azure Table Storage** - Private, secure, only accessible to you
- 🔒 **Email notifications** - Sent via Microsoft Graph API
- 🔒 **Function App logs** - For debugging (not public)

---

## 🚀 Enhanced Tracking (Optional)

If you want to track more metadata (still privacy-safe), you can add:

```typescript
window.umami.track('contact_submit', {
  // Current properties
  messageLength: formData.message.length,
  hasPhone: !!formData.phone,
  firstNameLength: formData.firstName.length,
  lastNameLength: formData.lastName.length,
  pageUrl: window.location.pathname,
  firstNameInitial: formData.firstName.charAt(0).toUpperCase(),
  
  // Additional metadata (optional)
  messageWordCount: formData.message.split(/\s+/).length,
  formCompletionTime: Date.now() - formStartTime, // if tracking start time
  referrer: document.referrer,
  deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
});
```

---

## 📝 Summary

**Umami (Analytics with Full Data):**
- ✅ Tracks complete form submissions with all data
- ✅ Full names, emails, phones, messages
- ✅ Great for insights and trends
- ✅ Real-time dashboard with full details

**Azure Table Storage (Full Data):**
- ✅ Complete form submissions
- ✅ All contact information
- ✅ Full message content
- ✅ Exportable/queryable

**Best Practice:**
- Use **Umami** for analytics and insights
- Use **Azure Table Storage** for actual lead data and follow-up

Both are already set up and working! 🎉

