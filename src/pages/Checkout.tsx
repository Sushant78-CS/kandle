import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";

import { useCartStore } from "../store/cartStore";
import { openWhatsAppOrder } from "../services/whatsapp";

export default function Checkout() {
    const navigate = useNavigate();

    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (items.length === 0) {
            return;
        }

        openWhatsAppOrder({
            customerName: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            note: note.trim(),
            items: items.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            total,
        });

        // Clear cart after sending the order to WhatsApp
        clearCart();

        // Go back to shop after opening WhatsApp
        navigate("/shop");
    };

    // Empty cart
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#f8ecdc]">
                <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-5 py-16">
                    <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8ecdc]">
                            <ShoppingBag
                                size={28}
                                className="text-[#75411f]"
                            />
                        </div>

                        <h1 className="mt-6 font-serif text-3xl text-[#3d251b]">
                            Your cart is empty
                        </h1>

                        <p className="mt-3 text-sm text-[#78675b]">
                            Add some beautiful Kandle products before checking out.
                        </p>

                        <Link
                            to="/shop"
                            className="mt-7 inline-flex rounded-full bg-[#7b421f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8ecdc]">
            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
                {/* BACK */}
                <Link
                    to="/cart"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#75411f] transition hover:text-[#4f2d1a]"
                >
                    <ArrowLeft size={17} />
                    Back to Cart
                </Link>

                {/* HEADER */}
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7456]">
                        Kandle
                    </p>

                    <h1 className="mt-2 font-serif text-4xl text-[#3d251b] sm:text-5xl">
                        Checkout
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#78675b]">
                        Enter your details below. Your order will be prepared as a
                        WhatsApp message for confirmation.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-6 lg:grid-cols-[1fr_380px]"
                >
                    {/* CUSTOMER DETAILS */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="font-serif text-2xl text-[#3d251b]">
                            Customer Details
                        </h2>

                        <div className="mt-6 space-y-5">
                            {/* NAME */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full rounded-2xl border border-[#dfcdbb] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none transition placeholder:text-[#a8988b] focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                                />
                            </div>

                            {/* PHONE */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Phone Number
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    placeholder="Enter your phone number"
                                    required
                                    className="w-full rounded-2xl border border-[#dfcdbb] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none transition placeholder:text-[#a8988b] focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                                />
                            </div>

                            {/* ADDRESS */}
                            <div>
                                <label
                                    htmlFor="address"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Delivery Address
                                </label>

                                <textarea
                                    id="address"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    placeholder="Enter your complete delivery address"
                                    required
                                    rows={4}
                                    className="w-full resize-none rounded-2xl border border-[#dfcdbb] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none transition placeholder:text-[#a8988b] focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                                />
                            </div>

                            {/* NOTE */}
                            <div>
                                <label
                                    htmlFor="note"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Order Note
                                    <span className="ml-1 font-normal text-[#9a8a7e]">
                                        (Optional)
                                    </span>
                                </label>

                                <textarea
                                    id="note"
                                    value={note}
                                    onChange={(event) => setNote(event.target.value)}
                                    placeholder="Any special instructions?"
                                    rows={3}
                                    className="w-full resize-none rounded-2xl border border-[#dfcdbb] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none transition placeholder:text-[#a8988b] focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="h-fit rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-6">
                        <h2 className="font-serif text-2xl text-[#3d251b]">
                            Order Summary
                        </h2>

                        {/* ITEMS */}
                        <div className="mt-6 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3"
                                >
                                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f8ecdc]">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-[#43281d]">
                                            {item.name}
                                        </p>

                                        <p className="mt-1 text-xs text-[#8b7a6d]">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="whitespace-nowrap text-sm font-semibold text-[#75411f]">
                                        ₹{item.price * item.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL */}
                        <div className="my-6 border-t border-[#eadbcb]" />

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#78675b]">
                                Total
                            </span>

                            <span className="font-serif text-2xl font-semibold text-[#3d251b]">
                                ₹{total}
                            </span>
                        </div>

                        {/* WHATSAPP BUTTON */}
                        <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#75411f] py-4 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            <MessageCircle size={18} />
                            Order on WhatsApp
                        </button>

                        <p className="mt-4 text-center text-xs leading-5 text-[#918276]">
                            Clicking this button will open WhatsApp with your order
                            details ready to send.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}