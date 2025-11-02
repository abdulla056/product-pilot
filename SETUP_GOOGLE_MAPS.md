# 🗺️ Quick Setup: Google Maps API

## TL;DR - Quick Steps

1. **Get API Key:**
   - Go to https://console.cloud.google.com/
   - Enable "Maps JavaScript API" and "Places API (New)"
   - Create API key
   - Add billing (required, but $200/month free!)

2. **Add to Project:**
   - Create `.env.local` in project root (if it doesn't exist)
   - Add: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here`
   - Restart dev server

3. **Done!** The map will work on the vendors page.

---

## Detailed Instructions

See `docs/GOOGLE_MAPS_SETUP_STEP_BY_STEP.md` for complete step-by-step guide.

---

## What You Need

- ✅ Google Cloud account (free to create)
- ✅ Credit card for billing (required, but free tier covers most usage)
- ✅ API key from Google Cloud Console
- ✅ Add to `.env.local` file

---

## Quick Test

After setup, visit:
```
http://localhost:3000/hatch/vendors
```

You should see the map loading. If there's an error, check:
1. Browser console (F12) for error messages
2. That `.env.local` has the correct variable name
3. That you restarted the dev server

---

## Support

If you need help:
- Check `docs/GOOGLE_MAPS_SETUP_STEP_BY_STEP.md` for detailed instructions
- Check `docs/GOOGLE_MAPS_API_GUIDE.md` for API information
- Check browser console (F12) for specific error codes

