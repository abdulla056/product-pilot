import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viz-I — Visualizing your success story",
  description: "Turn your audience insights into ready-to-launch product ideas using AI. Built for content creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative isolate before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-full before:max-w-2xl before:h-[300px] before:blur-3xl before:opacity-40 before:bg-[radial-gradient(ellipse_at_top,_var(--color-accent-glow),transparent_70%)] before:-z-10 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_2px_2px,rgba(0,255,157,0.15)_1px,transparent_0)] after:bg-[length:50px_50px] after:-z-20 after:opacity-30`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
