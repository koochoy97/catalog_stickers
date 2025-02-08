import { useEffect, useContext, useState } from "react";
import { Header } from "./Components/Header/Header";
import { useParams, useLocation } from "react-router";
import { DataContext } from "./Context/DataContext";
import "react-loading-skeleton/dist/skeleton.css";
import { Promo_card } from "./Components/Products/Promo_card";
import { BreadCrump } from "./Components/Products/BreadCrump";
import { Como_pedir_component } from "./Components/Pages_components/Como_pedir_component";
import { Guia_medidas } from "./Components/Pages_components/Guia_medidas_modal"; // Importamos Guia_medidas
import ReactGA from "react-ga4";
import { Sticker_user_info_modal } from "./Components/Products/Sticker_user_info_modal";
import { KitsGrid } from "./Components/Products/Kits_grid"; // Importamos KitsGrid

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

  const findLowestPriceKit = (variations, item) => {
    if (!variations || variations.length === 0 || !item?.[0]?.kit_variations)
      return null;

    const filteredVariations = variations.filter((variation) =>
      item[0].kit_variations.includes(variation.id)
    );

    if (filteredVariations.length === 0) return null;

    const lowestPriceKit = filteredVariations.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    );

    return lowestPriceKit;
  };

  useEffect(() => {
    if (stickers_variations.length > 0 && item.length > 0) {
      const lowestPriceKit = findLowestPriceKit(stickers_variations, item);
      set_kit_selected(lowestPriceKit?.id);
      setPrice(lowestPriceKit?.price);
    }
  }, [stickers_variations, item]);

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
        title: `Product: ${item[0].nombre}`,
      });
    }
  }, [location.pathname, item]);

  const handleBuyClick = (name, variation) => {
    ReactGA.event({
      category: "Botón Comprar",
      action: "Click en Comprar",
      label: `${name} - ${variation}`,
    });
  };

  const formatDescription = (description) => {
    const lines = description?.split("\n") || [];
    return {
      title: lines[0] || "",
      list: lines.slice(1).filter((line) => line.trim() !== ""),
    };
  };

  const descriptionData = formatDescription(item?.[0]?.short_description);

  return (
    <div
      className="flex w-full flex-col justify-start items-center bg-slate-100 pb-40"
      key={location.pathname}
    >
      <Header />

      <div className="main flex flex-col justify-start items-start w-full lg:flex-row lg:justify-center lg:gap-8 lg:mt-8 ">
        {loading ? (
          <div className="flex w-full flex-col gap-4 lg:flex-row md-justify-center">
            <div className="skeleton w-full aspect-square lg:w-[700px]"></div>
            <div className="div lg:w-[600px] flex flex-col gap-3 justify-center">
              <div className="skeleton h-4 w-28 lg:w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
        ) : (
          <>
            <img
              src={`https://mtb.pockethost.io/api/files/sticker_products/${item?.[0]?.id}/${item?.[0]?.principal_image}`}
              alt={item?.[0]?.nombre}
              className="w-full aspect-square lg:w-[600px] object-contain"
            />
            <div className="summary_item text-left w-full mt-6 px-5 lg:max-w-[600px]">
              <BreadCrump
                category={item?.[0]?.category_name}
                name={item?.[0]?.nombre}
              />
              <h1 className="text-2xl font-semibold">{item?.[0]?.nombre}</h1>
              <div className="lg:hidden mb-4">
                <Promo_card message="Todo verano 2025: ¡Llévate 2 Stickers Random GRATIS con cualquier Kit Personalizado o de Bicicletas!" />
              </div>
              <div className="desktop_pricing_container mt-2">
                <p className="text-sm">Precio</p>
                <p className="text-2xl font-semibold">{"S/" + price + ".00"}</p>
              </div>

              {/* Aquí usamos el nuevo componente KitsGrid */}
              <KitsGrid
                kit_variations={item?.[0]?.kit_variations}
                stickers_variations={stickers_variations}
                kit_selected={kit_selected}
                set_kit_selected={set_kit_selected}
              />

              <div className="mt-4 w-full">
                <Sticker_user_info_modal
                  kit_selected_ID={kit_selected}
                  kit_selected_value={stickers_variations.find(
                    (variation) => variation.id === kit_selected
                  )}
                  product={item?.[0]}
                />
              </div>
              <div className="divider"></div>

              {/* Aquí está la sección para la Guia de Medidas */}
              <div className="medidas_container mt-4">
                <div className="text-lg font-normal flex justify-between items-center">
                  <p>Medidas Disponibles</p>
                  <Guia_medidas /> {/* Componente Guia_medidas aquí */}
                </div>
                <p className="text-sm font-semibold mb-2">
                  {item?.[0]?.size_s +
                    " | " +
                    item?.[0]?.size_m +
                    " | " +
                    item?.[0]?.size_l}
                </p>
              </div>

              <div className="hidden lg:block">
                <Promo_card message="Todo verano 2025: ¡Llévate 2 Stickers Random GRATIS con cualquier Kit Personalizado o de Bicicletas!*" />
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
