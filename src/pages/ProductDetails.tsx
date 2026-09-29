import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Heart,
    Minus,
    Plus,
    ShoppingBag,
} from "lucide-react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import Navbar from "../components/home/Navbar";
import {
    getProducts,
    type Product,
} from "../firebase/products";

import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";

export default function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] =
        useState<Product | null>(null);

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // ============================================================
    // CART
    // ============================================================

    const cartItems = useCartStore(
        (state) => state.items
    );

    const addToCart = useCartStore(
        (state) => state.addToCart
    );

    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );

    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity
    );

    // ============================================================
    // FAVORITES
    // ============================================================

    const favorites = useFavoritesStore(
        (state) => state.favorites
    );

    const toggleFavorite = useFavoritesStore(
        (state) => state.toggleFavorite
    );

    // ============================================================
    // CART COUNT
    // ============================================================

    // ============================================================
    // PRODUCT QUANTITY
    // ============================================================

    const quantity =
        product
            ? cartItems.find(
                (item) => item.id === product.id
            )?.quantity ?? 0
            : 0;

    // ============================================================
    // FAVORITE STATUS
    // ============================================================

    const isFavorite =
        product
            ? favorites.some(
                (item) => item.id === product.id
            )
            : false;

    // ============================================================
    // LOAD PRODUCT
    // ============================================================

    useEffect(() => {
        const loadProduct = async () => {
            if (!productId) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setNotFound(false);

                const products = await getProducts();

                const foundProduct = products.find(
                    (item) => item.id === productId
                );

                if (!foundProduct || !foundProduct.isActive) {
                    setNotFound(true);
                    return;
                }

                setProduct(foundProduct);
            } catch (error) {
                console.error(
                    "Failed to load product:",
                    error
                );

                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    // ============================================================
    // ADD TO CART
    // ============================================================

    const handleAddToCart = () => {
        if (!product) return;

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    // ============================================================
    // FAVORITE
    // ============================================================

    const handleFavorite = () => {
        if (!product) return;

        toggleFavorite({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
        });
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fbf3e7] text-[#3d251b]">

                <Navbar />

                <div className="flex min-h-[70vh] items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#75411f] border-t-transparent" />

                        <p className="mt-4 text-sm text-[#806d5d]">
                            Loading product...
                        </p>

                    </div>

                </div>
            </div>
        );
    }

    // ============================================================
    // NOT FOUND
    // ============================================================

    if (notFound || !product) {
        return (
            <div className="min-h-screen bg-[#fbf3e7] text-[#3d251b]">

                <Navbar />

                <div className="flex min-h-[70vh] items-center justify-center px-5">

                    <div className="max-w-md rounded-3xl bg-[#fffaf4] p-10 text-center shadow-sm">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f1dfcb]">
                            <ShoppingBag
                                size={26}
                                className="text-[#75411f]"
                            />
                        </div>

                        <h1 className="mt-5 font-serif text-3xl text-[#3d251b]">
                            Product not found
                        </h1>

                        <p className="mt-2 text-sm text-[#806d5d]">
                            This candle may no longer be available.
                        </p>

                        <Link
                            to="/shop"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#75411f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            <ArrowLeft size={16} />
                            Back to Shop
                        </Link>

                    </div>

                </div>
            </div>
        );
    }

    // ============================================================
    // PRODUCT
    // ============================================================

    return (
        <div className="min-h-screen bg-[#fbf3e7] text-[#3d251b]">

            {/* ======================================================
          NAVBAR
      ======================================================= */}

            <Navbar />

            {/* ======================================================
          PAGE
      ======================================================= */}

            <main>

                {/* ====================================================
            BACK
        ===================================================== */}

                <div className="mx-auto max-w-[1400px] px-5 pt-5 sm:px-8 lg:px-12">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#75411f] transition hover:text-[#4f2d1a]"
                    >
                        <ArrowLeft size={17} />
                        Back to Shop
                    </button>

                </div>

                {/* ====================================================
            PRODUCT
        ===================================================== */}

                <section className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">

                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">

                        {/* =================================================
                IMAGE
            ================================================== */}

                        <div className="relative">

                            <div className="overflow-hidden rounded-[28px] bg-[#f0dfcc]">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="aspect-square w-full object-cover"
                                />

                            </div>

                            {/* BADGE */}

                            {product.badge && (
                                <span className="absolute left-4 top-4 rounded-full bg-[#fffaf4]/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#75411f] shadow-sm backdrop-blur-sm">
                                    {product.badge}
                                </span>
                            )}

                        </div>

                        {/* =================================================
                DETAILS
            ================================================== */}

                        <div className="flex flex-col justify-center">

                            {/* CATEGORY */}

                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9a623b]">
                                {product.category} Candles
                            </p>

                            {/* NAME */}

                            <h1 className="mt-3 font-serif text-4xl leading-tight text-[#3d251b] sm:text-5xl">
                                {product.name}
                            </h1>

                            {/* PRICE */}

                            <p className="mt-5 text-2xl font-semibold text-[#75411f]">
                                ₹{product.price}
                            </p>

                            {/* DESCRIPTION */}

                            <div className="mt-7 border-y border-[#e4d2bd] py-6">

                                <p className="text-sm leading-7 text-[#725f50] sm:text-base">
                                    {product.description}
                                </p>

                                <div className="mt-5 grid grid-cols-2 gap-3">

                                    <div className="rounded-2xl bg-[#f6e8d8] p-4">
                                        <p className="text-xs font-semibold text-[#75411f]">
                                            Handmade
                                        </p>
                                        <p className="mt-1 text-xs text-[#806d5d]">
                                            Crafted with care
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-[#f6e8d8] p-4">
                                        <p className="text-xs font-semibold text-[#75411f]">
                                            Kandle
                                        </p>
                                        <p className="mt-1 text-xs text-[#806d5d]">
                                            Made in small batches
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* =================================================
                  FAVORITE
              ================================================== */}

                            <button
                                type="button"
                                onClick={handleFavorite}
                                className={`mt-6 flex items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold transition ${isFavorite
                                    ? "border-[#75411f] bg-[#f5e5d3] text-[#75411f]"
                                    : "border-[#d9bfa5] text-[#75411f] hover:bg-[#f5e5d3]"
                                    }`}
                            >
                                <Heart
                                    size={18}
                                    fill={
                                        isFavorite
                                            ? "#75411f"
                                            : "transparent"
                                    }
                                />

                                {isFavorite
                                    ? "Added to Favourites"
                                    : "Add to Favourites"}
                            </button>

                            {/* =================================================
                  CART
              ================================================== */}

                            <div className="mt-3 flex gap-3">

                                {quantity === 0 ? (

                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#75411f] py-4 text-sm font-semibold text-white transition hover:bg-[#633419]"
                                    >
                                        <ShoppingBag size={18} />
                                        Add to Cart
                                    </button>

                                ) : (

                                    <div className="flex flex-1 items-center justify-center overflow-hidden rounded-full border border-[#cdb398] bg-[#fffaf4]">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                decreaseQuantity(
                                                    product.id
                                                )
                                            }
                                            className="flex h-14 w-14 items-center justify-center text-[#75411f] transition hover:bg-[#f5e7d8]"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={18} />
                                        </button>

                                        <span className="flex min-w-12 items-center justify-center text-base font-semibold text-[#75411f]">
                                            {quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                increaseQuantity(
                                                    product.id
                                                )
                                            }
                                            className="flex h-14 w-14 items-center justify-center text-[#75411f] transition hover:bg-[#f5e7d8]"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={18} />
                                        </button>

                                    </div>

                                )}

                            </div>

                            {/* VIEW CART */}

                            {quantity > 0 && (
                                <Link
                                    to="/cart"
                                    className="mt-3 text-center text-sm font-semibold text-[#75411f] underline underline-offset-4"
                                >
                                    View Cart
                                </Link>
                            )}

                        </div>

                    </div>

                </section>

            </main>
        </div>
    );
}