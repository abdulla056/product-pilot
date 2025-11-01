# 🚀 Composio Quick Start

Get YouTube integration working in 5 minutes!

## Prerequisites

- ✅ ProductPilot project running locally
- ✅ Clerk authentication set up
- ✅ Node.js 18+ installed

## Quick Setup

### 1️⃣ Install Dependencies (Already Done!)

```bash
npm install composio-core @composio/openai openai
```

### 2️⃣ Get Composio API Key

1. Visit [platform.composio.dev](https://platform.composio.dev)
2. Sign up (it's free!)
3. Go to **Settings** → **API Keys**
4. Copy your key (starts with `comp_`)

### 3️⃣ Create YouTube Auth Config

1. In Composio dashboard, go to **[Marketplace → YouTube](https://platform.composio.dev/marketplace/Youtube)**
2. Click **"Create Auth Config"**
3. Select **OAuth2** (Composio provides dev credentials automatically!)
4. Copy the **Auth Config ID** (starts with `ac_`)

### 4️⃣ Update .env.local

Add these three lines to your `.env.local` file:

```bash
# Composio API
COMPOSIO_API_KEY=comp_your_api_key_here

# YouTube Auth Config (from step 3)
YOUTUBE_AUTH_CONFIG_ID=ac_your_config_id_here

# Optional: OpenAI for AI analysis
OPENAI_API_KEY=sk-your_openai_key_here
```

### 5️⃣ Start & Test

```bash
# Start the dev server
npm run dev

# Open your browser
open http://localhost:3000/dashboard

# Click "Connect YouTube" button
# Authorize your YouTube account
# Done! 🎉
```

## What You Can Do Now

✅ **View Channel Stats** - See subscribers, views, video count  
✅ **List Videos** - Get your recent uploads with stats  
✅ **Analyze Content** - AI can review your top-performing videos  
✅ **Generate Ideas** - Get product ideas based on your content  

## File Structure

Your project now has:

```
src/
├── lib/
│   └── composio.ts              # Composio helper functions
├── app/
│   └── api/
│       └── youtube/
│           ├── connect/         # Connect YouTube account
│           └── channel/         # Fetch channel data
└── components/
    └── connect-youtube-button.tsx  # UI button component
```

## Testing the Integration

### Option 1: Use the Dashboard

1. Go to `/dashboard`
2. Click "Connect YouTube"
3. Authorize
4. Your stats will appear automatically

### Option 2: API Testing

```typescript
// In a server component or API route
import { getChannelStatistics } from "@/lib/composio"

const stats = await getChannelStatistics(userId, channelId)
console.log(stats)
```

### Option 3: Fetch via HTTP

```bash
# Get channel data (replace with your channel ID)
curl http://localhost:3000/api/youtube/channel?channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw
```

## Common Issues

### ❌ "Auth config ID not set"
**Fix**: Make sure `.env.local` has `YOUTUBE_AUTH_CONFIG_ID=ac_...`

### ❌ "Connection failed"
**Fix**: Restart the dev server after adding env variables

### ❌ "Unauthorized"
**Fix**: Make sure you're logged into Clerk first

## What's Next?

- ✅ Connect YouTube → **Done!**
- 🔄 Add Instagram, TikTok (use Composio's other integrations)
- 🤖 Build AI product analyzer
- 📊 Create analytics dashboard
- 🚀 Launch your first AI-generated product!

---

**Need Help?**

- 📖 Full docs: `docs/COMPOSIO_SETUP.md`
- 🐛 Issues: Check browser console
- 💬 Questions: Create a GitHub issue

**Ready to build!** 🎯
