import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useFavoritesStore } from "../../store/favoritesStore";
import {
  getProducts,
  type Product,
} from "../../firebase/products";

import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );
  const favorites = useFavoritesStore(
    (state) => state.favorites
  );

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  const cartItems = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        // Only display active products
        const activeProducts = data.filter(
          (product) => product.isActive
        );

        setProducts(activeProducts);
      } catch (error) {
        console.error(
          "Failed to load featured products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-[#f8ecdc] px-5 py-14 sm:px-8 lg:px-10"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#d6a24a]/10 blur-3xl" />

      <div className="mx-auto max-w-[1450px]">

        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#756c40]">
            Our favourites
          </p>

          <h2 className="mt-2 font-serif text-[38px] leading-tight text-[#41271d] sm:text-[46px]">
            Featured Candles
          </h2>

          <div className="mx-auto mt-1 text-[#9c6332]">
            ♡
          </div>

          <p className="mt-2 text-sm text-[#766458]">
            Unique handmade candles for every occasion.
          </p>
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#7b421f] border-t-transparent" />

              <p className="mt-3 text-sm text-[#766458]">
                Loading our favourites...
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            PRODUCTS
        ====================================================== */}
        {!loading && products.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => {
              // Get current cart quantity for this product
              const cartItem = cartItems.find(
                (item) => item.id === product.id
              );

              const quantity = cartItem?.quantity ?? 0;
              const favorite = favorites.some(
                (item) => item.id === product.id
              );

              return (
                <article
                  key={product.id}
                  onClick={() => navigate(`/shop/${product.id}`)}
                  className="group cursor-pointer"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-2xl bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* WISHLIST */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        toggleFavorite({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        });
                      }}
                      aria-label={
                        favorite
                          ? `Remove ${product.name} from favourites`
                          : `Add ${product.name} to favourites`
                      }
                      className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 ${favorite ? "bg-[#fff4ec]" : ""
                        }`}
                    >
                      <Heart
                        size={18}
                        strokeWidth={1.8}
                        className={
                          favorite
                            ? "fill-[#8a4b29] text-[#8a4b29]"
                            : "text-[#75411f]"
                        }
                      />
                    </button>

                    {/* BADGE */}
                    {product.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#7b421f] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        {product.badge}
                      </span>
                    )}

                    {/* CATEGORY */}
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#75411f] backdrop-blur">
                      {product.category}
                    </span>
                  </div>

                  {/* DETAILS */}
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

                      <p className="whitespace-nowrap font-semibold text-[#75411f]">
                        ₹{product.price}
                      </p>
                    </div>

                    {/* ADD TO CART / QUANTITY */}
                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                          });
                        }}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#cbb49d] py-2.5 text-xs font-semibold text-[#75411f] transition hover:bg-[#75411f] hover:text-white"
                      >
                        <ShoppingBag size={15} />
                        Add to Cart
                      </button>
                    ) : (
                      <div
                        onClick={(event) => event.stopPropagation()}
                        className="mt-3 flex w-full items-center justify-between overflow-hidden rounded-full border border-[#75411f] bg-[#75411f]"
                      >
                        {/* DECREASE */}
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            decreaseQuantity(product.id);
                          }}
                          className="flex h-10 w-12 items-center justify-center text-lg font-semibold text-white transition hover:bg-[#633419]"
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          −
                        </button>

                        {/* QUANTITY */}
                        <span className="text-sm font-semibold text-white">
                          {quantity}
                        </span>

                        {/* INCREASE */}
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            increaseQuantity(product.id);
                          }}
                          className="flex h-10 w-12 items-center justify-center text-lg font-semibold text-white transition hover:bg-[#633419]"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {!loading && products.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center">
            <p className="font-serif text-xl text-[#41271d]">
              Our candles are coming soon.
            </p>

            <p className="mt-2 text-sm text-[#766458]">
              Check back soon for our latest collection.
            </p>
          </div>
        )}

        {/* =====================================================
            VIEW ALL
        ====================================================== */}

        <div className="mt-9 text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-[#75411f] px-7 py-3 text-sm font-semibold text-[#75411f] transition hover:bg-[#75411f] hover:text-white"
          >
            Explore all candles

            <span>→</span>
          </a>
        </div>
      </div>
    </section >
  );
}