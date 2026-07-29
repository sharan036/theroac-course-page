import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheROAC | AI SaaS Builder — 30 Day Program",
  description:
    "Go from zero code to one live AI SaaS product in 30 days. JavaScript → React & Next.js → AI Integration → Stripe & Razorpay. A daily build plan with one shippable deliverable every single day.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
