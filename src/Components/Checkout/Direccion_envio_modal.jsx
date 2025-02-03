export function Direccion_envio_modal() {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div
        className="boton_direccion w-full bg-white rounded-md p-3 mt-4 flex gap-1 items-center justify-between cursor-pointer"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <img src="/images/gps_icon.svg" className="w-6" alt="" />

        <div className="text-left font-normal text-sm">
          <p className="row_1">Direción - Calle Piura 541 Miraflores</p>
          <p className="row_2">541 E Miraflores</p>
        </div>

        <img src="/images/right_arrow.svg" alt="" className="w-4" />
      </div>

      {/* Contenido de modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-3">Ingresa tu dirección</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Dirección"
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Casa, apartamento, etc. (Opcional)"
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Distrito"
                className="input input-bordered w-full"
              />

              <textarea
                className="textarea textarea-bordered"
                placeholder="Refencia"
              ></textarea>

              <button
                className={`mt-4 px-4 py-2 text-white font-semibold rounded w-full bg-blue-500 hover:bg-blue-700>`}
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
