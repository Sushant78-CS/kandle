import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#75411f] px-5 py-20 text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src="/images/flower-candle.jpg"
            alt="Kanthi handmade candle"
            className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#e8c77d]">
            Our story
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Candles made for
            <br />
            meaningful moments.
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-7 text-white/75">
            Kanthi Candles is about turning simple moments into beautiful
            memories. From gifting someone special to creating a cosy corner at
            home, our candles are made to add a little warmth wherever they go.
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#75411f] transition hover:bg-[#f8ecdc]"
          >
            Get in touch
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
