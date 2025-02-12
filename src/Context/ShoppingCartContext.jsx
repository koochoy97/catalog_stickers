import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Para generar IDs únicos
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://mtb.pockethost.io");

// Crear el contexto
export const ShoppingCartContext = createContext(" ");

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

  // Estado para el total del carrito
  const [shopping_cart_total, setShopping_cart_total] = useState(0);

  // Estado para el nombre de usuario en la sesión
  const [nombre_user_session, setNombreUserSession] = useState(() => {
    return localStorage.getItem("nombre_user_session") || "";
  });

  // Estado para el teléfono de usuario en la sesión
  const [phone_user_session, setPhoneUserSession] = useState(() => {
    return localStorage.getItem("phone_user_session") || "";
  });

  // Estado para la dirección del usuario en la sesión (cada campo como variable independiente)
  const [direccion, setDireccion] = useState(() => {
    return localStorage.getItem("direccion") || "";
  });

  const [detalle, setDetalle] = useState(() => {
    return localStorage.getItem("detalle") || "";
  });

  const [distrito, setDistrito] = useState(() => {
    return localStorage.getItem("distrito") || "";
  });

  const [referencia, setReferencia] = useState(() => {
    return localStorage.getItem("referencia") || "";
  });

  const [DB_cart_id, setDB_cart_id] = useState("");

  const [DB_cart_details, setDB_cart_details] = useState("");

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
    if (cart) {
      sessionId = cart.id;
    } else {
      sessionId = uuidv4();
      const newCart = { id: sessionId, with_products: false };
      setCart(newCart);
    }
    const newCartDetail = {
      id: uuidv4(),
      cartId: sessionId,
      ...productData,
    };
    setCartDetails((prevDetails) => [...prevDetails, newCartDetail]);
    setCart((prevCart) => ({ ...prevCart, with_products: true }));
  };

  // Función para eliminar un producto del carrito
  const removeProductFromCart = (id) => {
    const updatedCartDetails = cartDetails.filter((detail) => detail.id !== id);
    setCartDetails(updatedCartDetails);
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

  // En tu ShoppingCartContext
  const removeMultipleProductsFromCart = (productIds) => {
    setCartDetails((prevCartDetails) =>
      prevCartDetails.filter((detail) => !productIds.includes(detail.id))
    );
  };

  //Función para crear el carrito en la base de datos
  async function createCart() {
    const data = {
      cart_id: cart.id,
      status: "En checkout",
      user_name: nombre_user_session,
      user_phone: phone_user_session,
      payment_id: "",
      direccion: `${direccion} - ${detalle} - ${distrito} - ${referencia}`,
    };

    try {
      const record = await pb.collection("carts").create(data);

      // ✅ Establecer DB_cart_id aquí después de la creación del carrito
      setDB_cart_id(record.id);

      console.log("✅ Carrito creado exitosamente:", record);

      // Asegúrate de que los detalles del carrito se creen después de la creación
      await Promise.all(
        cartDetails.map((detail) => createCartDetail(record.id, detail))
      );
    } catch (error) {
      console.error("❌ Error al crear el carrito:", error);
    }
  }

  async function createCartDetail(id_relation, data) {
    const payload = {
      nombre: data.sticker_name,
      apellido: data.sticker_lastname,
      bandera: data.bandera,
      kit_variation: data.sticker_variation.id || "",
      product_id: data.product.id,
      id_relation: id_relation,
      cart_id: cart.id,
      qty_S: data.qtyS,
      qty_M: data.qtyM,
      qty_L: data.qtyL,
    };

    const record = await pb.collection("cart_details").create(payload, {
      $autoCancel: false,
    });

    if (record) {
      console.log("✅ Detalle de carrito creado exitosamente:", record); // 🚀 Se imprime apenas se obtiene el record
      setDB_cart_details(record);
    } else {
      console.log("⚠️ Error: No se pudo crear el detalle de carrito.");
    }

    return record;
  }

  useEffect(() => {
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
  }, [cartDetails]);

  useEffect(() => {
    //localStorage.setItem("nombre_user_session", nombre_user_session);
  }, [nombre_user_session]);

  useEffect(() => {
    //localStorage.setItem("phone_user_session", phone_user_session);
  }, [phone_user_session]);

  useEffect(() => {
    localStorage.setItem("direccion", direccion);
  }, [direccion]);

  useEffect(() => {
    localStorage.setItem("detalle", detalle);
  }, [detalle]);

  useEffect(() => {
    localStorage.setItem("distrito", distrito);
  }, [distrito]);

  useEffect(() => {
    localStorage.setItem("referencia", referencia);
  }, [referencia]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        setCart,
        cartDetails,
        setCartDetails,
        addProductToCart,
        removeProductFromCart,
        shopping_cart_total,
        nombre_user_session,
        setNombreUserSession,
        phone_user_session,
        setPhoneUserSession,
        direccion,
        setDireccion,
        detalle,
        setDetalle,
        distrito,
        setDistrito,
        referencia,
        setReferencia,
        removeMultipleProductsFromCart,
        createCart,
        DB_cart_id,
        DB_cart_details,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
}
