import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

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
              <Link to={"/"} className="hover:text-white">
                Home
              </Link>

              <Link to={"/shop"} className="hover:text-white">
                Shop
              </Link>

              <Link to={"/about"} className="hover:text-white">
                About
              </Link>

              <Link to={"/contact"} className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold">Connect</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/kanthicandles?stkn=MXNyb2xnMmpwdGViNg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <FaInstagram size={16} />
                @kanthicandles
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <FaWhatsapp size={16} />
                WhatsApp
              </a>

              {/* Gmail */}
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
          © {new Date().getFullYear()} Kandle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
