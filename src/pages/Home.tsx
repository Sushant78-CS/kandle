import {
  ArrowRight,
  ChevronRight,
  Heart,
  Menu,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";

const categories = [
  {
    name: "Decorative Candles",
    image: "/images/candle-1.jpg",
  },
  {
    name: "Gift Candles",
    image: "/images/candle-2.jpg",
  },
  {
    name: "Floral Candles",
    image: "/images/candle-3.jpg",
  },
  {
    name: "Aromatic Candles",
    image: "/images/candle-4.jpg",
  },
];

const products = [
  {
    id: 1,
    name: "Bubble Buds",
    price: 299,
    image: "/images/candle-1.jpg",
    category: "Decorative",
  },
  {
    id: 2,
    name: "Heart Bloom",
    price: 349,
    image: "/images/candle-2.jpg",
    category: "Gift Candle",
  },
  {
    id: 3,
    name: "Flower Glow",
    price: 399,
    image: "/images/candle-3.jpg",
    category: "Floral",
  },
  {
    id: 4,
    name: "Mini Candle Set",
    price: 449,
    image: "/images/candle-4.jpg",
    category: "Gift Candle",
  },
];

const instagramImages = [
  "/images/candle-1.jpg",
  "/images/candle-2.jpg",
  "/images/candle-3.jpg",
  "/images/candle-4.jpg",
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.jpg"
              alt="Kanthi Candles"
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#home"
              className="text-sm font-medium text-primary transition hover:text-primary-dark"
            >
              Home
            </a>

            <a
              href="#shop"
              className="text-sm font-medium text-muted transition hover:text-primary"
            >
              Shop
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-muted transition hover:text-primary"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-muted transition hover:text-primary"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              className="relative flex h-11 w-11 items-center justify-center rounded-full
              border border-border text-primary transition hover:bg-secondary"
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.8} />
            </button>

            <button
              className="relative flex h-11 w-11 items-center justify-center rounded-full
              bg-primary text-white transition hover:bg-primary-dark"
              aria-label="Cart"
            >
              <ShoppingBag size={19} strokeWidth={1.8} />

              <span
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center
                justify-center rounded-full bg-accent text-[10px] font-bold text-white"
              >
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full
            border border-border text-primary md:hidden"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-1">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted
                  transition hover:bg-secondary hover:text-primary"
                >
                  {item}
                </a>
              ))}

              <div className="mt-3 flex gap-3 border-t border-border pt-4">
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl
                  border border-border py-3 text-sm font-medium text-primary"
                >
                  <Heart size={17} />
                  Wishlist
                </button>

                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl
                  bg-primary py-3 text-sm font-medium text-white"
                >
                  <ShoppingBag size={17} />
                  Cart
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <main id="home">
        <section className="relative overflow-hidden bg-secondary">
          <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">
            {/* Hero Content */}
            <div className="relative z-10 max-w-xl">
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DCCDBD]
                bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
              >
                <Sparkles size={14} className="text-[#D6A24A]" />
                Handcrafted with love
              </div>

              <h1
                className="font-serif text-5xl font-medium leading-[1.05] tracking-tight
                text-text sm:text-6xl lg:text-7xl"
              >
                Light up your
                <span className="mt-2 block text-primary">little moments.</span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-muted sm:text-lg">
                Beautiful handcrafted candles made to bring warmth, charm and a
                little happiness into every moment.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#shop"
                  className="group inline-flex items-center justify-center gap-3 rounded-full
                  bg-primary px-7 py-3.5 text-sm font-semibold text-white
                  shadow-lg shadow-[#6B3F2A]/10 transition hover:bg-primary-dark"
                >
                  Explore Candles
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full
                  border border-[#CDBEAF] bg-white/60 px-7 py-3.5 text-sm font-semibold
                  text-primary transition hover:bg-white"
                >
                  Our Story
                </a>
              </div>

              {/* Small Trust Points */}
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#DDCFC1] pt-7">
                <div className="flex items-center gap-2">
                  <Sparkles size={17} className="text-[#D6A24A]" />
                  <span className="text-xs font-medium text-muted">
                    Handmade
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Heart size={17} className="text-primary" />
                  <span className="text-xs font-medium text-muted">
                    Made with love
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Truck size={17} className="text-[#6F7445]" />
                  <span className="text-xs font-medium text-muted">
                    Easy ordering
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              {/* Decorative circles */}
              <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#D6A24A]/15" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#6F7445]/10" />

              <div
                className="relative overflow-hidden rounded-[2rem] border-[10px] border-white/70
                bg-white shadow-2xl shadow-[#6B3F2A]/10"
              >
                <img
                  src="/images/hero-candle.jpg"
                  alt="Handcrafted Kanthi candle"
                  className="aspect-[4/5] w-full object-cover"
                />

                {/* Floating card */}
                <div
                  className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/70
                  bg-white/90 p-4 shadow-lg backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                        Featured
                      </p>
                      <p className="mt-1 font-serif text-xl text-primary">
                        Bubble Buds
                      </p>
                    </div>

                    <span className="rounded-full bg-secondary px-3 py-2 text-sm font-bold text-primary">
                      ₹299
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORIES ================= */}
        <section className="bg-background px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6F7445]">
                  Find your favourite
                </p>

                <h2 className="mt-3 font-serif text-4xl text-text sm:text-5xl">
                  Shop by category
                </h2>
              </div>

              <a
                href="#shop"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                View all
                <ChevronRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href="#shop"
                  className="group relative overflow-hidden rounded-3xl bg-secondary"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="aspect-square w-full object-cover transition duration-500
                    group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65
                    to-transparent p-5 pt-16"
                  >
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {category.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-white/80">
                      Explore
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURED PRODUCTS ================= */}
        <section id="shop" className="bg-secondary px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6F7445]">
                Our favourites
              </p>

              <h2 className="mt-3 font-serif text-4xl text-text sm:text-5xl">
                Made to make you smile
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted">
                Discover our collection of handcrafted candles, created to make
                ordinary moments feel a little more special.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => (
                <article key={product.id} className="group">
                  <div className="relative overflow-hidden rounded-3xl bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full object-cover transition duration-500
                      group-hover:scale-105"
                    />

                    <button
                      className="absolute right-3 top-3 flex h-10 w-10 items-center
                      justify-center rounded-full bg-white/90 text-primary shadow-sm
                      backdrop-blur transition hover:bg-white"
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <Heart size={17} />
                    </button>

                    <div
                      className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5
                      text-[10px] font-semibold uppercase tracking-wide text-primary backdrop-blur"
                    >
                      {product.category}
                    </div>
                  </div>

                  <div className="px-1 pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-xl text-text">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-xs text-muted">
                          Handcrafted candle
                        </p>
                      </div>

                      <p className="font-semibold text-primary">
                        ₹{product.price}
                      </p>
                    </div>

                    <button
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full
                      border border-[#CDBEAF] bg-transparent px-4 py-2.5 text-xs font-semibold
                      text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <ShoppingBag size={15} />
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="#shop"
                className="inline-flex items-center gap-2 rounded-full border border-primary
                px-7 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Explore all candles
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ================= WHY KANTHI ================= */}
        <section className="bg-background px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6F7445]">
                  Why Kanthi?
                </p>

                <h2 className="mt-3 font-serif text-4xl leading-tight text-text sm:text-5xl">
                  Small candles.
                  <br />
                  <span className="text-primary">Big happiness.</span>
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-muted">
                  Every candle is created with attention to the little details.
                  From beautiful shapes to thoughtful designs, we want every
                  piece to bring a warm feeling to your space.
                </p>

                <a
                  href="#about"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Discover our story
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FeatureCard
                  icon={<Sparkles size={22} />}
                  title="Handcrafted"
                  description="Made carefully with attention to detail."
                />

                <FeatureCard
                  icon={<Heart size={22} />}
                  title="Made with love"
                  description="Every creation is made to feel special."
                />

                <FeatureCard
                  icon={<span className="text-xl">✦</span>}
                  title="Unique designs"
                  description="Beautiful candles for every occasion."
                />

                <FeatureCard
                  icon={<Truck size={22} />}
                  title="Easy ordering"
                  description="Simple ordering directly from us."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          className="overflow-hidden bg-primary px-5 py-20 text-white sm:px-8 lg:px-10"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] border border-white/10">
              <img
                src="/images/candle-3.jpg"
                alt="Kanthi handmade candle"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8C77D]">
                Our story
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Candles made for
                <br />
                meaningful moments.
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/75">
                Kanthi Candles is about turning simple moments into beautiful
                memories. From gifting someone special to creating a cosy corner
                at home, our candles are made to add a little warmth wherever
                they go.
              </p>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3
                text-sm font-semibold text-primary transition hover:bg-secondary"
              >
                Get in touch
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ================= INSTAGRAM ================= */}
        <section className="bg-background px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                <FaInstagram size={20} />
              </div>

              <h2 className="mt-5 font-serif text-4xl text-text sm:text-5xl">
                Follow the glow
              </h2>

              <p className="mt-3 text-sm text-muted">
                See more candles, moments and creations on Instagram.
              </p>

              <p className="mt-2 text-sm font-semibold text-primary">
                @kanthicandles
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {instagramImages.map((image, index) => (
                <a
                  key={index}
                  href="#"
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={image}
                    alt={`Kanthi Candles Instagram ${index + 1}`}
                    className="aspect-square w-full object-cover transition duration-500
                    group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0 flex items-center justify-center bg-primary/0
                    transition group-hover:bg-primary/35"
                  >
                    <FaInstagram
                      size={24}
                      className="scale-75 text-white opacity-0 transition
                      group-hover:scale-100 group-hover:opacity-100"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section
          id="contact"
          className="bg-secondary px-5 py-20 sm:px-8 lg:px-10"
        >
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-background px-6 py-14 text-center shadow-sm sm:px-12">
            <Sparkles size={28} className="mx-auto text-[#D6A24A]" />

            <h2 className="mt-5 font-serif text-4xl text-text sm:text-5xl">
              Find a candle for your moment.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted">
              Whether you're looking for a gift or something beautiful for
              yourself, there's a little glow waiting for you.
            </p>

            <a
              href="#shop"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5
              text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Shop Candles
              <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#34251F] px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <img
                src="/logo.jpg"
                alt="Kanthi Candles"
                className="h-20 w-auto rounded-xl object-contain"
              />

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
                Handcrafted candles made to bring warmth, beauty and happiness
                into your little moments.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Quick Links</h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                <a href="#home" className="transition hover:text-white">
                  Home
                </a>

                <a href="#shop" className="transition hover:text-white">
                  Shop
                </a>

                <a href="#about" className="transition hover:text-white">
                  About
                </a>

                <a href="#contact" className="transition hover:text-white">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Connect</h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                <a
                  href="#"
                  className="flex items-center gap-2 transition hover:text-white"
                >
                  <FaInstagram size={16} />
                  @kanthicandles
                </a>

                <a href="#" className="transition hover:text-white">
                  WhatsApp
                </a>

                <a
                  href="mailto:kanthi.co.0101@gmail.com"
                  className="break-all transition hover:text-white"
                >
                  kanthi.co.0101@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Kanthi Candles. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-secondary p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6B3F2A]/5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background text-primary">
        {icon}
      </div>

      <h3 className="mt-5 font-serif text-xl text-text">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-muted">{description}</p>
    </div>
  );
}
