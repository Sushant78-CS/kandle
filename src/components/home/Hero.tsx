import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/images/hero/hero-coconut.jpg",
    title: "Light up your",
    highlight: "little moments.",
    description:
      "Beautiful handcrafted candles made to bring warmth, charm and a little happiness into every moment.",
  },
  {
    image: "/images/hero/hero-butterfly.jpg",
    title: "Make every moment",
    highlight: "a little sweeter.",
    description:
      "Delicate handmade candles crafted to add beauty, warmth and a special touch to your space.",
  },
  {
    image: "/images/hero/hero-flower.jpg",
    title: "Bring a little",
    highlight: "bloom home.",
    description:
      "Beautiful floral candles handmade with care for gifting, decorating and celebrating little moments.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* =====================================================
     NEXT SLIDE
  ====================================================== */

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /* =====================================================
     PREVIOUS SLIDE
  ====================================================== */

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  /* =====================================================
     AUTOMATIC SLIDER
     Changes every 5 seconds
  ====================================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        bg-[#f8ecdc]
      "
    >
      {/* =====================================================
          DESKTOP / LARGE SCREEN HERO
      ====================================================== */}

      <div
        className="
          relative
          hidden
          min-h-[480px]
          lg:block
          xl:min-h-[500px]
        "
      >
        {/* =================================================
            DESKTOP BACKGROUND IMAGES
        ================================================== */}

        {slides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt="Kanthi handmade candle"
            className={`
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
              transition-all
              duration-1000
              ease-in-out
              ${currentSlide === index
                ? "scale-100 opacity-100"
                : "scale-[1.03] opacity-0"
              }
            `}
          />
        ))}

        {/* =================================================
            DESKTOP SOFT OVERLAY

            Kept intentionally light so the product remains
            clearly visible.
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#f8ecdc]/65
            via-[#f8ecdc]/25
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#6f4225]/5
            via-transparent
            to-transparent
          "
        />

        {/* =================================================
            DECORATIVE CURVES
        ================================================== */}

        <div className="pointer-events-none absolute left-0 top-0 z-10 opacity-20">
          <div
            className="
              h-40
              w-40
              rounded-br-[100%]
              border-b-2
              border-r-2
              border-[#8a765e]
            "
          />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 opacity-15">
          <div
            className="
              h-48
              w-48
              rounded-tr-[100%]
              border-r-2
              border-t-2
              border-[#8a765e]
            "
          />
        </div>

        {/* =================================================
            DESKTOP CONTENT
        ================================================== */}

        <div
          className="
            relative
            z-20
            mx-auto
            flex
            min-h-[480px]
            max-w-[1650px]
            items-center
            px-8
            xl:min-h-[500px]
            xl:px-16
            2xl:px-20
          "
        >
          <div className="max-w-[650px]">
            {/* Badge */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#d7b58f]
                bg-[#fff9f1]/50
                px-4
                py-2
                backdrop-blur-[2px]
              "
            >
              <Sparkles size={14} className="text-[#9b622f]" />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#75411f]
                "
              >
                Handcrafted with love
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
                font-serif
                text-[52px]
                font-medium
                leading-[0.94]
                tracking-[-0.04em]
                text-[#3d251b]
                xl:text-[64px]
                2xl:text-[68px]
              "
            >
              {slide.title}

              <span className="mt-2 block text-[#824725]">
                {slide.highlight}
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-[580px]
                text-[15px]
                leading-6
                text-[#67564b]
                xl:text-[16px]
                xl:leading-7
              "
            >
              {slide.description}
            </p>

            {/* Buttons */}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={"/shop"}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#7b421f]
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-[#7b421f]/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#633419]
                "
              >
                Explore Candles
                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <a
                href="#about"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#cbb49d]
                  bg-white/35
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-[#704021]
                  backdrop-blur-[2px]
                  transition-all
                  duration-300
                  hover:bg-white/55
                "
              >
                Our Story
              </a>
            </div>

            {/* Trust points */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-x-6
                gap-y-3
                border-t
                border-[#ddcbb7]/70
                pt-4
              "
            >
              <div className="flex items-center gap-2">
                <Sparkles size={17} className="text-[#9c6332]" />

                <span className="text-xs font-medium text-[#68594e]">
                  Handmade
                </span>
              </div>

              <div className="h-5 w-px bg-[#d9c6b1]" />

              <div className="flex items-center gap-2">
                <Heart size={17} className="text-[#75411f]" />

                <span className="text-xs font-medium text-[#68594e]">
                  Made with love
                </span>
              </div>

              <div className="h-5 w-px bg-[#d9c6b1]" />

              <div className="flex items-center gap-2">
                <Truck size={17} className="text-[#6f7445]" />

                <span className="text-xs font-medium text-[#68594e]">
                  Easy ordering
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            HANDWRITTEN MESSAGE
        ================================================== */}

        <div
          className="
            absolute
            right-[5%]
            top-1/2
            z-20
            hidden
            -translate-y-1/2
            text-center
            text-[#49291b]
            xl:block
            2xl:right-[8%]
          "
        >
          <p
            className="
              font-serif
              text-[26px]
              italic
              leading-[1.2]
              drop-shadow-sm
            "
          >
            Handmade
            <br />
            Candles
            <br />
            <span className="text-[21px]">
              for a glowing
              <br />
              tomorrow
            </span>
          </p>

          <div className="mt-2 text-3xl">♡</div>
        </div>

        {/* =================================================
            DESKTOP LEFT ARROW
        ================================================== */}

        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="
            absolute
            left-7
            top-1/2
            z-30
            flex
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/60
            bg-[#75411f]/55
            text-white
            shadow-lg
            backdrop-blur-sm
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#75411f]/80
          "
        >
          <ChevronLeft size={21} />
        </button>

        {/* =================================================
            DESKTOP RIGHT ARROW
        ================================================== */}

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute
            right-7
            top-1/2
            z-30
            flex
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/60
            bg-[#75411f]/55
            text-white
            shadow-lg
            backdrop-blur-sm
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#75411f]/80
          "
        >
          <ChevronRight size={21} />
        </button>

        {/* =================================================
            DESKTOP DOTS
        ================================================== */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-3
          "
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                rounded-full
                border
                border-white
                transition-all
                duration-300
                ${currentSlide === index
                  ? "h-2.5 w-7 bg-[#7b421f]"
                  : "h-2.5 w-2.5 bg-transparent hover:bg-white/70"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          MOBILE HERO

          IMPORTANT:
          Instead of forcing the landscape image to fill the
          entire narrow phone screen, we give the image its
          own area.

          This prevents the candle from being badly cropped.
      ====================================================== */}

      <div className="relative block lg:hidden">
        {/* =================================================
            MOBILE IMAGE AREA
        ================================================== */}

        <div
          className="
            relative
            h-[245px]
            w-full
            overflow-hidden
            sm:h-[300px]
          "
        >
          {/* Mobile image */}

          {slides.map((item, index) => (
            <img
              key={item.image}
              src={item.image}
              alt="Kanthi handmade candle"
              className={`
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-[70%_center]
                transition-all
                duration-1000
                ease-in-out
                ${currentSlide === index
                  ? "scale-100 opacity-100"
                  : "scale-[1.03] opacity-0"
                }
              `}
            />
          ))}

          {/* =================================================
              MOBILE IMAGE OVERLAY

              Very subtle. The product stays visible.
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#3d251b]/20
              via-transparent
              to-transparent
            "
          />

          {/* =================================================
              MOBILE LEFT ARROW
          ================================================== */}

          <button
            onClick={previousSlide}
            aria-label="Previous slide"
            className="
              absolute
              left-3
              top-1/2
              z-20
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/60
              bg-[#75411f]/60
              text-white
              shadow-lg
              backdrop-blur-sm
            "
          >
            <ChevronLeft size={19} />
          </button>

          {/* =================================================
              MOBILE RIGHT ARROW
          ================================================== */}

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              absolute
              right-3
              top-1/2
              z-20
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/60
              bg-[#75411f]/60
              text-white
              shadow-lg
              backdrop-blur-sm
            "
          >
            <ChevronRight size={19} />
          </button>

          {/* =================================================
              MOBILE DOTS
          ================================================== */}

          <div
            className="
              absolute
              bottom-3
              left-1/2
              z-20
              flex
              -translate-x-1/2
              items-center
              gap-2.5
            "
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  rounded-full
                  border
                  border-white
                  transition-all
                  duration-300
                  ${currentSlide === index
                    ? "h-2 w-6 bg-[#7b421f]"
                    : "h-2 w-2 bg-transparent"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* =================================================
            MOBILE CONTENT
        ================================================== */}

        <div
          className="
            relative
            bg-[#f8ecdc]
            px-5
            py-8
            sm:px-8
            sm:py-10
          "
        >
          {/* Decorative curve */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-24
              w-24
              rounded-br-[100%]
              border-b
              border-r
              border-[#8a765e]/20
            "
          />

          {/* =================================================
              BADGE
          ================================================== */}

          <div
            className="
              relative
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#d7b58f]
              bg-[#fff9f1]
              px-3.5
              py-1.5
            "
          >
            <Sparkles size={13} className="text-[#9b622f]" />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.17em]
                text-[#75411f]
              "
            >
              Handcrafted with love
            </span>
          </div>

          {/* =================================================
              MOBILE HEADING
          ================================================== */}

          <h1
            className="
              relative
              font-serif
              text-[39px]
              font-medium
              leading-[0.96]
              tracking-[-0.035em]
              text-[#3d251b]
              sm:text-[48px]
            "
          >
            {slide.title}

            <span className="mt-1.5 block text-[#824725]">
              {slide.highlight}
            </span>
          </h1>

          {/* =================================================
              MOBILE DESCRIPTION
          ================================================== */}

          <p
            className="
              mt-4
              max-w-[520px]
              text-[13px]
              leading-5
              text-[#67564b]
              sm:text-[15px]
              sm:leading-6
            "
          >
            {slide.description}
          </p>

          {/* =================================================
              MOBILE BUTTONS
          ================================================== */}

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              to={"/shop"}
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#7b421f]
                px-5
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-md
                shadow-[#7b421f]/20
                transition
                hover:bg-[#633419]
              "
            >
              Explore Candles
              <ArrowRight
                size={15}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>

            <a
              href="#about"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-[#cbb49d]
                bg-white/40
                px-5
                py-2.5
                text-xs
                font-semibold
                text-[#704021]
              "
            >
              Our Story
            </a>
          </div>

          {/* =================================================
              MOBILE TRUST POINTS
          ================================================== */}

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-x-4
              gap-y-2.5
              border-t
              border-[#ddcbb7]
              pt-4
            "
          >
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#9c6332]" />

              <span className="text-[10px] font-medium text-[#68594e]">
                Handmade
              </span>
            </div>

            <div className="h-4 w-px bg-[#d9c6b1]" />

            <div className="flex items-center gap-1.5">
              <Heart size={14} className="text-[#75411f]" />

              <span className="text-[10px] font-medium text-[#68594e]">
                Made with love
              </span>
            </div>

            <div className="h-4 w-px bg-[#d9c6b1]" />

            <div className="flex items-center gap-1.5">
              <Truck size={14} className="text-[#6f7445]" />

              <span className="text-[10px] font-medium text-[#68594e]">
                Easy ordering
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
