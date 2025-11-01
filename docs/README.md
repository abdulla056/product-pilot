# Product Pilot Documentation

Complete documentation for the Product Pilot AI analysis system.

## 📚 Documentation Overview

### Getting Started

1. **[Composio Setup](./COMPOSIO_SETUP.md)** - Initial Composio configuration
2. **[Composio Quickstart](./COMPOSIO_QUICKSTART.md)** - Quick integration guide
3. **[Clerk Setup](./CLERK_SETUP.md)** - User authentication setup

### YouTube Integration

4. **[YouTube Transcription](./YOUTUBE_TRANSCRIPTION.md)** ⭐ **NEW**
   - How to fetch videos using Composio
   - Getting video transcripts/captions
   - API reference and examples

5. **[Real Analysis Guide](./REAL_ANALYSIS_GUIDE.md)** ⭐ **NEW**
   - Using real YouTube data vs mock data
   - Code examples and best practices
   - Performance optimization

### System Architecture

6. **[Agentic Workflow](./AGENTIC_WORKFLOW_DIAGRAM.md)** - AI agent architecture
7. **[Agentic Conversion Summary](./AGENTIC_CONVERSION_SUMMARY.md)** - System design

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your API keys
COMPOSIO_API_KEY=your_composio_api_key
YOUTUBE_AUTH_CONFIG_ID=your_youtube_auth_config
GOOGLE_AI_API_KEY=your_google_ai_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### 2. Connect YouTube

```typescript
// In your app
import { initializeYouTubeConnection } from '@/lib/composio'

const { redirectUrl } = await initializeYouTubeConnection(userId)
// Redirect user to YouTube OAuth
```

### 3. Run Analysis

```typescript
// Option A: Use mock data for testing
const response = await fetch('/api/analyze', {
  method: 'POST',
  body: JSON.stringify({
    videoCount: 5,
    useMockData: true
  })
})

// Option B: Use real YouTube data
const response = await fetch('/api/analyze', {
  method: 'POST',
  body: JSON.stringify({
    videoCount: 10,
    useMockData: false  // Fetch and transcribe real videos
  })
})

const { data } = await response.json()
console.log(data.productOpportunities) // AI-generated product ideas
```

## 🎯 Key Features

### 1. YouTube Video Transcription
- Automatic caption/subtitle extraction
- Multi-language support
- SRT format parsing
- Batch processing

### 2. AI Analysis (Gemini)
- **Content Analysis** - Genre, topics, themes, expertise
- **Audience Insights** - Demographics, pain points, aspirations
- **Market Trends** - Trending products, competitors, seasonality
- **Product Opportunities** - Validated product ideas with pricing

### 3. Agentic Workflow
- Self-reflecting AI agents
- Autonomous decision making
- Confidence-based retries
- Multi-agent collaboration

## 📖 Documentation Index

| Document | Description | Use Case |
|----------|-------------|----------|
| [YOUTUBE_TRANSCRIPTION.md](./YOUTUBE_TRANSCRIPTION.md) | Complete transcription guide | Fetch and transcribe videos |
| [REAL_ANALYSIS_GUIDE.md](./REAL_ANALYSIS_GUIDE.md) | Using real vs mock data | Production implementation |
| [COMPOSIO_SETUP.md](./COMPOSIO_SETUP.md) | Composio configuration | Initial setup |
| [COMPOSIO_QUICKSTART.md](./COMPOSIO_QUICKSTART.md) | Quick integration | Fast start |
| [CLERK_SETUP.md](./CLERK_SETUP.md) | Authentication setup | User management |
| [AGENTIC_WORKFLOW_DIAGRAM.md](./AGENTIC_WORKFLOW_DIAGRAM.md) | System architecture | Understanding the system |

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test AI analysis (mock data)
npm run test:ai

# Test YouTube transcription (real data)
npm run test:transcription
```

## 🔧 Core Functions

### Transcription

```typescript
import { 
  getAndTranscribeChannelVideos,
  transcribeVideos,
  getVideoTranscript 
} from '@/lib/transcription'

// Fetch and transcribe all at once
const transcripts = await getAndTranscribeChannelVideos(
  userId,
  channelId,
  10
)

// Transcribe specific videos
const transcripts = await transcribeVideos(
  userId,
  ['videoId1', 'videoId2']
)

// Get single transcript
const transcript = await getVideoTranscript(userId, videoId)
```

### AI Analysis

```typescript
import { analyzeCreatorGraph } from '@/lib/ai-analysis'

const analysis = await analyzeCreatorGraph(
  userId,
  channelId,
  channelName,
  transcripts,
  totalViews,
  subscriberCount
)

// Access results
console.log(analysis.contentAnalysis)
console.log(analysis.audienceAnalysis)
console.log(analysis.productOpportunities)
console.log(analysis.marketTrends)
```

## 📊 Data Flow

```
User → YouTube (Composio) → Transcripts → AI (Gemini) → Product Ideas
  ↓                           ↓              ↓             ↓
Auth    Videos + Captions   Clean Text   Analysis    Recommendations
```

## 🎓 Learning Path

### For New Users

1. Read [REAL_ANALYSIS_GUIDE.md](./REAL_ANALYSIS_GUIDE.md)
2. Set up environment variables
3. Test with mock data first
4. Connect YouTube account
5. Run real analysis

### For Developers

1. Review [AGENTIC_WORKFLOW_DIAGRAM.md](./AGENTIC_WORKFLOW_DIAGRAM.md)
2. Study [YOUTUBE_TRANSCRIPTION.md](./YOUTUBE_TRANSCRIPTION.md)
3. Check `src/lib/ai-analysis.ts` for AI logic
4. Explore `src/lib/transcription.ts` for data fetching
5. Customize analysis prompts

## 🚨 Common Issues

### No transcripts found
- **Cause:** Videos don't have captions
- **Fix:** Enable auto-generated captions in YouTube Studio

### Authentication error
- **Cause:** YouTube not connected
- **Fix:** Complete OAuth flow in dashboard

### Rate limiting
- **Cause:** Too many API calls
- **Fix:** Reduce video count or add delays

## 🔐 Security

- API keys stored in `.env.local` (never committed)
- User authentication via Clerk
- OAuth 2.0 for YouTube access
- Server-side API calls only

## 📈 Performance

| Operation | Time (avg) | Notes |
|-----------|-----------|-------|
| Fetch 10 videos | ~5 sec | Composio API |
| Transcribe 10 videos | ~15 sec | Caption download |
| AI analysis | ~30 sec | Gemini processing |
| **Total** | **~50 sec** | For 10 videos |

## 🤝 Support

- **Documentation Issues:** Open a GitHub issue
- **Feature Requests:** Submit a pull request
- **Composio Help:** https://docs.composio.dev
- **Gemini API:** https://ai.google.dev/docs

## 📝 License

See LICENSE file in repository root.

---

**Last Updated:** November 2025

**Version:** 1.0.0

**Maintained by:** Product Pilot Team
