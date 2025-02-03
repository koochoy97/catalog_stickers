export function Guia_medidas() {
  return (
    <>
      <button
        className="text-sm font-semibold text-[#FF596F] cursor-pointer"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Ver guía de medidas
      </button>
      <dialog id="my_modal_2" className="modal w-full">
        <div className="modal-box p-6 md:p-10">
          <p className="text-xl font-medium">Guía de medidas</p>
          <p className="mb-6 text-md">
            En Sprinta manejamos las medidas según la altura del Sticker.
          </p>
          <img src="/images/guia_medida.png" alt="" className="md:w-80" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
