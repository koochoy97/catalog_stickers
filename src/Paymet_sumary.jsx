import { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

export function Payment_summary() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({ name: false, phone: false });

  // Validar los campos en tiempo real
  useEffect(() => {
    let nameError = "";
    let phoneError = "";

    if (touched.name && name.length < 3) {
      nameError = "El nombre debe tener al menos 3 caracteres.";
    }

    if (touched.phone) {
      const cleanedPhone = phone.replace(/\s/g, ""); // Elimina espacios antes de validar
      const phoneRegex = /^(\+51)?\d{9}$/; // Acepta "+51" opcional y exactamente 9 dígitos numéricos
      if (!phoneRegex.test(cleanedPhone)) {
        phoneError = "Ingrese un número de teléfono válido (9 dígitos).";
      }
    }

    setErrors({ name: nameError, phone: phoneError });

    // ✅ Se valida que ambos campos sean correctos antes de activar el botón
    setIsValid(
      name.length >= 3 &&
        phone.length >= 9 &&
        nameError === "" &&
        phoneError === ""
    );
  }, [name, phone, touched]);

  // Función para limpiar espacios en el teléfono cuando pierde el foco
  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    setPhone(phone.replace(/\s/g, "")); // Elimina todos los espacios en blanco
  };

  return (
    <div className="flex w-full flex-col justify-start items-center h-screen">
      <Header />

      <div className="main w-11/12 flex flex-col justify-start items-center my-4 md:px-20 h-full">
        <div className="summary_container w-full bg-white rounded-md p-3 mb-4">
          <h1 className="text-lg font-semibold w-full text-left ">
            Resumen de compra
          </h1>
        </div>

        <div className="contact_container w-full bg-white rounded-md p-3 flex flex-col justify-center items-center ">
          <h2 className="text-lg font-semibold w-full text-left ">
            Información de contacto
          </h2>
          <div className="form w-full">
            <label className="form-control w-full  mt-2">
              <div className="label w-full">
                <span className="label-text">Nombre completo</span>
              </div>
              <input
                type="text"
                placeholder="Nombre completo"
                className="input input-bordered w-full "
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </label>

            <label className="form-control w-full  mt-2">
              <div className="label">
                <span className="label-text">Número de teléfono</span>
              </div>
              <input
                type="text"
                placeholder="Número de teléfono"
                className="input input-bordered w-full "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={handlePhoneBlur} // Limpia espacios al perder el foco
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </label>

            <button
              className={`mt-4 px-4 py-2 text-white font-semibold rounded w-full ${
                isValid
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isValid} // 🔹 Ahora comienza deshabilitado correctamente
            >
              Continuar al pago
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center text-sm gap-4 mt-2 font-light text-slate-500">
          <p className="flex gap-2">
            <img src="/images/Lock.svg" alt="" />
            Pago seguro
          </p>
          <p className="flex gap-2">
            <img src="/images/Secure.svg" alt="" />
            Datos protegidos
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
