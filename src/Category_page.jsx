import { Header } from "./Components/Header";
import { Custom_stickers_section } from "./Components/Custom_stickers";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
import { Promo_card } from "./Components/Promo_card";
import { Footer } from "./Components/Footer";
import { Home_categories } from "./Components/Home_categories";
import { Products_grid } from "./Components/Products_grid";
import { useParams } from "react-router";

import { Link } from "react-router";
export function Category_page() {
  const { category_name } = useParams();

  const {
    get_pocket_base_stickers_products,
    get_pocketbase_support_items,
    stickers_products,
  } = useContext(DataContext);

  const [filtered_products, setFiltered_products] = useState([]);
  useEffect(() => {
    get_pocket_base_stickers_products("category_name", category_name);

    return () => {};
  }, []);

  useEffect(() => {
    let temp_filtered_products = [...stickers_products];

    setFiltered_products(
      temp_filtered_products.filter(
        (product) => product.category_name === category_name
      )
    );

    return () => {};
  }, [stickers_products]);

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
