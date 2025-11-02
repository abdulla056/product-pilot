import { VideoTranscript, CreatorGraph } from "@/types/analysis"

/**
 * Mock transcribed YouTube videos for testing
 * Persona: Fitness & Wellness Creator
 */
export const mockVideoTranscripts: VideoTranscript[] = [
  {
    videoId: "vid_001",
    title: "My Morning Routine That Transformed My Body in 90 Days",
    description: "The exact morning routine I followed to lose 40 pounds and build sustainable healthy habits.",
    publishedAt: "2024-10-15T06:00:00Z",
    transcript: `
      Good morning everyone! Today I'm sharing the exact morning routine that helped me transform my body and life in just 90 days.
      
      I wake up at 5:30 AM every single day, no excuses. The first thing I do is drink a full glass of water with lemon. 
      This kickstarts my metabolism and helps with digestion.
      
      Then I do 10 minutes of stretching and mobility work. I have a specific routine I follow that targets all major muscle groups.
      So many of you have asked me to share this routine, maybe I should create a detailed guide or program!
      
      Next is my workout. I do 30-45 minutes of strength training or cardio depending on the day. I follow a structured program
      that I designed myself after years of trial and error.
      
      After my workout, I make my protein smoothie. I always use the same ingredients - banana, protein powder, spinach, 
      almond butter, and oats. This keeps me full until lunch and helps with muscle recovery.
      
      Then I journal for 5-10 minutes. I write down my goals, what I'm grateful for, and my intentions for the day.
      This practice has been crucial for my mental health and staying motivated.
      
      I also do a 10-minute meditation using a specific app. It helps me stay centered and reduces my stress levels significantly.
      
      By 7 AM, I'm showered, dressed, and ready to tackle the day with so much energy. This routine has completely changed my life.
      
      The key is consistency. I've been doing this for over 6 months now and it's become automatic. My body craves this routine now.
      
      Let me know in the comments if you want me to create a detailed guide with all my workout routines, recipes, and tracking templates!
    `,
    duration: "PT14M22S",
    viewCount: 128000,
    likeCount: 8900,
    commentCount: 1243,
    tags: ["morning routine", "fitness", "weight loss", "healthy habits", "transformation"]
  },
  {
    videoId: "vid_002",
    title: "What I Eat in a Day to Stay Lean Year-Round (Full Meal Plan)",
    description: "My complete daily meal plan with exact macros, recipes, and meal prep tips for sustainable fat loss.",
    publishedAt: "2024-10-20T12:00:00Z",
    transcript: `
      Hey everyone! So many of you asked me to share what I eat in a day, so here's my complete meal plan that keeps me lean year-round.
      
      Let me start by saying - I don't believe in restrictive diets. This is sustainable, flexible, and actually enjoyable!
      
      Breakfast is my protein smoothie bowl. I blend frozen berries, banana, protein powder, Greek yogurt, and a bit of almond milk.
      Then I top it with granola, chia seeds, and fresh fruit. It's about 450 calories with 35g of protein.
      
      Mid-morning snack is usually a protein bar and an apple. I'm obsessed with these specific protein bars - they taste like candy
      but have 20g of protein and only 200 calories. I buy them in bulk from a specific website.
      
      Lunch is where I get creative. Usually grilled chicken or salmon with quinoa and roasted vegetables. I meal prep this on Sundays
      which saves me so much time during the week. I have a detailed meal prep system that I follow religiously.
      
      Afternoon snack is Greek yogurt with honey and almonds. Simple but keeps me full until dinner.
      
      Dinner is my favorite meal. I love making stir-fries with lean protein, tons of veggies, and brown rice or sweet potato.
      I use specific sauces and seasonings that are low in calories but packed with flavor.
      
      If I'm craving something sweet at night, I make protein ice cream. It's literally just frozen banana, protein powder,
      and almond milk blended together. Tastes like real ice cream but with way more protein!
      
      I track everything in MyFitnessPal. My daily targets are around 2000 calories, 150g protein, and I don't stress too much
      about carbs and fats as long as I'm getting enough vegetables.
      
      I also take specific supplements - protein powder, creatine, vitamin D, and omega-3s. These have made a huge difference.
      
      The key is meal prep and having healthy options readily available. I spend 2-3 hours every Sunday preparing for the week.
      
      Would you guys be interested in a complete meal prep guide with all my recipes and shopping lists?
    `,
    duration: "PT16M33S",
    viewCount: 94000,
    likeCount: 6700,
    commentCount: 892,
    tags: ["meal plan", "nutrition", "weight loss", "meal prep", "healthy eating", "fitness food"]
  },
  {
    videoId: "vid_003",
    title: "My Complete Home Workout Program (No Gym Required)",
    description: "The exact workout routine I used to build muscle and lose fat at home with minimal equipment.",
    publishedAt: "2024-10-25T14:00:00Z",
    transcript: `
      What's up everyone! Today I'm sharing my complete home workout program that got me in the best shape of my life.
      
      I know not everyone has access to a gym, and honestly, you don't need one. All you need is a set of dumbbells, 
      resistance bands, and a yoga mat. That's it!
      
      I work out 5 days a week following a specific split. Monday is chest and triceps, Tuesday is back and biceps,
      Wednesday is legs, Thursday is shoulders and abs, and Friday is a full body circuit. Weekends are for rest and recovery.
      
      Each workout is about 45 minutes and I focus on progressive overload. That means gradually increasing weight or reps each week.
      This is the KEY to building muscle and getting stronger.
      
      Let me break down a typical chest and triceps day. I start with push-ups - 4 sets to failure. Then dumbbell chest press,
      incline dumbbell press, dumbbell flyes, and finish with tricep dips and overhead extensions.
      
      For each exercise, I do 3-4 sets of 8-12 reps. I rest 60-90 seconds between sets and really focus on form and mind-muscle connection.
      
      I also incorporate HIIT cardio 3 times a week. Just 15-20 minutes of high-intensity intervals. This burns fat while preserving muscle.
      
      The program I follow is based on proven principles from bodybuilding and strength training. I've refined it over years
      of trial and error to make it perfect for home workouts.
      
      I track every single workout in a fitness journal. I write down exercises, sets, reps, and weight used. This helps me
      ensure I'm progressing week after week.
      
      Recovery is just as important as training. I make sure to get 7-8 hours of sleep, stretch daily, and take rest days seriously.
      
      I also have specific warm-up and cool-down routines that prevent injury and improve flexibility.
      
      So many of you have asked me to create a structured program with video demonstrations and a progressive plan. 
      Would you guys buy a complete home workout guide if I made one?
      
      Comment below what your biggest fitness challenge is right now!
    `,
    duration: "PT18M47S",
    viewCount: 156000,
    likeCount: 11200,
    commentCount: 1567,
    tags: ["home workout", "fitness program", "build muscle", "no gym", "bodyweight training"]
  },
  {
    videoId: "vid_004",
    title: "The Supplements I Actually Take (And What's Just Marketing Hype)",
    description: "Breaking down which supplements are worth your money and which ones are a waste based on science and my experience.",
    publishedAt: "2024-10-28T10:00:00Z",
    transcript: `
      Hey everyone! Today I'm doing a full breakdown of the supplements I actually take versus what's just marketing hype.
      
      Let me be clear - supplements are just that, SUPPLEMENTS. They supplement a good diet and training program. 
      You can't out-supplement a bad diet!
      
      First up, protein powder. This is the one supplement I think everyone should have. I use whey protein isolate
      because it's quickly absorbed and high in protein. I take it post-workout and sometimes as a snack.
      I've tried dozens of brands and there's one specific brand I always come back to because of taste and quality.
      
      Second is creatine monohydrate. This is the most researched supplement in fitness. It helps with strength, muscle growth,
      and recovery. I take 5 grams every single day, doesn't matter if it's a training day or rest day.
      
      Third, vitamin D3. Most people are deficient in vitamin D, especially if you live somewhere with limited sun.
      I take 4000 IU daily and it's made a huge difference in my energy and mood.
      
      Fourth is omega-3 fish oil. Great for heart health, brain function, and reducing inflammation. I take 2-3 grams daily.
      
      Fifth is a basic multivitamin. Just insurance to cover any nutritional gaps in my diet. Nothing fancy, just a good quality multi.
      
      Now let's talk about what I DON'T take. Pre-workout - most are just caffeine and marketing. I drink black coffee instead.
      BCAAs - completely unnecessary if you're getting enough protein. Fat burners - waste of money, just eat in a calorie deficit.
      
      I also cycle off caffeine every few months to reset my tolerance. This keeps my energy levels stable long-term.
      
      The total cost of my supplement stack is about $80 per month, which is way less than most people spend on useless supplements.
      
      I source all my supplements from specific trusted brands that do third-party testing. Quality matters!
      
      I'm thinking of creating a complete supplement guide with brand recommendations, dosing protocols, and when to take each one.
      Would that be helpful for you guys?
      
      Drop a comment with what supplements you're currently taking!
    `,
    duration: "PT14M28S",
    viewCount: 87000,
    likeCount: 5900,
    commentCount: 734,
    tags: ["supplements", "fitness", "nutrition", "protein powder", "health", "wellness"]
  },
  {
    videoId: "vid_005",
    title: "How I Built My Online Fitness Coaching Business to $8K/Month",
    description: "From zero to successful online fitness coach - my complete journey, strategies, and lessons learned.",
    publishedAt: "2024-10-30T11:00:00Z",
    transcript: `
      Hey everyone! Today I'm sharing exactly how I built my online fitness coaching business to $8,000 per month.
      
      Two years ago, I was just posting fitness content on Instagram for fun. I never thought I could turn this into a real business.
      
      It started when people began asking me to create custom workout and meal plans for them. At first, I did it for free
      just to help people, but then I realized - this could be a real income stream.
      
      I started by offering personalized coaching for $150 per month. This included custom workout plans, meal plans,
      weekly check-ins, and unlimited messaging support. I got my first 5 clients just from my Instagram following.
      
      The turning point was when I created a structured system. I developed templates for workout programs, meal plans,
      and tracking sheets. This allowed me to scale without burning out.
      
      I now have three different coaching packages. Basic tier at $99/month for just workout and meal plans.
      Mid tier at $199/month with weekly check-ins. Premium tier at $349/month with daily support and video analysis.
      
      Currently, I have 35 active clients across all tiers, which brings in about $8,000 per month. My goal is to hit $15K by next year.
      
      For client acquisition, I use Instagram, YouTube, and TikTok. I post valuable free content consistently and use that
      to build trust. Then I convert followers into paying clients through my email list and sales calls.
      
      I use specific software to manage everything - client portal for workouts and meal plans, scheduling tool for calls,
      payment processing through Stripe, and a CRM to track client progress and communication.
      
      The biggest lesson I learned is that people don't just buy programs, they buy transformation and accountability.
      My best clients are the ones who are committed and coachable.
      
      I also created a private community for my clients where they can support each other. This has massively improved retention.
      
      Many of you want to start your own online coaching business. I'm thinking of creating a complete course showing
      exactly how I did it - from getting clients to program design to scaling the business. Would you be interested?
      
      The fitness industry is booming online right now. If you have knowledge and want to help people, now is the time!
      
      Comment below if you have any questions about online coaching!
    `,
    duration: "PT22M12S",
    viewCount: 203000,
    likeCount: 14500,
    commentCount: 1834,
    tags: ["online coaching", "fitness business", "make money fitness", "personal training", "entrepreneurship"]
  }
]

/**
 * Mock creator graph with full analysis
 * Persona: Fitness & Wellness Creator
 */
export const mockCreatorGraph: CreatorGraph = {
  creatorId: "user_mock_123",
  channelId: "channel_mock_456",
  channelName: "FitLife with Alex",
  totalVideos: 5,
  totalViews: 668000,
  subscriberCount: 78000,
  analysisDate: new Date().toISOString(),
  transcripts: mockVideoTranscripts,
  contentAnalysis: {
    genre: "Fitness & Wellness Education",
    subGenres: [
      "Weight Loss Transformation",
      "Home Workouts",
      "Nutrition & Meal Planning",
      "Fitness Business",
      "Supplement Reviews"
    ],
    mainTopics: [
      "Weight Loss",
      "Muscle Building",
      "Meal Preparation",
      "Home Fitness",
      "Healthy Habits",
      "Online Coaching",
      "Nutrition Science"
    ],
    contentStyle: "Educational, Motivational, Experience-Based, Practical",
    contentTone: "Energetic, Authentic, Supportive, No-Nonsense",
    keyThemes: [
      "Sustainable fitness over quick fixes",
      "Consistency is key",
      "Home workouts are effective",
      "Meal prep for success",
      "Building a fitness business"
    ],
    expertise: [
      "Weight Loss Coaching",
      "Strength Training",
      "Nutrition Planning",
      "Meal Prep",
      "Online Fitness Business"
    ],
    confidence: 0.94
  },
  audienceAnalysis: {
    primaryDemographic: {
      ageRange: "25-45",
      interests: [
        "Weight Loss",
        "Fitness",
        "Healthy Eating",
        "Home Workouts",
        "Wellness",
        "Body Transformation",
        "Self-Improvement"
      ],
      painPoints: [
        "Struggling to lose weight",
        "Don't have time for the gym",
        "Confused about nutrition",
        "Lack of motivation and accountability",
        "Don't know where to start",
        "Previous diet failures",
        "Busy lifestyle makes fitness hard"
      ],
      aspirations: [
        "Lose weight and keep it off",
        "Build a strong, healthy body",
        "Feel confident and energetic",
        "Develop sustainable healthy habits",
        "Look and feel better",
        "Improve overall health"
      ]
    },
    engagementPatterns: {
      mostEngagedTopics: [
        "Transformation stories",
        "Meal plans and recipes",
        "Home workout routines",
        "Starting an online fitness business"
      ],
      peakEngagementTimes: ["Early morning (5-7 AM)", "Evening (7-9 PM)"],
      preferredContentLength: "14-22 minutes"
    },
    communityInsights: {
      commonQuestions: [
        "What should I eat for breakfast?",
        "How do I stay motivated?",
        "Can I build muscle at home?",
        "What supplements do you recommend?",
        "How much protein do I need?"
      ],
      frequentRequests: [
        "Share your meal prep routine",
        "Create a complete workout program",
        "Make a nutrition guide",
        "More transformation content",
        "Start online coaching course"
      ],
      sharedChallenges: [
        "Staying consistent",
        "Balancing work and fitness",
        "Meal planning and prep",
        "Avoiding junk food cravings",
        "Finding time to exercise"
      ]
    },
    confidence: 0.91
  },
  productOpportunities: [
    {
      id: "prod_001",
      name: "90-Day Transformation Program",
      category: "digital",
      description: "A complete 90-day fitness transformation program including workout plans, meal plans, progress tracking, and weekly coaching videos. Designed for home workouts with minimal equipment.",
      targetAudience: "Busy professionals wanting to lose weight and build muscle at home",
      estimatedDemand: "high",
      confidence: 0.96,
      reasoning: "Direct alignment with creator's transformation story. Audience repeatedly requests structured programs. High engagement on workout and meal plan content. Proven demand through coaching business success.",
      similarProducts: ["Kayla Itsines BBG", "Chris Hemsworth Centr", "Beachbody Programs"],
      priceRange: {
        min: 97,
        max: 197,
        currency: "USD"
      },
      validationSuggestions: [
        "Offer early-bird discount to first 50 buyers",
        "Create a free 7-day challenge as lead magnet",
        "Run Instagram poll about program interest and pricing",
        "Launch with money-back guarantee to reduce risk"
      ],
      profitability: {
        score: 92,
        analysis: "Extremely high profit margins (85-95%) as a digital product with minimal ongoing costs. One-time creation cost of $2-5K for content production, then pure profit. At $147 average price, selling just 100 copies generates $14,700 revenue. Potential for recurring revenue through program updates and upsells.",
        estimatedMargin: "85-95%"
      },
      viability: {
        score: 88,
        analysis: "Highly feasible with creator's existing expertise and content. Requires 6-8 weeks to create comprehensive materials, record videos, and set up delivery platform. Main resources needed: video equipment (already owned), course platform ($50-200/month), and time investment. Low technical barriers.",
        timeToMarket: "6-8 weeks"
      },
      sustainability: {
        score: 90,
        analysis: "Evergreen product with long-term demand. Fitness transformation is a perennial need, not a trend. Can be updated yearly to stay current. Scalable to unlimited customers with no inventory concerns. Strong potential for creating a product ecosystem (beginner/intermediate/advanced versions).",
        longTermPotential: "Evergreen with high scalability potential"
      },
      opportunity: {
        score: 94,
        analysis: "Large market gap for affordable, comprehensive home workout programs. Competitors charge $200-500 or require gym equipment. Creator's unique angle: proven personal transformation + focus on busy professionals + home workouts. Market timing is perfect with continued home fitness trend.",
        marketGap: "Affordable home-based transformation program for busy professionals"
      },
      impact: {
        score: 95,
        analysis: "Solves major audience pain points: lack of time, confusion about where to start, need for accountability. Transformation potential is life-changing - weight loss, confidence building, habit formation. High perceived value as it addresses physical, mental, and lifestyle improvements.",
        audienceValue: "Life-changing transformation addressing fitness, confidence, and lifestyle"
      },
      overallRating: 92
    },
    {
      id: "prod_002",
      name: "Ultimate Meal Prep Blueprint",
      category: "digital",
      description: "A comprehensive meal prep system with 100+ recipes, shopping lists, macro calculations, and video tutorials. Includes meal prep containers guide and time-saving strategies.",
      targetAudience: "Health-conscious individuals who want to eat clean but save time",
      estimatedDemand: "high",
      confidence: 0.93,
      reasoning: "Meal planning is one of the most requested topics. Creator has proven system. Low production cost, high perceived value. Solves major pain point (time and confusion).",
      similarProducts: ["Meal Prep on Fleek", "Fit Men Cook Meal Plans", "Eat This Much"],
      priceRange: {
        min: 47,
        max: 97,
        currency: "USD"
      },
      validationSuggestions: [
        "Share 3 free recipes and track download engagement",
        "Survey audience on biggest meal prep challenges",
        "Pre-sell with special bonus (meal prep containers)",
        "Partner with meal prep container brands for affiliate"
      ],
      profitability: {
        score: 90,
        analysis: "High-margin digital product (90%+). Low creation cost ($1-2K for recipe testing and videos). At $67 average, 100 sales = $6,700 revenue with minimal ongoing costs.",
        estimatedMargin: "90-95%"
      },
      viability: {
        score: 92,
        analysis: "Very achievable with existing recipes and meal prep experience. Requires 4-6 weeks for recipe documentation, photography, and platform setup. Minimal technical barriers.",
        timeToMarket: "4-6 weeks"
      },
      sustainability: {
        score: 88,
        analysis: "Evergreen need for healthy eating solutions. Can be updated seasonally with new recipes. Scalable delivery. Potential for recipe add-on packs and seasonal updates as upsells.",
        longTermPotential: "Evergreen with seasonal update opportunities"
      },
      opportunity: {
        score: 91,
        analysis: "Large market for meal prep solutions. Unique angle combining simplicity with macro tracking. Competitors either too complex or lacking nutritional depth. Growing meal prep trend.",
        marketGap: "Simple yet comprehensive meal prep system with macro guidance"
      },
      impact: {
        score: 89,
        analysis: "Solves time scarcity and decision fatigue around healthy eating. Enables consistency in nutrition goals. High perceived value as it transforms daily routines and health outcomes.",
        audienceValue: "Time-saving solution enabling consistent healthy eating habits"
      },
      overallRating: 90
    },
    {
      id: "prod_003",
      name: "Fitness Tracker Journal (Physical)",
      category: "physical",
      description: "A premium physical fitness journal with workout logging, meal tracking, progress photos section, and motivational prompts. Includes QR codes linking to video exercise demonstrations.",
      targetAudience: "Fitness enthusiasts who prefer physical tracking over apps",
      estimatedDemand: "medium",
      confidence: 0.78,
      reasoning: "Growing trend of analog tracking despite digital options. Creator emphasizes tracking importance. Niche but dedicated audience willing to pay premium. Can be sold as recurring purchase.",
      similarProducts: ["Workout Log Book", "Fitlosophy Fitbook", "Fitbook Lite"],
      priceRange: {
        min: 24,
        max: 39,
        currency: "USD"
      },
      validationSuggestions: [
        "Create digital mockups and measure social media interest",
        "Run Kickstarter campaign to validate and fund production",
        "Start with small batch of 200 units",
        "Offer subscription model (new journal every 12 weeks)"
      ]
    },
    {
      id: "prod_004",
      name: "1-on-1 Transformation Coaching",
      category: "service",
      description: "Premium personalized coaching with custom workout plans, meal plans, weekly video check-ins, daily messaging support, and accountability. Includes form analysis and adjustments.",
      targetAudience: "Serious individuals ready to invest in guaranteed results",
      estimatedDemand: "medium",
      confidence: 0.89,
      reasoning: "Creator already runs successful coaching business at $8K/month. Established trust and proven results. High-ticket offer with recurring revenue. Natural upsell from free content.",
      similarProducts: ["Personal Training", "Noom Coaching", "Online Fitness Coaches"],
      priceRange: {
        min: 197,
        max: 397,
        currency: "USD"
      },
      validationSuggestions: [
        "Offer 5 spots at launch discount for testimonials",
        "Create application process to qualify leads",
        "Share client transformation case studies",
        "Run limited-time enrollment periods to create urgency"
      ]
    },
    {
      id: "prod_005",
      name: "Supplement Stack & Guide",
      category: "digital",
      description: "Science-backed supplement guide with specific brand recommendations, dosing protocols, timing strategies, and links to purchase. Includes quality testing information and monthly updates.",
      targetAudience: "Fitness enthusiasts wanting to optimize supplement strategy",
      estimatedDemand: "medium",
      confidence: 0.82,
      reasoning: "High interest in supplement content. Can include affiliate partnerships for recurring revenue. Low production cost. Addresses confusion and trust issues with supplements.",
      similarProducts: ["Legion Athletics Supplement Guide", "Examine.com Stack Guides"],
      priceRange: {
        min: 27,
        max: 47,
        currency: "USD"
      },
      validationSuggestions: [
        "Create free supplement myth-busting PDF",
        "Partner with supplement brands for affiliate revenue",
        "Poll audience on biggest supplement questions",
        "Offer as bonus with other product purchases"
      ]
    },
    {
      id: "prod_006",
      name: "Become a Fitness Coach Academy",
      category: "digital",
      description: "Complete course teaching how to start and scale an online fitness coaching business. Includes client acquisition, program design, pricing strategies, and business systems.",
      targetAudience: "Fitness trainers and enthusiasts wanting to monetize their knowledge",
      estimatedDemand: "high",
      confidence: 0.88,
      reasoning: "Creator has proven success story ($8K/month). Growing demand for online coaching education. Audience frequently asks how to start. High-ticket course with transformation potential.",
      similarProducts: ["NASM Online Coach Course", "Precision Nutrition Coaching", "Trainer Academy"],
      priceRange: {
        min: 297,
        max: 997,
        currency: "USD"
      },
      validationSuggestions: [
        "Host free webinar on online coaching basics",
        "Create waitlist with early-bird pricing",
        "Partner with certification bodies",
        "Offer payment plans to increase accessibility"
      ]
    },
    {
      id: "prod_007",
      name: "Fitness Equipment Recommendations & Bundles",
      category: "physical",
      description: "Curated equipment bundles for home gyms at different budget levels (starter, intermediate, advanced). Includes setup guides and affiliate partnerships with equipment brands.",
      targetAudience: "People setting up home gyms and wanting expert recommendations",
      estimatedDemand: "medium",
      confidence: 0.75,
      reasoning: "Home workout content performs well. Can leverage affiliate partnerships for passive income. Low overhead, high margins. Solves decision paralysis for equipment buying.",
      similarProducts: ["Rogue Fitness Packages", "REP Fitness Bundles"],
      priceRange: {
        min: 149,
        max: 1299,
        currency: "USD"
      },
      validationSuggestions: [
        "Create equipment guide as lead magnet",
        "Partner with fitness equipment brands",
        "Share home gym tour videos",
        "Offer installation/setup consultation service"
      ]
    },
    {
      id: "prod_008",
      name: "Monthly Fitness & Nutrition Membership",
      category: "service",
      description: "Subscription community with new monthly workout programs, recipes, live Q&A sessions, private community access, and exclusive content. Lower price point for ongoing support.",
      targetAudience: "Committed fitness enthusiasts wanting continuous guidance",
      estimatedDemand: "high",
      confidence: 0.85,
      reasoning: "Recurring revenue model. Lower barrier to entry than 1-on-1 coaching. Can scale indefinitely. Builds community and retention. Audience wants ongoing support.",
      similarProducts: ["Peloton Digital", "Apple Fitness+", "Daily Burn"],
      priceRange: {
        min: 29,
        max: 79,
        currency: "USD"
      },
      validationSuggestions: [
        "Start with free Facebook/Discord community",
        "Poll audience on desired membership features",
        "Offer founding member discount (first 100 members)",
        "Run 30-day trial at discounted rate"
      ]
    }
  ],
  marketTrends: {
    trendingProducts: [
      {
        name: "Home Fitness Equipment & Programs",
        category: "Fitness Products",
        growthRate: "+287% YoY",
        relevanceScore: 0.96,
        description: "Post-pandemic shift to home fitness continues strong. Smart equipment, resistance bands, and home gym setups are in high demand."
      },
      {
        name: "Meal Prep Services & Guides",
        category: "Nutrition",
        growthRate: "+198% YoY",
        relevanceScore: 0.92,
        description: "Busy professionals seeking convenient healthy eating solutions. Digital meal prep guides and subscription boxes growing rapidly."
      },
      {
        name: "Online Fitness Coaching",
        category: "Digital Services",
        growthRate: "+245% YoY",
        relevanceScore: 0.94,
        description: "Virtual personal training and nutrition coaching market exploding. Lower costs and convenience driving adoption."
      },
      {
        name: "Fitness Tracking & Wellness Apps",
        category: "Digital Tools",
        growthRate: "+167% YoY",
        relevanceScore: 0.85,
        description: "Integration of AI and wearables making fitness tracking more personalized. Strong demand for habit tracking solutions."
      },
      {
        name: "Wellness Memberships & Communities",
        category: "Subscriptions",
        growthRate: "+212% YoY",
        relevanceScore: 0.88,
        description: "Recurring revenue model gaining traction. People value ongoing support and community accountability over one-time purchases."
      }
    ],
    emergingNiches: [
      "Hormone-Based Fitness Programs",
      "Mental Health + Fitness Integration",
      "Sustainable Fitness for Busy Parents",
      "Senior Fitness & Longevity",
      "Functional Fitness for Daily Life",
      "Recovery & Mobility Training"
    ],
    seasonalOpportunities: [
      {
        season: "Q4 (Oct-Dec)",
        products: ["Holiday Fitness Challenges", "New Year Transformation Programs", "Fitness Gift Bundles"]
      },
      {
        season: "Q1 (Jan-Mar)",
        products: ["New Year Resolutions Programs", "Weight Loss Challenges", "Spring Body Prep"]
      },
      {
        season: "Q2 (Apr-Jun)",
        products: ["Summer Body Programs", "Beach Ready Challenges", "Outdoor Fitness Guides"]
      },
      {
        season: "Q3 (Jul-Sep)",
        products: ["Back to School Fitness for Parents", "Fall Fitness Reset", "Marathon Training Guides"]
      }
    ],
    competitorInsights: [
      {
        creator: "Chloe Ting",
        products: ["Free Workout Challenges", "Activewear Line", "Fitness App"],
        successMetrics: "25M+ subscribers, millions in activewear sales"
      },
      {
        creator: "Athlean-X",
        products: ["Training Programs", "Supplement Line", "App Subscription"],
        successMetrics: "13M+ subscribers, $10M+ annual revenue"
      },
      {
        creator: "Kayla Itsines",
        products: ["Sweat App", "BBG Programs", "Books"],
        successMetrics: "$77M revenue from app, 50M+ users"
      },
      {
        creator: "Natacha Océane",
        products: ["Training Programs", "Merchandise", "Nutrition Guides"],
        successMetrics: "1.7M+ subscribers, successful program launches"
      }
    ]
  },
  recommendations: {
    topProducts: [
      {
        id: "prod_001",
        name: "90-Day Transformation Program",
        category: "digital",
        description: "Complete fitness transformation program with workouts and meal plans",
        targetAudience: "Busy professionals wanting home fitness",
        estimatedDemand: "high",
        confidence: 0.96,
        reasoning: "Highest confidence product based on creator's proven story and audience demand",
        similarProducts: [],
        priceRange: { min: 97, max: 197, currency: "USD" },
        validationSuggestions: []
      },
      {
        id: "prod_002",
        name: "Ultimate Meal Prep Blueprint",
        category: "digital",
        description: "Comprehensive meal prep system with recipes and guides",
        targetAudience: "Health-conscious time-savers",
        estimatedDemand: "high",
        confidence: 0.93,
        reasoning: "Most requested topic, low production cost, high value",
        similarProducts: [],
        priceRange: { min: 47, max: 97, currency: "USD" },
        validationSuggestions: []
      }
    ],
    quickWins: [
      {
        id: "prod_005",
        name: "Supplement Stack & Guide",
        category: "digital",
        description: "Science-backed supplement recommendations",
        targetAudience: "Fitness enthusiasts optimizing nutrition",
        estimatedDemand: "medium",
        confidence: 0.82,
        reasoning: "Can create quickly, includes affiliate revenue potential",
        similarProducts: [],
        priceRange: { min: 27, max: 47, currency: "USD" },
        validationSuggestions: []
      },
      {
        id: "prod_002",
        name: "Ultimate Meal Prep Blueprint",
        category: "digital",
        description: "Meal prep system with recipes",
        targetAudience: "Busy health-conscious individuals",
        estimatedDemand: "high",
        confidence: 0.93,
        reasoning: "Quick to produce with existing content",
        similarProducts: [],
        priceRange: { min: 47, max: 97, currency: "USD" },
        validationSuggestions: []
      }
    ],
    longTermBets: [
      {
        id: "prod_008",
        name: "Monthly Fitness & Nutrition Membership",
        category: "service",
        description: "Subscription community with ongoing programs and support",
        targetAudience: "Committed fitness enthusiasts",
        estimatedDemand: "high",
        confidence: 0.85,
        reasoning: "Recurring revenue, scalable, builds long-term community",
        similarProducts: [],
        priceRange: { min: 29, max: 79, currency: "USD" },
        validationSuggestions: []
      },
      {
        id: "prod_006",
        name: "Become a Fitness Coach Academy",
        category: "digital",
        description: "Course on starting online fitness coaching business",
        targetAudience: "Aspiring fitness coaches",
        estimatedDemand: "high",
        confidence: 0.88,
        reasoning: "High-ticket, proven model, growing market demand",
        similarProducts: [],
        priceRange: { min: 297, max: 997, currency: "USD" },
        validationSuggestions: []
      }
    ]
  }
}
