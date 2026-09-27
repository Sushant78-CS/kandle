import { Link } from "react-router-dom";

export default function Checkout() {
    return (
        <div className="min-h-screen bg-[#f8ecdc]">
            <div className="mx-auto max-w-4xl px-5 py-16">
                <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                    <h1 className="font-serif text-4xl text-[#3d251b]">
                        Checkout
                    </h1>

                    <p className="mt-3 text-[#78675b]">
                        Checkout page coming next.
                    </p>

                    <Link
                        to="/cart"
                        className="mt-6 inline-flex rounded-full bg-[#7b421f] px-6 py-3 text-sm font-semibold text-white"
                    >
                        Back to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
}