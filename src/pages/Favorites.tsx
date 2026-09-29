import { Link } from "react-router-dom";
import {
    Heart,
    ShoppingBag,
    Trash2,
} from "lucide-react";

import { useFavoritesStore } from "../store/favoritesStore";
import { useCartStore } from "../store/cartStore";

export default function Favorites() {
    const favorites = useFavoritesStore(
        (state) => state.favorites
    );

    const removeFromFavorites =
        useFavoritesStore(
            (state) => state.removeFromFavorites
        );

    const addToCart = useCartStore(
        (state) => state.addToCart
    );

    const handleAddToCart = (
        product: (typeof favorites)[number]
    ) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    return (
        <div className="min-h-screen bg-[#f8ecdc] px-5 py-12 sm:px-8">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                <div className="text-center">
                    <Heart
                        className="mx-auto text-[#8a4b29]"
                        size={30}
                    />

                    <h1 className="mt-3 font-serif text-4xl text-[#3d251b]">
                        My Favourites
                    </h1>

                    <p className="mt-2 text-sm text-[#766458]">
                        Your favourite Kandle creations.
                    </p>
                </div>

                {/* EMPTY */}

                {favorites.length === 0 && (
                    <div className="mx-auto mt-12 max-w-md rounded-3xl bg-white p-10 text-center shadow-sm">

                        <Heart
                            size={42}
                            strokeWidth={1.4}
                            className="mx-auto text-[#cbb49d]"
                        />

                        <h2 className="mt-5 font-serif text-2xl text-[#3d251b]">
                            No favourites yet
                        </h2>

                        <p className="mt-2 text-sm text-[#766458]">
                            Tap the heart on a candle you love to
                            save it here.
                        </p>

                        <Link
                            to="/shop"
                            className="mt-6 inline-flex rounded-full bg-[#7b421f] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            Explore Candles
                        </Link>
                    </div>
                )}

                {/* PRODUCTS */}

                {favorites.length > 0 && (
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {favorites.map((product) => (
                            <article
                                key={product.id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm"
                            >
                                {/* IMAGE */}

                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="aspect-square w-full object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFromFavorites(
                                                product.id
                                            )
                                        }
                                        aria-label={`Remove ${product.name} from favourites`}
                                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#8a4b29] shadow-sm"
                                    >
                                        <Heart
                                            size={18}
                                            className="fill-[#8a4b29]"
                                        />
                                    </button>
                                </div>

                                {/* DETAILS */}

                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3">

                                        <div>
                                            <h2 className="font-serif text-xl text-[#3d251b]">
                                                {product.name}
                                            </h2>

                                            <p className="mt-1 text-xs text-[#766458]">
                                                {product.category}
                                            </p>
                                        </div>

                                        <span className="font-semibold text-[#75411f]">
                                            ₹{product.price}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex gap-2">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#7b421f] py-2.5 text-xs font-semibold text-white transition hover:bg-[#633419]"
                                        >
                                            <ShoppingBag size={15} />
                                            Add to Cart
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFromFavorites(
                                                    product.id
                                                )
                                            }
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfd0c0] text-[#75411f] transition hover:bg-[#f8ecdc]"
                                            aria-label="Remove from favourites"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}