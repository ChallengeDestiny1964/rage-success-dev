import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SiteBackground } from "@/components/SiteBackground";
import { site } from "@/data/site";
import "./globals.css";

const serif = localFont({
  variable: "--font-instrument",
  display: "swap",
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  authors: [{ name: site.name }],
  keywords: [
    "Full-Stack AI Engineer",
    "LLM Engineer",
    "Freelancer",
    "Sydney",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "AI Training",
  ],
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: site.tagline,
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <SiteBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
