import { useEffect, useState, useContext } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Direccion_envio_modal } from "./Components/Checkout/Direccion_envio_modal";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";

initMercadoPago("APP_USR-fdf7bbe7-5434-4da3-9e74-1de75a6f8b3f", {
  locale: "es-PE",
});

export function Payment_page() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shipping_cost, setShippingCost] = useState(5); // Valor inicial de envío a domicilio

  const [isFormValid, setIsFormValid] = useState(false);

  const [meli_url, setMeli_url] = useState("");

  const {
    shopping_cart_total,
    cart, // Asegúrate de que cart tenga el ID que necesitamos
    cartDetails,
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
    // Create items array outside of the fetch call
    const items_details = cartDetails.map((detail) => ({
      title: detail.product.id,
      unit_price: detail.sticker_variation.price,
    }));

    console.log("Items being sent:", items_details); // Debug log

    if (shopping_cart_total > 0) {
      setLoading(true);
      fetch("https://kingway97.pythonanywhere.com/crear_preferencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              title: "Productos",
              quantity: 1,
              unit_price: shopping_cart_total,
              currency_id: "PEN",
            },
          ], // Use the items array directly
          payer: {
            email: "jaim23koochoy@gmail.com",
          },
          shipments: {
            cost: shipping_cost,
          },
          carrito_id: cart.id,
          external_reference: cart.id,
          //aditional_data: cart.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            setPreferenceId(data.id);
            console.log("Preference created:", data);
            setMeli_url(data.init_point);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error creating preference:", error);
          setLoading(false);
        });
    }
  }, [shopping_cart_total, shipping_cost, cart.id, cartDetails]);

  const handle_direccion_modal = (e) => {
    //Estado viene del hijo
    setIsFormValid(e);
  };

  // Función para calcular la fecha de envío
  const calculateShippingDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    if (dayOfWeek <= 3 && today.getHours() < 12) {
      today.setDate(today.getDate() + (5 - dayOfWeek)); // El siguiente viernes
    } else {
      today.setDate(today.getDate() + (12 - dayOfWeek)); // El viernes de la próxima semana
    }

    const options = { weekday: "long", day: "2-digit", month: "long" };
    return today.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="flex w-full flex-col justify-start items-center h-screen">
      <div className="main w-11/12 flex flex-col justify-start items-center my-4 md:px-20 h-full">
        <div
          className={` w-full ${
            selectedOption === "envio_domicilio" ? "block" : "hidden"
          }`}
        >
          {cart.id}
          <Direccion_envio_modal
            send_direccion_modal={handle_direccion_modal}
          />
        </div>

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
                  Te llega el {calculateShippingDate()}
                </p>
              </div>
            </div>

            <p className="text-md">S/5.00</p>
          </div>

          <div className="divider"></div>

          {/* Opción 2: Recojo en Miraflores */}
          <div className="Recojo_option flex gap-2 items-center justify-between mt-2">
            <div className="flex gap-4 items-center">
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
                  A partir del {calculateShippingDate()}
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

          {loading ? <div className="skeleton w-full h-12 "></div> : ""}
          <button
            className="w-full bg-blue-500 text-white rounded-md p-2 mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isFormValid && selectedOption === "envio_domicilio"}
            onClick={() => {
              if (meli_url) {
                window.location.href = meli_url; // Redirige al link de MercadoPago
              }
            }}
          >
            <img src="/images/mercado_pago.png" className="w-8" alt="" />
            Pagar con Mercado Pago
          </button>
          {!isFormValid && selectedOption === "envio_domicilio" ? (
            <p className="w-full text-center text-xs text-red-600">
              Debes ingresar tu dirección de envío
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
