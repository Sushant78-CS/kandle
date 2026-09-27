import { FaInstagram } from "react-icons/fa";

const instagramImages = [
  "/images/coconut-candle.jpg",
  "/images/butterfly-candles.jpg",
  "/images/flower-candle.jpg",
  "/images/purple-candle.jpg",
];

export default function InstagramSection() {
  return (
    <section className="bg-[#fffdf9] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1450px]">
        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f8ecdc] text-[#75411f]">
            <FaInstagram size={20} />
          </div>

          <h2 className="mt-5 font-serif text-4xl text-[#41271d] sm:text-5xl">
            Follow the glow
          </h2>

          <p className="mt-3 text-sm text-[#766458]">
            See more candles, moments and creations on Instagram.
          </p>

          <p className="mt-2 text-sm font-semibold text-[#75411f]">
            @kanthicandles
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {instagramImages.map((image, index) => (
            <a
              href="#"
              key={image}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={image}
                alt={`Kanthi Candles Instagram ${index + 1}`}
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-[#75411f]/0 transition group-hover:bg-[#75411f]/40">
                <FaInstagram
                  size={25}
                  className="scale-75 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
