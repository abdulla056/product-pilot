# Authentication Setup Guide

## ✅ What's Been Created

### 1. **NextAuth Configuration** (`auth.ts`)
- Configured with Google, GitHub, and Email/Password providers
- JWT-based sessions
- Custom callbacks for session management

### 2. **API Routes** (`app/api/auth/[...nextauth]/route.ts`)
- NextAuth API endpoints for authentication

### 3. **Sign-In Page** (`app/auth/signin/page.tsx`)
- Beautiful custom sign-in UI
- Support for OAuth (Google, GitHub) and email/password
- Responsive design matching ProductPilot branding

### 4. **Authentication Components**
- `AuthProvider` - Wraps app with NextAuth SessionProvider
- `UserButton` - Shows user info and sign-out button
- `Navbar` - Navigation with authentication status

### 5. **Protected Dashboard** (`app/dashboard/page.tsx`)
- Server-side authentication check
- Redirects to sign-in if not authenticated
- Shows personalized creator dashboard

## 🚀 Installation

Run this command to install NextAuth:

```bash
npm install next-auth@5.0.0-beta.25
```

## 🔐 Environment Variables

Add these to your `.env.local` file:

```env
# Required for NextAuth
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 📝 Setting Up OAuth Providers

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Copy Client ID and Client Secret to `.env.local`

### GitHub OAuth

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: `ProductPilot (Dev)`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and generate a Client Secret
5. Add to `.env.local`

## 🎯 Usage Examples

### Server Components (App Router)

```tsx
import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()
  
  if (!session) {
    return <div>Not authenticated</div>
  }
  
  return <div>Hello {session.user?.name}</div>
}
```

### Client Components

```tsx
"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export function Component() {
  const { data: session } = useSession()
  
  if (!session) {
    return <button onClick={() => signIn()}>Sign In</button>
  }
  
  return (
    <div>
      <p>Welcome {session.user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

### Protecting Routes

```tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }
  
  // Protected content
  return <div>Protected Dashboard</div>
}
```

## 📂 File Structure

```
├── auth.ts                          # NextAuth configuration
├── .env.local                       # Environment variables
├── app/
│   ├── api/auth/[...nextauth]/
│   │   └── route.ts                # NextAuth API routes
│   ├── auth/signin/
│   │   └── page.tsx                # Sign-in page
│   ├── dashboard/
│   │   └── page.tsx                # Protected dashboard
│   └── layout.tsx                  # Root layout with AuthProvider
├── components/
│   ├── auth/
│   │   ├── auth-provider.tsx      # SessionProvider wrapper
│   │   └── user-button.tsx        # User dropdown/button
│   └── navbar.tsx                 # Navigation with auth
└── types/
    └── next-auth.d.ts             # TypeScript types
```

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Change NEXTAUTH_SECRET** - Use a secure random string in production
3. **Credentials Provider** - The demo implementation is for testing only. In production:
   - Hash passwords with bcrypt
   - Store users in a database
   - Add proper validation
   - Implement rate limiting

## 🎨 Customization

### Custom Sign-In Page

The sign-in page (`app/auth/signin/page.tsx`) is fully customized with:
- ProductPilot branding
- Purple/blue gradient theme
- OAuth buttons with icons
- Email/password form
- Responsive design

### Adding More Providers

Edit `auth.ts` to add more providers:

```tsx
import Discord from "next-auth/providers/discord"

export const { handlers, auth } = NextAuth({
  providers: [
    Google({ /* ... */ }),
    GitHub({ /* ... */ }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
})
```

## 🧪 Testing

1. Start the dev server: `npm run dev`
2. Navigate to `/auth/signin`
3. Try email/password (demo mode - any valid email/password works)
4. Visit `/dashboard` to see the protected page
5. Click the user button in the navbar to sign out

## 📚 Resources

- [NextAuth.js Documentation](https://authjs.dev)
- [Next.js App Router Auth](https://nextjs.org/docs/app/building-your-application/authentication)
- [OAuth Provider Setup Guides](https://authjs.dev/getting-started/providers)
