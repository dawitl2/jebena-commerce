import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Jebena — Brew Culture. Share Heritage.", template: "%s · Jebena" },
  description: "Handcrafted Ethiopian coffee ceremony pieces, rooted in tradition.",
  icons: { icon: "/images/logo.png", shortcut: "/images/logo.png" },
  openGraph: {
    title: "Jebena — Brew Culture. Share Heritage.",
    description: "Handcrafted Ethiopian coffee ceremony pieces, rooted in tradition.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Jebena — Brew Culture. Share Heritage." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
