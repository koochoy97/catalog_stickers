import { Header } from "./Components/Header";
import { Custom_stickers_section } from "./Components/Custom_stickers";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
import { Promo_card } from "./Components/Promo_card";
export function Home() {
  const { get_pocket_base_stickers_products, stickers_products } =
    useContext(DataContext);

  useEffect(() => {
    get_pocket_base_stickers_products();
  }, []);

  return (
    <div className="flex w-full flex-col justify-between items-center">
      <Header />
      <div className="main w-full p-6 flex flex-col justify-start items-center bg-slate-100 md:px-20">
        <div className="sub_header w-full  ">
          <h1 className="text-2xl font-semibold w-full text-left">
            La mejor colección de Stickers
          </h1>

          <div className="categories_container flex w-full justify-start items-center gap-2 mt-4 overflow-x-auto">
            <div className="categories_container flex w-full justify-start items-center gap-2 mt-4 overflow-x-auto">
              <button className="text-xs px-3 py-3 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0">
                Stickers personalizados
              </button>
              <button className="text-xs px-3 py-3 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0">
                Stickers de Bicicletas
              </button>
              <button className="text-xs px-3 py-3 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0">
                Stickers Random
              </button>
            </div>
          </div>

          <Promo_card />
        </div>
        <div className="products_features_container">
          <div className="products_container w-full grid grid-cols-2 gap-4 flex-wrap mt-4 md:grid-cols-6 md:gap-6">
            {stickers_products.map((item) => {
              return (
                <div className="product_item mb-4 ">
                  <img
                    src={`https://mtb.pockethost.io/api/files/sticker_products/${item.id}/${item.principal_image}`}
                    alt=""
                    className="rounded-md"
                  />
                  <div className="summary_container w-full flex flex-col justify-start items-start mt-2">
                    <p className="text-sm font-normal">{item.nombre}</p>
                    <div className="row_2  w-full text-sm">
                      <p className="text-sm font-semibold">{"S/7.00"}</p>
                      <p className="text-xs cursor-pointer underline">
                        Ver más
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {stickers_products.map((item) => {
              return (
                <div className="product_item mb-4 ">
                  <img
                    src={`https://mtb.pockethost.io/api/files/sticker_products/${item.id}/${item.principal_image}`}
                    alt=""
                    className="rounded-md"
                  />
                  <div className="summary_container w-full flex flex-col justify-start items-start mt-2">
                    <p className="text-sm font-normal">{item.nombre}</p>
                    <div className="row_2  w-full text-sm">
                      <p className="text-sm font-semibold">{"S/7.00"}</p>
                      <p className="text-xs cursor-pointer underline">
                        Ver más
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Custom_stickers_section />
        </div>
      </div>
    </div>
  );
}
