import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Si decides usar uuid

// Crear el contexto
export const ShoppingCartContext = createContext("");

// Componente del proveedor del contexto
export function ShoppingCartContextProvider(props) {
  const [carts, setCarts] = useState(() => {
    const savedCarts = localStorage.getItem("carts");
    return savedCarts ? JSON.parse(savedCarts) : [];
  });

  const [cartDetails, setCartDetails] = useState(() => {
    const savedCartDetails = localStorage.getItem("cartDetails");
    return savedCartDetails ? JSON.parse(savedCartDetails) : [];
  });

  // Función para crear un nuevo carrito y sus detalles
  const createUnified_cart = (cartData, detailsData) => {
    const sessionId = uuidv4(); // Generar un ID único para la sesión

    // Crear el nuevo carrito
    const newCart = {
      id: sessionId,
      ...cartData,
    };

    // Crear los detalles del carrito
    const newCartDetails = {
      cartId: sessionId,
      ...detailsData,
    };

    // Actualizar el estado
    setCarts((prevCarts) => [...prevCarts, newCart]);
    setCartDetails((prevDetails) => [...prevDetails, newCartDetails]);
  };

  // Guardar los datos en el localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  useEffect(() => {
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
  }, [cartDetails]);

  return (
    <ShoppingCartContext.Provider
      value={{
        carts,
        setCarts,
        cartDetails,
        setCartDetails,
        createUnified_cart,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
}
