# ProductPilot — The Creator's Product Copilot

A Next.js application that helps content creators turn their audience insights into sellable product ideas using AI.

## Features

- 🤖 **AI-Powered Product Discovery** - Analyzes your creator graph to suggest viable products
- 📊 **Multi-Product Support** - Digital, physical, and service products
- ✅ **Demand Validation** - Test ideas before investing in inventory
- 🚀 **GTM Asset Generation** - Auto-generate landing pages and marketing materials
- 🔐 **Authentication** - Powered by Clerk with Google, GitHub, Email, and more

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, set up Clerk authentication:

1. Create a free account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

See `CLERK_SETUP.md` for detailed setup instructions.

Run the development server:

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

## Project Structure

```
├── middleware.ts                # Clerk auth middleware
├── app/
│   ├── sign-in/[[...sign-in]]/  # Clerk sign-in page
│   ├── sign-up/[[...sign-up]]/  # Clerk sign-up page
│   ├── dashboard/               # Protected dashboard
│   └── page.tsx                 # Landing page
├── components/
│   ├── sections/                # Landing page sections
│   ├── ui/                      # Reusable UI components (shadcn-style)
│   └── navbar.tsx               # Navigation with Clerk auth
└── lib/
    └── utils.ts                 # Utility functions
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

See `CLERK_SETUP.md` for detailed instructions.

## Pages

- **`/`** - Landing page showcasing ProductPilot's features
- **`/sign-in`** - Sign-in page (Clerk UI)
- **`/sign-up`** - Sign-up page (Clerk UI)
- **`/dashboard`** - Protected dashboard (requires authentication)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **UI Components:** Custom shadcn-inspired components
- **Authentication:** Clerk
- **Icons:** Lucide React
- **TypeScript:** Full type safety

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Clerk Documentation](https://clerk.com/docs) - authentication and user management
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Lucide Icons](https://lucide.dev) - beautiful & consistent icons

## License

MIT
