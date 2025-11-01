# Composio YouTube Integration Setup Guide

## 🎯 Overview

ProductPilot uses **Composio** to connect with YouTube and analyze your creator content. Composio provides a unified API to interact with YouTube data, making it easy to:

- 📊 Fetch channel statistics (subscribers, views, etc.)
- 🎥 List channel videos and their performance
- 📈 Get engagement data and trends
- 🔍 Analyze content patterns for product opportunities

---

## 🚀 Setup Instructions

### Step 1: Create a Composio Account

1. Visit [platform.composio.dev](https://platform.composio.dev)
2. Sign up for a free account
3. Navigate to your dashboard

### Step 2: Get Your Composio API Key

1. In the Composio dashboard, go to **Settings** → **API Keys**
2. Copy your API key (starts with `comp_`)
3. Add it to your `.env.local` file:

```bash
COMPOSIO_API_KEY=comp_your_api_key_here
```

### Step 3: Create YouTube Auth Config

<Steps>
  <Step title="Navigate to YouTube Integration">
    Go to **[Composio Marketplace → YouTube](https://platform.composio.dev/marketplace/Youtube)**
  </Step>
  
  <Step title="Configure OAuth2">
    Click **"Create Auth Config"** and configure:
    - **Auth Mode**: OAuth2
    - **Client ID**: (Composio provides this for development)
    - **Client Secret**: (Composio provides this for development)
    - **Scopes**: Leave defaults (includes read access to channel data)
  </Step>
  
  <Step title="Save Auth Config ID">
    After creation, copy the **Auth Config ID** (starts with `ac_`)
    
    Add it to your `.env.local`:
    ```bash
    YOUTUBE_AUTH_CONFIG_ID=ac_your_config_id_here
    ```
  </Step>
</Steps>

### Step 4: (Optional) Add OpenAI API Key

If you want to use AI-powered analysis with YouTube data:

1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Add to `.env.local`:

```bash
OPENAI_API_KEY=sk-your_openai_key_here
```

---

## 📝 Environment Variables

Your `.env.local` should now have:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Composio API
COMPOSIO_API_KEY=comp_your_api_key_here

# YouTube Auth Config
YOUTUBE_AUTH_CONFIG_ID=ac_your_config_id_here

# OpenAI API (optional)
OPENAI_API_KEY=sk-your_openai_key_here
```

---

## 🎮 Using YouTube Integration

### In the Dashboard

1. **Start the dev server**: `npm run dev`
2. **Navigate to Dashboard**: `http://localhost:3000/dashboard`
3. **Click "Connect YouTube"** button
4. **Authorize** your YouTube account via Composio OAuth
5. **You're connected!** ProductPilot can now analyze your channel

### Programmatic Usage

```typescript
import {
  getChannelStatistics,
  listChannelVideos,
  getVideoDetails,
} from "@/lib/composio"

// Get channel stats
const stats = await getChannelStatistics(userId, channelId)

// List recent videos
const videos = await listChannelVideos(userId, channelId, 10)

// Get specific video details
const video = await getVideoDetails(userId, videoId)
```

---

## 🔧 Available YouTube Functions

### Channel Functions

#### `getChannelStatistics(entityId, channelId)`
Get detailed statistics for a YouTube channel.

**Returns:**
```typescript
{
  subscriberCount: number
  viewCount: number
  videoCount: number
  // ... more stats
}
```

#### `listChannelVideos(entityId, channelId, maxResults?)`
List videos from a channel with stats.

**Parameters:**
- `entityId`: User/entity ID (Clerk user ID)
- `channelId`: YouTube channel ID
- `maxResults`: Number of videos to fetch (default: 10)

**Returns:** Array of video objects with statistics

#### `getChannelActivities(entityId, channelId, maxResults?)`
Get recent channel activities (uploads, likes, etc.)

#### `getChannelIdByHandle(entityId, channelHandle)`
Convert a YouTube handle (e.g., `@username`) to a channel ID

### Video Functions

#### `getVideoDetails(entityId, videoId)`
Get detailed information about a specific video.

**Returns:**
```typescript
{
  snippet: {
    title: string
    description: string
    publishedAt: string
    // ...
  },
  statistics: {
    viewCount: number
    likeCount: number
    commentCount: number
    // ...
  },
  contentDetails: {
    duration: string
    // ...
  }
}
```

---

## 🔐 Security Notes

- ✅ API keys are stored in `.env.local` (not committed to git)
- ✅ OAuth handled securely by Composio
- ✅ User tokens managed by Composio (you don't handle refresh tokens)
- ✅ Each user has their own YouTube connection via Clerk user ID

---

## 🐛 Troubleshooting

### "YouTube auth config ID not set" Error
**Solution**: Make sure `YOUTUBE_AUTH_CONFIG_ID` is set in `.env.local`

### "Unauthorized" Error
**Solution**: 
1. Check that `COMPOSIO_API_KEY` is valid
2. Verify you're logged into Clerk
3. Make sure YouTube connection is authorized

### YouTube API Quota Exceeded
**Solution**: Composio manages quotas, but if you hit limits:
1. Wait 24 hours for quota reset
2. Optimize your API calls (batch requests)
3. Consider upgrading Composio plan for higher quotas

### Connection Not Working
**Solution**:
1. Delete the connection in Composio dashboard
2. Re-authorize in ProductPilot dashboard
3. Check browser console for errors

---

## 📚 Additional Resources

- [Composio Documentation](https://docs.composio.dev)
- [YouTube Data API Reference](https://developers.google.com/youtube/v3)
- [Composio YouTube Integration](https://platform.composio.dev/marketplace/Youtube)

---

## 🎯 Next Steps

After setup:

1. ✅ Connect your YouTube account in dashboard
2. 🔍 ProductPilot will analyze your channel
3. 💡 Get AI-generated product ideas based on your content
4. 🚀 Launch products your audience actually wants!

**Questions?** Check `docs/` or create an issue in the repo.

---

**Last Updated**: November 2025
