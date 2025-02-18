import React, { useEffect, useState, useContext } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";
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
  } = useContext(ShoppingCartContext);
  const [carritoId, setCarritoId] = useState("");
  const Navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  // Este hook se ejecutará cuando el componente se monte
  useEffect(() => {
    const paymentStatus = params.get("status");
    const paymentId = params.get("payment_id");
    const payerEmail = params.get("payer_email");
    const carritoId = params.get("carrito_id");

    setPaymentStatus(paymentStatus);
    setPaymentId(paymentId);
    setPayerEmail(payerEmail);
    setCarritoId(carritoId);

    // Limpiar carrito si el pago fue exitoso
    localStorage.removeItem("cart");
    localStorage.removeItem("cartDetails");
    setCart(null);
    setCartDetails([]);
  }, []);

  useEffect(() => {
    if (paymentId) {
      get_cart_details_succes(paymentId);
    }
  }, [paymentId]);

  const generatePDF = () => {
    const element = document.getElementById("summary-container"); // Seleccionamos el contenedor

    // Usamos html2canvas para tomar una captura del contenedor
    html2canvas(element, {
      scale: 2, // Mejor resolución
      logging: true, // Para ver detalles en consola si necesitas debugging
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg"); // Convertir el canvas a una imagen

      // Crear el PDF con la imagen
      const pdf = new jsPDF("p", "mm", "a4"); // Crear el PDF
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Agregar el logo en la parte superior
      const logo = "images/circle_logo.png"; // Asegúrate de usar la ruta correcta
      pdf.addImage(logo, "PNG", pageWidth - 50, 10, 20, 20); // Logo en esquina superior derecha

      // Agregar texto adicional (Pago Exitoso y Gracias por tu compra) justo debajo del logo
      pdf.setFontSize(18);
      pdf.text("Pago Exitoso", 10, 30); // Texto para el título "Pago Exitoso"
      pdf.setFontSize(12);
      pdf.text("Gracias por tu compra. Tu pago ha sido aprobado.", 10, 40); // Texto para "Gracias por tu compra"

      // Agregar la imagen del resumen capturada desde html2canvas
      pdf.addImage(imgData, "JPEG", 10, 50, 190, 0); // Añadir la imagen del resumen al PDF, con espacio suficiente para el texto

      // Guardamos el archivo PDF
      pdf.save("resumen-compra.pdf"); // Descargar el PDF
    });
  };

  if (paymentStatus === "approved") {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen  w-full">
        <Header />
        <div className="bg-white rounded-lg p-10 mt-8 w-11/12 lg:w-[900px]">
          <div className="flex justify-center mb-4 lg:justify-start">
            <span className=" text-4xl">✔️</span>
          </div>
          <h1 className="text-3xl font-semibold mb-3">Pago Exitoso</h1>
          <p className="text-lg text-gray-700 mb-2">
            Gracias por tu compra. Tu pago ha sido aprobado.
          </p>

          <div
            className="payment_summar bg-slate-100 p-4 rounded mt-4"
            id="summary-container"
          >
            <div className="row_1">
              <p className="text-lg font-medium">Payment ID: {paymentId}</p>
              <div className="text-sm">
                <p>Nombre: {summaryCart?.user_name}</p>
                <p>Teléfono: {summaryCart?.user_phone}</p>
                {summaryCart?.tipo_envio !== "recojo_miraflores"
                  ? "Dirección de envío: " + summaryCart?.direccion
                  : "Recojo en Miraflores"}
                <p>
                  Fecha de{" "}
                  {summaryCart?.direccion !== "---" ? "Entrega: " : "Recojo: "}{" "}
                  {summaryCart?.fecha_entrega}
                </p>
              </div>
            </div>
            <div className="divider"></div>

            {/*Items del cart */}
            {succes_items?.map((item) => (
              <div className="item mb-4" key={item.product_id}>
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
              <p className="font-normal text-sm">
                {"S/" + summaryCart?.total_price + ".00"}
              </p>
            </div>

            {/*Envio */}
            <div className="font-medium text-lg pt-1 flex justify-between">
              <p>Envío</p>
              <p className="font-normal text-sm">
                {"S/" +
                  (summaryCart?.tipo_envio !== "recojo_miraflores" ? 5 : 0) +
                  ".00"}
              </p>
            </div>

            {/*Total */}
            <div className="font-medium text-lg border-t pt-3 flex justify-between">
              <p>Total</p>
              {"S/" +
                (summaryCart?.total_price +
                  (summaryCart?.tipo_envio !== "recojo_miraflores" ? 5 : 0)) +
                ".00"}
            </div>
          </div>

          {/* Botón para generar PDF */}
          <div className="mt-6">
            <button
              className="text-white bg-black hover:bg-slate-800 px-4 py-2 rounded-md"
              onClick={generatePDF}
            >
              Descargar como PDF
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
