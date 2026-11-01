import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@tum.ai/ui-kit";
import { SkipLink } from "@tum.ai/ui-kit/shell";
import { EVENT_NAME, hero, SITE_URL } from "@/content/event";
import "./globals.css";

const title = `${EVENT_NAME} San Francisco | ${hero.tagline}`;
const description =
  "TUM.ai, Europe's leading student AI initiative, brings a summit and a hackathon to San Francisco: German founders, operators and investors who built in the Bay, and Munich's brightest students.";

// Icons come from the file conventions in app/ (favicon.ico, icon.svg,
// apple-icon.png), the social card from app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: EVENT_NAME,
  keywords: [
    "TUM.ai",
    "TUM.ai Summit",
    "San Francisco",
    "hackathon",
    "AI",
    "German founders",
    "Technical University of Munich",
    "Bay Area",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: EVENT_NAME,
    locale: "en_US",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Browser chrome that reads theme-color uses the brand black of the hero.
export const viewport: Viewport = {
  themeColor: "#0d0214",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <div id="app-root" data-tone="paper">
            <SkipLink />
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
