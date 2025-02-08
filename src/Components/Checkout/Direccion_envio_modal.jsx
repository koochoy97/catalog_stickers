import { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

export function Direccion_envio_modal(props) {
  const {
    setDireccion,
    setDetalle,
    setDistrito,
    setReferencia,
    direccion,
    detalle,
    distrito,
    referencia,
  } = useContext(ShoppingCartContext);

  const [localDireccion, setLocalDireccion] = useState("");
  const [localDetalle, setLocalDetalle] = useState("");
  const [localDistrito, setLocalDistrito] = useState("");
  const [localReferencia, setLocalReferencia] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setLocalDireccion(direccion || "");
    setLocalDetalle(detalle || "");
    setLocalDistrito(distrito || "");
    setLocalReferencia(referencia || "");
  }, [direccion, detalle, distrito, referencia]);

  // Verificar si todos los campos están completos
  useEffect(() => {
    if (localDireccion && localDistrito && localReferencia) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [localDireccion, localDistrito, localReferencia]);

  const handleSaveAddress = () => {
    if (isFormValid) {
      setDireccion(localDireccion);
      setDetalle(localDetalle);
      setDistrito(localDistrito);
      setReferencia(localReferencia);
      document.getElementById("my_modal_3").close();
    }
  };

  // Restablecer las variables locales a los valores del contexto
  const handleCancel = () => {
    setLocalDireccion(direccion || "");
    setLocalDetalle(detalle || "");
    setLocalDistrito(distrito || "");
    setLocalReferencia(referencia || "");
    document.getElementById("my_modal_3").close();
  };

  useEffect(() => {
    props.send_direccion_modal(isFormValid);
  }, [isFormValid]);

  return (
    <>
      <div
        className="boton_direccion w-full bg-white rounded-md p-3 mt-4 flex  items-center justify-between cursor-pointer gap-3 lg:justify-between "
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <div className="flex gap-4 items-center">
          <img src="/images/gps_icon.svg" className="w-6" alt="" />
          <div className="text-left font-normal text-sm">
            {direccion ? (
              <p className="row_1">
                {direccion +
                  " - " +
                  detalle +
                  " - " +
                  distrito +
                  " - " +
                  referencia}
              </p>
            ) : (
              "Ingresa tu direccion"
            )}
          </div>
        </div>

        <img src="/images/right_arrow.svg" alt="" className="w-4" />
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-full">
          <form method="dialog">
            <h3 className="font-bold text-lg mb-3">Ingresa tu dirección</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Dirección"
                className="input input-bordered w-full"
                value={localDireccion}
                onChange={(e) => setLocalDireccion(e.target.value)}
              />

              <input
                type="text"
                placeholder="Casa, apartamento, etc. (Opcional)"
                className="input input-bordered w-full"
                value={localDetalle}
                onChange={(e) => setLocalDetalle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Distrito"
                className="input input-bordered w-full"
                value={localDistrito}
                onChange={(e) => setLocalDistrito(e.target.value)}
              />

              <textarea
                className="textarea textarea-bordered"
                placeholder="Referencia"
                value={localReferencia}
                onChange={(e) => setLocalReferencia(e.target.value)}
              ></textarea>

              <button
                className={`mt-4 px-4 py-2 text-white font-semibold rounded w-full ${
                  isFormValid
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                type="button"
                onClick={handleSaveAddress}
                disabled={!isFormValid}
              >
                Continuar al pago
              </button>

              {/* Botón Cancelar */}
              <button
                className="mt-2 px-4 py-2 text-white font-semibold rounded w-full bg-gray-500 hover:bg-gray-600"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
