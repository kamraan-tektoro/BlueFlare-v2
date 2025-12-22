# Umami Contact Form Tracking Guide

## ✅ Already Implemented!

Your contact form **already tracks submissions** with Umami! Here's how it works:

### Current Implementation

**Event Name:** `contact_submit`  
**When:** Only on **successful** form submission (status 200)  
**Location:** `components/ContactForm.tsx` line 206

```typescript
// Track successful submission
trackSubmit();
```

The `trackSubmit()` function (lines 126-135):
```typescript
const trackSubmit = () => {
  // Track with Umami if available (guard against crashes)
  try {
    if (typeof window !== 'undefined' && window.umami?.track) {
      window.umami.track('contact_submit');
    }
  } catch (e) {
    // Silently ignore tracking errors
  }
};
```

---

## 📊 How to View Contact Form Submissions

### In Umami Dashboard

1. **Log into Umami:** `https://bf-prod-umami.proudflower-bb06b15b.centralus.azurecontainerapps.io`
2. **Go to your website dashboard**
3. **Click "Events"** tab (or "Custom Events")
4. **Look for:** `contact_submit` event
5. **See:** Count of form submissions, timeline, etc.

---

## 🧪 How to Test

### Method 1: Browser Console

1. **Open your website** in browser
2. **Open DevTools** (F12)
3. **Go to Console tab**
4. **Submit the contact form**
5. **Check console** - Should see Umami tracking (if debug mode enabled)

### Method 2: Network Tab

1. **Open DevTools** (F12)
2. **Go to Network tab**
3. **Filter by:** `collect` or `umami`
4. **Submit contact form**
5. **Look for:** POST request to Umami with event data

### Method 3: Umami Dashboard

1. **Open Umami dashboard**
2. **Go to Events section**
3. **Submit form on your website**
4. **Refresh Umami dashboard**
5. **Should see:** `contact_submit` event count increase

---

## 🚀 Optional Enhancements

### 1. Track Failed Submissions

Currently only tracks **successful** submissions. To also track failures:

**Edit `components/ContactForm.tsx`:**

```typescript
// After line 218 (validation_error section)
} else if (response.status === 400) {
  // Validation error from server
  try {
    const errorData = await response.json();
    setServerErrorMessage(errorData.error || errorData.message || 'Please check your input and try again.');
  } catch {
    setServerErrorMessage('Please check your input and try again.');
  }
  setSubmitStatus('validation_error');
  
  // Track failed submission
  if (typeof window !== 'undefined' && window.umami?.track) {
    window.umami.track('contact_submit_failed', { reason: 'validation' });
  }
} else {
  // Other errors
  setSubmitStatus('error');
  
  // Track error
  if (typeof window !== 'undefined' && window.umami?.track) {
    window.umami.track('contact_submit_failed', { reason: 'server_error' });
  }
}
```

### 2. Track with Additional Data

Add metadata to the event:

```typescript
const trackSubmit = () => {
  try {
    if (typeof window !== 'undefined' && window.umami?.track) {
      window.umami.track('contact_submit', {
        page: window.location.pathname,
        hasPhone: !!formData.phone,
        messageLength: formData.message.length
      });
    }
  } catch (e) {
    // Silently ignore tracking errors
  }
};
```

### 3. Track Form Abandonment

Track when users start filling but don't submit:

```typescript
// Add to component
useEffect(() => {
  const hasStarted = Object.values(formData).some(val => val !== '');
  if (hasStarted && !isSubmitting && submitStatus === 'idle') {
    // User started filling form
    if (typeof window !== 'undefined' && window.umami?.track) {
      window.umami.track('contact_form_started');
    }
  }
}, [formData]);
```

---

## 📈 What You Can Track

### Current Events
- ✅ `contact_submit` - Successful form submission

### Suggested Additional Events
- `contact_submit_failed` - Failed submission (validation/server error)
- `contact_form_started` - User started filling form
- `contact_form_abandoned` - User left without submitting
- `contact_rate_limited` - User hit rate limit

---

## 🔍 Verify Tracking is Working

### Quick Test Script

Add this to browser console on your website:

```javascript
// Check if Umami is loaded
console.log('Umami loaded:', typeof window.umami !== 'undefined');

// Manually trigger event (for testing)
if (window.umami?.track) {
  window.umami.track('contact_submit', { test: true });
  console.log('Event tracked!');
} else {
  console.error('Umami not loaded!');
}
```

### Expected Behavior

1. **Umami script loads** when page loads
2. **`window.umami` object exists** after script loads
3. **`contact_submit` event fires** when form successfully submits
4. **Event appears in Umami dashboard** within a few seconds

---

## 🐛 Troubleshooting

### Event Not Showing in Umami?

1. **Check Umami script is loaded:**
   ```javascript
   // In browser console
   console.log(window.umami);
   ```
   Should show an object with `track` method

2. **Check Website ID is correct:**
   - Verify `data-website-id` in `index.html` matches Umami dashboard

3. **Check domain settings:**
   - Umami → Settings → Websites → Your website
   - Ensure domain matches your website domain

4. **Check browser console for errors:**
   - Look for CORS errors or script loading errors

### Event Fires But No Data?

1. **Wait a few minutes** - Data may take time to appear
2. **Check Umami logs:**
   - Azure Portal → Container App → `bf-prod-umami` → Logs
   - Look for errors

3. **Verify event name:**
   - Check Umami dashboard → Events
   - Event name should be exactly `contact_submit`

---

## 📝 Summary

**Current Status:**
- ✅ Umami script added to `index.html`
- ✅ Contact form tracks `contact_submit` event
- ✅ Only tracks successful submissions
- ✅ Error handling prevents crashes

**To View Data:**
1. Log into Umami dashboard
2. Go to Events section
3. Look for `contact_submit` event

**To Enhance:**
- Add tracking for failed submissions
- Add metadata to events
- Track form abandonment

Your tracking is **already working** - just submit a form and check Umami dashboard! 🎉

