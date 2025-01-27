import { Header } from "./Components/Header";
import { Section_info } from "./Components/Section_info";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
import { Promo_card } from "./Components/Promo_card";
import { Footer } from "./Components/Footer";
import { Home_categories } from "./Components/Home_categories";
import { Products_grid } from "./Components/Products_grid";

import { Link } from "react-router";
export function Home() {
  const {
    get_pocket_base_stickers_products,
    get_pocketbase_support_items,
    stickers_products,
  } = useContext(DataContext);

  useEffect(() => {
    get_pocket_base_stickers_products();
    return () => {};
  }, []);

  return (
    <div className="flex w-full flex-col justify-between items-center">
      <Header />
      <div className="main w-full p-6 flex flex-col justify-start items-center bg-slate-100 md:px-20">
        <div className="sub_header w-full  ">
          <h1 className="text-2xl font-semibold w-full text-left">
            La mejor colección de Stickers
          </h1>
          <Home_categories />
          <Promo_card message="Todo Verano 2025: ¡Llévate 2 Stickers Random GRATIS con cualquier Kit Personalizado o de Bicicletas!" />
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
