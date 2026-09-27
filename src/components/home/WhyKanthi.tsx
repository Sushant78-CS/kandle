import { Heart, Sparkles, Truck } from "lucide-react";

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
    <div className="rounded-3xl border border-[#eadfd2] bg-[#f8ecdc] p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fffdf9] text-[#75411f]">
        {icon}
      </div>

      <h3 className="mt-4 font-serif text-xl text-[#41271d]">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-[#766458]">{description}</p>
    </div>
  );
}

export default function WhyKanthi() {
  return (
    <section className="bg-[#fffdf9] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#756c40]">
              Why Kanthi?
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#41271d] sm:text-5xl">
              Small candles.
              <br />
              <span className="text-[#75411f]">Big happiness.</span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#766458]">
              Every candle is created with attention to the little details. From
              beautiful shapes to thoughtful designs, we want every piece to
              bring a warm feeling to your space.
            </p>

            <a
              href="#about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#75411f]"
            >
              Discover our story
              <span>→</span>
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
  );
}
