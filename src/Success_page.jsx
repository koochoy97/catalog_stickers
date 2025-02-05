import React, { useEffect, useState, useContext } from "react";
import { ShoppingCartContext } from "./Context/ShoppingCartContext"; // Importamos el contexto

export function Success_page() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [payerEmail, setPayerEmail] = useState(null);
  const { setCart, setCartDetails } = useContext(ShoppingCartContext); // Usamos las funciones del contexto para limpiar el carrito

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

    // Si el pago fue exitoso y se recibió un carrito_id en la URL, limpiar el carrito
    if (paymentStatus === "approved" && carritoId) {
      console.log("Pago aprobado, limpiando carrito con ID:", carritoId);
      // Limpiar el carrito del localStorage y en el contexto
      localStorage.removeItem("cart");
      localStorage.removeItem("cartDetails");
      setCart(null); // Limpiamos el carrito en el contexto
      setCartDetails([]); // Limpiamos los detalles del carrito en el contexto
    }
  }, [setCart, setCartDetails]);

  const renderMessage = () => {
    if (paymentStatus === "approved") {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex justify-center mb-4">
              <span className="text-green-600 text-4xl">✔️</span>
            </div>
            <h1 className="text-3xl font-semibold text-green-600 mb-4">
              Pago Exitoso
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              Gracias por tu compra. Tu pago ha sido aprobado.
            </p>
            <p className="text-sm text-gray-600">
              <strong>ID de pago:</strong> {paymentId}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Correo del pagador:</strong> {payerEmail}
            </p>

            {/* Botón para regresar al inicio */}
            <div className="mt-6">
              <a
                href="/"
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      );
    } else if (paymentStatus === "failure") {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-8">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h1 className="text-3xl font-semibold text-red-600 mb-4">
              ¡Pago Fallido!
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              Lo sentimos, algo salió mal con tu pago. Intenta nuevamente.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Intentar de nuevo
              </a>
            </div>
          </div>
        </div>
      );
    } else if (paymentStatus === "pending") {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-8">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h1 className="text-3xl font-semibold text-yellow-600 mb-4">
              Pago Pendiente
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              Tu pago está pendiente. Estaremos en contacto para informarte
              sobre su estado.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="text-white bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h1 className="text-3xl font-semibold text-gray-600 mb-4">
              Error desconocido
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              No se pudo determinar el estado de tu pago. Por favor, intenta
              nuevamente.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderMessage()}</div>;
}
