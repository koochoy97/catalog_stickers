import { useEffect, useState, useContext } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Direccion_envio_modal } from "./Components/Checkout/Direccion_envio_modal";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";

initMercadoPago("TEST-16a3d4c9-3cad-4447-86db-5671b1f27ea2", {
  locale: "es-PE",
});

export function Payment_page() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shipping_cost, setShippingCost] = useState(5); // Valor inicial de envío a domicilio

  const {
    shopping_cart_total,
    cart, // Asegúrate de que cart tenga el ID que necesitamos
    nombre_user_session,
    phone_user_session,
    direccion,
    detalle,
    referencia,
    distrito,
  } = useContext(ShoppingCartContext);

  const [selectedOption, setSelectedOption] = useState("envio_domicilio");

  // Función para cambiar el costo de envío según la opción elegida
  const handleShippingOptionChange = (option) => {
    setSelectedOption(option);
    setShippingCost(option === "envio_domicilio" ? 5 : 0);
  };

  useEffect(() => {
    if (shopping_cart_total > 0) {
      // Solo ejecutar si hay un monto válido
      setLoading(true);
      fetch("https://kingway97.pythonanywhere.com/crear_preferencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              title: "Producto",
              quantity: 1,
              unit_price: shopping_cart_total,
              currency_id: "PEN",
            },
          ],
          payer: {
            email: "jaim23koochoy@gmail.com",
          },
          shipments: {
            cost: shipping_cost,
          },
          carrito_id: cart.id, // Pasamos el ID del carrito
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            setPreferenceId(data.id);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [shopping_cart_total, shipping_cost, cart.id]); // Añadimos cart.id como dependencia

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
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                name="shipping"
                checked={selectedOption === "envio_domicilio"}
                onChange={() => handleShippingOptionChange("envio_domicilio")}
                className="radio w-3 h-3"
              />
              <div>
                <p className="text-md">Envío a domicilio</p>
                <p className="text-gray-500 text-sm">
                  Te llega el Viernes 07 de Febrero
                </p>
              </div>
            </div>

            <p className="text-md">S/5.00</p>
          </div>

          <div className="divider"></div>

          {/* Opción 2: Recojo en Miraflores */}
          <div className="Recojo_option flex gap-2 items-center justify-between mt-2">
            <div className="flex gap-4 items-center">
              {" "}
              <input
                type="radio"
                name="shipping"
                checked={selectedOption === "recojo_miraflores"}
                onChange={() => handleShippingOptionChange("recojo_miraflores")}
                className="radio w-3 h-3"
              />
              <div>
                <p className="text-md">Recojo en Miraflores</p>
                <p className="text-gray-500 text-sm">
                  A partir del viernes 07 de Febrero
                </p>
              </div>
            </div>
            <p className="text-md text-green-700">Gratis</p>
          </div>
        </div>

        <div className="seleccion_envio w-full bg-white rounded-md p-3 mt-4">
          <div className="summary w-full text-sm">
            <div className="row_1 flex justify-between">
              <p>Productos:</p>
              <p>{"S/" + shopping_cart_total + ".00"}</p>
            </div>

            <div className="row_2 flex justify-between">
              <p>Envío:</p>
              <p>{"S/" + shipping_cost + ".00"}</p>
            </div>

            <div className="row_3 flex justify-between font-semibold">
              <p>Total:</p>
              <p>{"S/" + (shopping_cart_total + shipping_cost) + ".00"}</p>
            </div>
          </div>

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
