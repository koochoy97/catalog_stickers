import { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Contact_info } from "./Components/Contact_info";
import { Order_summary } from "./Components/Order_summary";

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

  return (
    <div className="flex w-full flex-col justify-start items-center h-screen">
      <div className="main w-11/12 flex flex-col justify-start items-center my-4 md:px-20 h-full">
        {/* 🔹 Se usa el componente Contact_info y se le pasan los estados como props */}
        <Contact_info
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          errors={errors}
          touched={touched}
          setTouched={setTouched}
          isValid={isValid}
        />

        <div className="summary_container w-full bg-white rounded-md p-3 mt-4">
          <h1 className="text-lg font-semibold w-full text-left mb-2">
            Resumen de compra
          </h1>
          <Order_summary />
        </div>
      </div>
    </div>
  );
}
