import React, { useEffect, useState, useContext } from "react";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { Header } from "./Components/Header/Header";

export function Success_page() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [payerEmail, setPayerEmail] = useState(null);
  const { setCart, setCartDetails, cart } = useContext(ShoppingCartContext); // Usamos las funciones del contexto para limpiar el carrito
  const [carritoId, setCarritoId] = useState("");
  const Navigate = useNavigate();

  // Este hook se ejecutará cuando el componente se monte
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

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

  if (paymentStatus === "approved" /*&& cart*/) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen  w-full">
        <Header />
        <div className="bg-white rounded-lg  p-10 mt-8 w-11/12">
          <div className="flex justify-center mb-4 lg:justify-start">
            <span className=" text-4xl">✔️</span>
          </div>
          <h1 className="text-3xl font-semibold  mb-4">Pago Exitoso</h1>
          <p className="text-lg text-gray-700 mb-2">
            Gracias por tu compra. Tu pago ha sido aprobado.
          </p>
          <p className="text-sm text-gray-600">
            <strong>ID de pago:</strong> {paymentId}
            {carritoId}
          </p>

          {/* Botón para regresar al inicio */}
          <h2>¿Deseas recibir el </h2>
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
