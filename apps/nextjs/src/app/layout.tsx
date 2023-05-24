import "../styles/globals.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";

import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@aksar/ui";
import { Toaster } from "@aksar/ui/toaster";

import { TailwindIndicator } from "~/components/tailwind-indicator";
import { ThemeProvider } from "~/components/theme-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontCal = LocalFont({
  src: "../styles/calsans.ttf",
  variable: "--font-cal",
});

export const metadata = {
  title: {
    default: "siteConfig.name",
    template: "%s | ${siteConfig.name}",
  },
  description: "siteConfig.description",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://bahutara.eu.org",
    },
  ],
  creator: "shadcn",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "siteConfig.url",
    title: "siteConfig.name",
    description: "siteConfig.description",
    siteName: "siteConfig.name",
  },
  twitter: {
    card: "summary_large_image",
    title: "siteConfig.name",
    description: "siteConfig.description",
    images: "[`${siteConfig.url}/og.jpg`]",
    creator: "@ode_aksar",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "`${siteConfig.url}/site.webmanifest`",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
              fontCal.variable,
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {props.children}
              {props.modal}
              <TailwindIndicator />
              <Analytics />
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
