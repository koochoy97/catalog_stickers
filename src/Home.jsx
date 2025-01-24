import { Header } from "./Components/Header";
import { Custom_stickers_section } from "./Components/Custom_stickers";
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
    stickers_products,
    loading_stickers_products,
    setLoading_stickers_products,
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
          <Promo_card
            message="Por la compra de cualquier Kit de Stickers Personalizados o de
        Bicicletas llévate dos Stickers Random gratis"
          />
        </div>

        <Products_grid />
        <Custom_stickers_section />
      </div>
      <Footer />
    </div>
  );
}
