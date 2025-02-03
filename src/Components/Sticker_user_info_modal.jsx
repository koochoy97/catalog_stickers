import React, { useState, useContext } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";

export function Sticker_user_info_modal(props) {
  const navigate = useNavigate();
  const { kit_selected_value, product } = props;
  const maxValue = kit_selected_value?.value; // Valor máximo permitido

  const { addProductToCart, cart, cartDetails } =
    useContext(ShoppingCartContext);

  // Estado para los valores de los inputs (tallas)
  const [inputValues, setInputValues] = useState({
    S: 0,
    M: 0,
    L: 0,
  });

  // Estado para el nombre
  const [stickerName, setStickerName] = useState("");

  // Estado para el apellido
  const [stickerLastname, setStickerLastname] = useState("");

  // Estado para la bandera
  const [stickerBandera, setStickerBandera] = useState("");

  // Calcular la suma de los valores
  const totalSum = inputValues.S + inputValues.M + inputValues.L;

  // Calcular las unidades restantes
  const remainingUnits = maxValue - totalSum;

  // Función para manejar cambios en los inputs de tallas
  const handleInputChange = (size, newValue) => {
    const newSum = totalSum - inputValues[size] + newValue;
    if (newSum <= maxValue && newValue >= 0) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [size]: newValue,
      }));
    }
  };

  // Prevenir el comportamiento por defecto de los botones de tallas
  const handleButtonClick = (event, size, increment) => {
    event.preventDefault();
    const newValue = inputValues[size] + increment;
    handleInputChange(size, newValue);
  };

  // Función para manejar el clic en "Continuar al pago"
  const handleClick = () => {
    addProductToCart({
      sticker_name: stickerName,
      sticker_lastname: stickerLastname,
      sticker_bandera: stickerBandera,
      sticker_variation: kit_selected_value,
      product_id: product?.id,
      qtyS: inputValues.S,
      qtyM: inputValues.M,
      qtyL: inputValues.L,
    });

    navigate("/payment_summary");
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-2 py-6 md:static md:bg-transparent md:border-0 md:p-0">
        <button
          className="boton_direccion block px-8 py-2 rounded-full text-lg bg-black text-white text-center w-full"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Comprar
        </button>
      </div>

      {/* Contenido del modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-full">
          <form method="dialog">
            {/* Botón para cerrar el modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-3">Personaliza tu Sticker</h3>

            <div className="flex flex-col gap-3">
              {/* Input para el nombre */}
              <input
                type="text"
                placeholder="Nombre"
                className="input input-bordered w-full"
                value={stickerName}
                onChange={(e) => setStickerName(e.target.value)}
              />

              {/* Input para el apellido */}
              <input
                type="text"
                placeholder="Apellido"
                className="input input-bordered w-full"
                value={stickerLastname}
                onChange={(e) => setStickerLastname(e.target.value)}
              />

              {/* Select para la bandera */}
              <select
                className="select select-bordered w-full"
                value={stickerBandera}
                onChange={(e) => setStickerBandera(e.target.value)}
              >
                <option disabled value="">
                  Elige tu bandera
                </option>
                <option value="Perú">Perú</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Colombia">Colombia</option>
                <option value="Brazil">Brazil</option>
                <option value="Chile">Chile</option>
              </select>

              {/* Selección de tallas */}
              <div>
                <h2 className="font-bold text-lg mb-0">Elige las medidas</h2>
                <p className="text-sm mt-0">
                  Te quedan {remainingUnits} disponibles
                </p>
              </div>

              {/* Inputs para seleccionar tallas */}
              <div className="flex flex-col gap-3">
                {["S", "M", "L"].map((size) => (
                  <div
                    key={size}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <span className="font-medium">{size}</span>
                    <div className="flex items-center gap-2">
                      {/* Botón para disminuir */}
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={(e) => handleButtonClick(e, size, -1)}
                        disabled={inputValues[size] <= 0}
                      >
                        -
                      </button>
                      {/* Valor actual */}
                      <span className="w-8 text-center">
                        {inputValues[size]}
                      </span>
                      {/* Botón para aumentar */}
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={(e) => handleButtonClick(e, size, 1)}
                        disabled={remainingUnits <= 0}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botón para continuar al pago */}
              <button
                className={`mt-4 px-4 py-2 text-white font-semibold rounded w-full bg-black hover:bg-blue-700 ${
                  remainingUnits !== 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={remainingUnits !== 0}
                onClick={handleClick}
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
