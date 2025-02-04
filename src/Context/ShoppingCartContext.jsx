import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Para generar IDs únicos

// Crear el contexto
export const ShoppingCartContext = createContext("");

// Componente del proveedor del contexto
export function ShoppingCartContextProvider(props) {
  // Estado para el carrito (id y estado with_products)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : null;
  });

  // Estado para los detalles del carrito (productos agregados)
  const [cartDetails, setCartDetails] = useState(() => {
    const savedCartDetails = localStorage.getItem("cartDetails");
    return savedCartDetails ? JSON.parse(savedCartDetails) : [];
  });

  const [shopping_cart_total, setShopping_cart_total] = useState(0);

  useEffect(() => {
    let total = 0;
    cartDetails?.forEach((detail) => {
      total += detail.sticker_variation.price;
    });
    setShopping_cart_total(total);
  }, [cartDetails]);

  // Función para agregar un producto al carrito
  const addProductToCart = (productData) => {
    let sessionId;

    // Si ya existe un carrito, usamos su ID
    if (cart) {
      sessionId = cart.id;
    } else {
      // Si no existe, creamos un nuevo carrito con un ID único y with_products en false
      sessionId = uuidv4();
      const newCart = { id: sessionId, with_products: false }; // Inicialmente sin productos
      setCart(newCart);
    }

    // Crear el detalle del carrito (producto agregado)
    const newCartDetail = {
      id: uuidv4(), // ID único para el cart_detail
      cartId: sessionId, // Asociar el detalle al carrito
      ...productData, // Datos del producto (id, nombre, cantidad, precio, etc.)
    };

    // Actualizar los detalles del carrito
    setCartDetails((prevDetails) => [...prevDetails, newCartDetail]);

    // Actualizar el estado del carrito (with_products a true)
    setCart((prevCart) => ({ ...prevCart, with_products: true }));
  };

  // Función para eliminar un producto del carrito
  const removeProductFromCart = (id) => {
    // Filtrar los detalles del carrito para eliminar el producto
    const updatedCartDetails = cartDetails.filter((detail) => detail.id !== id);

    // Actualizar los detalles del carrito
    setCartDetails(updatedCartDetails);

    // Actualizar el estado del carrito (with_products a false si no hay productos)
    if (updatedCartDetails.length === 0) {
      setCart((prevCart) => ({ ...prevCart, with_products: false }));
    }
  };

  // Guardar los datos en el localStorage cuando cambian
  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
  }, [cartDetails]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        setCart,
        cartDetails,
        setCartDetails,
        addProductToCart,
        removeProductFromCart,
        shopping_cart_total, // Nueva función para eliminar productos
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
}
