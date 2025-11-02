# 🗺️ Google Maps API - Quick Setup Checklist

## ✅ Good News!
Your API key is already configured in `.env.local`! You just need to verify a few things in Google Cloud Console.

---

## 🚀 Quick Setup Steps

### 1. Enable Required APIs in Google Cloud Console

Go to: https://console.cloud.google.com/apis/library

Enable these APIs (click each link and click "Enable"):

1. **Maps JavaScript API**
   - Direct link: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
   - Click **"Enable"** button

2. **Places API (New)**
   - Direct link: https://console.cloud.google.com/apis/library/places-backend.googleapis.com  
   - Click **"Enable"** button

### 2. Set Up Billing (Required!)

⚠️ **Important:** Google Maps requires billing, but you get $200/month FREE!

1. Go to: https://console.cloud.google.com/billing
2. Click **"Link a billing account"** or **"Create billing account"**
3. Add your billing information
4. **Don't worry** - free tier covers most usage!

### 3. Verify API Key Restrictions

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your API key (the one starting with `AIza...`)
3. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check: ✅ Maps JavaScript API
   - Check: ✅ Places API (New)
4. Under **"Application restrictions"**:
   - Select **"HTTP referrers (web sites)"**
   - Add: `http://localhost:3000/*`
5. Click **"Save"**

### 4. Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### 5. Test It!

1. Go to: http://localhost:3000/hatch/vendors
2. Complete the Hatch flow first (Strategy → Model → Budget → Processing → Products → Vendors)
3. You should see the map loading!

---

## 🔍 Verify Your Setup

Run this command to check your setup:
```bash
npm run verify:maps
```

---

## ❌ Common Errors & Fixes

### "This page didn't load Google Maps correctly"
**Fix:**
- Enable **Maps JavaScript API** in Google Cloud Console
- Check that billing is enabled
- Restart dev server after adding API key

### Error 403 in Browser Console
**Fix:**
- Verify API key restrictions include "Maps JavaScript API"
- Check that `http://localhost:3000/*` is in HTTP referrer restrictions
- Make sure APIs are enabled

### "API key not configured" error
**Fix:**
- Check `.env.local` has `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`
- Make sure variable name is exact (case-sensitive)
- Restart dev server

---

## 📋 Your Current Setup Status

✅ **API Key in .env.local** - Found!
✅ **Key Format** - Looks correct (starts with AIza...)

**What to do next:**
1. ✅ Enable APIs in Google Cloud Console
2. ✅ Set up billing account  
3. ✅ Configure API key restrictions
4. ✅ Restart dev server
5. ✅ Test the map!

---

## 📚 More Help

- Detailed guide: `docs/GOOGLE_MAPS_SETUP_STEP_BY_STEP.md`
- API information: `docs/GOOGLE_MAPS_API_GUIDE.md`
- Verification: `docs/VERIFY_GOOGLE_MAPS.md`

