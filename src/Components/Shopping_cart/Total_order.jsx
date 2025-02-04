import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { useContext } from "react";

export function Total_order(props) {
  const { shopping_cart_total } = useContext(ShoppingCartContext);
  return (
    <div className="flex justify-between items-start w-full flex-col">
      <div className="w-full flex justify-between items-center text-md">
        <p>Total:</p>
        <p>{"S/" + shopping_cart_total + ".00"}</p>
      </div>
    </div>
  );
}
