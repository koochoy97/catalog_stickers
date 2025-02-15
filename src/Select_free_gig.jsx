import React from "react";
import { Products_grid_free_gig } from "./Components/Checkout/Products_grid_free_gig";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "./Context/DataContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";

export function Select_free_gig({ isValid, name, phone }) {
  const [filtered_products, setFiltered_products] = useState([]);
  const { stickers_products, get_pocketbase_support_items } =
    useContext(DataContext);
  const {
    addProductToCart,
    removeProductFromCart,
    cartDetails,
    removeMultipleProductsFromCart,
    setNombreUserSession,
    setPhoneUserSession,
  } = useContext(ShoppingCartContext);

  const [active_grid, setActive_grid] = useState(false);
  const [active_sticker_type, setActive_sticker_type] = useState(""); // "Sticker 1" o "Sticker 2"
  const [sticker1Selection, setSticker1Selection] = useState({
    product: null,
    size: "",
  });
  const [sticker2Selection, setSticker2Selection] = useState({
    product: null,
    size: "",
  });

  const navigate = useNavigate();

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

    // Filtrar productos gratuitos
    const freeProducts = cartDetails.filter(
      (detail) => detail.sticker_variation.price === 0
    );
    console.log("Productos gratuitos encontrados:", freeProducts);

    // Obtener los IDs de los productos gratuitos
    const freeProductIds = freeProducts.map((detail) => detail.id);

    // Eliminar todos los productos gratuitos de una sola vez
    if (freeProductIds.length > 0) {
      removeMultipleProductsFromCart(freeProductIds);
    }
  }, []);

  useEffect(() => {
    let temp_filtered_products = [...stickers_products];
    setFiltered_products(
      temp_filtered_products.filter(
        (product) => product.category_name === "Stickers Random"
      )
    );
  }, [stickers_products]);

  const handle_click = (stickerType) => {
    setActive_grid((prevState) => !prevState);
    setActive_sticker_type(stickerType);
  };

  const handle_item_click = (product) => {
    if (active_sticker_type === "Sticker 1") {
      setSticker1Selection((prev) => ({
        product: product,
        size: "S", // Set default size S
      }));
    } else {
      setSticker2Selection((prev) => ({
        product: product,
        size: "S", // Set default size S
      }));
    }
  };

  const handle_selection_confirm = () => {
    setActive_grid(false);
  };

  const handle_size_change = (size) => {
    if (active_sticker_type === "Sticker 1") {
      setSticker1Selection((prev) => ({
        ...prev,
        size: size,
      }));
    } else {
      setSticker2Selection((prev) => ({
        ...prev,
        size: size,
      }));
    }
  };

  const handle_continue_payment = () => {
    addProductToCart({
      sticker_name: "",
      sticker_lastname: "",
      sticker_bandera: "",
      sticker_variation: { price: 0 },
      product: sticker1Selection.product,
      qtyS: sticker1Selection.size === "S" ? 1 : 0,
      qtyM: sticker1Selection.size === "M" ? 1 : 0,
      qtyL: sticker1Selection.size === "L" ? 1 : 0,
    });

    addProductToCart({
      sticker_name: "",
      sticker_lastname: "",
      sticker_bandera: "",
      sticker_variation: { price: 0 },
      product: sticker2Selection.product,
      qtyS: sticker2Selection.size === "S" ? 1 : 0,
      qtyM: sticker2Selection.size === "M" ? 1 : 0,
      qtyL: sticker2Selection.size === "L" ? 1 : 0,
    });

    setNombreUserSession(name);
    setPhoneUserSession(phone);

    navigate("/payment");
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
        <div className="modal-box h-[800px] p-6 md:p-10 lg:w-full lg:max-w-[900px]">
          <h2 className="text-xl font-medium">
            Selecciona tus Stickers gratuitos
          </h2>

          <div className="flex items-center justify-between gap-3 mt-2">
            <button
              className="w-full h-12 border rounded-lg flex items-center justify-center gap-2"
              onClick={() => handle_click("Sticker 1")}
            >
              {sticker1Selection.product ? (
                `${sticker1Selection.product.nombre} - ${sticker1Selection.size}`
              ) : (
                <>
                  <p>Sticker 1</p>
                  <img src="/images/down_arrow.svg" alt="" className="w-3" />
                </>
              )}
            </button>

            <button
              className="w-full h-12 border rounded-lg flex items-center justify-center gap-2"
              onClick={() => handle_click("Sticker 2")}
            >
              {sticker2Selection.product ? (
                `${sticker2Selection.product.nombre} - ${sticker2Selection.size}`
              ) : (
                <>
                  <p>Sticker 2</p>
                  <img src="/images/down_arrow.svg" alt="" className="w-3" />
                </>
              )}
            </button>
          </div>

          <div
            className={`transition-all ${
              active_grid ? "h-96 overflow-auto" : "h-0 overflow-hidden"
            }`}
          >
            <Products_grid_free_gig
              data={filtered_products}
              send_click_signal={handle_item_click}
              confirm_selection={handle_selection_confirm}
              active_product={
                active_sticker_type === "Sticker 1"
                  ? sticker1Selection.product
                  : sticker2Selection.product
              }
              active_size={
                active_sticker_type === "Sticker 1"
                  ? sticker1Selection.size
                  : sticker2Selection.size
              }
              handle_size_change={handle_size_change}
            />
          </div>

          <div className="w-full mt-4">
            <button
              className="bg-black text-white py-2 px-3 rounded-md w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={
                !sticker1Selection.product ||
                !sticker1Selection.size ||
                !sticker2Selection.product ||
                !sticker2Selection.size
              }
              onClick={handle_continue_payment}
            >
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
