import type { Metadata } from "next";
import localFont from "next/font/local";
import { Crimson_Pro } from "next/font/google";

import { Nav } from "@/components/sitewide/Nav";
import "@/styles/globals.css";

const saans = localFont({
  src: [
    {
      path: "../../public/Saans/Saans-TRIAL-Light.woff2",
      weight: "200",
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
      weight: "700",
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
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Jennie Wei",
  description: "Product designer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${saans.variable} ${crimsonPro.variable}`}>
      <body className="min-h-screen bg-canvas text-default antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
