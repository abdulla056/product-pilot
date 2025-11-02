# ✅ Verify Your Google Maps API Setup

## Quick Verification

Your API key is already in `.env.local`! Let's make sure everything is configured correctly.

## Step 1: Verify API Key Format

Your API key should:
- Start with `AIza...`
- Be about 39 characters long
- Be stored as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local`

## Step 2: Enable Required APIs

Go to Google Cloud Console and verify these are **enabled**:

1. **Maps JavaScript API**
   - Link: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
   - Status should show: ✅ Enabled

2. **Places API (New)**
   - Link: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
   - Status should show: ✅ Enabled

## Step 3: Check API Key Restrictions

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your API key
3. Verify:
   - **API restrictions**: Should include "Maps JavaScript API" and "Places API (New)"
   - **Application restrictions**: Should include `http://localhost:3000/*`

## Step 4: Verify Billing

Google Maps requires billing to be enabled (even with free tier):
1. Go to: https://console.cloud.google.com/billing
2. Make sure a billing account is linked to your project
3. Don't worry - you get $200/month free!

## Step 5: Test Your Setup

Run this verification script:
```bash
npx tsx scripts/verify-google-maps-setup.ts
```

Or manually test:
1. Start your dev server: `npm run dev`
2. Go to: http://localhost:3000/hatch/vendors
3. Check browser console (F12) for any errors

## Common Issues & Fixes

### Error: "Google Maps JavaScript API: Access Denied (403)"
**Fix:**
1. Enable "Maps JavaScript API" in Google Cloud Console
2. Add it to your API key restrictions
3. Make sure billing is enabled

### Error: "This page didn't load Google Maps correctly"
**Fix:**
1. Check browser console (F12) for specific error code
2. Verify API key format is correct
3. Make sure you restarted the dev server after adding the key

### Map loads but shows error message
**Fix:**
1. Check that both Maps JavaScript API AND Places API (New) are enabled
2. Verify API key restrictions include both APIs
3. Check billing account is active

## Your Current Setup

Based on your `.env.local`:
- ✅ API key is configured
- ✅ Key starts with correct format (AIza...)
- ✅ Both `GOOGLE_MAPS_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` are set

**Next steps:**
1. Verify APIs are enabled in Google Cloud Console
2. Verify billing is set up
3. Restart your dev server
4. Test the map!

