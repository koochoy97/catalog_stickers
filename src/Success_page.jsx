import React, { useEffect, useState, useContext } from "react";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { Header } from "./Components/Header/Header";

export function Success_page() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [payerEmail, setPayerEmail] = useState(null);
  const {
    setCart,
    setCartDetails,
    cart,
    get_cart_details_succes,
    succes_items,
    summaryCart,
  } = useContext(ShoppingCartContext); // Usamos las funciones del contexto para limpiar el carrito
  const [carritoId, setCarritoId] = useState("");
  const Navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  // Este hook se ejecutará cuando el componente se monte
  useEffect(() => {
    const paymentStatus = params.get("status");
    const paymentId = params.get("payment_id");
    const payerEmail = params.get("payer_email");
    const carritoId = params.get("carrito_id"); // Obtener el ID del carrito de la URL

    setPaymentStatus(paymentStatus);
    setPaymentId(paymentId);
    setPayerEmail(payerEmail);
    setCarritoId(carritoId);

    // Si el pago fue exitoso y se recibió un carrito_id en la URL, limpiar el carrito
    console.log("Pago aprobado, limpiando carrito con ID:", carritoId);
    // Limpiar el carrito del localStorage y en el contexto
    localStorage.removeItem("cart");
    localStorage.removeItem("cartDetails");
    setCart(null); // Limpiamos el carrito en el contexto
    setCartDetails([]); // Limpiamos los detalles del carrito en el contexto
  }, []);

  useEffect(() => {
    if (paymentId) {
      console.log("hola");
      console.log(paymentId);
      get_cart_details_succes(paymentId);
    }
  }, [paymentId]);

  if (paymentStatus === "approved" /*&& cart*/) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen  w-full">
        <Header />
        {JSON.stringify(summaryCart)}
        <div className="bg-white rounded-lg  p-10 mt-8 w-11/12 lg:w-[900px]">
          <div className="flex justify-center mb-4 lg:justify-start">
            <span className=" text-4xl">✔️</span>
          </div>
          <h1 className="text-3xl font-semibold  mb-3">Pago Exitoso</h1>
          <p className="text-lg text-gray-700 mb-2">
            Gracias por tu compra. Tu pago ha sido aprobado.
          </p>

          <div className="payment_summar bg-slate-100 p-4 rounded mt-4">
            <div className="row_1">
              <p className="text-lg font-medium">Payment ID: {paymentId}</p>
              <div className="text-sm">
                <p>Nombre: {summaryCart?.user_name}</p>
                <p>Teléfono: {summaryCart?.user_phone}</p>
                {summaryCart?.direccion
                  ? "Dirección de envío: " + summaryCart?.direccion
                  : "Recojo en Miraflores"}
                <p>
                  Fecha de {summaryCart?.direccion ? "Entrega: " : "Recojo: "}{" "}
                  {summaryCart?.fecha_entrega}
                </p>
              </div>
            </div>
            <div className="divider"></div>

            {/*Items del cart */}
            {succes_items?.map((item) => (
              <div className="item mb-4">
                <p className="font-medium text-lg">{item.product_nombre}</p>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-700">
                    {`${
                      item.kit_variation_nombre
                        ? item.kit_variation_nombre + ": "
                        : ""
                    }  ${item.qty_S} (S), ${item.qty_M} (M), ${
                      item.qty_L
                    } (L) ${item.nombre ? ` - Nombre: ${item.nombre}` : ""} ${
                      item.apellido ? ` - Apellido: ${item.apellido}` : ""
                    } ${item.bandera ? ` - Bandera: ${item.bandera}` : ""}`}
                  </p>
                  <p>{"S/" + item.price + ".00"}</p>
                </div>
              </div>
            ))}

            {/*Subtotal */}
            <div className="font-medium text-lg border-t pt-2 flex justify-between">
              <p>Subtotal</p>
              <p className="font-normal text-sm">{"S/" + 8 + ".00"}</p>
            </div>

            {/*Envio */}
            <div className="font-medium text-lg pt-1 flex justify-between">
              <p>Envío</p>
              <p className="font-normal text-sm">{"S/" + 8 + ".00"}</p>
            </div>

            {/*Total */}
            <div className="font-medium text-lg border-t pt-3 flex justify-between">
              <p>Total</p>
              <p className="font-medium">{"S/" + 8 + ".00"}</p>
            </div>
          </div>

          {/* Botón para regresar al inicio */}
          <h2>¿Deseas recibir el resumen de tu compra a tu correo?</h2>

          <div className="mt-4 flex h-12 gap-2">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />

            <button className="text-white bg-black hover:bg-slate-800 px-6 py-2 rounded-lg h-full ">
              Enviar
            </button>
          </div>

          <div className="mt-6">
            <a
              href="/"
              className="text-white bg-black hover:bg-slate-800 px-4 py-2 rounded-md"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    Navigate("/");
  }
}
