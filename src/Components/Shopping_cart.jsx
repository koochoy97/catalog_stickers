import { Link, useLocation, useNavigate } from "react-router-dom";
import { Order_summary } from "./Order_summary";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import { useContext } from "react";

export function Shopping_cart() {
  const location = useLocation(); // Obtén la ruta actual
  const navigate = useNavigate();
  const { cartDetails } = useContext(ShoppingCartContext);
  return (
    <div className="drawer drawer-end  w-auto">
      {/* Asegúrate de que este id sea único para este drawer */}
      <input
        id="shopping-cart-drawer" //Se usa el id para abrir el drawer. Por ahora no se usará el drawer
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <div className="indicator">
          <span className="indicator-item badge badge-secondary text-[10px] px-1 py-2">
            {cartDetails.length}
          </span>
          <label htmlFor="shopping-cart-drawer" className="drawer-button">
            <img src="/images/shopping_cart.svg" className="w-8" alt="" />
          </label>
        </div>
      </div>
      {/*Sidebar content*/}
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
