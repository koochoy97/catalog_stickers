import { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

export function Direccion_envio_modal() {
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

  useEffect(() => {
    setLocalDireccion(direccion || "");
    setLocalDetalle(detalle || "");
    setLocalDistrito(distrito || "");
    setLocalReferencia(referencia || "");
  }, [direccion, detalle, distrito, referencia]);

  const handleSaveAddress = () => {
    setDireccion(localDireccion);
    setDetalle(localDetalle);
    setDistrito(localDistrito);
    setReferencia(localReferencia);
    document.getElementById("my_modal_3").close();
  };

  return (
    <>
      <div
        className="boton_direccion w-full bg-white rounded-md p-3 mt-4 flex  items-center justify-between cursor-pointer gap-3 lg:justify-between "
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <div className="flex gap-4 items-center">
          {" "}
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
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
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
                className="mt-4 px-4 py-2 text-white font-semibold rounded w-full bg-blue-500 hover:bg-blue-700"
                type="button"
                onClick={handleSaveAddress}
              >
                Continuar al pago
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
