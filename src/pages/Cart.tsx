import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
} from "lucide-react";

import { useCartStore } from "../store/cartStore";

export default function Cart() {
    const items = useCartStore((state) => state.items);
    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );
    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity
    );
    const removeFromCart = useCartStore(
        (state) => state.removeFromCart
    );

    const total = items.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const itemCount = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#f8ecdc]">
                <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-5">
                    <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f8ecdc] text-[#7b421f]">
                            <ShoppingBag size={34} strokeWidth={1.6} />
                        </div>

                        <h1 className="mt-6 font-serif text-4xl text-[#3d251b]">
                            Your cart is empty
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#78675b]">
                            Looks like you haven't added any
                            handmade candles yet.
                        </p>

                        <Link
                            to="/shop"
                            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#7b421f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            <ArrowLeft size={17} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8ecdc]">
            {/* HEADER */}

            <header className="border-b border-[#eadfd2] bg-[#fffdf9]">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
                    <Link
                        to="/shop"
                        className="flex items-center gap-2 text-sm font-medium text-[#67391f] transition hover:text-[#8a4b29]"
                    >
                        <ArrowLeft size={18} />
                        Continue Shopping
                    </Link>

                    <div className="flex items-center gap-2 text-[#67391f]">
                        <ShoppingBag size={20} />

                        <span className="text-sm font-medium">
                            Cart ({itemCount})
                        </span>
                    </div>
                </div>
            </header>

            {/* CONTENT */}

            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a765d]">
                        Your selection
                    </p>

                    <h1 className="mt-2 font-serif text-4xl text-[#3d251b] sm:text-5xl">
                        Shopping Cart
                    </h1>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    {/* PRODUCTS */}

                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm sm:p-5"
                            >
                                {/* IMAGE */}

                                <Link
                                    to="/shop"
                                    className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f8ecdc] sm:h-32 sm:w-32"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                </Link>

                                {/* DETAILS */}

                                <div className="flex min-w-0 flex-1 flex-col">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="font-serif text-xl text-[#3d251b]">
                                                {item.name}
                                            </h2>

                                            <p className="mt-1 text-sm font-medium text-[#7b421f]">
                                                ₹{item.price}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            aria-label={`Remove ${item.name}`}
                                            className="rounded-lg p-2 text-[#9a765d] transition hover:bg-red-50 hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-4">
                                        {/* QUANTITY */}

                                        <div className="flex items-center rounded-full border border-[#dfd0c0] bg-[#fffdf9]">
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                                className="flex h-9 w-9 items-center justify-center text-[#67391f] hover:bg-[#f8ecdc]"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={15} />
                                            </button>

                                            <span className="w-8 text-center text-sm font-semibold text-[#4d392d]">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(item.id)
                                                }
                                                className="flex h-9 w-9 items-center justify-center text-[#67391f] hover:bg-[#f8ecdc]"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={15} />
                                            </button>
                                        </div>

                                        {/* ITEM TOTAL */}

                                        <p className="font-semibold text-[#3d251b]">
                                            ₹
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SUMMARY */}

                    <div className="h-fit rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
                        <h2 className="font-serif text-2xl text-[#3d251b]">
                            Order Summary
                        </h2>

                        <div className="mt-6 space-y-4 border-b border-[#eadfd2] pb-5">
                            <div className="flex justify-between text-sm text-[#78675b]">
                                <span>Items</span>
                                <span>{itemCount}</span>
                            </div>

                            <div className="flex justify-between text-sm text-[#78675b]">
                                <span>Subtotal</span>

                                <span>
                                    ₹{total.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm text-[#78675b]">
                                <span>Delivery</span>

                                <span className="font-medium text-[#6f7445]">
                                    Calculated at checkout
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-5">
                            <span className="font-medium text-[#4d392d]">
                                Total
                            </span>

                            <span className="font-serif text-2xl text-[#7b421f]">
                                ₹{total.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <Link
                            to="/checkout"
                            className="flex w-full items-center justify-center rounded-full bg-[#7b421f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            to="/shop"
                            className="mt-3 flex w-full items-center justify-center rounded-full border border-[#d8c5b2] px-6 py-3.5 text-sm font-semibold text-[#67391f] transition hover:bg-[#fffaf4]"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}