import { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

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
    <div className="flex w-full flex-col justify-start items-start h-screen">
      <Header />
      <div className="main w-full p-6 flex flex-col justify-start items-center bg-white border-t md:px-20">
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
      <Footer />
    </div>
  );
}
