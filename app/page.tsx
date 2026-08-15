import type { Metadata } from "next";
import { RegisterModalProvider } from "@/components/RegisterModalContext";
import RegisterModal from "@/components/RegisterModal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Overview from "@/components/Overview";
import Curriculum from "@/components/Curriculum";
import WhyChooseUs from "@/components/WhyChooseUs";
// import Testimonials from "@/components/Testimonials";
import HiringTrend from "@/components/HiringTrend";
import Pricing from "@/components/Pricing";
import IsThisForYou from "@/components/IsThisForYou";
import Mentor from "@/components/Mentor";
import Community from "@/components/Community";
import Brands from "@/components/Brands";
import CtaBanner from "@/components/CtaBanner";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "TheROAC | AI SaaS Builder — 30 Day Program",
  description:
    "Go from zero code to one live AI SaaS product in 30 days. JavaScript → React & Next.js → AI Integration → Razorpay. A daily build plan with one shippable deliverable every single day.",
  openGraph: {
    title: "TheROAC | AI SaaS Builder — 30 Day Program",
    description:
      "Go from zero code to one live AI SaaS product in 30 days. JavaScript → React & Next.js → AI Integration → Razorpay. A daily build plan with one shippable deliverable every single day.",
    url: "https://www.theroac.com/no-code-ai",
    images: [{ url: "https://www.theroac.com/banner.png" }],
  },
  alternates: {
    canonical: "https://www.theroac.com/no-code-ai",
  },
};

export default function Home() {
  return (
    <RegisterModalProvider>
      <main>
        <Navbar />
        <Hero />
        <Problems />
        <Overview />
        <Curriculum />
        <IsThisForYou />
        <WhyChooseUs />
        {/* <Testimonials /> */}
        <Pricing />
        <Mentor />
        <Community />
        <Brands />
        <HiringTrend />
        <CtaBanner />
        <FAQ />
        <RegisterModal />
      </main>
    </RegisterModalProvider>
  );
}
