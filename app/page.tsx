import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Overview from "@/components/Overview";
import Curriculum from "@/components/Curriculum";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import IsThisForYou from "@/components/IsThisForYou";
import Mentor from "@/components/Mentor";
import Community from "@/components/Community";
import Brands from "@/components/Brands";
import CtaBanner from "@/components/CtaBanner";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problems />
      <Overview />
      <Curriculum />
      <WhyChooseUs />
      <Testimonials />
      {/* <Pricing /> */}
      <IsThisForYou />
      <Mentor />
      <Community />
      <Brands />
      <CtaBanner />
      <FAQ />
    </main>
  );
}
