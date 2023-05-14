import "@aksar/ui/styles.css";
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

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning className="bg-background">
          <body
            className={cn(
              "min-h-screen font-sans antialiased",
              fontSans.variable,
              fontCal.variable,
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {props.children}
              {props.modal}
              <TailwindIndicator />
            </ThemeProvider>
            <Analytics />
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
