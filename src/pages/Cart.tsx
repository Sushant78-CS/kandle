import { Link } from "react-router-dom";
import {
    Minus,
    Plus,
    Trash2,
} from "lucide-react";

import { useCartStore } from "../store/cartStore";

export default function Cart() {
    const items = useCartStore(
        (state) => state.items
    );

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

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#f8ecdc] px-5 py-16">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="font-serif text-4xl text-[#3d251b]">
                        Your Cart
                    </h1>

                    <p className="mt-4 text-[#766458]">
                        Your cart is currently empty.
                    </p>

                    <Link
                        to="/shop"
                        className="mt-7 inline-flex rounded-full bg-[#7b421f] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#633419]"
                    >
                        Explore Candles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8ecdc] px-5 py-12 sm:px-8">
            <div className="mx-auto max-w-6xl">

                <h1 className="font-serif text-4xl text-[#3d251b]">
                    Your Cart
                </h1>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* ITEMS */}
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-24 w-24 rounded-xl object-cover"
                                />

                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="flex justify-between gap-3">
                                        <div>
                                            <h2 className="font-serif text-xl text-[#3d251b]">
                                                {item.name}
                                            </h2>

                                            <p className="mt-1 text-sm text-[#766458]">
                                                ₹{item.price}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            className="text-[#8a4b29] transition hover:text-red-600"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="mt-3 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                decreaseQuantity(item.id)
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dfd0c0]"
                                        >
                                            <Minus size={14} />
                                        </button>

                                        <span className="min-w-6 text-center text-sm font-semibold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                increaseQuantity(item.id)
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dfd0c0]"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SUMMARY */}
                    <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="font-serif text-2xl text-[#3d251b]">
                            Order Summary
                        </h2>

                        <div className="mt-5 flex justify-between text-sm text-[#766458]">
                            <span>Items</span>
                            <span>{items.length}</span>
                        </div>

                        <div className="mt-3 flex justify-between text-sm text-[#766458]">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>

                        <div className="my-5 border-t border-[#eadfd3]" />

                        <div className="flex justify-between text-lg font-semibold text-[#3d251b]">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <Link
                            to="/checkout"
                            className="mt-6 flex w-full justify-center rounded-xl bg-[#7b421f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}