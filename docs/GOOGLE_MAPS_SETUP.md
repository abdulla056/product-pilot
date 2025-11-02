# Google Maps API Setup Guide

This guide will help you set up Google Maps API integration for displaying vendor locations in the Hatch application.

## Prerequisites

- ✅ Composio account with API key
- ✅ Google Cloud Platform account
- ✅ Google Maps API enabled

## Step 1: Enable Google Maps API in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Library**
4. Search for and enable the following APIs:
   - **Places API (New)** - For searching nearby vendors
   - **Maps JavaScript API** - For displaying the interactive map
   - **Geocoding API** - For converting addresses to coordinates (optional)

## Step 2: Create API Keys

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the API key
4. (Recommended) Click **Restrict Key** to add restrictions:
   - **Application restrictions**: HTTP referrers (web sites)
   - **API restrictions**: Select only the APIs you enabled above

## Step 3: Configure Composio with Google Maps

1. Go to [Composio Dashboard](https://platform.composio.dev/)
2. Navigate to **Marketplace** → Search for **Google Places** or **Google Maps**
3. Click **Connect** or **Add Integration**
4. Follow the setup wizard to connect Google Places API
5. Enter your Google Maps API key when prompted

## Step 4: Add Environment Variables

Add the following to your `.env.local` file:

```bash
# Google Maps API Key (for client-side map display)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Composio API Key (should already exist)
COMPOSIO_API_KEY=comp_your_composio_api_key_here
```

**Important Notes:**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` must start with `NEXT_PUBLIC_` to be accessible in the browser
- Never commit your `.env.local` file to version control
- Keep your API keys secure

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Complete the Hatch process:
   - Go through Strategy → Model → Budget → Processing
   - Select a product recommendation
   - View the vendors page

3. Verify:
   - The map loads correctly
   - Vendor markers appear on the map
   - Clicking markers shows vendor info windows
   - Browser geolocation permission is requested (if enabled)

## Troubleshooting

### Map doesn't load
- Check that `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set correctly
- Verify the API key has Maps JavaScript API enabled
- Check browser console for errors

### No vendor markers appear
- Verify Places API is enabled in Google Cloud Console
- Check Composio integration is connected to Google Places
- Ensure vendor location enrichment API endpoint is working
- Check server logs for API errors

### Geolocation not working
- Ensure HTTPS is enabled (required for geolocation)
- Check browser permissions for location access
- Verify Geolocation API is available in the browser

## API Usage

The integration uses:

1. **Composio Google Places API** (server-side):
   - `GOOGLE_PLACES_TEXT_SEARCH` - Search for vendors by location and category
   - `GOOGLE_PLACES_GET_PLACE` - Get detailed place information

2. **Google Maps JavaScript API** (client-side):
   - Interactive map display
   - Marker placement
   - Info windows

## Cost Considerations

- Google Maps Platform uses pay-as-you-go pricing
- Each API has different costs per request
- Check [Google Maps Platform Pricing](https://mapsplatform.google.com/pricing/) for details
- Consider setting up billing alerts in Google Cloud Console

## Security Best Practices

1. **Restrict API Keys**: Only allow specific APIs and referrers
2. **Use Environment Variables**: Never hardcode API keys
3. **Monitor Usage**: Set up alerts for unexpected usage
4. **Rotate Keys**: Regularly rotate API keys for security

## Files Modified/Created

- `src/lib/google-maps-helpers.ts` - Composio integration for Places API
- `src/components/vendor-map.tsx` - React component for map display
- `src/app/api/hatch/vendors/enrich/route.ts` - API endpoint for location enrichment
- `src/app/(main)/hatch/vendors/page.tsx` - Updated to show map
- `src/lib/vendor-recommendations.ts` - Added coordinates to Vendor interface

