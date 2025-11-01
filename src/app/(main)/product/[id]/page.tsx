import { currentUser } from "@clerk/nextjs/server"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@/components/ui/star-rating"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Sparkles } from "lucide-react"
import Link from "next/link"

// This should match your actual product data structure
// For now, using the same mock data structure
const mockProducts = [
  {
    id: "1",
    name: "Creator's Video Editing Masterclass",
    description: "A comprehensive online course teaching video editing techniques specifically tailored for content creators. Includes advanced transitions, color grading, and storytelling methods that have proven to engage audiences.",
    profitability: 5,
    viability: 4,
    sustainability: 5,
    opportunity: 4,
    status: "selected",
    fullDocumentation: `# Creator's Video Editing Masterclass - Full Documentation

## Course Overview
This comprehensive online course is designed to teach content creators advanced video editing techniques that have proven to engage audiences and increase viewer retention.

## Course Outline

### Module 1: Foundations of Creator Video Editing
- Understanding your audience's viewing preferences
- Setting up your editing workspace
- Essential editing principles for social media

### Module 2: Advanced Transitions
- Creating seamless scene transitions
- Using motion graphics for engaging cuts
- Transition timing and rhythm

### Module 3: Color Grading for Impact
- Creating your signature color palette
- Color psychology in video content
- Grading techniques for different platforms

### Module 4: Storytelling Through Editing
- Narrative structure in short-form content
- Pacing and rhythm
- Building emotional arcs

## Pricing Strategy
- Recommended Price: $97 - $297 (depending on content depth)
- Early Bird: $47 - $147
- Payment Plans: 3 monthly installments available
- Revenue Share Model: 70% creator, 30% platform (if using course platform)

## Marketing Plan

### Launch Strategy
1. Pre-launch: Build email list and create anticipation (30 days)
2. Launch Week: Daily content, testimonials, limited-time pricing
3. Post-launch: Evergreen sales funnel with weekly promotions

### Content Marketing
- YouTube: Behind-the-scenes editing tutorials (teaser content)
- Instagram/TikTok: Quick editing tips and tricks
- Email: Weekly newsletter with editing tips and course updates

### Partnerships
- Collaborate with other creators for cross-promotion
- Offer affiliate program (30% commission)
- Partner with editing software companies for sponsorships

## Content Delivery Platform Recommendations

### Option 1: Teachable
- Pros: Easy setup, built-in marketing tools, payment processing
- Cons: Higher transaction fees (5% + $0.50 per transaction)
- Best for: Beginners who want everything in one place

### Option 2: Podia
- Pros: No transaction fees, all-in-one platform, clean interface
- Cons: Monthly subscription fee required
- Best for: Creators planning to launch multiple products

### Option 3: Kajabi
- Pros: Comprehensive marketing tools, email automation, community features
- Cons: Expensive monthly fee
- Best for: Serious creators building a full business

### Option 4: Gumroad
- Pros: Simple, low fees (2.9% + $0.30), easy to use
- Cons: Less customization, basic features
- Best for: Quick launches without complex needs

## Market Analysis
Based on current market trends:
- High demand for video editing education (growing creator economy)
- Average course completion rate: 40-60%
- Market size: $5+ billion and growing
- Competition: Medium (many courses, but unique angle needed)

## Success Metrics to Track
- Course enrollment rate
- Completion rate
- Student satisfaction score
- Upsell conversion (if offering advanced courses)
- Refund rate (keep under 5%)
- Lifetime value per student

## Next Steps
1. Create detailed module content outline
2. Record course videos (aim for 5-10 hours of content)
3. Build landing page and sales funnel
4. Create email sequences
5. Set up payment processing
6. Launch with beta testers first`
  },
  {
    id: "2",
    name: "Custom Branded Merchandise Line",
    description: "A line of physical products including t-shirts, hoodies, and accessories featuring your unique brand identity. Designed based on audience preferences and trending styles in your niche.",
    profitability: 3,
    viability: 5,
    sustainability: 3,
    opportunity: 5,
    status: "recommended",
    fullDocumentation: `# Custom Branded Merchandise Line - Full Documentation

## Product Overview
A curated collection of physical products designed to connect your brand with your audience through high-quality, stylish merchandise.

## Product Line

### Phase 1 Launch Products
1. **Premium T-Shirts**
   - 100% cotton or cotton blend
   - Multiple designs (3-5 initial designs)
   - Unisex sizing (XS-3XL)

2. **Hoodies & Sweatshirts**
   - Soft, durable materials
   - Classic and zip-up options
   - Premium feel to justify higher price point

3. **Accessories**
   - Branded hats/beanies
   - Stickers (low-cost entry point)
   - Phone cases (if audience size supports)
   - Tote bags

## Supplier Recommendations

### Print-on-Demand Services

#### Option 1: Printful
- **Pros**: High quality, integration with Shopify/Etsy, no upfront costs
- **Cons**: Higher per-unit costs, longer shipping times
- **Best for**: Testing demand without inventory risk
- **Profit Margin**: 15-25% typical

#### Option 2: Printify
- **Pros**: Multiple supplier options, competitive pricing
- **Cons**: Quality varies by supplier, need to research
- **Best for**: Price-conscious creators
- **Profit Margin**: 20-30% typical

#### Option 3: Teespring/Spring
- **Pros**: Built-in marketplace, simple setup
- **Cons**: Lower profit margins, less control
- **Best for**: Complete beginners
- **Profit Margin**: 10-20% typical

### Bulk Manufacturing (Advanced)
- **When to Consider**: After validating demand (500+ units)
- **Suppliers**: Alibaba, local screen printers
- **Pros**: Lower per-unit cost, faster fulfillment
- **Cons**: Upfront investment, inventory risk

## Pricing Structure

### Recommended Markup Strategy
- **T-Shirts**: 3x cost (e.g., $8 cost → $24 retail)
- **Hoodies**: 2.5x cost (e.g., $20 cost → $50 retail)
- **Accessories**: 4x cost (e.g., $2 sticker cost → $8 retail)

### Market Positioning
- Premium tier: Higher quality, limited designs ($35-50 for tees)
- Standard tier: Good quality, variety ($20-30 for tees)
- Budget tier: Basic quality, volume ($15-20 for tees)

## Fulfillment Options

### Dropshipping (Recommended for Start)
- No inventory needed
- Lower risk
- Higher per-unit cost
- Slower shipping (7-14 days)

### Self-Fulfillment (After Validation)
- Better margins
- Faster shipping
- Requires storage space
- Need to handle returns

### Hybrid Approach
- Dropship during launches
- Keep bestsellers in inventory
- Balance risk and efficiency

## Marketing Strategy

### Launch Campaign
1. **Teaser Phase** (2 weeks before)
   - Show design process on social media
   - Countdown posts
   - Email subscribers early access

2. **Launch Week**
   - Daily posts featuring products
   - Unboxing videos
   - Influencer partnerships
   - Limited-time discounts (10-15% off)

3. **Sustained Marketing**
   - Regular product posts
   - User-generated content campaigns
   - Seasonal collections
   - Bundle deals

### Content Ideas
- Behind-the-scenes design process
- Styling content (how to wear your merch)
- Customer testimonials and photos
- Limited edition releases
- Collaborations with other creators

## Market Analysis
- **Trend**: Growing demand for creator merchandise (personal connection)
- **Competition**: High (everyone has merch)
- **Differentiation**: Unique designs, quality, brand connection
- **Market Size**: $10+ billion annually
- **Key Success Factor**: Strong brand connection with audience

## Financial Projections

### Initial Investment
- Design costs: $200-500 (or DIY)
- Marketing budget: $500-1000
- No inventory needed (if using POD)

### Revenue Potential
- **Small Audience** (10K-50K): $500-2K/month
- **Medium Audience** (50K-250K): $2K-10K/month
- **Large Audience** (250K+): $10K-50K+/month

*Note: Conversion rates typically 0.5-2% of audience size*

## Risk Factors
- Inventory risk (if bulk ordering)
- Design popularity (what sells vs. what doesn't)
- Shipping issues/delays
- Return rates (sizing issues)
- Trend changes (designs may become outdated)

## Success Metrics
- Units sold per month
- Average order value
- Profit margin per product
- Customer return rate
- Repeat purchase rate
- Customer satisfaction scores

## Next Steps
1. Create initial designs (3-5 concepts)
2. Test designs with audience (poll/survey)
3. Set up store (Shopify, Etsy, or standalone)
4. Order samples for quality check
5. Create marketing content
6. Soft launch to email list
7. Full launch with promotional campaign`
  },
  {
    id: "3",
    name: "1-on-1 Creator Coaching Program",
    description: "Personalized coaching sessions helping emerging creators build their audience and monetize their content. Includes strategy sessions, content review, and growth planning.",
    profitability: 4,
    viability: 5,
    sustainability: 5,
    opportunity: 4,
    status: "recommended",
    fullDocumentation: `# 1-on-1 Creator Coaching Program - Full Documentation

## Service Overview
Personalized coaching program designed to help emerging creators build their audience, create better content, and monetize their passion effectively.

## Service Structure

### Coaching Packages

#### Starter Package - $497
- 2 x 60-minute strategy sessions
- Content review (5 pieces of content)
- 30-day email support
- Action plan document
- **Best for**: Creators just starting or stuck in early stages

#### Growth Package - $1,497
- 6 x 60-minute strategy sessions (monthly)
- Unlimited content review
- 90-day email support
- Custom growth strategy document
- Monthly goal setting and accountability
- **Best for**: Creators ready to scale (10K-100K followers)

#### Mastermind Package - $2,997
- 12 x 60-minute sessions (bi-weekly)
- Unlimited content review
- 6-month email/Voxer support
- Full business strategy development
- Access to exclusive resources
- Priority booking
- **Best for**: Serious creators building a business (100K+)

## Session Framework

### Session 1: Discovery & Assessment
- Understand current situation
- Identify goals and aspirations
- Analyze existing content
- Assess audience and engagement
- Identify strengths and gaps

### Session 2: Strategy Development
- Create personalized content strategy
- Define brand positioning
- Plan content calendar
- Set up systems and processes
- Establish metrics and KPIs

### Ongoing Sessions: Implementation & Optimization
- Review progress
- Analyze content performance
- Adjust strategy based on results
- Address challenges and obstacles
- Plan next steps
- Accountability and motivation

## Booking System Setup

### Recommended Platforms

#### Option 1: Calendly
- **Pros**: Free tier available, easy integration, automated reminders
- **Cons**: Limited customization on free plan
- **Best for**: Simple booking needs

#### Option 2: Cal.com
- **Pros**: Open source, customizable, free
- **Cons**: Self-hosted option requires tech knowledge
- **Best for**: Tech-savvy creators

#### Option 3: Acuity Scheduling
- **Pros**: Professional features, payment integration, client forms
- **Cons**: Monthly fee ($15-45)
- **Best for**: Professional coaching businesses

### Integration with:
- Zoom/Google Meet for sessions
- Stripe/PayPal for payments
- Email for confirmations
- CRM for client management

## Client Onboarding Process

### Step 1: Initial Inquiry
- Potential client fills out intake form
- Brief discovery call (15 min, free)
- Determine fit and package selection

### Step 2: Onboarding
- Send welcome email with session prep materials
- Provide intake questionnaire (detailed)
- Schedule first session
- Set up communication channels

### Step 3: First Session
- Comprehensive discovery
- Goal setting
- Initial strategy discussion
- Schedule subsequent sessions

### Step 4: Ongoing Support
- Regular sessions per package
- Email support as outlined
- Content review process
- Progress tracking

## Content Review Process

### What Gets Reviewed
- Videos (structure, hooks, storytelling)
- Thumbnails and titles
- Engagement strategies
- Consistency and posting schedule
- Brand voice and messaging

### Review Format
- Written feedback document
- Video annotations (for video content)
- Specific action items
- Examples of improvements
- Best practices recommendations

## Pricing Strategy

### Value-Based Pricing
- Based on transformation, not time
- Consider your expertise level
- Market research (competitor analysis)
- Package pricing for higher value

### Payment Options
- Full payment upfront (discount option)
- Payment plans (2-3 installments)
- Monthly recurring (for ongoing packages)

## Marketing & Lead Generation

### Content Marketing
- YouTube: Coaching tips, case studies (teaser content)
- Social Media: Quick tips, client wins (with permission)
- Blog/Newsletter: In-depth articles, free resources

### Lead Magnets
- Free guide: "10 Mistakes Holding Back Your Growth"
- Free workshop: "30-Day Creator Growth Challenge"
- Free audit: "Content Strategy Review" (lead to paid)

### Partnerships
- Collaborate with creator tools/software
- Guest on podcasts
- Partner with other coaches for referrals
- Affiliate program for past clients

## Market Analysis
- **Trend**: Growing demand as creator economy expands
- **Competition**: Medium (many coaches, but personal connection matters)
- **Market Size**: Creator coaching market growing 25%+ annually
- **Key Success Factor**: Proven results and authentic connection

## Client Management

### Tools Needed
- CRM (HubSpot free, Notion, or Airtable)
- Video conferencing (Zoom/Google Meet)
- Document sharing (Google Drive/Notion)
- Payment processing (Stripe/PayPal)
- Email (Gmail/Outlook with professional domain)

### Systems to Create
- Intake questionnaire template
- Session notes template
- Follow-up email templates
- Progress tracking spreadsheet
- Client portal (optional, via Notion)

## Scaling Considerations

### Phase 1: Solo (Start Here)
- 1-on-1 coaching only
- 5-10 clients maximum
- High-touch, personalized service

### Phase 2: Group Coaching
- Small groups (5-8 people)
- Lower price point, higher revenue
- Less personalized but still effective

### Phase 3: Courses + Coaching
- Self-paced course
- Add-on coaching component
- Scalable model

### Phase 4: Community
- Monthly membership
- Access to you + community
- Lower commitment, recurring revenue

## Success Metrics
- Client satisfaction scores
- Client transformation/results
- Referral rate
- Retention rate
- Revenue per client
- Time efficiency

## Legal Considerations
- Service agreement/contract
- Payment terms and policies
- Cancellation/refund policy
- Confidentiality agreements (if needed)
- Liability insurance (consider for business coaching)

## Next Steps
1. Define your coaching methodology
2. Create pricing packages
3. Set up booking system
4. Build intake forms and templates
5. Create marketing content and lead magnets
6. Soft launch to existing audience
7. Collect testimonials
8. Scale based on demand`
  },
  {
    id: "4",
    name: "Digital Asset Template Library",
    description: "A subscription-based library of video templates, graphics, presets, and tools that creators can use to speed up their content creation process.",
    profitability: 5,
    viability: 4,
    sustainability: 4,
    opportunity: 5,
    status: "selected",
    fullDocumentation: `# Digital Asset Template Library - Full Documentation

## Product Overview
A subscription-based library offering creators access to professionally designed templates, graphics, presets, and tools to accelerate their content creation workflow.

## Product Components

### Content Types

#### Video Templates
- YouTube intro/outro templates (After Effects, Premiere Pro)
- Social media video templates (Instagram Reels, TikTok, YouTube Shorts)
- Thumbnail templates (Photoshop, Canva)
- Lower third graphics
- Transitions and effects packs

#### Graphic Assets
- Social media post templates
- Story templates (Instagram, Facebook)
- Quote graphics
- Brand kit elements
- Logo templates

#### Presets & Filters
- Video color grading presets (LUTs)
- Photo editing presets (Lightroom, VSCO-style)
- Audio presets for podcast/video editing

#### Tools & Resources
- Content planning templates
- Scheduling templates
- Analytics tracking spreadsheets
- Brand guidelines templates

## Platform Selection

### Option 1: Gumroad (Simple Start)
- **Pros**: Easy setup, low fees (10% + payment processing), no monthly fee
- **Cons**: Less suitable for subscriptions (better for one-time sales)
- **Best for**: Testing demand with one-time purchases first

### Option 2: Podia
- **Pros**: Built for memberships, no transaction fees, good for subscriptions
- **Cons**: Monthly fee ($39-199/month)
- **Best for**: Serious subscription business

### Option 3: Memberful (Stripe)
- **Pros**: Integrates with Stripe, flexible, good features
- **Cons**: Monthly fee + transaction fees
- **Best for**: Creators already using Stripe

### Option 4: Circle Community + Gumroad
- **Pros**: Community features + simple sales
- **Cons**: Two platforms to manage
- **Best for**: Want community aspect

### Option 5: Custom WordPress/Webflow Site
- **Pros**: Full control, brand customization
- **Cons**: Requires development, maintenance
- **Best for**: Large-scale operation

## Subscription Pricing Model

### Tier 1: Basic - $9.99/month
- Access to 50+ templates
- New templates monthly (5-10)
- Basic support
- Standard license (personal use)

### Tier 2: Pro - $19.99/month
- Access to all templates (200+)
- New templates weekly (10-15)
- Priority support
- Commercial license included
- Exclusive templates

### Tier 3: Agency - $49.99/month
- Everything in Pro
- Unlimited commercial use
- White-label option
- Custom template requests (1/month)
- Team access (up to 5 users)

### Annual Plans (Discount)
- 20% off all tiers if paid annually
- Creates cash flow and reduces churn

## Content Creation Roadmap

### Phase 1: Launch (Month 1-2)
- 50 core templates across categories
- Focus on most popular content types
- High-quality, professionally designed

### Phase 2: Growth (Month 3-6)
- Add 10-15 new templates monthly
- Based on user feedback and requests
- Seasonal/trending content

### Phase 3: Expansion (Month 7+)
- Expand to new categories
- Advanced/pro features
- Collaborations with other creators
- User-generated templates (with approval)

## Content Quality Standards

### Design Principles
- Modern, clean aesthetics
- Easy to customize (clear layers, organized files)
- Multiple formats (different sizes/platforms)
- Brand-neutral or easily brandable

### Technical Requirements
- High-resolution (4K for video templates)
- Properly organized file structure
- Documentation/included (readme files)
- Compatible with common software versions

### File Organization
- Clear naming conventions
- Organized folders
- Preview images/videos
- Installation instructions

## Marketing Strategy

### Content Marketing
- YouTube: Tutorials using your templates
- Instagram/TikTok: Before/after content creation
- Blog: Tips for using templates effectively

### Free Samples
- Offer 5-10 free templates as lead magnets
- Show quality and value
- Drive email signups
- Build trust

### Community Building
- Facebook group for subscribers
- User showcase (feature subscriber work)
- Monthly challenges
- Q&A sessions

### Partnerships
- Collaborate with editing software companies
- Partner with other template creators
- Affiliate program (20-30% commission)

## Customer Retention

### Onboarding
- Welcome email series
- Getting started guide
- Video tutorials
- Template showcase

### Regular Value
- Weekly new template announcements
- Exclusive early access for annual members
- Seasonal collections
- Limited edition templates

### Engagement
- User feedback surveys
- Template request system
- Community challenges
- Success stories and case studies

## Revenue Projections

### Conservative Estimate
- **Month 1-3**: 50 subscribers @ $15 avg = $750/month
- **Month 4-6**: 150 subscribers @ $15 avg = $2,250/month
- **Month 7-12**: 300 subscribers @ $15 avg = $4,500/month

### Growth Scenario
- **Month 1-3**: 100 subscribers @ $15 avg = $1,500/month
- **Month 4-6**: 300 subscribers @ $15 avg = $4,500/month
- **Month 7-12**: 600 subscribers @ $15 avg = $9,000/month

*Note: Churn rate typically 5-10% monthly for SaaS*

## Operational Considerations

### Content Creation
- In-house design (you)
- Hire freelance designers ($50-200/template)
- Outsource to agencies (higher volume)
- Mix of approaches

### Time Investment
- Initial setup: 40-80 hours
- Ongoing: 10-20 hours/month (content creation + management)
- Support: 2-5 hours/week

### Tools Needed
- Design software (Adobe Creative Suite)
- Project management (Notion, Trello)
- Email marketing (ConvertKit, Mailchimp)
- Analytics tracking

## Legal Considerations
- Licensing terms (clear commercial use rights)
- User agreement/Terms of Service
- Refund/cancellation policy
- Copyright protection for your designs
- Attribution requirements (if any)

## Competition Analysis
- **Market**: Saturated but growing
- **Differentiation**: Your unique style, niche focus, community
- **Competitors**: Envato, Motion Array, Storyblocks
- **Your Advantage**: Creator-focused, personal brand, community connection

## Success Metrics
- Monthly recurring revenue (MRR)
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Churn rate
- Template download rates
- Customer satisfaction (NPS)

## Scaling Strategy

### Phase 1: Solo Creator (Start)
- You create all content
- Personal brand focus
- 50-300 subscribers

### Phase 2: Team Expansion
- Hire 1-2 designers
- Expand content library faster
- 300-1000 subscribers

### Phase 3: Platform Growth
- Multiple content creators
- Broader categories
- 1000+ subscribers
- Potential acquisition target

## Next Steps
1. Create initial 20-30 templates (diverse categories)
2. Set up subscription platform
3. Build landing page and sales funnel
4. Create free template bundle (lead magnet)
5. Launch with beta pricing ($5-10/month first 100 users)
6. Collect feedback and iterate
7. Scale content creation based on demand`
  }
]

interface PageProps {
  params: {
    id: string
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const product = mockProducts.find(p => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Product Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">{product.name}</h1>
            {product.status === "recommended" && (
              <Sparkles className="h-6 w-6 text-[var(--color-accent-primary)]" />
            )}
          </div>
          <p className="text-lg text-[var(--color-text-secondary)] mb-6">{product.description}</p>

          {/* Rating Summary */}
          <Card className="mb-8 bg-[var(--color-bg-glass)] backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
            <CardHeader>
              <CardTitle className="text-[var(--color-text-primary)]">Product Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-[var(--color-text-secondary)]">Profitability</span>
                    <StarRating rating={product.profitability} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-[var(--color-text-secondary)]">Viability</span>
                    <StarRating rating={product.viability} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-[var(--color-text-secondary)]">Sustainability</span>
                    <StarRating rating={product.sustainability} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-[var(--color-text-secondary)]">Opportunity</span>
                    <StarRating rating={product.opportunity} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Documentation */}
        <Card className="bg-[var(--color-bg-glass)] backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[var(--color-accent-primary)]" />
              <CardTitle className="text-[var(--color-text-primary)]">Full Product Documentation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-bg-card)]/30 p-6 rounded-lg border border-[var(--color-border-subtle)]">
                {product.fullDocumentation}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

