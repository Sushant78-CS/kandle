import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section id="contact" className="bg-[#f8ecdc] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#fffdf9] px-6 py-14 text-center shadow-sm sm:px-12">
        <Sparkles size={28} className="mx-auto text-[#9c6332]" />

        <h2 className="mt-5 font-serif text-4xl text-[#41271d] sm:text-5xl">
          Find a candle for your moment.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#766458]">
          Whether you're looking for a gift or something beautiful for yourself,
          there's a little glow waiting for you.
        </p>

        <Link
          to={"/shop"}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#75411f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#633419]"
        >
          Shop Candles
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
