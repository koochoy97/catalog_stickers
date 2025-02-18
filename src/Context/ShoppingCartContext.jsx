import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Para generar IDs únicos
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

  const [fecha_entrega, setFechaEntrega] = useState("");

  const [tipo_entrega, setTipoEntrega] = useState("");

  const [succes_items, setSuccesItems] = useState();
  const [summaryCart, setSummaryCart] = useState();

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

  async function createCart() {
    const data = {
      cart_id: cart.id,
      status: "En checkout",
      user_name: nombre_user_session,
      user_phone: phone_user_session,
      payment_id: "",
      direccion: `${direccion} - ${detalle} - ${distrito} - ${referencia}`,
      fecha_entrega: fecha_entrega,
      tipo_envio: tipo_entrega,
    };

    try {
      const existingCart = await pb.collection("carts").getList(1, 50, {
        filter: `cart_id="${cart.id}"`,
      });

      if (existingCart.items.length > 0) {
        const record = await pb
          .collection("carts")
          .update(existingCart.items[0].id, {
            user_name: nombre_user_session,
            user_phone: phone_user_session,
            fecha_entrega: fecha_entrega,
            tipo_envio: tipo_entrega,
          });
        setDB_cart_id(record.id);
        console.log("✅ Carrito actualizado exitosamente:", record);

        // Eliminar todos los detalles del carrito en la base de datos
        const cartDetailsToDelete = await pb
          .collection("cart_details")
          .getList(1, 50, {
            filter: `cart_id="${cart.id}"`,
          });

        for (let detail of cartDetailsToDelete.items) {
          await pb.collection("cart_details").delete(detail.id);
        }

        // Subir nuevamente los detalles del carrito
        await Promise.all(
          cartDetails.map((detail) => createCartDetail(record.id, detail))
        );
      } else {
        const record = await pb.collection("carts").create(data);
        setDB_cart_id(record.id);
        console.log("✅ Carrito creado exitosamente:", record);
        await Promise.all(
          cartDetails.map((detail) => createCartDetail(record.id, detail))
        );
      }
    } catch (error) {
      console.error("❌ Error al manejar el carrito:", error);
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

  async function check_cart_inDB(cart_id) {
    console.log(cart_id);
    try {
      const records = await pb.collection("carts").getList(1, 50, {
        filter: `cart_id="${cart_id}"`,
      });
      if (records.items.length > 0 && records.items[0].status === "Pagado") {
        console.log(records.items[0]);
        setCart(null);
        setCartDetails([]);
      }
      if (
        records.items.length > 0 &&
        records.items[0].status === "En checkout"
      ) {
        console.log("El carrito existe en la base de datos");
        setDB_cart_id(records.items[0].id);
        setDB_cart_details(records.items[0]);
      } else {
        console.log("El carrito no existe en la base de datos");
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  async function get_cart_details_succes(external_reference) {
    // fetch a paginated records list
    const resultList = await pb.collection("view_cart_details").getList(1, 50, {
      filter: `id = "${external_reference}"`,
    });
    setSuccesItems(resultList.items);

    const cart_succes = await pb.collection("summary_carts").getList(1, 50, {
      filter: `id = "${external_reference}"`,
    });

    setSummaryCart(cart_succes.items[0]);

    return resultList;
  }

  useEffect(() => {
    check_cart_inDB(cart?.id);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
  }, [cartDetails]);

  useEffect(() => {
    localStorage.setItem("nombre_user_session", nombre_user_session);
  }, [nombre_user_session]);

  useEffect(() => {
    localStorage.setItem("phone_user_session", phone_user_session);
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
        setFechaEntrega,
        setTipoEntrega,
        tipo_entrega,
        fecha_entrega,
        get_cart_details_succes,
        succes_items,
        summaryCart,
        check_cart_inDB,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
}
