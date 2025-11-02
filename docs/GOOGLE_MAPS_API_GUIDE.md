# Google Maps API Guide - Which APIs to Use

For your Hatch application, you need **2 required APIs** and **1 optional API**. Here's what each does and why you need them:

## ✅ Required APIs

### 1. **Maps JavaScript API** (REQUIRED)
**What it does:** Displays the interactive map in the browser  
**Used for:**
- Rendering the map component
- Displaying vendor location markers
- Showing info windows when clicking markers
- Map controls (zoom, pan, fullscreen)

**Where it's used:**
- `src/components/vendor-map.tsx` - Client-side map display

**Cost:** 
- First $200/month free (28,000+ map loads)
- Then $7 per 1,000 map loads

**Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable "Maps JavaScript API"
3. Use the API key in `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

---

### 2. **Places API (New)** (REQUIRED)
**What it does:** Searches for businesses, places, and locations  
**Used for:**
- Finding nearby vendors/suppliers based on search queries
- Getting business details (name, address, coordinates, rating)
- Enriching vendor data with location coordinates

**Where it's used:**
- `src/lib/google-maps-helpers.ts` - Server-side location search via Composio
- `src/app/api/hatch/vendors/enrich/route.ts` - Enriching vendors with coordinates

**Cost:**
- Text Search: $32 per 1,000 requests
- Get Place Details: $17 per 1,000 requests
- **First $200/month free** (covers ~6,250 text searches)

**Setup:**
1. Enable "Places API (New)" in Google Cloud Console
2. Configure via Composio (or use directly)

---

## 🔶 Optional API

### 3. **Geocoding API** (OPTIONAL)
**What it does:** Converts addresses to coordinates (lat/lng)  
**Used for:**
- Converting vendor addresses to map coordinates
- Reverse geocoding (coordinates to addresses)

**Note:** You might not need this if Places API already provides coordinates, but it's useful for:
- Converting street addresses when you don't have coordinates
- More accurate geocoding for known addresses

**Cost:**
- $5 per 1,000 requests
- First $200/month free (40,000 requests)

**Setup:**
1. Enable "Geocoding API" in Google Cloud Console
2. Use if you need to convert addresses manually

---

## 📋 Recommended Setup

### Minimum Setup (What You Need Now):

```
✅ Maps JavaScript API       - For map display
✅ Places API (New)          - For vendor location search
```

### Enhanced Setup (If Needed Later):

```
✅ Maps JavaScript API       - For map display
✅ Places API (New)          - For vendor location search  
✅ Geocoding API             - For address conversion (if needed)
✅ Places API (Legacy)       - NOT recommended (being deprecated)
```

---

## 🎯 Quick Setup Steps

### Step 1: Enable APIs in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one)
3. Navigate to **APIs & Services** → **Library**
4. Search and enable:
   - ✅ **Maps JavaScript API**
   - ✅ **Places API (New)**

### Step 2: Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the API key

### Step 3: Restrict API Key (Security Best Practice)

1. Click on your API key to edit it
2. Under **API restrictions**:
   - Select "Restrict key"
   - Choose: **Maps JavaScript API** and **Places API (New)**
3. Under **Application restrictions**:
   - Select "HTTP referrers (web sites)"
   - Add your domains:
     - `http://localhost:3000/*` (for development)
     - `https://yourdomain.com/*` (for production)

### Step 4: Add to Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Step 5: Configure Composio (For Places API Server-Side)

1. Go to [Composio Dashboard](https://platform.composio.dev/)
2. Navigate to **Marketplace** → **Google Places**
3. Connect and add your Google Maps API key

---

## 💰 Pricing Overview

**Free Tier (First $200/month):**
- ✅ Maps JavaScript API: ~28,000 map loads free
- ✅ Places API (New): ~6,250 text searches free
- ✅ Geocoding API: ~40,000 requests free

**After Free Tier:**
- Maps JavaScript API: $7 per 1,000 loads
- Places API Text Search: $32 per 1,000 searches
- Places API Get Details: $17 per 1,000 requests
- Geocoding API: $5 per 1,000 requests

**💡 Tip:** Set up billing alerts in Google Cloud Console to monitor usage!

---

## 🔍 API Comparison Table

| API | Purpose | Required? | Cost per 1,000 |
|-----|---------|-----------|----------------|
| Maps JavaScript API | Display map | ✅ Yes | $7 |
| Places API (New) | Search places | ✅ Yes | $32 (text search) |
| Geocoding API | Address → Coordinates | ⚠️ Optional | $5 |

---

## ❌ APIs You DON'T Need

- **Places API (Legacy)** - Deprecated, use "Places API (New)" instead
- **Maps Embed API** - Not needed if using JavaScript API
- **Directions API** - Only if you need routing/directions
- **Distance Matrix API** - Only if you need distance calculations
- **Street View Static API** - Only if you need street view images

---

## 🚀 Summary

**For your Hatch application, you need:**

1. **Maps JavaScript API** - Display the map ✅
2. **Places API (New)** - Search for vendor locations ✅

**Optional but useful:**
3. **Geocoding API** - Convert addresses to coordinates (if needed)

All APIs share the same **$200/month free credit**, which should be plenty for development and moderate production use!

