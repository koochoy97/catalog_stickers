import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
export function Home_categories() {
  const [active_category, set_active_category] = useState("");
  const location = useLocation();
  const [active_background, set_active_background] = useState("");

  useEffect(() => {
    const url = window.location.href;
    const category = url.split("/").pop();
    set_active_category(category);
  }, [location]);

  return (
    <div className="categories_container flex w-full justify-start items-center gap-2 mt-4 overflow-x-auto pr-4">
      <Link
        to={`/category/${"Stickers Personalizados"}`}
        className={`text-xs px-3 py-3 rounded-full text-white white space-nowrap flex-shrink-0
        ${
          active_category === "Stickers%20Personalizados"
            ? "bg-[#BAB09C] text-black font-semibold"
            : "bg-black"
        }  `}
      >
        Stickers personalizados
      </Link>
      <Link
        to={`/category/${"Stickers de Bicicletas"}`}
        className={`text-xs px-3 py-3 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0
                  ${
                    active_category === "Stickers%20de%20Bicicletas"
                      ? "bg-[#BAB09C] text-black font-semibold"
                      : "bg-black"
                  }  `}
      >
        Stickers de Bicicletas
      </Link>
      <Link
        to={`/category/${"Stickers Random"}`}
        className={`text-xs px-3 py-3 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0
                  ${
                    active_category === "Stickers%20Random"
                      ? "bg-[#BAB09C] text-black font-semibold"
                      : "bg-black"
                  }  `}
      >
        Stickers Random
      </Link>
    </div>
  );
}
