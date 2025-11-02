# Google Maps API Setup - Step by Step Guide

Follow these exact steps to set up Google Maps API for your Hatch application.

## ✅ Step 1: Create Google Cloud Project (If you don't have one)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **"New Project"**
4. Enter project name: `Hatch Maps` (or any name you prefer)
5. Click **"Create"**
6. Wait for the project to be created, then select it

## ✅ Step 2: Enable Required APIs

1. In your Google Cloud project, go to **"APIs & Services"** → **"Library"** (in the left sidebar)
2. Search for **"Maps JavaScript API"**
   - Click on it
   - Click **"Enable"** button
   - Wait for it to enable (you'll see a green checkmark)
3. Search for **"Places API (New)"**
   - Click on it  
   - Click **"Enable"** button
   - Wait for it to enable
4. (Optional) Search for **"Geocoding API"**
   - Click on it
   - Click **"Enable"** button
   - This is optional but useful for address conversion

## ✅ Step 3: Create API Key

1. Go to **"APIs & Services"** → **"Credentials"** (in the left sidebar)
2. Click **"Create Credentials"** button at the top
3. Select **"API Key"**
4. A popup will appear with your new API key - **COPY IT NOW** (you won't see it again!)
   - It will look like: `AIzaSy...` (long string)

## ✅ Step 4: Restrict Your API Key (IMPORTANT for Security)

1. Click on your newly created API key to edit it
2. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check these boxes:
     - ✅ **Maps JavaScript API**
     - ✅ **Places API (New)**
     - ✅ **Geocoding API** (if you enabled it)
3. Under **"Application restrictions"**:
   - Select **"HTTP referrers (web sites)"**
   - Click **"Add an item"** and add:
     - `http://localhost:3000/*` (for development)
     - `http://localhost:*/*` (for any localhost port)
     - `https://your-production-domain.com/*` (when you deploy)
4. Click **"Save"**

## ✅ Step 5: Set Up Billing (Required for Google Maps)

⚠️ **Important:** Google Maps requires a billing account, but you get $200/month free credit!

1. Go to **"Billing"** in the left sidebar
2. Click **"Link a billing account"** or **"Create billing account"**
3. Fill in your billing information
4. **Don't worry about costs** - you get $200/month free, which covers:
   - ~28,000 map loads
   - ~6,250 place searches
   - ~40,000 geocoding requests

## ✅ Step 6: Add API Key to Your Project

1. In your project root directory, create or edit `.env.local` file:
   ```bash
   # If file doesn't exist, create it
   touch .env.local
   ```

2. Add this line to `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
   ```
   
   Replace `YOUR_API_KEY_HERE` with the actual API key you copied in Step 3.

   Example:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvw
   ```

## ✅ Step 7: Restart Your Development Server

1. Stop your current dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

## ✅ Step 8: Test the Map

1. Go through the Hatch flow:
   - Strategy → Model → Budget → Processing → Product Selection → Vendors
2. On the Vendors page, you should see the map loading
3. If you see an error, check the browser console (F12) for specific error messages

## 🔍 Troubleshooting

### Error: "Google Maps API key not configured"
- Make sure `.env.local` exists in the project root
- Make sure the variable name is exactly `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Make sure you restarted the dev server after adding the key
- Check that there are no spaces around the `=` sign

### Error: "This page didn't load Google Maps correctly"
- Check that **Maps JavaScript API** is enabled
- Check that your API key has **Maps JavaScript API** in its restrictions
- Check browser console (F12) for specific Google Maps error codes
- Make sure billing is enabled (Google Maps requires billing account)

### Map loads but no markers appear
- Check that **Places API (New)** is enabled
- Vendors need to have coordinates - check vendor enrichment is working
- Check browser console for errors

### API Key Errors in Console
- **Error 403**: API key restrictions are too strict or API not enabled
- **Error 400**: Invalid API key format
- **Error 429**: You've exceeded quota (unlikely with free tier)

## 📝 Complete .env.local Example

Your `.env.local` file should look something like this:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Composio
COMPOSIO_API_KEY=comp_...
YOUTUBE_AUTH_CONFIG_ID=ac_...

# Google AI (for product recommendations)
GOOGLE_AI_API_KEY=...

# Google Maps (NEW - add this!)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
```

## ✅ Verification Checklist

- [ ] Created Google Cloud project
- [ ] Enabled Maps JavaScript API
- [ ] Enabled Places API (New)
- [ ] Created API key
- [ ] Restricted API key to required APIs
- [ ] Added HTTP referrer restrictions
- [ ] Set up billing account
- [ ] Added API key to `.env.local`
- [ ] Restarted dev server
- [ ] Tested map on vendors page

## 🎉 You're Done!

Once you complete these steps, the Google Maps integration will work. The map will display vendor locations based on your selected product recommendations.

