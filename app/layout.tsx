import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheROAC | AI SaaS Builder — 30 Day Program",
  description:
    "Go from zero code to one live AI SaaS product in 30 days. JavaScript → React & Next.js → AI Integration → Stripe & Razorpay. A daily build plan with one shippable deliverable every single day.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Finger+Paint&family=DM+Sans:wght@400;500;600&family=Inter:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
