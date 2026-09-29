import { Link } from "react-router-dom";
import {
    ArrowRight,
    Heart,
    Leaf,
    Sparkles,
} from "lucide-react";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function About() {
    return (
        <div className="min-h-screen bg-[#f8ecdc] text-[#3d251b]">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#fffaf4]">
                <div className="mx-auto grid max-w-[1450px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-12 lg:py-24">
                    {/* LEFT */}
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#d8bfa5] bg-[#fdf4e8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#75411f]">
                            <Sparkles size={14} />
                            Our Story
                        </span>

                        <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[1.05] text-[#3d251b] sm:text-6xl lg:text-7xl">
                            Made to bring
                            <span className="block text-[#8a4b29]">
                                warmth home.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-[#78675b] sm:text-lg">
                            Kandle is a handmade candle brand created around a
                            simple idea — beautiful little things can make ordinary
                            moments feel special.
                        </p>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-[#8d7a6b]">
                            From carefully shaped floral candles to decorative
                            pieces made for gifting, every Kandle creation is made
                            with attention to detail and a love for the little
                            moments that make a home feel like home.
                        </p>

                        <Link
                            to="/shop"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#75411f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            Explore Our Candles
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="relative">
                        <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-[#ead5bc]" />
                        <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-[#e3c6a5]" />

                        <div className="relative overflow-hidden rounded-[2rem] bg-[#ead8c2] p-8 sm:p-12">
                            <div className="flex min-h-[380px] items-center justify-center rounded-[1.5rem] bg-[#fffaf4]">
                                <img
                                    src="/kandleLogo.png"
                                    alt="Kandle"
                                    className="w-48 object-contain sm:w-56"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STORY */}
            <section className="bg-[#f8ecdc] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7456]">
                            The Kandle Story
                        </p>

                        <h2 className="mt-3 font-serif text-4xl leading-tight text-[#3d251b] sm:text-5xl">
                            A little light,
                            <br />
                            made with care.
                        </h2>
                    </div>

                    <div className="space-y-5 text-sm leading-7 text-[#78675b] sm:text-base">
                        <p>
                            We believe candles are more than something you light.
                            They can become part of birthdays, celebrations, quiet
                            evenings, thoughtful gifts and everyday moments.
                        </p>

                        <p>
                            That's why Kandle focuses on handmade designs that are
                            as beautiful to look at as they are meaningful to give.
                            Every shape, texture and detail is chosen to create
                            something that feels personal.
                        </p>

                        <p>
                            Whether you're decorating your space or looking for a
                            small gift for someone special, Kandle is here to add a
                            little warmth to the moment.
                        </p>
                    </div>
                </div>
            </section>

            {/* VALUES */}
            <section className="bg-[#fffaf4] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div className="mx-auto max-w-[1200px]">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7456]">
                            What We Believe
                        </p>

                        <h2 className="mt-3 font-serif text-4xl text-[#3d251b] sm:text-5xl">
                            Made with intention
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-[#78675b] sm:text-base">
                            Every Kandle piece is inspired by simplicity, creativity
                            and the joy of giving something handmade.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {/* VALUE 1 */}
                        <div className="rounded-3xl bg-[#f8ecdc] p-7 sm:p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fffaf4] text-[#75411f]">
                                <Heart size={21} />
                            </div>

                            <h3 className="mt-6 font-serif text-2xl text-[#43281d]">
                                Made with Love
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#78675b]">
                                We put care into the small details because handmade
                                products should feel personal.
                            </p>
                        </div>

                        {/* VALUE 2 */}
                        <div className="rounded-3xl bg-[#f8ecdc] p-7 sm:p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fffaf4] text-[#75411f]">
                                <Leaf size={21} />
                            </div>

                            <h3 className="mt-6 font-serif text-2xl text-[#43281d]">
                                Thoughtful Design
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#78675b]">
                                From floral shapes to decorative pieces, our designs
                                are created to look beautiful in your space.
                            </p>
                        </div>

                        {/* VALUE 3 */}
                        <div className="rounded-3xl bg-[#f8ecdc] p-7 sm:p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fffaf4] text-[#75411f]">
                                <Sparkles size={21} />
                            </div>

                            <h3 className="mt-6 font-serif text-2xl text-[#43281d]">
                                Little Moments
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#78675b]">
                                Our candles are made to become part of celebrations,
                                gifts and quiet everyday moments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="bg-[#f8ecdc] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7456]">
                                Our Approach
                            </p>

                            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#3d251b] sm:text-5xl">
                                From an idea
                                <br />
                                to your home.
                            </h2>

                            <p className="mt-5 max-w-md text-sm leading-6 text-[#78675b]">
                                We keep the process simple and thoughtful, focusing
                                on creating candles that feel special from the moment
                                you discover them.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* STEP 1 */}
                            <div className="flex gap-5 rounded-3xl bg-[#fffaf4] p-6">
                                <span className="font-serif text-3xl text-[#b68c68]">
                                    01
                                </span>

                                <div>
                                    <h3 className="font-serif text-xl text-[#43281d]">
                                        Inspired
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-[#78675b]">
                                        We start with ideas inspired by flowers, nature,
                                        celebrations and everyday beauty.
                                    </p>
                                </div>
                            </div>

                            {/* STEP 2 */}
                            <div className="flex gap-5 rounded-3xl bg-[#fffaf4] p-6">
                                <span className="font-serif text-3xl text-[#b68c68]">
                                    02
                                </span>

                                <div>
                                    <h3 className="font-serif text-xl text-[#43281d]">
                                        Handcrafted
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-[#78675b]">
                                        Each candle is carefully shaped and finished with
                                        attention to its details.
                                    </p>
                                </div>
                            </div>

                            {/* STEP 3 */}
                            <div className="flex gap-5 rounded-3xl bg-[#fffaf4] p-6">
                                <span className="font-serif text-3xl text-[#b68c68]">
                                    03
                                </span>

                                <div>
                                    <h3 className="font-serif text-xl text-[#43281d]">
                                        Delivered
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-[#78675b]">
                                        Your Kandle is carefully prepared and ready to
                                        become part of your next special moment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#75411f] px-5 py-16 text-center sm:px-8 sm:py-20">
                <div className="mx-auto max-w-2xl">
                    <Sparkles
                        size={24}
                        className="mx-auto text-[#f3d6b8]"
                    />

                    <h2 className="mt-5 font-serif text-4xl text-white sm:text-5xl">
                        Find a little light
                        <br />
                        for your space.
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-[#ead8c7] sm:text-base">
                        Explore our handmade candles and find something made for
                        your next moment.
                    </p>

                    <Link
                        to="/shop"
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#fffaf4] px-7 py-3.5 text-sm font-semibold text-[#75411f] transition hover:bg-[#f8ecdc]"
                    >
                        Shop Kandle
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}