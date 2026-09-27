import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import CategoryStrip from "../components/home/CategoryStrip";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyKanthi from "../components/home/WhyKanthi";
import AboutSection from "../components/home/AboutSection";
import InstagramSection from "../components/home/InstagramSection";
import CTASection from "../components/home/CTASection";
import Footer from "../components/home/Footer";

export default function Home() {
  const handleAddToCart = (product: any) => {
    console.log("Add to cart:", product);

    // We will connect this to Zustand/cart later.
  };

  return (
    <div className="min-h-screen bg-[#fffdf9] text-[#41271d]">
      {/* <Navbar cartCount={0} /> */}

      <main>
        <Navbar cartCount={0} />
        <Hero />


        <CategoryStrip />

        <FeaturedProducts onAddToCart={handleAddToCart} />

        <WhyKanthi />

        <AboutSection />

        <InstagramSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
