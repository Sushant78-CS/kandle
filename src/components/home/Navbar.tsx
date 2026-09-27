import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Shop",
      path: "/shop",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfd2] bg-[#fffdf9]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1450px] items-center justify-between px-5 sm:px-8 lg:h-[84px] lg:px-12">
        {/* =================================================
            LOGO
        ================================================== */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex h-full items-center"
        >
          <img
            src="/logo.jpg"
            alt="Kanthi Candles"
            className="h-[68px] w-auto object-contain sm:h-[72px] lg:h-[76px]"
          />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}
        <nav className="hidden items-center gap-10 md:flex lg:gap-12">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative py-2 text-[15px] transition lg:text-[16px] ${active
                  ? "font-semibold text-[#67391f]"
                  : "text-[#54483f] hover:text-[#67391f]"
                  }`}
              >
                {item.label}

                {active && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-[#67391f]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* =================================================
            DESKTOP ACTIONS
        ================================================== */}
        <div className="hidden items-center gap-5 md:flex lg:gap-6">
          <button
            aria-label="Search"
            className="text-[#4d3021] transition hover:scale-110"
          >
            <Search size={24} strokeWidth={1.7} />
          </button>

          <button
            aria-label="Wishlist"
            className="text-[#4d3021] transition hover:scale-110"
          >
            <Heart size={24} strokeWidth={1.7} />
          </button>
          {/* 
          <button

            aria-label="Shopping cart"
            className="relative text-[#4d3021] transition hover:scale-110"
          >
            <ShoppingBag size={25} strokeWidth={1.7} />

            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8a4b29] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </button> */}
          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative text-[#4d3021] transition hover:scale-110"
          >
            <ShoppingBag
              size={26}
              strokeWidth={1.7}
            />

            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8a4b29] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </Link>
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================== */}
        <button
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5d8ca] bg-[#fffaf4] text-[#67391f] transition hover:bg-[#f8eee3] md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      {mobileMenuOpen && (
        <div className="border-t border-[#eadfd2] bg-[#fffdf9] shadow-lg md:hidden">
          <nav className="px-5 py-3">
            {navItems.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block border-b border-[#eee4d9] py-4 text-sm transition ${active
                    ? "font-semibold text-[#75411f]"
                    : "font-medium text-[#54483f]"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>

                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#75411f]" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile actions */}
          <div className="grid grid-cols-3 border-t border-[#eadfd2] px-5 py-5">
            <button className="flex flex-col items-center gap-1.5 text-[#67391f]">
              <Search size={19} strokeWidth={1.7} />
              <span className="text-[11px]">Search</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 text-[#67391f]">
              <Heart size={19} strokeWidth={1.7} />
              <span className="text-[11px]">Wishlist</span>
            </button>

            <Link
              to={"/cart"}
              onClick={() =>
                setMobileMenuOpen(false)
              } className="relative flex flex-col items-center gap-1.5 text-[#67391f]">
              <ShoppingBag size={19} strokeWidth={1.7} />

              {cartCount > 0 && (
                <span className="absolute right-[calc(50%-17px)] top-[-5px] flex h-4 min-w-4 items-center justify-center rounded-full bg-[#8a4b29] px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}

              <span className="text-[11px]">Cart</span>
            </Link>
            {/* <Link
              to="/cart"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="flex items-center gap-2 text-sm text-[#67391f]"
            >
              <ShoppingBag size={19} />
              Cart
            </Link> */}
          </div>
        </div>
      )}
    </header>
  );
}
