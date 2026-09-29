import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { categories } from "../../data/products";

export default function CategoryStrip() {
  const navigate = useNavigate();

  const handleCategoryClick = (
    categoryName: string
  ) => {
    // Convert:
    // "Decorative Candles" -> "Decorative"
    // "Gift Candles" -> "Gift"
    // etc.
    const category = categoryName.replace(
      " Candles",
      ""
    );

    navigate(
      `/shop?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <section className="bg-[#fffdf9] px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() =>
              handleCategoryClick(category.name)
            }
            className="group flex h-[105px] w-full items-center overflow-hidden rounded-2xl bg-[#f8ead9] text-left transition hover:-translate-y-1 hover:shadow-md"
          >

            {/* =================================================
                IMAGE
            ================================================== */}

            <div className="h-full w-[115px] shrink-0 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* =================================================
                CONTENT
            ================================================== */}

            <div className="flex flex-1 items-center justify-between px-5">

              <h3 className="max-w-[130px] font-serif text-[18px] leading-tight text-[#492b1d]">
                {category.name}
              </h3>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b68c68] text-[#6e3e20] transition group-hover:bg-[#75411f] group-hover:text-white">
                <ArrowRight size={16} />
              </span>

            </div>

          </button>
        ))}

      </div>
    </section>
  );
}