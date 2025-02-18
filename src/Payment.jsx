import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Direccion_envio_modal } from "./Components/Checkout/Direccion_envio_modal";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";

initMercadoPago("APP_USR-fdf7bbe7-5434-4da3-9e74-1de75a6f8b3f", {
  locale: "es-PE",
});

export function Payment_page() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shipping_cost, setShippingCost] = useState(5);
  const [isFormValid, setIsFormValid] = useState(false);
  const [meli_url, setMeli_url] = useState("");
  const [selectedOption, setSelectedOption] = useState("envio_domicilio");
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const {
    shopping_cart_total,
    cart,
    cartDetails,
    createCart,
    DB_cart_id,
    DB_cart_details,
    nombre_user_session,
    phone_user_session,
    setFechaEntrega,
    setTipoEntrega,
    tipo_entrega,
    fecha_entrega,
  } = useContext(ShoppingCartContext);

  // Validaciones iniciales
  useEffect(() => {
    if (!nombre_user_session && !phone_user_session) {
      navigate("/payment_summary");
    }
    if (!cart) {
      navigate("/");
    }
    setTipoEntrega(selectedOption);
  }, []);

  const [isCreatingCart, setIsCreatingCart] = useState(false);

  // Función para crear preferencia de MercadoPago
  const createMercadoPagoPreference = async (cartId) => {
    if (shopping_cart_total <= 0) return null;

    try {
      const response = await fetch(
        "https://kingway97.pythonanywhere.com/crear_preferencia",
        {
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
            ],
            payer: {
              email: "jaim23koochoy@gmail.com",
            },
            shipments: {
              cost: shipping_cost,
            },
            external_reference: cartId,
          }),
        }
      );

      const data = await response.json();
      if (data.id) {
        setPreferenceId(data.id);
        return data.init_point;
      }
      return null;
    } catch (error) {
      console.error("Error creating preference:", error);
      return null;
    }
  };

  const handle_checkout = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setLoading(true);

    try {
      if (!DB_cart_id || !DB_cart_details) {
        setIsCreatingCart(true);
        await createCart();
      } else {
        // Si ya existe el carrito, crear preferencia directamente
        const url = await createMercadoPagoPreference(DB_cart_id);
        if (url) {
          setMeli_url(url);
          window.location.href = url;
        }
      }
    } catch (error) {
      console.error("Error detallado:", error);
      alert("Hubo un error al procesar el pago. Por favor, intenta de nuevo.");
      setIsCreatingCart(false);
      setIsProcessing(false);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para manejar la redirección cuando el carrito se crea
  useEffect(() => {
    const handleCartCreation = async () => {
      if (isCreatingCart && DB_cart_id && DB_cart_details) {
        try {
          const url = await createMercadoPagoPreference(DB_cart_id);
          if (url) {
            setMeli_url(url);
            window.location.href = url;
          }
        } catch (error) {
          console.error("Error creating preference:", error);
          alert(
            "Hubo un error al procesar el pago. Por favor, intenta de nuevo."
          );
        } finally {
          setIsCreatingCart(false);
          setIsProcessing(false);
        }
      }
    };

    handleCartCreation();
  }, [DB_cart_id, DB_cart_details, isCreatingCart]);

  // Si ya existe el carrito, crear preferencia automáticamente
  useEffect(() => {
    const initializeExistingCart = async () => {
      if (DB_cart_id && DB_cart_details && !meli_url && !isProcessing) {
        setLoading(true);
        const url = await createMercadoPagoPreference(DB_cart_id);
        if (url) setMeli_url(url);
        setLoading(false);
      }
    };

    initializeExistingCart();
  }, [DB_cart_id, DB_cart_details]);

  // ... resto del código igual (handleShippingOptionChange, calculateShippingDate, etc.)

  const handleShippingOptionChange = (option) => {
    setSelectedOption(option);
    setShippingCost(option === "envio_domicilio" ? 5 : 0);
    setTipoEntrega(option);
    setFechaEntrega(calculateShippingDate());
  };

  const calculateShippingDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek <= 3 && today.getHours() < 12) {
      today.setDate(today.getDate() + (5 - dayOfWeek));
    } else {
      today.setDate(today.getDate() + (12 - dayOfWeek));
    }

    const options = { weekday: "long", day: "2-digit", month: "long" };
    const formattedDate = today.toLocaleDateString("es-ES", options);

    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    const internalDate = `${day}/${month}/${year}`;

    setFechaEntrega(internalDate);
    return formattedDate;
  };

  const handle_direccion_modal = (e) => {
    setIsFormValid(e);
  };

  return (
    <div className="flex w-full flex-col justify-start items-center h-screen">
      <div className="main w-11/12 flex flex-col justify-start items-center my-4 md:px-20 h-full">
        {"DB_cart_id: " + DB_cart_id}
        {"DB_cart_details: " + DB_cart_details}
        <div
          className={`w-full ${
            selectedOption === "envio_domicilio" ? "block" : "hidden"
          }`}
        >
          <Direccion_envio_modal
            send_direccion_modal={handle_direccion_modal}
          />
        </div>

        <div className="botón_pago_container w-full bg-white rounded-md p-3 mt-4">
          <h2 className="text-lg font-bold mb-4">
            Selecciona el método de envío
          </h2>

          {/* Opciones de envío... igual que antes */}
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

          <button
            className="w-full bg-blue-500 text-white rounded-md p-2 mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              (!isFormValid && selectedOption === "envio_domicilio") ||
              loading ||
              isProcessing
            }
            onClick={handle_checkout}
          >
            <img src="/images/mercado_pago.png" className="w-8" alt="" />
            {loading ? "Procesando..." : "Pagar con Mercado Pago"}
          </button>

          {!isFormValid && selectedOption === "envio_domicilio" && (
            <p className="w-full text-center text-xs text-red-600">
              Debes ingresar tu dirección de envío
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
