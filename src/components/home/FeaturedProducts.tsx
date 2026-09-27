import { Heart, ShoppingBag } from "lucide-react";

import { products } from "../../data/products";

interface FeaturedProductsProps {
  onAddToCart?: (product: (typeof products)[number]) => void;
}

export default function FeaturedProducts({
  onAddToCart,
}: FeaturedProductsProps) {
  return (
    <section
      id="shop"
      className="relative overflow-hidden bg-[#f8ecdc] px-5 py-14 sm:px-8 lg:px-10"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#d6a24a]/10 blur-3xl" />

      <div className="mx-auto max-w-[1450px]">
        {/* Heading */}
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#756c40]">
            Our favourites
          </p>

          <h2 className="mt-2 font-serif text-[38px] leading-tight text-[#41271d] sm:text-[46px]">
            Featured Candles
          </h2>

          <div className="mx-auto mt-1 text-[#9c6332]">♡</div>

          <p className="mt-2 text-sm text-[#766458]">
            Unique handmade candles for every occasion.
          </p>
        </div>

        {/* Products */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="group">
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[1/1] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Wishlist */}
                <button
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#75411f] shadow-sm transition hover:scale-105"
                >
                  <Heart size={18} strokeWidth={1.8} />
                </button>

                {/* Category */}
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#75411f] backdrop-blur">
                  {product.category}
                </span>
              </div>

              {/* Details */}
              <div className="px-1 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-[20px] text-[#43281d]">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs text-[#7d6d61]">
                      {product.description}
                    </p>
                  </div>

                  <p className="font-semibold text-[#75411f]">
                    ₹{product.price}
                  </p>
                </div>

                <button
                  onClick={() => onAddToCart?.(product)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#cbb49d] py-2.5 text-xs font-semibold text-[#75411f] transition hover:bg-[#75411f] hover:text-white"
                >
                  <ShoppingBag size={15} />
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="mt-9 text-center">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 rounded-full border border-[#75411f] px-7 py-3 text-sm font-semibold text-[#75411f] transition hover:bg-[#75411f] hover:text-white"
          >
            Explore all candles
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
