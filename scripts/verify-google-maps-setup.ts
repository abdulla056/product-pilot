/**
 * Script to verify Google Maps API setup
 * Run: npx tsx scripts/verify-google-maps-setup.ts
 */

async function verifyGoogleMapsSetup() {
  console.log("🔍 Verifying Google Maps API Setup...\n")

  // Check environment variables
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    console.error("❌ ERROR: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not found in environment")
    console.log("\n📝 Please add to .env.local:")
    console.log("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here\n")
    process.exit(1)
  }

  console.log("✅ API Key found:", apiKey.substring(0, 20) + "...")

  // Check API key format
  if (!apiKey.startsWith("AIza")) {
    console.warn("⚠️  WARNING: API key format looks incorrect (should start with 'AIza')")
  }

  // Test if Maps JavaScript API is accessible
  console.log("\n🌐 Testing Google Maps JavaScript API access...")
  
  try {
    const testUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    const response = await fetch(testUrl, { method: "HEAD" })

    if (response.status === 200) {
      console.log("✅ Maps JavaScript API: Accessible")
    } else if (response.status === 403) {
      console.error("❌ Maps JavaScript API: Access Denied (403)")
      console.log("\nPossible issues:")
      console.log("  1. Maps JavaScript API not enabled in Google Cloud Console")
      console.log("  2. API key restrictions are blocking this request")
      console.log("  3. Billing account not set up")
      console.log("\n🔧 Fix:")
      console.log("  1. Go to: https://console.cloud.google.com/apis/library")
      console.log("  2. Search for 'Maps JavaScript API' and enable it")
      console.log("  3. Make sure billing is enabled")
      console.log("  4. Check API key restrictions")
    } else {
      console.warn(`⚠️  Maps JavaScript API: Unexpected status ${response.status}`)
    }
  } catch (error: any) {
    console.error("❌ Error testing API:", error.message)
  }

  // Test Places API
  console.log("\n📍 Testing Places API access...")
  
  try {
    // This is a simple test - actual Places API requires specific endpoints
    console.log("ℹ️  Places API test requires specific endpoints")
    console.log("   Verify in Google Cloud Console that 'Places API (New)' is enabled")
  } catch (error: any) {
    console.error("❌ Error:", error.message)
  }

  console.log("\n" + "=".repeat(50))
  console.log("📋 Setup Checklist:")
  console.log("=".repeat(50))
  console.log("[ ] Maps JavaScript API enabled in Google Cloud Console")
  console.log("[ ] Places API (New) enabled in Google Cloud Console")
  console.log("[ ] Billing account set up (required for Google Maps)")
  console.log("[ ] API key restrictions configured")
  console.log("[ ] .env.local file has NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")
  console.log("[ ] Dev server restarted after adding API key")
  console.log("\n🔗 Useful Links:")
  console.log("   - APIs Library: https://console.cloud.google.com/apis/library")
  console.log("   - Credentials: https://console.cloud.google.com/apis/credentials")
  console.log("   - Billing: https://console.cloud.google.com/billing")
  console.log("\n")
}

verifyGoogleMapsSetup()

