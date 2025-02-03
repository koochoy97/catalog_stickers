import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Direccion_envio_modal } from "./Components/Checkout/Direccion_envio_modal";

initMercadoPago("TEST-16a3d4c9-3cad-4447-86db-5671b1f27ea2", {
  locale: "es-PE",
});

export function Payment_page() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("envio_domicilio"); // Estado para la selección

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
        setPreferenceId(data.id);
        setLoading(false);
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
            Selecciona el método de envío
          </h2>

          {/* Opción 1: Envío a domicilio */}
          <div className="shipping_option flex gap-2 items-center justify-between">
            <input
              type="radio"
              name="shipping"
              checked={selectedOption === "envio_domicilio"}
              onChange={() => setSelectedOption("envio_domicilio")}
              className="radio w-3 h-3"
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

          {/* Opción 2: Recojo en Miraflores */}
          <div className="Recojo_option flex gap-2 items-center justify-between mt-2">
            <input
              type="radio"
              name="shipping"
              checked={selectedOption === "recojo_miraflores"}
              onChange={() => setSelectedOption("recojo_miraflores")}
              className="radio w-3 h-3"
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
          <div className="summary w-full text-sm">
            <div className="row_1 flex justify-between">
              <p>Productos:</p>
              <p>S/10.00</p>
            </div>

            <div className="row_2 flex justify-between">
              <p>Envío:</p>
              <p>S/5.00</p>
            </div>

            <div className="row_3 flex justify-between font-semibold">
              <p>Total:</p>
              <p>S/15.00</p>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-500">Cargando pago...</p>
          ) : (
            preferenceId && (
              <div className="">
                <Wallet initialization={{ preferenceId }} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
