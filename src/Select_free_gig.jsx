import React from "react";
import { Products_grid_free_gig } from "./Components/Checkout/Products_grid_free_gig";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "./Context/DataContext";

export function Select_free_gig({ isValid }) {
  const [filtered_products, setFiltered_products] = useState([]);
  const { stickers_products, get_pocketbase_support_items } =
    useContext(DataContext);

  const [active_grid, setActive_grid] = useState(false);

  const [active_sticker, setActive_sticker] = useState("");
  const [active_sticker_1, setActive_sticker_1] = useState([]);
  const [active_sticker_2, setActive_sticker_2] = useState([]);

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

  const handle_click = (sticker) => {
    setActive_grid((prevState) => !prevState);
    setActive_sticker(sticker);
  };

  const handle_item_click = (e) => {
    console.log(e);
    if (active_sticker === "Sticker 1") {
      setActive_sticker_1(e);
    } else {
      setActive_sticker_2(e);
    }
    setActive_grid(false);
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
              onClick={() => {
                handle_click("Sticker 1");
              }}
            >
              {active_sticker_1.nombre ? (
                active_sticker_1.nombre
              ) : (
                <>
                  <p>Sticker 1</p>
                  <img src="/images/down_arrow.svg" alt="" className="w-3" />
                </>
              )}
            </button>

            <button
              className="w-full h-12 border rounded-lg flex items-center justify-center gap-2"
              onClick={() => {
                handle_click("Sticker 2");
              }}
            >
              {active_sticker_2.nombre ? (
                active_sticker_2.nombre
              ) : (
                <>
                  <p>Sticker 2</p>
                  <img src="/images/down_arrow.svg" alt="" className="w-3" />
                </>
              )}
            </button>
          </div>
          <div
            className={` transition-all ${
              active_grid ? "h-96 overflow-auto" : "h-0 overflow-hidden"
            }`}
          >
            <Products_grid_free_gig
              data={filtered_products}
              send_click_signal={handle_item_click}
              active_sticker={
                active_sticker === "Sticker 1"
                  ? active_sticker_1
                  : active_sticker_2
              }
            />
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
