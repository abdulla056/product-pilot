# ProductPilot - Project Structure

## 📁 Directory Overview

```
product-pilot/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   ├── components/               # React components
│   ├── lib/                      # Utility libraries
│   └── middleware.ts             # Clerk authentication middleware
├── public/                       # Static assets
├── docs/                         # Documentation
├── .env.local                    # Environment variables (not in git)
└── Configuration files...
```

## 🗂️ Detailed Structure

### `/src/app/` - Next.js App Router
```
app/
├── dashboard/
│   └── page.tsx                  # Protected dashboard (requires auth)
├── sign-in/[[...sign-in]]/
│   └── page.tsx                  # Clerk sign-in page
├── sign-up/[[...sign-up]]/
│   └── page.tsx                  # Clerk sign-up page
├── layout.tsx                    # Root layout with ClerkProvider
├── page.tsx                      # Landing page (public)
├── globals.css                   # Global styles & Tailwind
└── favicon.ico                   # App icon
```

### `/src/components/` - React Components
```
components/
├── sections/                     # Landing page sections
│   ├── hero.tsx                  # Hero with product previews
│   ├── how-it-works.tsx          # 4-step process
│   ├── product-types.tsx         # Digital/Physical/Service showcase
│   ├── validation-preview.tsx   # Mock landing page preview
│   ├── testimonials.tsx          # Creator testimonials
│   └── cta-footer.tsx           # Call-to-action & footer
├── ui/                           # Reusable UI components
│   ├── button.tsx                # Button component with variants
│   └── card.tsx                  # Card component system
└── navbar.tsx                    # Navigation with Clerk auth
```

### `/src/lib/` - Utilities
```
lib/
└── utils.ts                      # Helper functions (cn, etc)
```

### `/public/` - Static Assets
```
public/
├── file.svg
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

### `/docs/` - Documentation
```
docs/
├── CLERK_SETUP.md               # Complete Clerk setup guide
├── CLERK_MIGRATION.md           # Migration notes from NextAuth
└── CLERK_READY.md               # Quick start guide
```

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration (paths: `@/*` → `./src/*`) |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.mjs` | PostCSS configuration |
| `eslint.config.mjs` | ESLint rules |
| `.env.local` | Environment variables (Clerk keys) |
| `.gitignore` | Git ignore patterns |

## 🎨 Design System

### Colors
- **Primary Purple**: `#7C3AED` (purple-600)
- **Gradient**: `linear-gradient(to right, #00C6FF, #0072FF)` (blue-teal)
- **Background**: White/Gray-50
- **Text**: Gray-900 (headings), Gray-600 (body)

### Components
- Custom shadcn-inspired components with `class-variance-authority`
- Tailwind CSS 4 utility classes
- Lucide React icons

## 🔐 Authentication Flow

1. User visits landing page (`/`)
2. Clicks "Get Started" or "Sign In"
3. Redirected to `/sign-in` (Clerk UI)
4. After authentication → redirected to `/dashboard`
5. Protected routes checked by `middleware.ts`

## 📦 Dependencies

### Core
- `next@16.0.1` - Framework
- `react@19.0.0` - UI library
- `typescript` - Type safety

### Authentication
- `@clerk/nextjs` - Modern auth solution

### Styling
- `tailwindcss@4` - Utility-first CSS
- `lucide-react` - Icons
- `class-variance-authority` - Component variants
- `tailwind-merge` - Class merging utility

## 🚀 Key Features

- **Modern Stack**: Next.js 16 (App Router), React 19, TypeScript
- **Clean Architecture**: All source in `src/`, docs in `docs/`
- **Type Safe**: Full TypeScript coverage with path aliases (`@/*`)
- **Authentication**: Clerk with multiple OAuth providers
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Protected Routes**: Middleware-based authentication
- **Beautiful UI**: Custom gradient theme with purple/blue palette

## 📝 Development Workflow

1. **Start dev server**: `npm run dev`
2. **Build for production**: `npm run build`
3. **Start production**: `npm start`
4. **Lint code**: `npm run lint`

## 🔗 Important Paths

- Landing: `/`
- Sign In: `/sign-in`
- Sign Up: `/sign-up`
- Dashboard: `/dashboard` (protected)

---

**Last Updated**: November 2025
