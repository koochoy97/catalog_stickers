import { Link, useLocation } from "react-router-dom";
import { Order_summary } from "./Order_summary";

export function Shopping_cart() {
  const location = useLocation(); // Obtén la ruta actual

  return (
    <div className="drawer drawer-end  w-auto">
      {/* Asegúrate de que este id sea único para este drawer */}
      <input
        id="shopping-cart-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label htmlFor="shopping-cart-drawer" className="drawer-button">
          <img src="/images/shopping_cart.svg" className="w-8" alt="" />
        </label>
      </div>

      {/* Sidebar content */}
      <div className="drawer-side z-50">
        <label
          htmlFor="shopping-cart-drawer" // Usar el mismo id para cerrar el drawer
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-6 text-lg">
          <p className="font-bold text-xl px-2">Carrito de compras</p>
          <div className="divider"></div>
          <Order_summary />
        </ul>
      </div>
    </div>
  );
}
