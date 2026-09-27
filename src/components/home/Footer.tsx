import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#34251f] px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <img
              src="/logo.jpg"
              alt="Kanthi Candles"
              className="h-20 w-auto rounded-xl object-contain"
            />

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              Handcrafted candles made to bring warmth, beauty and happiness
              into your little moments.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <a href="#home" className="hover:text-white">
                Home
              </a>

              <a href="#shop" className="hover:text-white">
                Shop
              </a>

              <a href="#about" className="hover:text-white">
                About
              </a>

              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold">Connect</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <a href="#" className="flex items-center gap-2 hover:text-white">
                <FaInstagram size={16} />
                @kanthicandles
              </a>

              <a href="#" className="flex items-center gap-2 hover:text-white">
                <FaWhatsapp size={16} />
                WhatsApp
              </a>

              <a
                href="mailto:kanthi.co.0101@gmail.com"
                className="break-all hover:text-white"
              >
                kanthi.co.0101@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Kanthi Candles. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
