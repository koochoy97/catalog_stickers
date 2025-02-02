import { useEffect, useContext, useState } from "react";
import { Header } from "./Components/Header";
import { useParams, useLocation } from "react-router";
import { DataContext } from "./Context/DataContext";
import "react-loading-skeleton/dist/skeleton.css";
import { Promo_card } from "./Components/Promo_card";
import { BreadCrump } from "./Components/BreadCrump";
import { Como_pedir_component } from "./Components/Como_pedir_component";
import { Guia_medidas } from "./Components/Guia_medidas_modal";
import ReactGA from "react-ga4";
import { Sticker_user_info_modal } from "./Components/Sticker_user_info_modal";

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

  // Estados para el kit seleccionado y su precio
  const [kit_selected, set_kit_selected] = useState();
  const [price, setPrice] = useState(0);

  // Función para encontrar el ID del kit con el precio más bajo
  const findLowestPriceKit = (variations, item) => {
    if (!variations || variations.length === 0 || !item?.[0]?.kit_variations)
      return null;

    // Filtrar las variaciones cuyo ID está en item?.[0]?.kit_variations
    const filteredVariations = variations.filter((variation) =>
      item[0].kit_variations.includes(variation.id)
    );

    if (filteredVariations.length === 0) return null; // Si no hay coincidencias

    // Encontrar la variación con el precio más bajo
    const lowestPriceKit = filteredVariations.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    );

    return lowestPriceKit;
  };

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

  // Inicializar el kit seleccionado con el menor precio y actualizar el precio
  useEffect(() => {
    if (stickers_variations.length > 0 && item.length > 0) {
      const lowestPriceKit = findLowestPriceKit(stickers_variations, item);
      set_kit_selected(lowestPriceKit?.id);
      setPrice(lowestPriceKit?.price);
    }
  }, [stickers_variations, item]);

  // Actualizar el precio dinámicamente según el kit seleccionado
  useEffect(() => {
    const selectedKit = stickers_variations.find(
      (kit) => kit.id === kit_selected
    );
    if (selectedKit) {
      setPrice(selectedKit.price);
    }
  }, [kit_selected, stickers_variations]);

  useEffect(() => {
    if (item?.[0]?.nombre) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
        title: `Product: ${item[0].nombre}`, // Solo se ejecuta si el nombre está disponible
      });
    }
  }, [location.pathname, item]);

  const handleBuyClick = (name, variation) => {
    ReactGA.event({
      category: "Botón Comprar", // Categoría del evento
      action: "Click en Comprar", // Acción que se realiza
      label: `${name} - ${variation}`, // Nombre del producto
    });
  };

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
              <div className=" md:hidden mb-4">
                <Promo_card message="Todo verano 2025: ¡Llévate 2 Stickers Random GRATIS con cualquier Kit Personalizado o de Bicicletas!" />
              </div>
              <div className="desktop_pricing_container mt-2">
                <p className="text-sm">Precio</p>
                <p className="text-2xl font-semibold">{"S/" + price + ".00"}</p>
              </div>
              <div className="kits_container mt-2">
                <div className="text-lg font-normal flex justify-between items-center">
                  <p>Kits Disponibles</p>
                </div>
                <div className="kits_grid flex gap-4 w-full mt-1 flex-wrap">
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
                            className={`text-md px-6 py-2 rounded-md border-2 font-semibold whitespace-nowrap hover:bg-[#ECEDE4] ${
                              kit_selected === variation?.id
                                ? "bg-[#ECEDE4] text-black"
                                : ""
                            }`}
                            onClick={() => set_kit_selected(variation?.id)}
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

              <div className="medidas_container mt-4">
                <div className="text-lg font-normal flex justify-between items-center">
                  <p>Medidas Disponibles</p>
                  <Guia_medidas />
                </div>
                <p className="text-sm font-semibold">
                  2.00cm | 2.50cm | 3.00cm{" "}
                </p>
              </div>

              <div className="hidden md:block">
                <Promo_card message="Todo verano 2025: ¡Llévate 2 Stickers Random GRATIS con cualquier Kit Personalizado o de Bicicletas!" />
              </div>

              <div className="mt-4 w-full">
                <a
                  href={`https://api.whatsapp.com/send?phone=51959274550&text=%C2%A1Hola!%20Quiero%20${
                    stickers_variations.find(
                      (variation) => variation.id === kit_selected
                    )?.value
                  }%20unidades%20del%20Sticker%20${item?.[0]?.nombre}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-8 py-2 rounded-full text-lg bg-black text-white text-center"
                  onClick={() => {
                    handleBuyClick(
                      item?.[0]?.nombre,
                      stickers_variations.find(
                        (variation) => variation.id === kit_selected
                      )?.nombre
                    );
                  }}
                >
                  Comprar
                </a>
                <Sticker_user_info_modal />
              </div>
              <div className="divider"></div>

              <div className="description_container mt-1">
                <p className="text-xl font-medium">
                  Características del producto
                </p>
                <p>{descriptionData.title}</p>
                {descriptionData.list.length > 0 && (
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
