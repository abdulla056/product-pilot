# ProductPilot — The Creator's Product Copilot

A Next.js application that helps content creators turn their audience insights into sellable product ideas using AI-powered analysis.

## 🚀 New: AI-Powered Product Discovery

ProductPilot now includes a complete **multi-agent AI system** that analyzes your YouTube content to generate viable product opportunities:

- 🤖 **4 Specialized AI Agents** - Content, Audience, Market Trends, and Product Generation
- 📊 **Comprehensive Analysis** - Genre identification, audience insights, and market research
- 💡 **6-8 Product Ideas** - Digital, physical, and service recommendations with confidence scores
- 🎯 **Validation Strategies** - Specific steps to test demand before building
- 💰 **Pricing Guidance** - Research-based price ranges for each product
- 📈 **Market Trends** - Current opportunities in your niche

**[Read the full AI Analysis documentation →](docs/AI_ANALYSIS_WORKFLOW.md)**

## Features

- 🤖 **AI-Powered Product Discovery** - Multi-agent system analyzes your creator graph
- 📊 **Multi-Product Support** - Digital, physical, and service products
- 🎥 **YouTube Integration** - Powered by Composio for seamless channel analysis
- 👥 **Audience Insights** - Deep demographic and behavioral analysis
- 📈 **Market Research** - Trending products and competitor insights
- ✅ **Demand Validation** - Test ideas before investing (coming soon)
- 🚀 **GTM Asset Generation** - Auto-generate marketing materials (coming soon)
- 🔐 **Authentication** - Powered by Clerk with Google, GitHub, Email, and more

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key (for AI analysis)
- Composio account (for YouTube integration)
- Clerk account (for authentication)

### Installation

First, install dependencies:

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI API Key (Required for AI Analysis)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# Composio (Required for YouTube Integration)
COMPOSIO_API_KEY=comp_xxxxxxxxxxxxx
YOUTUBE_AUTH_CONFIG_ID=ac_xxxxxxxxxxxxx

# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

See `.env.local.example` for a complete template.

### Detailed Setup Guides

1. **Clerk Authentication**
   - Create account at [clerk.com](https://clerk.com)
   - Get your API keys
   - See `docs/CLERK_SETUP.md` for detailed instructions

2. **Composio YouTube Integration**
   - Create account at [platform.composio.dev](https://platform.composio.dev)
   - Set up YouTube auth config
   - See `docs/COMPOSIO_SETUP.md` for detailed instructions

3. **OpenAI API**
   - Get API key from [platform.openai.com](https://platform.openai.com)
   - Ensure you have credits available

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quick Start: AI Analysis

1. **Sign In** - Create an account or log in
2. **Connect YouTube** - Authorize ProductPilot to access your channel
3. **Run Analysis** - Click "Start AI Analysis" on the dashboard
4. **Review Results** - Get 6-8 product opportunities with full insights
5. **Start Validation** - Follow the suggested validation steps

**[Read the Quick Start Guide →](docs/QUICK_START_AI_ANALYSIS.md)**

## Project Structure

```
product-pilot/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/
│   │   │   └── analyze/          # AI analysis API endpoint
│   │   ├── dashboard/            # Protected dashboard with AI analysis
│   │   ├── sign-in/              # Clerk sign-in page
│   │   ├── sign-up/              # Clerk sign-up page
│   │   ├── layout.tsx            # Root layout with ClerkProvider
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── analysis-dashboard.tsx       # AI analysis interface
│   │   ├── content-analysis-card.tsx    # Content insights display
│   │   ├── audience-analysis-card.tsx   # Audience insights display
│   │   ├── product-opportunities-card.tsx # Product recommendations
│   │   ├── market-trends-card.tsx       # Market insights
│   │   ├── sections/             # Landing page sections
│   │   └── ui/                   # Reusable UI components
│   ├── lib/
│   │   ├── ai-analysis.ts        # Multi-agent AI system
│   │   ├── mock-data.ts          # Sample data for testing
│   │   ├── composio.ts           # YouTube integration
│   │   └── utils.ts              # Utility functions
│   ├── types/
│   │   ├── analysis.ts           # AI analysis type definitions
│   │   └── composio.ts           # YouTube API types
│   └── middleware.ts             # Clerk auth middleware
├── docs/
│   ├── AI_ANALYSIS_WORKFLOW.md   # Technical documentation
│   ├── QUICK_START_AI_ANALYSIS.md # User guide
│   ├── ARCHITECTURE_DIAGRAM.md    # System architecture
│   ├── IMPLEMENTATION_SUMMARY.md  # Implementation details
│   ├── CLERK_SETUP.md
│   └── COMPOSIO_SETUP.md
├── public/                       # Static assets
├── .env.local.example            # Environment template
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

## Authentication

This project uses **Clerk** for authentication with built-in support for:

- 🔐 Email/Password
- 🌐 Google OAuth
- 🐙 GitHub OAuth
- 🔗 Magic Links
- 📧 Email Verification
- 🔄 Password Reset
- 🔒 Multi-Factor Authentication (MFA)
- And many more providers!

### Quick Setup

1. Create account at [clerk.com](https://clerk.com)
2. Get your API keys from the dashboard
3. Add to `.env.local` (see above)
4. Start developing!

See `docs/CLERK_SETUP.md` for detailed instructions.

## AI Analysis System

### How It Works

ProductPilot uses a **4-agent AI system** powered by OpenAI GPT-4o:

1. **Content Analyzer** - Identifies your content genre, topics, style, and expertise
2. **Audience Analyzer** - Analyzes demographics, pain points, and aspirations
3. **Market Researcher** - Finds trending products and opportunities
4. **Product Generator** - Creates 6-8 viable product recommendations

Each agent builds on the previous one's insights to create a comprehensive creator graph.

### What You Get

- **Content Analysis**: Genre, sub-genres, main topics, content style & tone, key themes
- **Audience Insights**: Demographics, interests, pain points, aspirations, engagement patterns
- **Market Trends**: Trending products, emerging niches, seasonal opportunities
- **Product Opportunities**: 6-8 ideas with descriptions, pricing, demand estimates, and validation steps

### Example Output

```json
{
  "name": "Developer Productivity Notion Template Pack",
  "category": "digital",
  "estimatedDemand": "high",
  "confidence": 0.95,
  "priceRange": { "min": 29, "max": 79, "currency": "USD" },
  "validationSuggestions": [
    "Create a free sample template and measure download rate",
    "Poll audience on Twitter/YouTube about willingness to pay"
  ]
}
```

**[View Architecture Diagram →](docs/ARCHITECTURE_DIAGRAM.md)**

## Pages

- **`/`** - Landing page showcasing ProductPilot's features
- **`/sign-in`** - Sign-in page (Clerk UI)
- **`/sign-up`** - Sign-up page (Clerk UI)
- **`/dashboard`** - Protected dashboard with AI analysis
- **`/api/analyze`** - AI analysis API endpoint (POST & GET)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (full type safety)
- **Styling:** Tailwind CSS 4
- **AI:** OpenAI GPT-4o (multi-agent system)
- **UI Components:** Custom shadcn-inspired components
- **Authentication:** Clerk
- **YouTube Integration:** Composio
- **Icons:** Lucide React

## Documentation

- **[AI Analysis Workflow](docs/AI_ANALYSIS_WORKFLOW.md)** - Technical deep dive into the AI system
- **[Quick Start Guide](docs/QUICK_START_AI_ANALYSIS.md)** - User guide for AI analysis
- **[Architecture Diagram](docs/ARCHITECTURE_DIAGRAM.md)** - Visual system overview
- **[Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md)** - What was built and how
- **[Clerk Setup](docs/CLERK_SETUP.md)** - Authentication configuration
- **[Composio Setup](docs/COMPOSIO_SETUP.md)** - YouTube integration setup

## Roadmap

### ✅ Phase 1: Content Analysis (Complete)
- [x] Multi-agent AI system
- [x] Content and audience analysis
- [x] Market trends research
- [x] Product opportunity generation
- [x] Mock data for testing
- [x] Complete UI components

### 🚧 Phase 2: Real Transcription (Next)
- [ ] YouTube captions API integration
- [ ] Whisper API for videos without captions
- [ ] Real-time video processing
- [ ] Database storage for analyses

### 📋 Phase 3: Demand Validation
- [ ] Landing page generator
- [ ] A/B testing framework
- [ ] Email campaign builder
- [ ] Pre-sale funnel creator
- [ ] Analytics dashboard

### 📋 Phase 4: GTM Asset Generation
- [ ] Product page templates
- [ ] AI marketing copy writer
- [ ] Social media content generator
- [ ] Email sequence builder

### 📋 Phase 5: Fulfillment Integration
- [ ] Shopify/Gumroad integration
- [ ] Course platform connectors
- [ ] Print-on-demand services
- [ ] Automated workflows

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Clerk Documentation](https://clerk.com/docs) - authentication and user management
- [Composio Documentation](https://docs.composio.dev) - YouTube and social media integrations
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Lucide Icons](https://lucide.dev) - beautiful & consistent icons

## License

MIT
