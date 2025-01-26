import { useEffect, useContext, useState } from "react";
import { Header } from "./Components/Header";
import { useParams, useLocation } from "react-router";
import { DataContext } from "./Context/DataContext";
import "react-loading-skeleton/dist/skeleton.css";
import { Promo_card } from "./Components/Promo_card";
import { BreadCrump } from "./Components/BreadCrump";
import { Como_pedir_component } from "./Components/Como_pedir_component";
import { Footer } from "./Components/Footer";

export function ProductPage() {
  const {
    get_pocket_base_stickers_products,
    stickers_products,
    get_pocketbase_support_items,
    stickers_variations,
    loading_stickers_variations,
  } = useContext(DataContext);

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const { productId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (stickers_products.length > 0) {
      const product = stickers_products.find(
        (sticker) => sticker.id === productId
      );
      if (product) setItem([product]);
      setLoading(false);
    } else {
      get_pocket_base_stickers_products("id", productId);
    }
  }, [productId, stickers_products, get_pocket_base_stickers_products]);

  useEffect(() => {
    window.scrollTo(0, 0);
    get_pocketbase_support_items("kit_variations");
  }, [get_pocketbase_support_items]);

  const formatDescription = (description) => {
    const lines = description?.split("\n") || [];
    return {
      title: lines[0] || "",
      list: lines.slice(1).filter((line) => line.trim() !== ""), // Filtrar líneas vacías
    };
  };

  const descriptionData = formatDescription(item?.[0]?.short_description);

  return (
    <div
      className="flex w-full flex-col justify-start items-center bg-slate-100 pb-40"
      key={location.pathname}
    >
      <Header />

      <div className="main flex flex-col justify-start items-start w-full md:flex-row md:justify-center md:gap-8 md:mt-8 ">
        {loading ? (
          <div className="flex w-full flex-col gap-4 md:flex-row md-justify-center">
            <div className="skeleton w-full aspect-square md:w-[700px]"></div>
            <div className="div md:w-[600px] flex flex-col gap-3 justify-center">
              <div className="skeleton h-4 w-28 md:w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
        ) : (
          <>
            <img
              src={`https://mtb.pockethost.io/api/files/sticker_products/${item?.[0]?.id}/${item?.[0]?.principal_image}`}
              alt={item?.[0]?.nombre}
              className="w-full aspect-square md:w-[700px] object-contain"
            />
            <div className="summary_item text-left w-full mt-6 px-5 md:max-w-[600px]">
              <BreadCrump
                category={item?.[0]?.category_name}
                name={item?.[0]?.nombre}
              />

              <h1 className="text-2xl font-semibold">{item?.[0]?.nombre}</h1>
              <div className="desktop_pricing_container mt-2">
                <p className="text-sm">Precio</p>
                <p className="text-2xl font-semibold">
                  {"S/" + item?.[0]?.min_price + ".00"}
                </p>
              </div>
              <div className="kits_container mt-2">
                <div className="text-lg font-normal flex justify-between items-center">
                  <p>Kits Disponibles</p>
                  <p className="text-sm font-semibold text-[#FF596F] cursor-pointer">
                    Ver guía de medidas
                  </p>
                </div>
                <div className="kits_grid flex gap-4 w-full mt-1">
                  {item?.[0]?.kit_variations?.length > 0 &&
                  stickers_variations.length > 0
                    ? // Renderizar los botones si hay datos disponibles
                      item[0].kit_variations.map((kit) => {
                        const variation = stickers_variations.find(
                          (variation) => variation.id === kit
                        );
                        return (
                          <button
                            key={kit}
                            className="text-md px-6 py-2 rounded-md border-2 font-semibold whitespace-nowrap hover:bg-[#ECEDE4]"
                          >
                            {variation?.nombre}
                          </button>
                        );
                      })
                    : // Mostrar Skeleton Loader mientras se cargan los datos
                      Array(3)
                        .fill(null)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="w-24 h-10 bg-gray-300 animate-pulse rounded-md"
                          ></div>
                        ))}
                </div>
              </div>
              <Promo_card message="¡Llévate 2 Stickers Random GRATIS con cualquier Kit Personalizado o de Bicicletas!" />
              <button className="px-8 py-2 rounded-full text-lg bg-black text-white hidden md:block mt-4 w-full">
                Comprar
              </button>
              <div className="divider"></div>

              <div className="description_container mt-1">
                <p className="text-xl font-medium">
                  Características del producto
                </p>
                <p>{descriptionData.title}</p>
                {descriptionData.list.length > 0 && ( // Renderiza la lista solo si hay contenido
                  <ul className="list-disc ml-6 mt-2">
                    {descriptionData.list.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                )}
                <div className="divider"></div>
                <Como_pedir_component />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
