export function Sticker_user_info_modal() {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="boton_direccion block px-8 py-2 rounded-full text-lg bg-black text-white text-center w-full"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Comprar
      </button>

      {/* Contenido de modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-3">Ingresa tu dirección</h3>
          </form>
        </div>
      </dialog>
    </>
  );
}
