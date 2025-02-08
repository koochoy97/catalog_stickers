import { Header } from "./Components/Header/Header";
import { Section_info } from "./Components/Pages_components/Section_info";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
import { Promo_card } from "./Components/Products/Promo_card";
import { Footer } from "./Components/Pages_components/Footer";
import { Home_categories } from "./Components/Products/Home_categories";
import { Products_grid } from "./Components/Products/Products_grid";
import ReactGA from "react-ga4";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";

import { Link } from "react-router";
export function Home() {
  const {
    get_pocket_base_stickers_products,
    get_pocketbase_support_items,
    stickers_products,
  } = useContext(DataContext);

  useEffect(() => {
    get_pocket_base_stickers_products();
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: `Home`,
    });
    return () => {};
  }, [window.location.pathname]);

  return (
    <div className="flex w-full flex-col justify-between items-center">
      <Header />
      <div className="main w-full p-6 flex flex-col justify-start items-center bg-slate-100 md:px-20">
        <div className="sub_header w-full  ">
          <h1 className="text-2xl font-semibold w-full text-left">
            La mejor colección de Stickers
          </h1>
          <Home_categories />
          <div className="w-full mt-4">
            <Promo_card message="Todo Verano 2025: ¡Llévate 2 Stickers Random GRATIS con cualquier Kit Personalizado o de Bicicletas!*" />
          </div>
        </div>

        <Products_grid data={stickers_products} />
        <Section_info
          title="¿Tienes un modelo propio?"
          description="Puedes personalizar tus stickers con tus propios diseños y colores!"
          img="/images/house-plans-1.jpeg"
          cta="¡Quiero mi Sticker!"
          link="https://api.whatsapp.com/send?phone=51959274550&text=%C2%A1Hola!%20Quisiera%20pedir%20un%20sticker%20personalizado"
        />
      </div>
      <Footer />
    </div>
  );
}
