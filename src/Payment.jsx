import { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Direccion_envio_modal } from "./Components/Direccion_envio_modal";

initMercadoPago("TEST-16a3d4c9-3cad-4447-86db-5671b1f27ea2", {
  locale: "es-PE",
});

export function Payment_page() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para indicar carga

  useEffect(() => {
    fetch("https://kingway97.pythonanywhere.com/crear_preferencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Sticker Personalizado",
        quantity: 1,
        unit_price: 50.0,
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        phone: "987654321",
        order_id: "ORD-12345",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPreferenceId(data.id); // Guardar la preferencia
        setLoading(false); // Termina la carga
      })
      .catch((error) => {
        console.error("Error al obtener la preferencia:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex w-full flex-col justify-start items-center h-screen">
      <div className="main w-11/12 flex flex-col justify-start items-center my-4 md:px-20 h-full">
        <Direccion_envio_modal />

        <div className="botón_pago_container w-full bg-white rounded-md p-3 mt-4">
          <h2 className="text-lg font-bold mb-4">
            Selecciona el metodo de envío
          </h2>
          <div className="shipping_option flex gap-2 items-center justify-between">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox w-3 h-3"
            />
            <div>
              <p className="text-md">Envío a domicilio</p>
              <p className="text-gray-500 text-sm">
                Te llega el Viernes 07 de Febrero
              </p>
            </div>
            <p className="text-md">S/5.00</p>
          </div>

          <div className="divider"></div>

          <div className="Recojo_option flex gap-2 items-center justify-between mt-2">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox w-3 h-3"
            />
            <div>
              <p className="text-md">Recojo en Miraflores</p>
              <p className="text-gray-500 text-sm">
                A partir del viernes 07 de Febrero
              </p>
            </div>
            <p className="text-md">S/5.00</p>
          </div>
        </div>

        <div className="seleccion_envio w-full bg-white rounded-md p-3 mt-4">
          <h1 className="text-xl font-bold mb-4">Pagar con Mercado Pago</h1>
          {loading ? (
            <p className="text-gray-500">Cargando pago...</p>
          ) : (
            preferenceId && (
              <div className="mt-4">
                <Wallet initialization={{ preferenceId }} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
