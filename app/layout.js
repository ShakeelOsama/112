import { Geist } from "next/font/google";
import "./globals.css";
import Footer from './components/Footer'

const geistSans = Geist({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-geist-sans",
  adjustFontFallback: true,
});

export const metadata = {
  title: "NY 212 Pizza - Order Fresh & Delicious Pizza Online",
  description: "Order delicious and freshly baked pizza from NY 212 Pizza. We offer a wide variety of pizzas, sides, and beverages. Available in Lahore and Sargodha.",
  keywords: "pizza delivery, NY 212 Pizza, Lahore pizza, Sargodha pizza, online pizza ordering",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c1272d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <head>
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_API_URL || "https://wise-book-dea9d4bff7.strapiapp.com"}
        />
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_API_URL || "https://wise-book-dea9d4bff7.strapiapp.com"}
        />
        <meta name="theme-color" content="#c1272d" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}