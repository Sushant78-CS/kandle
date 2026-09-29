import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import CategoryStrip from "../components/home/CategoryStrip";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyKanthi from "../components/home/WhyKanthi";
import AboutSection from "../components/home/AboutSection";
import CTASection from "../components/home/CTASection";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffdf9] text-[#41271d]">
      <Navbar />

      <main>
        <Hero />

        <CategoryStrip />

        <FeaturedProducts />

        <WhyKanthi />

        <AboutSection />

        {/* <InstagramSection /> */}

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}