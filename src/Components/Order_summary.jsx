import { useState, useContext, useEffect } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import { DataContext } from "../Context/DataContext";

export function Order_summary() {
  // Estado para controlar la expansión de cada item por su id
  const [expandedItems, setExpandedItems] = useState({});

  const { cartDetails, removeProductFromCart } =
    useContext(ShoppingCartContext);
  const { stickers_products, get_pocket_base_stickers_products } =
    useContext(DataContext);

  useEffect(() => {
    if (stickers_products.length <= 1) {
      get_pocket_base_stickers_products();
    }
  }, []);

  const curret_product = (product_id) => {
    return stickers_products?.find((product) => product.id === product_id);
  };

  // Función para manejar la expansión de un item específico
  const handleToggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId], // Cambia el estado de expansión para el item específico
    }));
  };

  return (
    <div className="flex flex-col items-start gap-3">
      {cartDetails?.map((item) => {
        const isExpanded = expandedItems[item.id] || false; // Verifica si el item está expandido

        return (
          <div className="item flex items-start gap-3 w-full" key={item.id}>
            <img
              src="/images/sticker.png"
              className="w-[45px] rounded-md"
              alt="Sticker"
            />
            <div className="flex flex-1 items-start justify-between">
              {/* Título y descripción */}
              <div className="flex flex-col items-start w-full">
                <p className="font-semibold text-sm">
                  {curret_product(item.product_id)?.nombre}
                </p>
                <p
                  className={`text-xs text-[#6B7280] font-light overflow-hidden ${
                    isExpanded
                      ? "whitespace-normal max-w-full"
                      : "truncate max-w-[100px]"
                  }`}
                >
                  {`${item.sticker_variation.value} unidades - ${item.qtyS}(S), ${item.qtyM}(M), ${item.qtyL}(L) - Nombre: ${item.sticker_name} - Apellido:
                  ${item.sticker_lastname} - Bandera: ${item.sticker_bandera}`}
                </p>
                <button
                  onClick={() => handleToggleExpand(item.id)} // Maneja la expansión para este item
                  className="text-blue-500 text-xs font-medium mt-1"
                >
                  {isExpanded ? "Ver menos" : "Ver más"}
                </button>
              </div>

              {/* Precio alineado a la derecha */}
              <div className="flex flex-col items-end">
                <p className="font-semibold text-sm text-gray-700 min-w-[80px] text-right">
                  S/. 15.00
                </p>
                <img
                  src="/images/trash.svg"
                  className="w-4 mt-1"
                  alt=""
                  onClick={() => removeProductFromCart(item.id)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
