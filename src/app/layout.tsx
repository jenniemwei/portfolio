import type { Metadata } from "next";
import localFont from "next/font/local";
import { Crimson_Pro, Crimson_Text, DM_Mono, Manrope } from "next/font/google";

import { Nav } from "@/components/nav/Nav";
import "@/styles/globals.css";

const saans = localFont({
  src: [
    {
      path: "../../public/Saans/Saans-TRIAL-Light.woff2",
      weight: "350",
      style: "normal",
    },
    {
      path: "../../public/Saans/Saans-TRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Saans/Saans-TRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Saans/Saans-TRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-saans",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
  weight: "variable",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-crimson-text",
  display: "swap",
  weight: ["400"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Jennie Wei",
  description: "Product designer portfolio",
  icons: {
    icon: "/icons/favicon-1.png",
    shortcut: "/icons/favicon-1.png",
    apple: "/icons/favicon-1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${saans.variable} ${crimsonPro.variable} ${crimsonText.variable} ${manrope.variable} ${dmMono.variable} bg-fill-default`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-fill-default text-text-default antialiased"
        suppressHydrationWarning
      >
        {/* Temporarily hidden; keep the nav implementation available for later. */}
        {false && <Nav />}
        {children}
      </body>
    </html>
  );
}
