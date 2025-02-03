import { useNavigate } from "react-router-dom";
export function Contact_info({
  name,
  setName,
  phone,
  setPhone,
  errors,
  touched,
  setTouched,
  isValid,
}) {
  const navigate = useNavigate();
  // Función para limpiar espacios en el teléfono cuando pierde el foco
  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    setPhone(phone.replace(/\s/g, "")); // Elimina todos los espacios en blanco
  };

  return (
    <div className="contact_container w-full bg-white rounded-md p-3 flex flex-col justify-center items-center ">
      <h2 className="text-lg font-semibold w-full text-left ">
        Información de contacto
      </h2>
      <div className="form w-full">
        <label className="form-control w-full mt-2">
          <div className="label w-full">
            <span className="label-text">Nombre completo</span>
          </div>
          <input
            type="text"
            placeholder="Nombre completo"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </label>

        <label className="form-control w-full mt-2">
          <div className="label">
            <span className="label-text">Número de teléfono</span>
          </div>
          <input
            type="text"
            placeholder="Número de teléfono"
            className="input input-bordered w-full"
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
          onClick={() => {
            navigate("/payment");
          }}
        >
          Continuar al pago
        </button>

        <div className="flex justify-center items-center text-xs gap-4 mt-4 font-light text-slate-500">
          <p className="flex gap-2">
            <img src="/images/Lock.svg" className="w-4" alt="" />
            Pago seguro
          </p>
          <p className="flex gap-2">
            <img src="/images/Secure.svg" className="w-4" alt="" />
            Datos protegidos
          </p>
        </div>
      </div>
    </div>
  );
}
