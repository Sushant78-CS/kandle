import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Clock3,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
} from "lucide-react";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const whatsappNumber = "919876543210";

        const whatsappMessage = `🕯️ *Kandle Contact Message*

*Name:* ${name.trim()}
*Email:* ${email.trim()}

*Message:*
${message.trim()}`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
        )}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div className="min-h-screen bg-[#f8ecdc] text-[#3d251b]">
            <Navbar />

            {/* HERO */}
            <section className="bg-[#fffaf4] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div className="mx-auto max-w-[1200px] text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#d8bfa5] bg-[#fdf4e8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#75411f]">
                        <MessageCircle size={14} />
                        We'd Love to Hear From You
                    </span>

                    <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[1.05] text-[#3d251b] sm:text-6xl">
                        Let's talk about
                        <span className="block text-[#8a4b29]">
                            something beautiful.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#78675b] sm:text-base">
                        Have a question about our candles, an order, gifting,
                        or anything else? Send us a message and we'll be happy
                        to hear from you.
                    </p>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* CONTACT INFO */}
                    <div className="rounded-3xl bg-[#75411f] p-7 text-white sm:p-9">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8cdb1]">
                            Contact Kandle
                        </p>

                        <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                            We're here to help.
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-[#ead8c7]">
                            Whether you're looking for the perfect candle or need
                            help with an order, feel free to reach out.
                        </p>

                        <div className="mt-9 space-y-6">
                            {/* PHONE */}
                            <a
                                href="tel:+919876543210"
                                className="flex items-start gap-4 transition hover:opacity-80"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                                    <Phone size={19} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#dcbfa1]">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        +91 98765 43210
                                    </p>
                                </div>
                            </a>

                            {/* EMAIL */}
                            <a
                                href="mailto:hello@kandle.in"
                                className="flex items-start gap-4 transition hover:opacity-80"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                                    <Mail size={19} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#dcbfa1]">
                                        Email
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        hello@kandle.in
                                    </p>
                                </div>
                            </a>

                            {/* LOCATION */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                                    <MapPin size={19} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#dcbfa1]">
                                        Location
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        Mumbai, Maharashtra
                                    </p>
                                </div>
                            </div>

                            {/* HOURS */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                                    <Clock3 size={19} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#dcbfa1]">
                                        Response Hours
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        Mon – Sat · 10 AM – 7 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-white/15 pt-7">
                            <p className="text-sm leading-6 text-[#ead8c7]">
                                For faster order-related assistance, you can also
                                message us directly on WhatsApp.
                            </p>

                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#75411f] transition hover:bg-[#f8ecdc]"
                            >
                                <MessageCircle size={17} />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* CONTACT FORM */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-9">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7456]">
                            Send a Message
                        </p>

                        <h2 className="mt-2 font-serif text-3xl text-[#3d251b] sm:text-4xl">
                            How can we help?
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-7 space-y-5"
                        >
                            {/* NAME */}
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Your Name
                                </label>

                                <input
                                    id="contact-name"
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder="Enter your name"
                                    required
                                    className="w-full rounded-2xl border border-[#dfcdbb] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none transition placeholder:text-[#a8988b] focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="contact-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-2xl border border-[#dfcdbb] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none transition placeholder:text-[#a8988b] focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                                />
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="contact-message"
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    placeholder="Tell us how we can help..."
                                    required
                                    rows={6}
                                    className="w-full resize-none rounded-2xl border border-[#dfcdbb] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none transition placeholder:text-[#a8988b] focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                                />
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#75411f] py-4 text-sm font-semibold text-white transition hover:bg-[#633419]"
                            >
                                <Send size={17} />
                                Send via WhatsApp
                            </button>

                            <p className="text-center text-xs leading-5 text-[#918276]">
                                Your message will open in WhatsApp so you can send it
                                directly to Kandle.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ / QUICK HELP */}
            <section className="bg-[#fffaf4] px-5 py-16 sm:px-8 sm:py-20">
                <div className="mx-auto max-w-[1000px] text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7456]">
                        Need Something Else?
                    </p>

                    <h2 className="mt-3 font-serif text-4xl text-[#3d251b]">
                        We might already have the answer.
                    </h2>

                    <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
                        <Link
                            to="/shop"
                            className="group rounded-3xl bg-[#f8ecdc] p-6 transition hover:-translate-y-1 hover:shadow-sm"
                        >
                            <h3 className="font-serif text-xl text-[#43281d]">
                                Browse Candles
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#78675b]">
                                Explore our handmade collection.
                            </p>

                            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#75411f]">
                                Shop now
                                <ArrowLeft
                                    size={14}
                                    className="rotate-180 transition group-hover:translate-x-1"
                                />
                            </span>
                        </Link>

                        <Link
                            to="/about"
                            className="group rounded-3xl bg-[#f8ecdc] p-6 transition hover:-translate-y-1 hover:shadow-sm"
                        >
                            <h3 className="font-serif text-xl text-[#43281d]">
                                Our Story
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#78675b]">
                                Learn more about Kandle and what we create.
                            </p>

                            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#75411f]">
                                About Kandle
                                <ArrowLeft
                                    size={14}
                                    className="rotate-180 transition group-hover:translate-x-1"
                                />
                            </span>
                        </Link>

                        <Link
                            to="/cart"
                            className="group rounded-3xl bg-[#f8ecdc] p-6 transition hover:-translate-y-1 hover:shadow-sm"
                        >
                            <h3 className="font-serif text-xl text-[#43281d]">
                                Your Order
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#78675b]">
                                Check your cart and continue to checkout.
                            </p>

                            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#75411f]">
                                View cart
                                <ArrowLeft
                                    size={14}
                                    className="rotate-180 transition group-hover:translate-x-1"
                                />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}