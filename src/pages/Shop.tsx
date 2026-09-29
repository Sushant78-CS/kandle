import { useEffect, useMemo, useState } from "react";

import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  getProducts,
  type Product,
  type ProductCategory,
} from "../firebase/products";

import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";
import Navbar from "../components/home/Navbar";
import { useNavigate } from "react-router-dom";

type Category = "All" | ProductCategory;

const categories: Category[] = [
  "All",
  "Decorative",
  "Gift",
  "Floral",
  "Aromatic",
];

export default function Shop() {
  const navigate = useNavigate()
  // ============================================================
  // PRODUCTS
  // ============================================================

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FILTERS
  // ============================================================

  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("featured");

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  // ============================================================
  // CART STORE
  // ============================================================

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const cartItems = useCartStore(
    (state) => state.items
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  // ============================================================
  // FAVORITES STORE
  // ============================================================

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  const favorites = useFavoritesStore(
    (state) => state.favorites
  );

  // ============================================================
  // LOAD FIREBASE PRODUCTS
  // ============================================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        // Only show products enabled by admin
        const activeProducts = data.filter(
          (product) => product.isActive
        );

        setProducts(activeProducts);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ============================================================
  // FILTER + SEARCH + SORT
  // ============================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // ----------------------------------------------------------
    // CATEGORY
    // ----------------------------------------------------------

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    // ----------------------------------------------------------
    // SEARCH
    // ----------------------------------------------------------

    if (searchQuery.trim()) {
      const query = searchQuery
        .toLowerCase()
        .trim();

      result = result.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.category
            .toLowerCase()
            .includes(query) ||
          product.description
            .toLowerCase()
            .includes(query)
      );
    }

    // ----------------------------------------------------------
    // SORT
    // ----------------------------------------------------------

    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "featured":
      default:
        // Products with a badge appear first
        result.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;

          return 0;
        });

        break;
    }

    return result;
  }, [
    products,
    selectedCategory,
    searchQuery,
    sortBy,
  ]);

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  // ============================================================
  // GET CART QUANTITY FOR PRODUCT
  // ============================================================

  const getCartQuantity = (productId: string) => {
    return (
      cartItems.find(
        (item) => item.id === productId
      )?.quantity ?? 0
    );
  };

  // ============================================================
  // CHECK FAVORITE
  // ============================================================

  const isFavorite = (productId: string) => {
    return favorites.some(
      (item) => item.id === productId
    );
  };

  // ============================================================
  // CLEAR FILTERS
  // ============================================================

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <main className="min-h-screen bg-[#fbf3e7] text-[#3d251b]">

      <Navbar />

      {/* ======================================================
          SHOP HEADER
      ======================================================= */}

      <section className="relative overflow-hidden border-b border-[#ead8c3] bg-[#f8ecdc]">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border border-[#c9aa88]/40" />

        <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full border border-[#c9aa88]/40" />

        <div className="mx-auto max-w-[1450px] px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-12">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#956039] sm:text-[11px]">
                Handcrafted with love
              </p>

              <h1 className="font-serif text-4xl font-medium tracking-[-0.03em] text-[#3d251b] sm:text-5xl">
                Our{" "}
                <span className="text-[#824725]">
                  candles.
                </span>
              </h1>

              <p className="mt-2 max-w-xl text-sm text-[#725f50]">
                Beautiful handmade candles for gifting,
                decorating and celebrating little moments.
              </p>

            </div>

            <div className="hidden text-right sm:block">

              <p className="font-serif text-2xl text-[#75411f]">
                Made by hand.
              </p>

              <p className="mt-1 text-xs text-[#8d7765]">
                Small batches · Made with love
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          SHOP CONTENT
      ======================================================= */}

      <section
        id="shop"
        className="mx-auto max-w-[1450px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12"
      >

        {/* ====================================================
            TOOLBAR
        ===================================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="relative w-full lg:max-w-[400px]">

            <Search
              size={18}
              strokeWidth={1.7}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#806b5a]"
            />

            <input
              type="text"
              placeholder="Search candles..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="h-11 w-full rounded-full border border-[#dfccb7] bg-[#fffaf4] pl-11 pr-10 text-sm text-[#4c382c] outline-none transition placeholder:text-[#a18e7d] focus:border-[#9a623b] focus:ring-2 focus:ring-[#9a623b]/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() =>
                  setSearchQuery("")
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#806b5a]"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

          </div>

          {/* MOBILE FILTER */}

          <button
            type="button"
            onClick={() =>
              setMobileFilterOpen(true)
            }
            className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#dfccb7] bg-[#fffaf4] px-5 text-sm font-medium text-[#694329] lg:hidden"
          >
            <SlidersHorizontal size={17} />
            Filters & Sort
          </button>

          {/* DESKTOP SORT */}

          <div className="relative hidden lg:block">

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="h-11 appearance-none rounded-full border border-[#dfccb7] bg-[#fffaf4] pl-5 pr-11 text-sm text-[#694329] outline-none focus:border-[#9a623b]"
            >
              <option value="featured">
                Sort: Featured
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="name">
                Name
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#806b5a]"
            />

          </div>

        </div>

        {/* ====================================================
            CATEGORIES
        ===================================================== */}

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-6">

          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`whitespace-nowrap rounded-full border px-5 py-2 text-xs transition sm:px-6 sm:py-2.5 sm:text-sm ${selectedCategory === category
                ? "border-[#75411f] bg-[#75411f] text-white"
                : "border-[#ddc7af] bg-[#fffaf4] text-[#65432f] hover:border-[#a8754e] hover:bg-[#f6e9da]"
                }`}
            >
              {category}
            </button>
          ))}

        </div>

        {/* ====================================================
            RESULTS INFO
        ===================================================== */}

        <div className="mt-5 flex items-center justify-between">

          <p className="text-xs text-[#806d5c] sm:text-sm">
            {loading
              ? "Loading candles..."
              : `${filteredProducts.length} ${filteredProducts.length === 1
                ? "candle"
                : "candles"
              }`}
          </p>

          <p className="hidden text-xs text-[#9a8776] sm:block">
            Handmade in small batches
          </p>

        </div>

        {/* ====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="flex min-h-[350px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#75411f] border-t-transparent" />

              <p className="mt-4 text-sm text-[#806d5d]">
                Loading our candles...
              </p>

            </div>

          </div>
        )}

        {/* ====================================================
            PRODUCT GRID
        ===================================================== */}

        {!loading &&
          filteredProducts.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => {

                const favorite =
                  isFavorite(product.id);

                const quantity =
                  getCartQuantity(product.id);

                return (
                  <article
                    key={product.id}
                    onClick={() => navigate(`/shop/${product.id}`)}
                    className="group overflow-hidden rounded-[18px] border border-[#ead8c4] bg-[#fffaf4] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#704021]/10"
                  >

                    {/* =================================================
                        PRODUCT IMAGE
                    ================================================== */}

                    <div className="relative aspect-square overflow-hidden bg-[#f1e2d0]">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* BADGE */}

                      {product.badge && (
                        <span className="absolute left-2.5 top-2.5 rounded-full bg-[#fff9f1]/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#75411f] shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px]">
                          {product.badge}
                        </span>
                      )}

                      {/* =================================================
                          FAVORITE
                      ================================================== */}

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
                          })
                        }
                        }
                        aria-label={
                          favorite
                            ? `Remove ${product.name} from favourites`
                            : `Add ${product.name} to favourites`
                        }
                        className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#fffaf4]/90 text-[#613c27] shadow-sm backdrop-blur-sm transition hover:scale-105 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
                      >

                        <Heart
                          size={17}
                          strokeWidth={1.7}
                          fill={
                            favorite
                              ? "#75411f"
                              : "transparent"
                          }
                          className={
                            favorite
                              ? "text-[#75411f]"
                              : "text-[#613c27]"
                          }
                        />

                      </button>

                    </div>

                    {/* =================================================
                        PRODUCT DETAILS
                    ================================================== */}

                    <div className="p-3 sm:p-4">

                      {/* CATEGORY */}

                      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a27656] sm:text-[10px]">
                        {product.category}
                      </p>

                      {/* NAME */}

                      <h2 className="mt-1 font-serif text-base text-[#432a1d] sm:text-xl">
                        {product.name}
                      </h2>

                      {/* DESCRIPTION */}

                      <p className="mt-1.5 hidden text-xs leading-5 text-[#806d5d] sm:line-clamp-2 sm:block sm:text-sm">
                        {product.description}
                      </p>

                      {/* PRICE + CART */}

                      <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">

                        {/* PRICE */}

                        <span className="text-sm font-semibold text-[#75411f] sm:text-base">
                          ₹{product.price}
                        </span>

                        {/* =================================================
                            CART CONTROL
                        ================================================== */}

                        {quantity === 0 ? (

                          /* ADD TO CART */

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              handleAddToCart(product)
                            }
                            }
                            className="rounded-full border border-[#d9bfa5] px-3 py-1.5 text-[10px] font-semibold text-[#75411f] transition hover:bg-[#75411f] hover:text-white sm:px-4 sm:text-xs"
                          >
                            Add to Cart
                          </button>

                        ) : (

                          /* QUANTITY CONTROL */

                          <div className="flex items-center overflow-hidden rounded-full border border-[#d9bfa5] bg-[#fffaf4]">

                            {/* MINUS */}

                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                decreaseQuantity(
                                  product.id
                                )
                              }
                              }
                              aria-label={`Decrease ${product.name} quantity`}
                              className="flex h-8 w-8 items-center justify-center text-[#75411f] transition hover:bg-[#f5e7d8] active:scale-95"
                            >
                              <Minus
                                size={14}
                                strokeWidth={2}
                              />
                            </button>

                            {/* QUANTITY */}

                            <span className="flex min-w-8 items-center justify-center text-xs font-semibold text-[#75411f]">
                              {quantity}
                            </span>

                            {/* PLUS */}

                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                increaseQuantity(
                                  product.id
                                )
                              }
                              }
                              aria-label={`Increase ${product.name} quantity`}
                              className="flex h-8 w-8 items-center justify-center text-[#75411f] transition hover:bg-[#f5e7d8] active:scale-95"
                            >
                              <Plus
                                size={14}
                                strokeWidth={2}
                              />
                            </button>

                          </div>

                        )}

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        {/* ====================================================
            EMPTY STATE
        ===================================================== */}

        {!loading &&
          filteredProducts.length === 0 && (
            <div className="mt-8 rounded-[24px] border border-[#ead8c4] bg-[#fffaf4] px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f2e2cf]">

                <Search
                  size={23}
                  strokeWidth={1.5}
                  className="text-[#75411f]"
                />

              </div>

              <h2 className="mt-5 font-serif text-2xl text-[#432a1d]">

                {products.length === 0
                  ? "No candles available"
                  : "No candles found"}

              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-[#806d5d]">

                {products.length === 0
                  ? "There are no active products available right now."
                  : "Try another search term or choose a different category."}

              </p>

              {products.length > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-[#75411f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#633419]"
                >
                  View all candles
                </button>
              )}

            </div>
          )}

      </section>

      {/* ======================================================
          MOBILE FILTER DRAWER
      ======================================================= */}

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* BACKDROP */}

          <button
            type="button"
            onClick={() =>
              setMobileFilterOpen(false)
            }
            className="absolute inset-0 bg-[#2f1d13]/40 backdrop-blur-[2px]"
            aria-label="Close filters"
          />

          {/* DRAWER */}

          <div className="absolute bottom-0 left-0 right-0 rounded-t-[28px] bg-[#fffaf4] p-6 shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between">

              <h2 className="font-serif text-2xl text-[#432a1d]">
                Filters & Sort
              </h2>

              <button
                type="button"
                onClick={() =>
                  setMobileFilterOpen(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2d0bd] text-[#694329]"
              >
                <X size={18} />
              </button>

            </div>

            {/* =================================================
                CATEGORY
            ================================================== */}

            <div className="mt-6">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#987052]">
                Category
              </p>

              <div className="flex flex-wrap gap-2">

                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    className={`rounded-full border px-4 py-2.5 text-sm ${selectedCategory === category
                      ? "border-[#75411f] bg-[#75411f] text-white"
                      : "border-[#ddc7af] bg-white text-[#65432f]"
                      }`}
                  >
                    {category}
                  </button>
                ))}

              </div>

            </div>

            {/* =================================================
                SORT
            ================================================== */}

            <div className="mt-7">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#987052]">
                Sort by
              </p>

              <div className="grid grid-cols-2 gap-2">

                {[
                  ["featured", "Featured"],
                  ["price-low", "Price: Low"],
                  ["price-high", "Price: High"],
                  ["name", "Name"],
                ].map(([value, label]) => (

                  <button
                    type="button"
                    key={value}
                    onClick={() => {
                      setSortBy(value);
                      setMobileFilterOpen(false);
                    }}
                    className={`rounded-xl border px-4 py-3 text-sm ${sortBy === value
                      ? "border-[#75411f] bg-[#75411f] text-white"
                      : "border-[#ddc7af] bg-white text-[#65432f]"
                      }`}
                  >
                    {label}
                  </button>

                ))}

              </div>

            </div>

            {/* SHOW RESULTS */}

            <button
              type="button"
              onClick={() =>
                setMobileFilterOpen(false)
              }
              className="mt-7 w-full rounded-full bg-[#75411f] py-3.5 text-sm font-semibold text-white"
            >
              Show {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "candle"
                : "candles"}
            </button>

          </div>

        </div>
      )}

    </main>
  );
}