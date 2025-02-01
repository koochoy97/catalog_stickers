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
      <Header />

      <div className="main w-11/12 flex flex-col justify-start items-center my-4 md:px-20 h-full">
        <div className="summary_container w-full bg-white rounded-md p-3 mb-4">
          <h1 className="text-lg font-semibold w-full text-left ">
            Resumen de compra
          </h1>
          <Order_summary />
        </div>

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
