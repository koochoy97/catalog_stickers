import React from "react";
import { Products_grid } from "./Components/Products/Products_grid";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "./Context/DataContext";

export function Select_free_gig({ isValid }) {
  const [filtered_products, setFiltered_products] = useState([]);
  const { stickers_products, get_pocketbase_support_items } =
    useContext(DataContext);

  const [active_grid, setActive_grid] = useState(false);

  useEffect(() => {
    if (stickers_products.length <= 1) {
      get_pocketbase_support_items("stickers_product_view");
    }

    let temp_filtered_products = [...stickers_products];

    setFiltered_products(
      temp_filtered_products.filter(
        (product) => product.category_name === "Stickers Random"
      )
    );

    return () => {};
  }, []);

  useEffect(() => {
    let temp_filtered_products = [...stickers_products];

    setFiltered_products(
      temp_filtered_products.filter(
        (product) => product.category_name === "Stickers Random"
      )
    );
  }, [stickers_products]);

  const handle_click = () => {
    setActive_grid(true);
  };

  return (
    <>
      <button
        className={`mt-4 px-4 py-2 text-white font-semibold rounded w-full ${
          isValid
            ? "bg-blue-500 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isValid}
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Continuar Compra
      </button>
      <dialog id="my_modal_2" className="modal w-full">
        <div className="modal-box h-[800px] p-6 md:p-10">
          <h2 className="text-xl font-medium">
            Selecciona tus Stickers gratuitos
          </h2>

          <div className="flex items-center justify-between gap-3 mt-2">
            <button
              className="w-full h-12 border rounded-lg flex items-center justify-center gap-2"
              onClick={handle_click}
            >
              Sticker 1
              <img src="/images/down_arrow.svg" alt="" className="w-3" />
            </button>
            <button className="w-full h-12 border rounded-lg flex items-center justify-center gap-2">
              Sticker 1
              <img src="/images/down_arrow.svg" alt="" className="w-3" />
            </button>
          </div>
          <div
            className={` transition-all ${
              active_grid ? "h-96 overflow-auto" : "h-0 overflow-hidden"
            }`}
          >
            <Products_grid data={filtered_products} />
          </div>

          <div className="w-full mt-4">
            <button className="bg-black text-white py-2 px-3 rounded-md w-full">
              Continuar compra
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
