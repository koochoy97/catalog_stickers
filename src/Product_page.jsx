import { useEffect, useContext, useState } from "react";
import { Header } from "./Components/Header";
import { useParams, useLocation } from "react-router";
import { DataContext } from "./Context/DataContext";
import "react-loading-skeleton/dist/skeleton.css";
import { Promo_card } from "./Components/Promo_card";
import { BreadCrump } from "./Components/BreadCrump";
export function ProductPage() {
  const {
    get_pocket_base_stickers_products,
    stickers_products,
    get_pocketbase_support_items,
    stickers_variations,
  } = useContext(DataContext);

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  const { productId } = useParams();
  const location = useLocation(); // Usamos useLocation para detectar cambios en la URL
  const [imageHeight, setImageHeight] = useState(0); // Guardar altura de la imagen

  useEffect(() => {
    if (stickers_products.length > 0) {
      // Solo filtra si hay datos en stickers_products
      const product = stickers_products.filter(
        (sticker) => sticker.id === productId
      );
      setItem(product);
      setLoading(false);
    } else {
      get_pocket_base_stickers_products("id", productId);
      setItem(stickers_products);
    }
  }, [productId, stickers_products]);

  useEffect(() => {
    if (item) {
      console.log(item);
    }
  }, [item]); // Cuando stickers_products cambie, actualiza item

  useEffect(() => {
    window.scrollTo(0, 0);
    get_pocketbase_support_items("kit_variations");
  }, []);

  return (
    <div
      className="flex w-full flex-col justify-start items-center bg-slate-100 pb-40 "
      key={location.pathname}
    >
      <Header />

      <div className="main flex flex-col justify-start items-start w-full md:flex-row md:justify-center  md:gap-8 md:mt-8">
        {loading ? (
          <div class="flex w-full flex-col gap-4 ">
            <div class="skeleton w-full aspect-square"></div>
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
          </div>
        ) : (
          <>
            <img
              src={`https://mtb.pockethost.io/api/files/sticker_products/${item?.[0]?.id}/${item?.[0]?.principal_image}`}
              alt={item?.[0]?.nombre}
              className="w-full aspect-square md:w-[700px] object-contain"
            />
            <div className="summary_item text-left w-full mt-6 px-5  md:max-w-[600px]">
              <BreadCrump
                category={item?.[0]?.category_name}
                name={item?.[0]?.nombre}
              />

              <h1 className="text-2xl font-semibold">{item?.[0]?.nombre}</h1>
              <div className="desktop_pricing_container mt-2">
                <p className="text-sm">Precio</p>
                <p className="text-2xl font-semibold">S/7.00</p>
              </div>
              <div className="kits_container mt-2">
                <div className="text-lg font-normal flex justify-between items-center">
                  <p>Kits Disponibles</p>
                  <p className="text-sm font-semibold text-[#FF596F] cursor-pointer">
                    Ver guía de medidas
                  </p>
                </div>
                <div className="kits_grid flex gap-4 w-full mt-1">
                  {item?.[0]?.kit_variations?.map((kit) => (
                    <button
                      key={kit}
                      className={`text-md px-6 py-2 rounded-md border-2 font-semibold whitespace-nowrap hover:bg-[#ECEDE4]`}
                    >
                      {
                        stickers_variations.filter(
                          (variation) => variation.id === kit
                        )[0]?.nombre
                      }
                    </button>
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
                  Caracteristicas del producto
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae, laudantium perspiciatis optio provident sunt
                  tempora nesciunt reprehenderit nisi harum mollitia illo
                  recusandae dicta, quam rem consequuntur accusamus at
                  consequatur assumenda? Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit.
                </p>

                <div className="divider"></div>

                <p className="text-xl font-medium">¿Cómo pedir?</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae, laudantium perspiciatis optio provident sunt
                  tempora nesciunt reprehenderit nisi harum mollitia illo
                  recusandae dicta, quam rem consequuntur accusamus at
                  consequatur assumenda? Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit.
                </p>
              </div>
            </div>

            <div className="pricing_container flex justify-between items-center w-full fixed bottom-0 left-0 bg-white px-5 py-7 rounded-t-3xl border-t md:hidden">
              <div>
                <p className="text-sm">Precio</p>
                <p className="text-2xl font-semibold">S/7.00</p>
              </div>
              <button className="px-8 py-2 rounded-full text-lg bg-black text-white">
                Comprar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
